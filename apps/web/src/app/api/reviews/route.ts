import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/auth-options";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await req.json();

  console.log("[POST review] data = ", data);

  // Check user not reviewing their own product
  const product = await prisma.product.findUnique({
    where: {
      id: data.productId,
    },
    include: {
      store: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!product || product.store?.userId === session.user.id) {
    return new Response(null, { status: 401 });
  }

  // Check if user bought the product
  const order = await prisma.order.findFirst({
    where: {
      userId: session.user.id,
      orderItem: {
        some: {
          productId: data.productId,
        },
      },
    },
  });

  if (!order) {
    return new Response(null, { status: 401 });
  }

  // Check if user already reviewed the product
  const review = await prisma.review.findFirst({
    where: {
      userId: session.user.id,
      productId: data.productId,
    },
  });

  if (review) {
    return new Response(null, { status: 401 });
  }

  // Create review
  const newReview = await prisma.review.create({
    data: {
      userId: session.user.id,
      productId: data.productId,
      rating: data.rating,
      content: data.content,
    },
  });

  // Send email to store owner about new review
  await sendEmail({
    to: product.store?.user?.email!,
    subject: "You have a new review",
    html: `You have a new review for ${product.name}`,
  });

  return NextResponse.json(newReview);
}
