"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  return <button onClick={() => signOut()}>ออกจากระบบ</button>;
}
