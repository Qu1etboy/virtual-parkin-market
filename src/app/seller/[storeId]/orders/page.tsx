import React from "react";

export default function SellerOrderPage() {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-4xl font-semibold">ออเดอร์ทั้งหมด</h1>
          <p>ออเดอร์ทั้งหมดของร้านคุณ</p>
        </div>
        <div className="mt-5">
          {/* <DataTable columns={columns} data={products} /> */}
        </div>
      </section>
    </main>
  );
}
