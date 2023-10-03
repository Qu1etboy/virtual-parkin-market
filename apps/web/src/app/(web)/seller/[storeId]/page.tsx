import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Overview from "../components/overview";
import { AreaChart, DollarSign, Package, Users2 } from "lucide-react";
import MainLayout from "@/components/layout/main-layout";
import { prisma } from "@/lib/prisma";
import Currency from "@/components/currency";

const data = [
  {
    title: "รายได้ทั้งหมด",
    content: "999 บาท",
  },
  {
    title: "จํานวนสินค้าที่ขายได้ทั้งหมด",
    content: "999 ชิ้น",
  },
  {
    title: "จํานวนสินค้าคงเหลือ",
    content: "999 ชิ้น",
  },
];

export default async function Page({
  params,
}: {
  params: { storeId: string };
}) {
  const review = await prisma.review.count({
    where: {
      product: {
        storeId: params.storeId,
      },
    },
  });

  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const totalSales = await prisma.orderItem.aggregate({
    where: {
      orderId: { in: orders.map((order) => order.id) },
    },
    _sum: {
      quantity: true,
    },
  });

  const totalAmount = await prisma.receipt.aggregate({
    where: {
      bill: {
        order: {
          some: {
            id: { in: orders.map((order) => order.id) },
          },
        },
      },
    },
    _sum: {
      amount: true,
    },
  });

  const product = await prisma.product.aggregate({
    where: {
      storeId: params.storeId,
    },
    _sum: {
      stockQuantity: true,
    },
  });

  return (
    <MainLayout title="ภาพรวม" description="ภาพรวมร้านค้าของคุณ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รายได้ทั้งหมด</CardTitle>
            <DollarSign className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Currency value={totalAmount._sum.amount || 0} />{" "}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าขาย</CardTitle>
            <AreaChart className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSales._sum.quantity || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +180.1% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รีวิว</CardTitle>
            <Users2 className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{review}</div>
            <p className="text-xs text-muted-foreground">
              +19% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าคงเหลือ</CardTitle>
            <Package className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {product._sum.stockQuantity || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              -201 เมื่อ 2 สัปดาห์ที่แล้ว
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="mb-3 text-base font-medium">
            ยอดขายปี พ.ศ. 2566
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Overview />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
