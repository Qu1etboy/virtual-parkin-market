import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/auth-options";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  console.log("[POST wishlist] product = ", product);
  console.log("[POST wishlist] product id = ", productId);

  if (!product) {
    return new NextResponse(null, { status: 404 });
  }

  const wishlist = await prisma.wishList.findFirst({
    where: {
      productId,
      userId: session.user.id,
    },
  });

  // If product is already in wishlist, remove it else add it
  let result;
  if (wishlist) {
    await prisma.wishList.delete({
      where: {
        id: wishlist.id,
      },
    });
    result = null;
  } else {
    result = await prisma.wishList.create({
      data: {
        productId,
        userId: session.user.id,
      },
    });
  }

  return NextResponse.json({ wishlist: result });
}
