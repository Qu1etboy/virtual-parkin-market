import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { productsInStock } from "@/__mock__/products";
import MainLayout from "@/components/layout/main-layout";
import { prisma } from "@/lib/prisma";

export default async function SellerProductPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      images: true,
    },
  });

  return (
    <MainLayout title="สินค้าทั้งหมด" description="สินค้าทั้งหมดของร้านคุณ">
      <Button className="mb-3" asChild>
        <Link href="products/add">
          <PlusCircle className="inline-block mr-3" />
          เพิ่มสินค้า
        </Link>
      </Button>
      <DataTable
        columns={columns}
        data={products.map((product) => ({
          ...product,
          product: product,
        }))}
      />
    </MainLayout>
  );
}
