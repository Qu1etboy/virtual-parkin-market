"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateStoreSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  description: z.string(),
});

type CreateStore = z.infer<typeof CreateStoreSchema>;

export default function CreateStorePage() {
  const { register, handleSubmit } = useForm<CreateStore>({
    resolver: zodResolver(CreateStoreSchema),
  });

  async function onSubmit(data: CreateStore) {
    console.log(data);
  }

  return (
    <main className="bg-gray-50 flex h-screen items-center justify-center">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>สร้างร้านค้า</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label>ชื่อร้านค้า</Label>
              <Input placeholder="ชื่อร้านค้า" {...register("name")} />
            </div>
            <div>
              <Label>ที่อยู่ร้าน</Label>
              <Input placeholder="ที่อยู่ร้าน" {...register("address")} />
            </div>
            <div>
              <Label>คําอธิบายร้าน</Label>
              <Textarea
                placeholder="คําอธิบายร้าน"
                {...register("description")}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" asChild>
                <Link href="/seller">ย้อนกลับ</Link>
              </Button>
              <Button type="submit">สร้างร้านค้า</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
