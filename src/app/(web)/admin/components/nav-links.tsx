"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function AdminNavLinks() {
  const pathname = usePathname();
  const params = useParams();

  const navLinks = [
    {
      href: `/admin`,
      label: "คําขอ",
      active: pathname === `/admin`,
      notification: 2,
    },
    {
      href: `/admin/approved`,
      label: "อนุมัติแล้ว",
      active: pathname === `/admin/approved`,
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
                "relative text-sm duration-300 hover:text-black pb-4 px-8"
              )}
            >
              {link.notification && (
                <span className="absolute flex justify-center items-center p-[9px] -top-2 right-[20%] rounded-full text-xs text-white bg-red-600 w-4 h-4">
                  {link.notification}
                </span>
              )}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
