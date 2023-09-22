import React from "react";
import AdminNavLinks from "./nav-links";
import { getServerSession } from "next-auth/next";
import UserAvatar from "@/components/user-avatar";
import Link from "next/link";

export default async function AdminNavbar() {
  const session = await getServerSession();

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container space-y-6">
        <div className="flex justify-between pt-6">
          <Link href="/" className="text-lg font-bold">
            Virtual ParkIn <span className="text-orange-600">Admin</span>
          </Link>

          {session && <UserAvatar user={session?.user as any} />}
        </div>
        <AdminNavLinks />
      </div>
    </header>
  );
}
