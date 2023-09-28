import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetail from "./product-detail";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Get product from product id
  const product = await prisma.product.findUnique({
    where: {
      slug: params.id,
    },
    include: {
      images: true,
      review: true,
      store: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="my-12">
      <ProductDetail product={product} />
    </main>
  );
}
