"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FILE_URL } from "@/services/upload";
import {
  Delivery,
  DeliveryImage,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Store,
} from "@prisma/client";
import React from "react";

type OrderDetailProps = {
  order: Order & {
    delivery:
      | (Delivery & {
          deliveryImages: DeliveryImage[];
        })
      | null;
    store: Store;
    orderItem: OrderItem & {
      product: Product;
    };
  };
};

const title = {
  PENDING: "กําลังดำเนินการ",
  PACKED: "ร้านค้าได้รับคำสั่งซื้อแล้ว รอการจัดส่ง",
  SHIPPED: "สินค้าของคุณถูกจัดส่งแล้ว รอรับสินค้าได้ใน 2 - 3 วัน",
  DELIVERED: "คุณได้รับสินค้าแล้ว 🎉",
  CANCELLED: "คำสั่งซื้อถูกยกเลิก",
};

export default function OrderDetail({ order }: OrderDetailProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button onClick={() => console.log(order.delivery)}>
          รายละเอียดการคําสั่งซื้อ
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title[order.status]}</DialogTitle>
          {order.delivery ? (
            <div>
              <h2 className="mt-6">หลักฐานการจัดส่งสินค้า</h2>
              <div className="flex gap-2">
                {order.delivery?.deliveryImages.map((image) => (
                  <img
                    key={image.id}
                    src={`${FILE_URL}/${image.image}`}
                    width="200"
                  />
                ))}
              </div>
            </div>
          ) : null}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
