"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

type AdminNavLinksProps = {
  href: string;
  label: string;
  active?: boolean;
  notification?: number;
};

export default function AdminNavLinks({
  href,
  label,
  active,
  notification,
}: AdminNavLinksProps) {
  // const pathname = usePathname();
  // const params = useParams();

  // const navLinks = [
  //   {
  //     href: `/admin`,
  //     label: "คําขอ",
  //     active: pathname === `/admin`,
  //     notification: 2,
  //   },
  //   {
  //     href: `/admin/approved`,
  //     label: "อนุมัติแล้ว",
  //     active: pathname === `/admin/approved`,
  //   },
  // ];

  return (
    <li key={href}>
      <Link
        href={href}
        className={cn(
          active ? "text-black border-b-2 border-b-black" : "text-neutral-500",
          "relative text-sm duration-300 hover:text-black pb-4 px-8"
        )}
      >
        {notification ? (
          <span className="absolute flex justify-center items-center p-[9px] -top-2 right-[20%] rounded-full text-xs text-white bg-red-600 w-4 h-4">
            {notification}
          </span>
        ) : null}
        {label}
      </Link>
    </li>
  );
}
