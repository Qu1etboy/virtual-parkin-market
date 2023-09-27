"use client";

import Currency from "@/components/currency";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

export default function Summary({ total }: { total: number }) {
  async function onCheckout() {
    const { data } = await axios.post(
      "http://localhost:3000/api/stores/1/checkout",
      {
        productIds: [1, 2],
      }
    );

    window.location.href = data.url;
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">สรุป</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">ยอดรวม</div>
          <Currency value={total} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        // disabled={items.length === 0}
        className="w-full mt-6"
      >
        ชําระเงิน
      </Button>
    </div>
  );
}
