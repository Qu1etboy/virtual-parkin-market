import { authOptions } from "@/app/api/auth/auth-options";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params: { storeId, orderId },
  }: { params: { storeId: string; orderId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  // Check if user is the owner of the store
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store || store.userId !== session.user.id) {
    return new NextResponse(null, { status: 401 });
  }

  // Check if order belongs to store
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      bill: {
        include: {
          receipt: true,
        },
      },
    },
  });

  if (!order || order.storeId !== storeId) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

  // Check if order has been shipped
  if (
    order.status === OrderStatus.SHIPPED &&
    data.status === OrderStatus.PACKED
  ) {
    return new NextResponse("Order has already been shipped", { status: 409 });
  }

  // Check if order has been packed
  if (
    order.status === OrderStatus.PACKED &&
    data.status === OrderStatus.PENDING
  ) {
    return new NextResponse("Order has already been packed", { status: 409 });
  }

  // Update order status
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: data.status,
    },
  });

  // Notify customer
  await sendEmail({
    to: order.bill.receipt?.contactEmail
      ? order.bill.receipt?.contactEmail
      : order.user?.email!,
    subject: `Order ${order.id} has been updated`,
    html: `Your order status has been updated to ${data.status}`,
  });

  return NextResponse.json(updatedOrder);
}
