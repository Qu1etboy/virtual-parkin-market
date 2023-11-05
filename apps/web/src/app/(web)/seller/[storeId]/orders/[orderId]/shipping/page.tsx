import MainLayout from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { BillStatus, OrderStatus } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import ShippingForm from "../components/shipping-form";
import { FILE_URL } from "@/services/upload";
import { format } from "date-fns";
import { th } from "date-fns/locale";

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
      delivery: {
        include: {
          deliveryImages: true,
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
              <div>{order.user?.name}</div>
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
            <CardTitle>
              {order.status === OrderStatus.SHIPPED
                ? "หลักฐานการส่งสินค้า"
                : "ยืนยันการส่งสินค้า"}
            </CardTitle>
            <CardDescription>
              {order.status === OrderStatus.SHIPPED
                ? "รายละเอียดการส่งสินค้า"
                : "กรอกหมายเลขพัสดุแลพแนบรูปใบเสร็จเพื่อยืนยันการส่ง"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {order.status === OrderStatus.SHIPPED && order.delivery ? (
              <>
                <div>
                  สินค้าถูกส่งแล้ว เมื่อ{" "}
                  {format(order.delivery.createdAt, "PPP", { locale: th })}
                </div>
                <div className="mt-2">
                  หมายเลขพัสดุ:{" "}
                  <span className="text-orange-600">
                    {order.delivery.trackingNumber}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {order.delivery.deliveryImages.map((image) => (
                    <img
                      key={image.id}
                      src={`${FILE_URL}/${image.image}`}
                      width="200"
                    />
                  ))}
                </div>
              </>
            ) : (
              <ShippingForm />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
