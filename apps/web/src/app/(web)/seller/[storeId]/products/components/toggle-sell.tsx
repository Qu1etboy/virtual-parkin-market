"use client";

import { Switch } from "@/components/ui/switch";
import axios from "@/lib/axios";
import React from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export default function ToggleSell({
  productId,
  sell,
}: {
  productId: string;
  sell: boolean;
}) {
  const [sellState, setSellState] = React.useState<boolean>(sell);
  const params = useParams();

  async function onToggle() {
    try {
      await axios.put(`/stores/${params.storeId}/products/${productId}/sell`, {
        sell: !sellState,
      });

      setSellState((prev) => !prev);
      toast.success(
        !sellState ? "เปิดวางจําหน่ายสําเร็จ" : "ปิดวางจําหน่ายสําเร็จ"
      );
    } catch (error) {
      toast.error("บันทึกไม่สำเร็จ");
      setSellState(false);
      console.error(error);
    }
  }

  return <Switch checked={sellState} onClick={onToggle} />;
}
