import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetail from "./product-detail";
import { getServerSession } from "next-auth";
import ProductReview from "./review";
import { authOptions } from "@/app/api/auth/auth-options";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  // Get product from product id
  const product = await prisma.product.findUnique({
    where: {
      slug: params.id,
    },
    include: {
      images: true,
      review: {
        include: {
          user: true,
        },
      },
      reservedStock: true,
      store: true,
    },
  });

  if (!product) {
    notFound();
  }

  const wishlist = await prisma.wishList.findFirst({
    where: {
      productId: product.id,
      userId: session?.user?.id,
    },
  });

  return (
    <main className="my-12">
      <ProductDetail product={product} defaultWishList={wishlist} />
      <ProductReview product={product} />
    </main>
  );
}
