"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProductCategory } from "@prisma/client";
import { ca } from "date-fns/locale";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const productCategories = [
  { id: 0, name: "ทั้งหมด", value: null },
  { id: 1, name: "อิเล็กทรอนิกส์", value: ProductCategory.Electronics },
  { id: 2, name: "เสื้อผ้า", value: ProductCategory.Apparel },
  { id: 3, name: "เฟอร์นิเจอร์", value: ProductCategory.Furniture },
  { id: 4, name: "ความงาม", value: ProductCategory.Beauty },
  { id: 5, name: "หนังสือ", value: ProductCategory.Books },
  { id: 6, name: "กีฬา", value: ProductCategory.Sports },
  { id: 7, name: "ของเล่น", value: ProductCategory.Toys },
  { id: 8, name: "สุขภาพ", value: ProductCategory.Wellness },
  { id: 9, name: "ของชำร่วย", value: ProductCategory.Groceries },
  { id: 10, name: "ยานยนต์", value: ProductCategory.Automotive },
  { id: 11, name: "สัตว์เลี้ยง", value: ProductCategory.Pets },
  { id: 12, name: "เครื่องประดับ", value: ProductCategory.Jewelry },
  { id: 13, name: "ศิลปะ", value: ProductCategory.Art },
  { id: 14, name: "เครื่องมือ", value: ProductCategory.Tools },
  { id: 15, name: "เด็ก", value: ProductCategory.Baby },
];

export default function ProductFilter({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoryId = searchParams.get("category");

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
                categoryId === category.value ? "text-orange-600" : null
              )}
            >
              <Link
                href={
                  category.value
                    ? `/products?category=${category.value}`
                    : `/products`
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <div>
        <h2>ราคา</h2>
        <div className="space-y-3">
          <div className="flex gap-3 text-sm">
            <Input type="number" min={0} placeholder="ตํ่าสุด" />
            <Input type="number" min={0} placeholder="สูงสุด" />
          </div>
          <Button>กรองราคา</Button>
        </div>
      </div> */}
    </aside>
  );
}
