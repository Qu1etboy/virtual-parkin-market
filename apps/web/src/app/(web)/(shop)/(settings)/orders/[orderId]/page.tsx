import Currency from "@/components/currency";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/lib/prisma";
import { cn, getTotalPrice } from "@/lib/utils";
import { FILE_URL } from "@/services/upload";
import { OrderStatus } from "@prisma/client";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Dot } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      delivery: {
        include: {
          deliveryImages: true,
        },
      },
      store: true,
      orderItem: {
        include: {
          product: true,
        },
      },
      bill: {
        include: {
          receipt: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const title: any = {
    PENDING: "กําลังดำเนินการ",
    PACKED: "ร้านค้าได้รับคำสั่งซื้อแล้ว รอการจัดส่ง",
    SHIPPED: "สินค้าของคุณถูกจัดส่งแล้ว รอรับสินค้าได้ใน 2 - 3 วัน",
    DELIVERED: "คุณได้รับสินค้าแล้ว 🎉",
    CANCELLED: "คำสั่งซื้อถูกยกเลิก",
  };

  const status: any = {
    PAID: "ชำระเงินแล้ว",
    PENDING: "กําลังดำเนินการ",
    PACKED: "ได้รับคำสั่งซื้อแล้ว",
    SHIPPED: "กําลังจัดส่งไปที่บ้าน",
    DELIVERED: "ได้รับสินค้าแล้ว",
  };

  const progress: any = {
    PAID: 10,
    PENDING: 30,
    PACKED: 50,
    SHIPPED: 70,
    DELIVERED: 100,
  };

  return (
    <main>
      <div>
        <h3 className="text-lg font-medium">สรุปคําสั่งซื้อ</h3>
        <p className="text-sm text-muted-foreground">
          ไอดีคำสั่งซื้อ: {order.id}
        </p>
        <p className="text-sm text-muted-foreground">
          สั่งซื้อเมื่อ: {format(order.createdAt, "PPP", { locale: th })}
        </p>
      </div>
      <Link
        href={`/shop/${order.store.id}`}
        className="mt-6 flex items-center gap-2"
      >
        <Avatar>
          <AvatarImage
            src={`${FILE_URL}/${order.store.profileImage}`}
            alt=""
          ></AvatarImage>
          <AvatarFallback>{order.store.name[0]}</AvatarFallback>
        </Avatar>
        <span>{order.store.name}</span>
      </Link>
      <div className="mt-6">
        <p>{title[order.status]}</p>
        <div className="mt-3">
          <Progress className="h-2" value={progress[order.status]} />
          <ul className="w-full flex mt-2">
            {Object.keys(status).map((key) => (
              <li
                key={key}
                className={cn(
                  key === order.status ? "text-black" : "text-muted-foreground",
                  "text-sm w-[20%] text-center first:text-left last:text-right"
                )}
              >
                {status[key]}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-sm mt-6">
        จัดส่งไปที่ {order.bill.receipt?.shippingAddress}
      </div>
      <div className="mt-6">
        <h3>รายการคําสั่งซื้อ</h3>
        <ol className="list-decimal mt-1 ml-4">
          {order.orderItem.map((orderItem) => (
            <li key={orderItem.id} className="text-sm">
              <Link
                href={`/products/${orderItem.product.slug}`}
                className="w-full flex justify-between group"
              >
                <span className="group-hover:text-orange-600 group-hover:underline">
                  {orderItem.product.name}
                </span>
                <span className="flex items-center gap-1">
                  <Currency value={orderItem.price} />
                  <Dot className="h-4 w-4" />
                  {orderItem.quantity} ชิ้น
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-3 flex justify-end items-center gap-2 text-sm">
          ยอดรวม <Currency value={getTotalPrice(order.orderItem)} />
        </p>
      </div>
      {order.delivery ? (
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger>หลักฐานการจัดส่งสินค้า</AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-2">
                {order.delivery?.deliveryImages.map((image) => (
                  <img
                    key={image.id}
                    src={`${FILE_URL}/${image.image}`}
                    width="200"
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </main>
  );
}
