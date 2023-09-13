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
    <nav className="ml-24">
      <ul className="hidden items-center gap-3 md:flex">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                link.active ? "text-black" : "text-neutral-500",
                "duration-300 hover:text-black"
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
