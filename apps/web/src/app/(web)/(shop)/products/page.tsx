import ProductCard from "@/components/product-card";
import React from "react";
import { Button } from "@/components/ui/button";
import ProductFilter from "./components/filter";
import { prisma } from "@/lib/prisma";
import MyDrawer from "@/components/drawer";
import { productCategories } from "./category";
import { StoreStatus } from "@prisma/client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  console.log("[products page] category = ", searchParams.category);

  // Check if category is valid
  const category = productCategories.find(
    (category) => category.value === searchParams.category
  );

  const products = await prisma.product.findMany({
    where:
      searchParams.category && category
        ? {
            sell: true,
            store: {
              status: StoreStatus.APPROVED,
            },
            category: searchParams.category,
            name: {
              contains: searchParams.q,
            },
          }
        : {
            sell: true,
            store: {
              status: StoreStatus.APPROVED,
            },
            name: {
              contains: searchParams.q,
            },
          },
    include: {
      images: true,
      review: true,
    },
  });

  const title = searchParams.q
    ? `พบ ${products.length} สินค้า สําหรับ "${searchParams.q}"`
    : category
    ? `สินค้าประเภท${category.name}`
    : "สินค้าทั้งหมด";

  return (
    <main className="container mx-auto">
      <div className="flex sm:px-6 py-6">
        <ProductFilter className="hidden sm:block" />

        <section className="sm:pl-12 pl-0 sm:mr-6 mr-0 w-full">
          <h1 className="flex justify-between items-center text-xl sm:text-2xl md:text-3xl mb-12">
            {title}
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
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/products/${product.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-sm my-12">ไม่พบสินค้า</div>
          )}
        </section>
      </div>
    </main>
  );
}
