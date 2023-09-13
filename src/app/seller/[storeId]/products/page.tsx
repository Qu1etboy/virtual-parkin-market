import React from "react";

export default function SellerProductPage() {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-4xl font-semibold">สินค้าทั้งหมด</h1>
          <p>สินค้าทั้งหมดของร้านคุณ</p>
        </div>
        <div className="mt-5">
          {/* <DataTable columns={columns} data={products} /> */}
        </div>
      </section>
    </main>
  );
}
