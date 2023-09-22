import CategoryMenu from "@/components/category-menu";
import ProductCard from "@/components/product-card";
import React from "react";
import { products } from "@/__mock__/products";

export default function ShopHome() {
  return (
    <main className="container mx-auto py-6">
      <CategoryMenu />
      <section className="grid grid-cols-1 min-[568px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            href={`/products/${product.id}`}
          />
        ))}
      </section>
    </main>
  );
}
