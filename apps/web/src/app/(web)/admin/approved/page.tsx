import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { StoreStatus } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default async function ApprovedStorePage() {
  const stores = await prisma.store.findMany({
    where: {
      status: StoreStatus.APPROVED,
    },
  });
  return (
    <MainLayout
      title="ร้านค้าที่อนุมัติ"
      description="ร้านค้าที่ได้รับอนุญาตให้ขายในตลาดพาร์คอิน"
    >
      {stores.length > 0 ? (
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
      ) : (
        <div className="text-center mt-12">ไม่มีร้านค้าที่ได้รับอนุมัติ</div>
      )}
    </MainLayout>
  );
}
