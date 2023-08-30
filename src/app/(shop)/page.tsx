import CategoryMenu from "@/components/category-menu";
import ProductCard from "@/components/product-card";
import React from "react";

const products = [
  {
    id: 1,
    name: "Product 1",
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2798&q=80",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    price: 300,
  },
];

export default function ShopHome() {
  return (
    <main className="container mx-auto py-6">
      <CategoryMenu />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex flex-wrap gap-3">
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
