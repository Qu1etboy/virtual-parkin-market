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

const accountFormSchema = z.object({
  email: z.string().email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  email: "",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Field
          label="อีเมล"
          defaultValue={
            <div>
              <span>{session?.user.email}</span>
              {session?.user.emailVerified ? (
                <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  ยืนยันแล้ว
                </span>
              ) : null}
            </div>
          }
        />
        <div>
          {!session?.user.emailVerified && (
            <Button
              type="button"
              // onClick={sendVerificationEmail}
            >
              ยืนยันอีเมล
            </Button>
          )}
        </div>
        <div>
          <FormLabel>บัญชีที่เชื่อมต่อ</FormLabel>
          <ul className="mt-3">
            <li className="flex items-center gap-3">
              <Icons.google className="w-[20px] h-[20px]" />
              <Link
                href="#"
                className="text-sm text-orange-600 hover:text-orange-800"
              >
                เชื่อมต่อกับ Google
              </Link>
            </li>
          </ul>
        </div>

        {/* <Button type="submit">บันทึก</Button> */}
      </form>
    </Form>
  );
}
