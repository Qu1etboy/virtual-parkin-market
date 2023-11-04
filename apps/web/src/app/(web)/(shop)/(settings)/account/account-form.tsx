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
import Field from "../components/field";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const accountFormSchema = z.object({
  email: z.string().email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  email: "",
};

const icons: Record<string, React.ReactNode> = {
  google: <Icons.google className="w-[20px] h-[20px]" />,
};

export function AccountForm() {
  const { data: session } = useSession();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
  }

  async function sendVerificationEmail() {
    try {
      await axios.get("/auth/verify-email");
      toast.success("ส่งอีเมลยืนยันเรียบร้อยแล้ว กรุณาตรวจสอบอีเมลของท่าน");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Field
          label="อีเมล"
          defaultValue={
            <div>
              <span>{session?.user.email}</span>
              {session?.user.emailVerified ? (
                <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  ยืนยันแล้ว
                </span>
              ) : null}
            </div>
          }
        />
        <div>
          {!session?.user.emailVerified && (
            <Button type="button" onClick={sendVerificationEmail}>
              ยืนยันอีเมล
            </Button>
          )}
        </div>
        <div className="space-y-3">
          <FormLabel>บัญชีที่เชื่อมต่อ</FormLabel>
          {session?.user.accounts && session?.user.accounts.length > 0 ? (
            <>
              {session?.user.accounts.map((account, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {/* <Icons.google className="w-[20px] h-[20px]" /> */}
                  {icons[account.provider]}
                  <span className="text-sm text-orange-600">
                    บัญชีนี้เชื่อมต่อกับ {account.provider}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              ยังไม่มีบัญชีที่เชื่อมต่อ
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
