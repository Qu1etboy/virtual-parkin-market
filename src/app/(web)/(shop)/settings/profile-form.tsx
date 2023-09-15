"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
// import { toast } from "@/components/ui/toast";

const profileFormSchema = z.object({
  name: z.object({
    first_name: z
      .string()
      .min(2, {
        message: "first name must be at least 2 characters.",
      })
      .max(30, {
        message: "first name must not be longer than 30 characters.",
      }),
    last_name: z
      .string()
      .min(2, {
        message: "last name must be at least 2 characters.",
      })
      .max(30, {
        message: "last name must not be longer than 30 characters.",
      }),
  }),
  phone_number: z
    .string()
    .length(10, { message: "phone number must be only 10 characters." })
    .optional(),
  birth_date: z.date().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  name: {
    first_name: "",
    last_name: "",
  },
  phone_number: "",
  birth_date: undefined,
  gender: undefined,
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name.first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อจริง</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name.last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>นามสกุล</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทรศัพท์</FormLabel>
              <FormControl>
                <Input placeholder="0812345679" {...field} />
              </FormControl>
              <FormDescription>
                เบอร์โทรติดต่อสำหรับการจัดส่งสินค้า
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>วันเกิด</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>เลือกวัน</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>รับสิทธิพิเศษเฉพาะวันเกิด</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เพศ</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเพศ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">ชาย</SelectItem>
                  <SelectItem value="FEMALE">หญุิง</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                สําหรับแนะนําสินค้าที่เหมาะสมกับคุณ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">บันทึก</Button>
      </form>
    </Form>
  );
}
