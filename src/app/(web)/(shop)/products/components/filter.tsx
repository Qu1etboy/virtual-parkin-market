'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";


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

export default function ProductFilter({ className } : { className?: string }) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  return (
    <aside className={cn("w-full max-w-[150px] space-y-4", className)}>
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
  );
}
