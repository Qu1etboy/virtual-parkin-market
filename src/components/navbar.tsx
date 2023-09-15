import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { getServerSession } from "next-auth/next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogOutButton from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserAvatar from "./user-avatar";

const cart = 5;

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <header className="px-3 py-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Virtual ParkIn
        </Link>

        <form className="relative">
          <label htmlFor="search">
            <Search className="absolute left-0 top-0 bottom-0 m-2 text-gray-400" />
          </label>
          <Input
            type="search"
            id="search"
            placeholder="ค้นหาสินค้า"
            className="rounded-full pl-10 w-full md:w-[300px] max-w-6xl"
          />
        </form>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Button variant={"ghost"} className="rounded-full" asChild>
              <Link href="#">
                <Heart className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant={"ghost"} className="rounded-full relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {cart < 100 ? cart : cart + "+"}
                </div>
              </Link>
            </Button>
          </div>
          {!session ? (
            <>
              <Button variant={"outline"} className="rounded-full" asChild>
                <Link href="/login">เข้าสู่ระบบ</Link>
              </Button>
              <Button className="rounded-full" asChild>
                <Link href="/signup">สมัครสมาชิก</Link>
              </Button>
            </>
          ) : (
            <UserAvatar user={session?.user as any} />
          )}
        </div>
      </div>
    </header>
  );
}
