import Prisma, { Role } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import logout from "next-auth/next";
import LogOutButton from "./logout-button";
import Link from "next/link";
import { FILE_URL } from "@/services/upload";
import { ShoppingBag, Store, User2, Lock } from "lucide-react";

export default function UserAvatar({ user }: { user: Prisma.User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-auto cursor-pointer">
          <AvatarImage
            src={`${FILE_URL}/${user.image}` ?? ""}
            alt={user.name ?? ""}
          />
          <AvatarFallback>{user.name ? user.name[0] : null}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-56">
        <DropdownMenuLabel>
          <p>{user.name}</p>
          <p className="text-sm font-normal text-neutral-500">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center">
              <User2 className="w-4 h-4 mr-2" /> ข้อมูลของฉัน
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/orders" className="flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2" /> ออเดอร์ของฉัน
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/seller" className="flex items-center">
              <Store className="w-4 h-4 mr-2" />
              ร้านของฉัน
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {user.role === Role.ADMIN && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/admin" className="flex items-center">
                <Lock className="w-4 h-4 mr-2" /> ไปหน้าแอดมิน
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
