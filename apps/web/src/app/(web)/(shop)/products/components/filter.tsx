"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { productCategories } from "../page";

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
