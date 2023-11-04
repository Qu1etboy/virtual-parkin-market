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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import PasswordInput from "@/components/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const signInSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

export default function SignInPage() {
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (searchParams.get("error") === "CredentialsSignin") {
      form.setError("email", { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
      form.setError("password", { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(data: any) {
    setLoading(true);
    await signIn("credentials", {
      ...data,
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <span>Virtual Park In Market</span>
      <h1 className="my-12 text-2xl font-semibold leading-none tracking-tight">
        เข้าสู่ระบบไปยังบัญชีของคุณ
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg"
        >
          <Card className="px-6 sm:mx-0 mx-3">
            <CardContent className="pt-12 grid gap-4">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mb-3" disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                เข้าสู่ระบบ
              </Button>
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
              <div>
                <Button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: searchParams.get("callbackUrl") || "/",
                    })
                  }
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="block mb-6">
              <p className="text-sm">
                ยังไม่มีบัญชี?{" "}
                <Link
                  href="/signup"
                  className="hover:underline text-orange-600"
                >
                  สมัครสมาชิกเลย
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
