import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { productsInStock } from "@/__mock__/products";

export default function SellerProductPage() {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-4xl font-semibold">สินค้าทั้งหมด</h1>
          <p>สินค้าทั้งหมดของร้านคุณ</p>
        </div>
        <div className="mt-5">
          <Button className="mb-3" asChild>
            <Link href="products/add">
              <PlusCircle className="inline-block mr-3" />
              เพิ่มสินค้า
            </Link>
          </Button>
          <DataTable columns={columns} data={productsInStock} />
        </div>
      </section>
    </main>
  );
}
