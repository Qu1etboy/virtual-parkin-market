"use client";

import React from "react";
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
import axios from "@/lib/axios";
import { StoreStatus } from "@prisma/client";
import toast from "react-hot-toast";

export default function ApproveRejectButtons({ storeId }: { storeId: string }) {
  async function onApprove() {
    console.log("approve");
    try {
      await axios.put(`/stores/${storeId}/status`, {
        status: StoreStatus.APPROVED,
      });

      window.location.reload();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      console.error(error);
    }
  }

  async function onReject() {
    console.log("reject");
    try {
      await axios.put(`/stores/${storeId}/status`, {
        status: StoreStatus.REJECTED,
      });

      window.location.reload();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      console.error(error);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">อนุมัติ</Button>
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
            <AlertDialogAction onClick={onApprove}>ตกลง</AlertDialogAction>
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
            <AlertDialogAction onClick={onReject}>ตกลง</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
