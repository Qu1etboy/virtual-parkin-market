import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import tasks from "@/__mock__/tasks/tasks.json";
import { orders } from "@/__mock__/orders";
import MainLayout from "@/components/layout/main-layout";

export default function SellerOrderPage() {
  return (
    <MainLayout title="ออเดอร์ทั้งหมด" description="ออเดอร์ทั้งหมดของร้านคุณ">
      <DataTable columns={columns} data={orders} />
    </MainLayout>
  );
}
