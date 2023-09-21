import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Overview from "../components/overview";
import { AreaChart, DollarSign, Package, Users2 } from "lucide-react";

const data = [
  {
    title: "รายได้ทั้งหมด",
    content: "999 บาท",
  },
  {
    title: "จํานวนสินค้าที่ขายได้ทั้งหมด",
    content: "999 ชิ้น",
  },
  {
    title: "จํานวนสินค้าคงเหลือ",
    content: "999 ชิ้น",
  },
];

export default function Page() {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            ภาพรวม
          </h1>
          <p className="text-gray-600">ภาพรวมร้านค้าของคุณ</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                รายได้ทั้งหมด
              </CardTitle>
              <DollarSign className="w-4 h-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿45,231.89</div>
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
              <div className="text-2xl font-bold">+2350</div>
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
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% จากเดือนที่แล้ว
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                สินค้าคงเหลือ
              </CardTitle>
              <Package className="w-4 h-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
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
            <Overview />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
