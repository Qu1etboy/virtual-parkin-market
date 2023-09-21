import { orderItems } from "@/__mock__/orders";
import { DataTable } from "@/components/data-table/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import React from "react";
import Currency from "@/components/currency";

export default function OrderItemPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            รายละเอียดออเดอร์
          </h1>
          <p className="text-gray-600">ออเดอร์ไอดี {params.orderId}</p>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="order-2 md:order-1 col-span-8">
              <DataTable columns={columns} data={orderItems} />
            </div>
            <div className="order-1 md:order-2 col-span-4 space-y-4">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="mb-4">ลูกค้า</CardTitle>
                  {/* <CardDescription>Card Description</CardDescription> */}
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={""} alt={""} />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <span>Test</span>
                  </div>
                  <div>
                    <h2>ช่องทางติดต่อ</h2>
                    <p className="text-sm text-gray-600">081-234-5678</p>
                  </div>
                  <div>
                    <h2>ที่อยู่</h2>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Autem eveniet neque commodi quam officia blanditiis
                      nesciunt esse laboriosam ipsum,
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>ยอดรวม</CardTitle>
                  <CardDescription className="mb-4">
                    รายได้นี้ยังไม่หักค่าธรรมเนียม
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-8">
                  ยอดรวมทั้งหมด: <Currency value={1000} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
