"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    // console.log(data);

    await signIn("credentials", { ...data, callbackUrl: "/" });
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              เข้าสู่ระบบไปยังบัญชีของคุณ
            </CardTitle>
            <CardDescription>กรอกรายละเอียดเพื่อเข้าสู่ระบบ</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Button variant="outline" className="w-full">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  หรือเข้าสู่ระบบด้วย
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ที่อยู่อีเมล</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>
          </CardContent>
          <CardFooter className="block">
            <Button className="w-full mb-3">เข้าสู่ระบบ</Button>
            <p className="text-sm">
              ยังไม่มีบัญชี?{" "}
              <Link href="/signup" className="hover:underline text-orange-600">
                สมัครสมาชิกเลย
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}