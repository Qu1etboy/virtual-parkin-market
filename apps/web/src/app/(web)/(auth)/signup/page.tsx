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
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import PasswordInput from "@/components/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
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

    form.reset();

    router.push("/login");
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-xl"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">สร้างบัญชีผู้ใช้</CardTitle>
              <CardDescription>
                กรอกรายละเอียดด้านล่างเพื่อเริ่มต้นใช้งาน
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: searchParams.get("callbackUrl") || "/",
                    })
                  }
                  variant="outline"
                  type="button"
                  className="w-full"
                >
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
              <FormField
                name="name.firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ</FormLabel>
                    <FormControl>
                      <Input
                        id="firstName"
                        placeholder="John"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="name.lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>นามสกุล</FormLabel>
                    <FormControl>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ที่อยู่อีเมล</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="johndoe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl>
                      <PasswordInput id="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="block">
              <Button className="w-full mb-3">สร้างบัญชี</Button>
              <p className="text-sm">
                มีบัญชีแล้ว?{" "}
                <Link href="/login" className="hover:underline text-orange-600">
                  เข้าสู่ระบบ
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
