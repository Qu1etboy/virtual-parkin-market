import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Overview from "../components/overview";
import { AreaChart, DollarSign, Package, Users2 } from "lucide-react";
import MainLayout from "@/components/layout/main-layout";
import { prisma } from "@/lib/prisma";
import Currency from "@/components/currency";
import { BillStatus } from "@prisma/client";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface OrderData {
  name: string;
  total: number;
}

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
      order: {
        bill: {
          status: BillStatus.PAID,
        },
      },
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

  const ordersOverview = await prisma.order.findMany({
    include: {
      orderItem: {
        select: {
          price: true,
          quantity: true,
        },
      },
    },
  });

  const groupedData = ordersOverview.reduce(
    (result: Record<string, OrderData>, order) => {
      const date = format(order.createdAt, "PP", { locale: th }); // Format the date to "yyyy-MM-dd"
      const totalPrice = order.orderItem.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      if (result[date]) {
        result[date].total += totalPrice;
      } else {
        result[date] = { name: date, total: totalPrice };
      }

      return result;
    },
    {}
  );

  const orderData = Object.values(groupedData);

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
          <Overview data={orderData} />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
