import { authOptions } from "@/app/api/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params: { storeId, orderId },
  }: { params: { storeId: string; orderId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  // Check if user is owner of store
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store || store.userId !== session.user.id) {
    return new NextResponse(null, { status: 401 });
  }

  // Check if order belongs to store
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { delivery: true },
  });

  if (!order || order.storeId !== storeId) {
    return new NextResponse(null, { status: 401 });
  }

  if (order.delivery) {
    return new NextResponse(null, { status: 409 });
  }

  const data = await req.json();

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.SHIPPED,
    },
  });

  // Create delivery
  const delivery = await prisma.delivery.create({
    data: {
      orderId,
      deliveryImages: {
        create: data.images.map((image: string) => ({ image })),
      },
    },
  });

  return NextResponse.json(delivery);
}
