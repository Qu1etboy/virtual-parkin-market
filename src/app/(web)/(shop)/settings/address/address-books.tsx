"use client";

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
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { AddressForm } from "./form";
import { useSession } from "next-auth/react";

export default function AddressBooks() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="space-y-3">
      <h2>รายการที่อยู่</h2>
      {user?.addresses && user?.addresses.length > 0 ? (
        <>
          {user.addresses.map((address) => (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardDescription>
                  {address.address} {address.district} {address.subDistrict}{" "}
                  {address.province} {address.postalCode}
                </CardDescription>
                <div className="space-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">แก้ไข</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>แก้ไขอยู่จัดส่ง</DialogTitle>
                        <DialogDescription>
                          กรุณากรอกข้อมูลที่อยู่สําหรับจัดส่งสินค้าให้ครบถ้วน
                        </DialogDescription>
                      </DialogHeader>
                      <AddressForm />
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">ลบ</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          เมื่อลบแล้วจะไม่สามารถยกเลิกได้
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
              </CardHeader>
            </Card>
          ))}
        </>
      ) : (
        <div>ไม่มีรายการที่อยู่</div>
      )}
    </div>
  );
}
