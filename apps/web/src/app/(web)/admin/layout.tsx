import React from "react";
import AdminNavbar from "./components/navbar";
import { prisma } from "@/lib/prisma";
import { Role, StoreStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== Role.ADMIN) {
    return redirect("/");
  }

  const requestStores = await prisma.store.findMany({
    where: {
      status: StoreStatus.PENDING,
    },
  });

  return (
    <div>
      <AdminNavbar storePending={requestStores.length} />
      {children}
    </div>
  );
}
