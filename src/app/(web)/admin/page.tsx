import { requestStores } from "@/__mock__/stores";
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
import Link from "next/link";
import React from "react";

export default function AdminPage() {
  return (
    <main>
      <div className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            คําขอการสมัครร้านค้า
          </h1>
          <p className="text-gray-600">
            ตรวจสอบและคัดเลือกร้านที่จะขายในเว็บไซต์
          </p>
        </div>

        <div className="my-6">
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
                            <AlertDialogTitle>
                              คุณแน่ใจหรือไม่?
                            </AlertDialogTitle>
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
                            <AlertDialogTitle>
                              คุณแน่ใจหรือไม่?
                            </AlertDialogTitle>
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
      </div>
    </main>
  );
}
