import React from "react";
import SellerNavLinks from "./nav-links";
import { getServerSession } from "next-auth/next";
import UserAvatar from "@/components/user-avatar";
// import StoreSwitcher from './store-swicher';

export default async function SellerNavbar() {
  const session = await getServerSession();

  return (
    <header className="border-b py-3">
      <div className="container flex items-center">
        {/* <StoreSwitcher /> */}
        <SellerNavLinks />
        <UserAvatar user={session?.user as any} />
      </div>
    </header>
  );
}
