"use client";

import React from "react";
import AdminNavLinks from "./nav-links";
import { getServerSession } from "next-auth/next";
import UserAvatar from "@/components/user-avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";

export default function AdminNavbar({
  storePending,
}: {
  storePending?: number;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const params = useParams();

  const navLinks = [
    {
      href: `/admin`,
      label: "คําขอ",
      active: pathname === `/admin`,
      notification: storePending,
    },
    {
      href: `/admin/approved`,
      label: "อนุมัติแล้ว",
      active: pathname === `/admin/approved`,
    },
  ];

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container space-y-6">
        <div className="flex justify-between pt-6">
          <Link href="/" className="text-lg font-bold">
            Virtual Park In <span className="text-orange-600">Admin</span>
          </Link>

          {session && <UserAvatar user={session?.user as any} />}
        </div>
        <nav>
          <ul className="hidden items-center md:flex mb-4">
            {navLinks.map((link) => (
              <AdminNavLinks key={link.href} {...link} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
