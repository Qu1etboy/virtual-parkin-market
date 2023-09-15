"use client";

import { products } from "@/__mock__/products";
import ProductCard from "@/components/product-card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const prices = [
  {
    id: "1",
    name: "น้อยกว่า 100 บาท",
    min: 0,
    max: 100,
  },
  {
    id: "2",
    name: "100 - 500 บาท",
    min: 100,
    max: 500,
  },
  {
    id: "3",
    name: "500 - 1000 บาท",
    min: 500,
    max: 1000,
  },
  {
    id: "4",
    name: "มากกว่า 1000 บาท",
    min: 1000,
    max: 999999,
  },
];

const productCategories = [
  { id: 1, name: "อิเล็กทรอนิกส์" },
  { id: 2, name: "เสื้อผ้า" },
  { id: 3, name: "เฟอร์นิเจอร์" },
  { id: 4, name: "ความงาม" },
  { id: 5, name: "หนังสือ" },
  { id: 6, name: "กีฬา" },
  { id: 7, name: "ของเล่น" },
  { id: 8, name: "สุขภาพ" },
  { id: 9, name: "ของชำร่วย" },
  { id: 10, name: "ยานยนต์" },
  { id: 11, name: "สัตว์เลี้ยง" },
  { id: 12, name: "เครื่องประดับ" },
  { id: 13, name: "ศิลปะ" },
  { id: 14, name: "เครื่องมือ" },
  { id: 15, name: "เด็ก" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  return (
    <main className="container mx-auto">
      <div className="flex px-6 py-6">
        <aside className="w-full max-w-[150px] space-y-4">
          <div>
            <h2>ประเภท</h2>
            <ul className="text-sm space-y-2 mt-2 ml-2">
              {productCategories.map((category) => (
                <li
                  key={category.id}
                  className={cn(
                    "text-gray-600 hover:text-orange-600",
                    categoryId && +categoryId === category.id
                      ? "text-orange-600"
                      : null
                  )}
                >
                  <Link href={`/products?category=${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>ราคา</h2>
            <ul className="text-sm space-y-2 mt-2 ml-2">
              {prices.map((price) => (
                <li
                  key={price.id}
                  className="flex items-top space-x-2 text-gray-600 hover:text-orange-600"
                >
                  <Checkbox
                    id={price.id}
                    className="data-[state=checked]:bg-orange-600"
                  />
                  <label
                    htmlFor={price.id}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {price.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="pl-12 mr-6 w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl mb-12">
            สินค้าทั้งหมด
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
