import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "ข้อมูลส่วนตัว",
    href: "/profile",
  },
  {
    title: "บัญชีของฉัน",
    href: "/account",
  },
  {
    title: "สมุดที่อยู่",
    href: "/address",
  },
  {
    title: "รายการคําสั่งซื้อ",
    href: "/orders",
  },
  // {
  //   title: "Display",
  //   href: "/examples/forms/display",
  // },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">ข้อมูลของฉัน</h2>
        <p className="text-muted-foreground">
          แก้ไขข้อมูลส่วนตัว, บัญชีของคุณ และ ดูรายละเอียดการสั่งซื้อ
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
