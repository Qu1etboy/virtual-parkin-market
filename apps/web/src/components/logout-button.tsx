"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
    <button onClick={() => signOut()} className="flex items-center">
      <LogOut className="mr-2 w-4 h-4" /> ออกจากระบบ
    </button>
  );
}
