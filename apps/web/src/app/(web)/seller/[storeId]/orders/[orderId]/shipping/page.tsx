import MainLayout from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { BillStatus, OrderStatus } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import ShippingForm from "../components/shipping-form";

export default async function ShippingPage({
  params,
}: {
  params: { storeId: string; orderId: string };
}) {
  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId,
      bill: {
        status: BillStatus.PAID,
      },
      // status: OrderStatus.PACKED,
    },
    include: {
      bill: {
        include: {
          receipt: true,
        },
      },
      user: true,
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <MainLayout
      title="จัดส่งสินค้า"
      description={`ออเดอร์ไอดี ${params.orderId}`}
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลลูกค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">ชื่อ</p>
              <div>{order.user.name}</div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">อีเมลติดต่อ</p>
              <div>{order.bill.receipt?.contactEmail}</div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">เบอร์ติดต่อ</p>
              <div>{order.bill.receipt?.contactNumber}</div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">ที่อยู่จัดส่ง</p>
              <div>{order.bill.receipt?.shippingAddress}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ยืนยันการส่งสินค้า</CardTitle>
            <CardDescription>
              แนบรูปใบเสร็จจากการส่งของเพื่อยืนยันว่าคุณได้ส่งแล้ว
            </CardDescription>
          </CardHeader>
          <CardContent>
            {order.status === OrderStatus.SHIPPED ? (
              <div>สินค้าถูกส่งแล้ว</div>
            ) : (
              <ShippingForm />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
