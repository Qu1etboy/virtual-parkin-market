import React from "react";
import SellerNavLinks from "./nav-links";
import { getServerSession } from "next-auth/next";
import UserAvatar from "@/components/user-avatar";
import StoreSwitcher from "./store-switcher";
import Link from "next/link";
// import StoreSwitcher from './store-swicher';

export default async function SellerNavbar() {
  const session = await getServerSession();

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container space-y-6">
        <div className="flex justify-between pt-6">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold">
              Virtual ParkIn
            </Link>
            <svg
              fill="none"
              shape-rendering="geometricPrecision"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              className="h-8 w-8 text-gray-200 sm:ml-3"
            >
              <path d="M16.88 3.549L7.12 20.451"></path>
            </svg>
            <StoreSwitcher className="border-none" />
          </div>
          {session && <UserAvatar user={session?.user as any} />}
        </div>
        <SellerNavLinks />
      </div>
    </header>
  );
}
