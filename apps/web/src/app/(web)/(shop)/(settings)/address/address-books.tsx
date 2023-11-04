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
import toast from "react-hot-toast";
import axios from "@/lib/axios";
import { Address } from "@prisma/client";

export default function AddressBooks({
  addresses,
  onDeleteAddress,
  onUpdateAddress,
  onAddAddress,
}: {
  addresses: Address[] | null | undefined;
  onDeleteAddress: (addressId: string) => void;
  onUpdateAddress: (address: Address) => void;
  onAddAddress: (address: Address) => void;
}) {
  async function handleDeleteAddress(addressId: string) {
    try {
      await axios.delete(`/user/me/address/${addressId}`);
      onDeleteAddress(addressId);
      toast.success("ลบที่อยู่สำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการลบที่อยู่ กรุณาลองใหม่อีกครั้ง");
      console.error(error);
    }
  }

  return (
    <div className="space-y-3">
      <h2>รายการที่อยู่</h2>
      {addresses && addresses.length > 0 ? (
        <>
          {addresses.map((address) => (
            <Card key={address.id}>
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
                      <AddressForm
                        onAddAddress={onAddAddress}
                        onUpdateAddress={onUpdateAddress}
                        addressId={address.id}
                        defaultValues={{
                          address: address.address,
                          district: {
                            districtId: address.districtId,
                            districtName: address.district,
                          },
                          subDistrict: {
                            subDistrictId: address.subDistrictId || 0,
                            subDistrictName: address.subDistrict || "",
                          },
                          province: {
                            provinceId: address.provinceId,
                            provinceName: address.province,
                          },
                          postalCode: {
                            zipcode: address.postalCode,
                            zipcodeId: address.postalCodeId,
                          },
                        }}
                      />
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
                        <AlertDialogAction
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          ตกลง
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
            </Card>
          ))}
        </>
      ) : (
        <div className="text-sm">ไม่มีรายการที่อยู่</div>
      )}
    </div>
  );
}
