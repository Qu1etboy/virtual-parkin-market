"use client";

import { products } from "@/__mock__/products";
import ProductCard from "@/components/product-card";
import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";
import ProductFilter from "./components/filter";

export default function ProductsPage() {
  return (
    <main className="container mx-auto">
      <div className="flex sm:px-6 py-6">
        <ProductFilter className="hidden sm:block" />

        <section className="sm:pl-12 pl-0 sm:mr-6 mr-0 w-full">
          <h1 className="flex justify-between items-center text-xl sm:text-2xl md:text-3xl mb-12">
            สินค้าทั้งหมด
            {/* On mobile */}
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <Button
                  variant="outline"
                  className="block sm:hidden rounded-full"
                >
                  ตัวกรอง
                </Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                  <div className="p-4 bg-white rounded-t-[10px] flex-1">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                    <ProductFilter className="sm:hidden block" />
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`/products/${product.id}`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
