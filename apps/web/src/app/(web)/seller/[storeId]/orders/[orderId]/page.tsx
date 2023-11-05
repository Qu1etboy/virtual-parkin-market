import { orderItems } from "@/__mock__/orders";
import { DataTable } from "@/components/data-table/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import React from "react";
import Currency from "@/components/currency";
import MainLayout from "@/components/layout/main-layout";
import { BillStatus, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FILE_URL } from "@/services/upload";
import { Button } from "@/components/ui/button";
import ShippingOrderButton from "./components/shipping-order";
import Link from "next/link";

export default async function OrderItemPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId,
      bill: {
        status: BillStatus.PAID,
      },
    },
    include: {
      bill: {
        include: {
          receipt: true,
        },
      },
      user: true,
      orderItem: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <MainLayout
      title="รายละเอียดออเดอร์"
      description={`ออเดอร์ไอดี ${params.orderId}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="order-2 md:order-1 col-span-8">
          <DataTable columns={columns} data={order.orderItem} />
        </div>
        <div className="order-1 md:order-2 col-span-4 space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="mb-4">ลูกค้า</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
              <Separator />
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`${FILE_URL}/${order.user?.image}`}
                    alt={order.user?.name ?? ""}
                  />
                  <AvatarFallback>
                    {order.user?.name ? order.user.name[0] : ""}
                  </AvatarFallback>
                </Avatar>
                <span>{order.user?.name}</span>
              </div>
              <div>
                <h2>ช่องทางติดต่อ</h2>
                <p className="text-sm text-gray-600">
                  {order.bill?.receipt?.contactNumber}
                </p>
              </div>
              <div>
                <h2>ที่อยู่</h2>
                <p className="text-sm text-gray-600">
                  {order.bill?.receipt?.shippingAddress}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>ยอดรวม</CardTitle>
              <CardDescription className="mb-4">
                รายได้นี้ยังไม่หักค่าธรรมเนียม
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-8">
              ยอดรวมทั้งหมด:{" "}
              <Currency
                value={order.orderItem
                  .map((item) => item.price * item.quantity)
                  .reduce((a, b) => a + b, 0)}
              />
            </CardContent>
            <CardFooter>
              {order.status === OrderStatus.PACKED ||
              order.status === OrderStatus.SHIPPED ? (
                <Button asChild>
                  <Link href={`${order.id}/shipping`}>จัดส่งสินค้า</Link>
                </Button>
              ) : (
                <ShippingOrderButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
