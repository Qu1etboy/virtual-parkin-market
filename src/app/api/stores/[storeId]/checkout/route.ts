import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { products as mockProducts } from "@/__mock__/products";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  console.log("storeId = ", params.storeId);

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = mockProducts.filter((product) =>
    productIds.includes(product.id)
  );

  // const products = await prisma.product.findMany({
  //   where: {
  //     id: {
  //       in: productIds,
  //     },
  //   },
  // });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "THB",
        product_data: {
          name: product.name,
          images: [product.thumbnail],
        },
        unit_amount: product.price * 100,
      },
    });
  });

  // const order = await prisma.order.create({
  //   data: {
  //     storeId: params.storeId,
  //     isPaid: false,
  //     orderItems: {
  //       create: productIds.map((productId: string) => ({
  //         product: {
  //           connect: {
  //             id: productId,
  //           },
  //         },
  //       })),
  //     },
  //   },
  // });

  const session = await stripe.checkout.sessions.create({
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

  return NextResponse.json({ url: session.url });
}
