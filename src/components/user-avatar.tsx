import Prisma from "@prisma/client";
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

export default function UserAvatar({ user }: { user: Prisma.User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-auto cursor-pointer">
          <AvatarImage
            src={`http://localhost:4000/${user.image}` ?? ""}
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
          <DropdownMenuItem>หน้าร้านค้า</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">การตั้งค่า</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
