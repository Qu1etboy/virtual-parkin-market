// import { requestStores } from "@/__mock__/stores";
import MainLayout from "@/components/layout/main-layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { Store, StoreStatus } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default async function AdminPage() {
  const requestStores = await prisma.store.findMany({
    where: {
      status: StoreStatus.PENDING,
    },
  });

  return (
    <MainLayout
      title="คําขอการสมัครร้านค้า"
      description="ตรวจสอบและคัดเลือกร้านที่จะขายในเว็บไซต์"
    >
      <div className="mb-6">
        {requestStores.length > 0 ? (
          <div className="space-y-3">
            {requestStores.map((store) => (
              <Card key={store.id}>
                <CardHeader>
                  <CardTitle>{store.name}</CardTitle>
                  <CardDescription>{store.address}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" asChild>
                      <Link href={`/admin/application/${store.id}`}>
                        ดูใบสมัคร
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          อนุมัติ
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
                          <AlertDialogDescription>
                            เมื่อกดอนุมัติไปแล้วจะไม่สามารถยกเลิกได้
                            กรุณาตรวจสอบให้ดีก่อนกดตกลง
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                          <AlertDialogAction>ตกลง</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">ปฎิเสธ</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
                          <AlertDialogDescription>
                            เมื่อกดปฎิเสธไปแล้วจะไม่สามารถยกเลิกได้
                            กรุณาตรวจสอบให้ดีก่อนกดตกลง
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                          <AlertDialogAction>ตกลง</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">ไม่มีคําขอ ณ เวลานี้</div>
        )}
      </div>
    </MainLayout>
  );
}
