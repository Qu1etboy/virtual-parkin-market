"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { OrderStatus } from "@prisma/client";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function ShippingOrderButton() {
  const params = useParams();

  async function onClick() {
    try {
      await axios.put(`/stores/${params.storeId}/orders/${params.orderId}`, {
        status: OrderStatus.PACKED,
      });
      toast.success("แพ็คสินค้าสําเร็จ");
      window.location.href = ``;
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      console.error(error);
    }
  }

  return <Button onClick={onClick}>แพ็คสินค้า</Button>;
}
