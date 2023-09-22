import { stores } from "@/__mock__/stores";
import MainLayout from "@/components/layout/main-layout";
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
    <MainLayout
      title="ร้านค้าที่อนุมัติ"
      description="ร้านค้าที่ได้รับอนุญาตให้ขายในตลาดพาร์คอิน"
    >
      <div className="mb-6 space-y-3">
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
    </MainLayout>
  );
}
