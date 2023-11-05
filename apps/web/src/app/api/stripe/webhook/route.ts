import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { BillStatus } from "@prisma/client";
import { redis } from "@/lib/redis";
import { sendEmail } from "@/lib/email";
import { send } from "process";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    console.log("[stripe] address = ", addressString);

    const bill = await prisma.bill.update({
      where: {
        id: session?.metadata?.billId,
      },
      data: {
        status: BillStatus.PAID,
      },
      include: {
        order: {
          include: {
            orderItem: true,
            store: {
              include: {
                user: true,
              },
            },
          },
        },
        user: true,
      },
    });

    console.log("[stripe] bill = ", bill);

    const receipt = await prisma.receipt.create({
      data: {
        userId: bill.userId,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        shippingAddress: addressString,
        contactNumber: session?.customer_details?.phone || "",
        contactEmail: session?.customer_details?.email || "",
        bill: {
          connect: {
            id: bill.id,
          },
        },
      },
    });

    // Send emali to user
    sendEmail({
      to: receipt.contactEmail || "",
      subject: "Virtual Park In Receipt",
      html: "Thank you for your purchase!",
    });

    // Notify store owners of new order
    for (const order of bill.order) {
      await sendEmail({
        to: order.store.user?.email!,
        subject: "Virtual Park In Receipt",
        html: "You have a new order!",
      });
    }

    // Clear cart
    await (await redis).del(`user:cart:${bill.userId}`);
  } else if (event.type === "checkout.session.expired") {
    console.log("[stripe] checkout.session.expired", session?.id);
  }

  return new NextResponse(null, { status: 200 });
}
