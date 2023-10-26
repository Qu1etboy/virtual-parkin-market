import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { products as mockProducts } from "@/__mock__/products";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { FILE_URL } from "@/services/upload";
import { authOptions } from "../auth/auth-options";

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
      store: true,
    },
  });

  if (!products.length) {
    return new NextResponse(null, { status: 400 });
  }

  // Creating bill that contain user's orders
  const bill = await prisma.bill.create({
    data: {
      userId: session.user.id,
    },
  });

  // Creating order for each product
  for (const product of products) {
    if (product.stockQuantity < +items[product.id]) {
      return new NextResponse(null, { status: 400 });
    }

    // Creating new order for each store that user bought from if not exists yet
    let order = await prisma.order.findUnique({
      where: {
        storeId_billId: {
          storeId: product.storeId as string,
          billId: bill.id,
        },
      },
    });

    // If order not exists, create new order
    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: session.user.id,
          storeId: product.storeId as string,
          shippingPrice: 0,
          billId: bill.id,
        },
      });
    }

    // Creating order items from cart items
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: product.id,
        quantity: +items[product.id],
        price: product.price,
      },
    });

    // Creating reserved stock for each product
    await prisma.reservedStock.create({
      data: {
        userId: session.user.id,
        productId: product.id,
        orderId: order.id,
        quantity: +items[product.id],
      },
    });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: +items[product.id],
      price_data: {
        currency: "THB",
        product_data: {
          name: product.name,
          description: product.description,
          images: [`${FILE_URL}/${product.images[0].image}`],
        },
        unit_amount: product.price * 100,
      },
    });
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["TH"],
    },
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/orders`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      billId: bill.id,
    },
  });

  return NextResponse.json({ url: stripeSession.url });
}
