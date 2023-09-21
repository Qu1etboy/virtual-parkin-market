import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import tasks from "@/__mock__/tasks/tasks.json";
import { orders } from "@/__mock__/orders";

export default function SellerOrderPage() {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            ออเดอร์ทั้งหมด
          </h1>
          <p className="text-gray-600">ออเดอร์ทั้งหมดของร้านคุณ</p>
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={orders} />
        </div>
      </section>
    </main>
  );
}
