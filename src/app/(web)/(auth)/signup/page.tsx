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

export default function SignUpPage() {
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: {
        firstName: "",
        lastName: "",
      },
    },
  });

  async function onSubmit(data: any) {
    // console.log(data);
    await axios.post("http://localhost:3000/api/auth/signup", data);

    reset();

    router.push("/");
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">สร้างบัญชีผู้ใช้</CardTitle>
            <CardDescription>
              กรอกรายละเอียดด้านล่างเพื่อเริ่มต้นใช้งาน
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline">
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
                  หรือเริ่มต้นด้วย
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">ชื่อจริง</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("name.firstName")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">นามสกุล</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("name.lastName")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ที่อยู่อีเมล</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">สร้างบัญชี</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
