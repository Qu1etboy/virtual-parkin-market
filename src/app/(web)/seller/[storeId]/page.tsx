import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Overview from "../components/overview";

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
          <h1 className="text-4xl font-semibold">ภาพรวม</h1>
          <p>ภาพรวมร้านค้าของคุณ</p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {data.map((d, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  {d.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {d.content}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="mb-3 text-base font-medium">
              ยอดขายเดือนกรกฎาคม 2566
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
