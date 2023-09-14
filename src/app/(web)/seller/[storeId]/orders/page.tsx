import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import tasks from "@/__mock__/tasks/tasks.json";

export default function SellerOrderPage() {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-4xl font-semibold">ออเดอร์ทั้งหมด</h1>
          <p>ออเดอร์ทั้งหมดของร้านคุณ</p>
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={tasks} />
        </div>
      </section>
    </main>
  );
}
