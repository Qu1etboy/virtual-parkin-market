import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import tasks from "@/__mock__/tasks/tasks.json";
import { orders } from "@/__mock__/orders";
import MainLayout from "@/components/layout/main-layout";
import { prisma } from "@/lib/prisma";
import { BillStatus } from "@prisma/client";

export default async function SellerOrderPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
      bill: {
        status: BillStatus.PAID,
      },
    },
    include: {
      bill: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <MainLayout title="ออเดอร์ทั้งหมด" description="ออเดอร์ทั้งหมดของร้านคุณ">
      <DataTable columns={columns} data={orders} />
    </MainLayout>
  );
}
