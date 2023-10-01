// "use client";

import { products } from "@/__mock__/products";
import ProductCard from "@/components/product-card";
import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";
import ProductFilter from "./components/filter";
import { prisma } from "@/lib/prisma";
import MyDrawer from "@/components/drawer";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      review: true,
    },
  });

  return (
    <main className="container mx-auto">
      <div className="flex sm:px-6 py-6">
        <ProductFilter className="hidden sm:block" />

        <section className="sm:pl-12 pl-0 sm:mr-6 mr-0 w-full">
          <h1 className="flex justify-between items-center text-xl sm:text-2xl md:text-3xl mb-12">
            สินค้าทั้งหมด
            {/* On mobile */}
            <MyDrawer
              trigger={
                <Button
                  variant="outline"
                  className="block sm:hidden rounded-full"
                >
                  ตัวกรอง
                </Button>
              }
            >
              <ProductFilter className="hidden sm:block" />
            </MyDrawer>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`/products/${product.slug}`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
