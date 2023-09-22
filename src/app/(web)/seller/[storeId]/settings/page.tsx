"use client";

import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditStoreSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  description: z.string(),
  // password: z.string().min(1),
});

type Store = z.infer<typeof EditStoreSchema>;

export default function SellerSettingsPage() {
  const { register, handleSubmit } = useForm<Store>({
    defaultValues: {
      name: "",
      address: "",
      description: "",
    },
    resolver: zodResolver(EditStoreSchema),
  });

  async function onSubmit(data: Store) {
    console.log(data);
  }

  return (
    <MainLayout
      title="ตั้งค่าร้านค้าของคุณ"
      description="ตั้งค่าและปรับแต่งร้านค้าของคุณ"
    >
      <div className="relative h-auto">
        <div className="group relative max-h-[400px] w-full cursor-pointer overflow-hidden rounded-t-xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- `alt` is inherited from `props`, which is being enforced with TypeScript */}
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            width="100%"
            alt="Shop cover"
          />
          <div className="absolute inset-0 hidden items-center justify-center rounded-t-xl bg-black/50 text-lg text-white duration-300 group-hover:flex">
            คลิ๊กเพื่ออัพโหลดรูปใหม่
          </div>
        </div>
        <div className="group relative bottom-[120px] left-5 h-[200px] w-[200px] cursor-pointer overflow-hidden rounded-full md:absolute md:bottom-[-120px] md:left-20">
          {/* eslint-disable-next-line @next/next/no-img-element -- `alt` is inherited from `props`, which is being enforced with TypeScript */}
          <img
            src="https://images.unsplash.com/photo-1520923179278-ee25e25e09e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            alt="Shop logo"
          />
          <div className="absolute inset-0 hidden items-center justify-center rounded-t-xl bg-black/50 text-lg text-white duration-300 group-hover:flex">
            คลิ๊กเพื่ออัพโหลดรูปใหม่
          </div>
        </div>
      </div>
      <div className="relative top-[-120px] md:static">
        <div className="ml-0 py-6 md:ml-[325px]">
          <h2 className="mb-3 text-4xl font-bold">YOO</h2>
          <p className="max-w-[96ch]">T Shirt</p>
          <p className="mt-3">
            <MapPin className="mr-2 inline-block" />
            Thailand
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="mx-auto w-full max-w-6xl"
        >
          <h2 className="mb-6 text-3xl font-semibold">แก้ไขร้านค้า</h2>
          <div className="mt-3">
            <Label>ชื่อร้านค้าใหม่</Label>
            <Input placeholder="ชื่อร้านค้าใหม่" {...register("name")} />
          </div>
          <div className="mt-3">
            <Label>ที่อยู่ร้านค้าใหม่</Label>
            <Input placeholder="ที่อยู่ร้านค้าใหม่" {...register("address")} />
          </div>
          <div className="mt-3">
            <Label>รายละเอียดร้านค้าใหม่</Label>
            <Textarea
              placeholder="รายละเอียดร้านค้าใหม่"
              {...register("description")}
            />
          </div>
          {/* <div className="mt-3">
            <Label>ยืนยันรหัสผ่าน</Label>
            <Input placeholder="ยืนยันรหัสผ่าน" {...register('password')} />
          </div> */}
          <Button type="submit" className="mt-12 w-full">
            บันทึกการแก้ไข
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}
