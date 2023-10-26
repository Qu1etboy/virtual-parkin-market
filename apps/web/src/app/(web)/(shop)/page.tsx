import CategoryMenu from "@/components/category-menu";
import ProductCard from "@/components/product-card";
import React from "react";
import { prisma } from "@/lib/prisma";
import { StoreStatus } from "@prisma/client";

export default async function ShopHome() {
  const products = await prisma.product.findMany({
    where: {
      sell: true,
      store: {
        status: StoreStatus.APPROVED,
      },
    },
    include: {
      images: true,
      review: true,
    },
  });

  return (
    <main className="container mx-auto py-6">
      <CategoryMenu />
      <section className="grid grid-cols-1 min-[568px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            href={`/products/${product.slug}`}
          />
        ))}
      </section>
    </main>
  );
}
