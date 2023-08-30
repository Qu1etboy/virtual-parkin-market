import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heart, ShoppingCart } from "lucide-react";

export default function Navbar() {
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
            <Link href="#">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant={"outline"} className="rounded-full" asChild>
            <Link href="#">Login</Link>
          </Button>
          <Button className="rounded-full" asChild>
            <Link href="#">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
