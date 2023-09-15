"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";

const accountFormSchema = z.object({
  email: z.string().email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  email: "",
};

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input placeholder="me@example.com" {...field} />
              </FormControl>
              <FormDescription>
                อีเมลสําหรับรับข้อมูลการสั่งซื้อ และการติดต่อจากทางร้านค้า
              </FormDescription>
              <FormMessage />
              <div>
                <Button asChild>
                  <Link href="#">ยืนยันอีเมล</Link>
                </Button>
              </div>
            </FormItem>
          )}
        />

        <div>
          <FormLabel>บัญชีที่เชื่อมต่อ</FormLabel>
          <ul className="mt-3">
            <li className="flex items-center gap-3">
              <Icons.google width="20" height="20" />
              <Link
                href="#"
                className="text-sm text-orange-600 hover:text-orange-800"
              >
                เชื่อมต่อกับ Google
              </Link>
            </li>
          </ul>
        </div>

        <Button type="submit">บันทึก</Button>
      </form>
    </Form>
  );
}
