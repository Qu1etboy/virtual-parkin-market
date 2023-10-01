import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <div className="w-full text-center text-sm bg-gray-100 p-1">
      📣 มาร่วมขายสินค้าที่ตลาดนัด Park In{" "}
      <Link href="/seller/create" className="text-orange-600 hover:underline">
        สมัครเลย <ArrowRight className="h-5 w-5 inline-block" />
      </Link>
    </div>
  );
}
