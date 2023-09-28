import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { products as mockProducts } from "@/__mock__/products";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const items = await (await redis).hGetAll(`user:cart:${session.user.id}`);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: Object.keys(items),
      },
    },
    include: {
      images: true,
    },
  });

  if (!products.length) {
    return new NextResponse(null, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "THB",
        product_data: {
          name: product.name,
          description: product.description,
          images: [`http://localhost:4000/${product.images[0].image}`],
        },
        unit_amount: product.price * 100,
      },
    });
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    // metadata: {
    //   orderId: order.id,
    // },
  });

  return NextResponse.json({ url: stripeSession.url });
}
