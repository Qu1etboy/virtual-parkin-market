import { stores } from "@/__mock__/stores";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function ApprovedStorePage() {
  return (
    <main>
      <div className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            ร้านค้าที่อนุมัติ
          </h1>
          <p className="text-gray-600">
            ร้านค้าที่ได้รับอนุญาตให้ขายในตลาดพาร์คอิน
          </p>
        </div>

        <div className="my-6 space-y-3">
          {stores.map((store) => (
            <Card key={store.id}>
              <CardHeader>
                <CardTitle>{store.name}</CardTitle>
                <CardDescription>{store.address}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href={`/admin/application/${store.id}`}>ดูใบสมัคร</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
