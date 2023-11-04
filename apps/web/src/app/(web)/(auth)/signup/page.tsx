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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const signUpSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z
    .string()
    .nonempty("กรุณากรอกรหัสผ่าน")
    .min(8, "รหัสผ่านมีความยาวอย่างน้อย 8 ตัวอักษร"),
  name: z.object({
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [loading, setLoading] = React.useState(false);
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
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormValues) {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/auth/signup", data);
      console.log("register success");
      router.push("/login");
    } catch (error: any) {
      if (error.response.status === 400) {
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          form.setError(key as any, {
            message: value as string,
          });
        }
      } else {
        toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง");
      }
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50">
      <section className="hidden lg:block w-full px-12">
        <h1 className="my-12 text-2xl font-semibold tracking-tight leading-none">
          Virtual Park In Market
        </h1>
        <ul className="space-y-8">
          <li>
            <h2 className="text-xl font-semibold">
              <CheckCircle2 className="fill-orange-500 stroke-white inline-block mr-3" />
              ซื้อสินค้าได้ง่าย ๆ
            </h2>
            <p className="text-gray-600 pl-10">
              เพียงสมัครบัญชีก็สามารถเพลิดเพลินกับสินค้ามากมายได้เลยจากตลาดนัดพาร์คอิน
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold">
              <CheckCircle2 className="fill-orange-500 stroke-white inline-block mr-3" />
              ขายสินค้ากับเรา
            </h2>
            <p className="text-gray-600 pl-10">
              หากคุณเป็นคนขายสินค้าในตลาดนัดพาร์คอิน
              สามารถสร้างร้านค้าของคุณได้ง่าย ๆ
            </p>
          </li>
        </ul>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex justify-center items-center"
        >
          <Card className="mx-3 w-full max-w-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">สร้างบัญชีผู้ใช้</CardTitle>
              <CardDescription>
                กรอกรายละเอียดด้านล่างเพื่อเริ่มต้นใช้งาน
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
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
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
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
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <PasswordInput
                        id="password"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription>
                      รหัสผ่านต้องประกอบไปด้วย 8 ตัวอักษรขึ้นไป
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mb-3" disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                สร้างบัญชี
              </Button>
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
                  disabled={loading}
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="block">
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
