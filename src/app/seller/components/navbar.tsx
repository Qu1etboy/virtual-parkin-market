import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import SellerNavLinks from "./nav-links";
import { getServerSession } from "next-auth/next";
// import StoreSwitcher from './store-swicher';

export default async function SellerNavbar() {
  const session = await getServerSession();

  return (
    <header className="border-b py-3">
      <div className="container flex items-center">
        {/* <StoreSwitcher /> */}
        <SellerNavLinks />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="ml-auto cursor-pointer">
              <AvatarImage src="" alt="" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5 w-56">
            <DropdownMenuLabel>
              <p>{session?.user.name}</p>
              <p className="text-sm font-normal text-neutral-500">
                {session?.user.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>หน้าร้านค้า</DropdownMenuItem>
              <DropdownMenuItem>ตั้งค่าบัญชี</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>ออกจากระบบ</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
