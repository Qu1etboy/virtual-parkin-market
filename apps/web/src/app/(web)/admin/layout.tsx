import React from "react";
import AdminNavbar from "./components/navbar";
import { prisma } from "@/lib/prisma";
import { StoreStatus } from "@prisma/client";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
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
