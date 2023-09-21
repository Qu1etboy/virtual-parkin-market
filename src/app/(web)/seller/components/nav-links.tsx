"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function SellerNavLinks() {
  const pathname = usePathname();
  const params = useParams();

  const navLinks = [
    {
      href: `/seller/${params.storeId}`,
      label: "ภาพรวม",
      active: pathname === `/seller/${params.storeId}`,
    },
    {
      href: `/seller/${params.storeId}/products`,
      label: "สินค้า",
      active: pathname === `/seller/${params.storeId}/products`,
    },
    {
      href: `/seller/${params.storeId}/orders`,
      label: "ออเดอร์",
      active: pathname === `/seller/${params.storeId}/orders`,
    },
    {
      href: `/seller/${params.storeId}/settings`,
      label: "ตั้งค่าร้านค้า",
      active: pathname === `/seller/${params.storeId}/settings`,
    },
  ];

  return (
    <nav>
      <ul className="hidden items-center md:flex mb-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                link.active
                  ? "text-black border-b-2 border-b-black"
                  : "text-neutral-500",
                "text-sm duration-300 hover:text-black pb-4 px-8"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
