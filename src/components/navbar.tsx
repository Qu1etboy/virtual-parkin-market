import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heart, ShoppingCart } from "lucide-react";
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

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <header className="px-3 py-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Virtual ParkIn
        </Link>

        <form>
          <Input
            type="search"
            placeholder="Search"
            className="rounded-full w-full max-6xl"
          />
        </form>

        <div className="flex items-center gap-3">
          <Button variant={"outline"} className="rounded-full" asChild>
            <Link href="#">
              <Heart className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant={"outline"} className="rounded-full" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </Button>
          {!session ? (
            <>
              <Button variant={"outline"} className="rounded-full" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="rounded-full" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.user?.image ?? undefined} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-3">
                <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Store</DropdownMenuItem>
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
