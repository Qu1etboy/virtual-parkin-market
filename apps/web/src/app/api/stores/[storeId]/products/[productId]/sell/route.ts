import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

  // Check if user is the owner of the store
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store || store.userId !== session.user.id) {
    return new NextResponse(null, { status: 401 });
  }

  // Check if product is from the store
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product || product.storeId !== store.id) {
    return new NextResponse(null, { status: 401 });
  }

  // Update the product
  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      sell: data.sell,
    },
  });

  return NextResponse.json(updatedProduct);
}
