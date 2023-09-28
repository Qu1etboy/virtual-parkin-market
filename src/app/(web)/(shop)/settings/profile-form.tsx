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
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { customerProfileSchema } from "@/types/main";
import axios from "@/lib/axios";
import { Gender } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
import { ca } from "date-fns/locale";
import { FILE_URL, upload } from "@/services/upload";

type ProfileFormValues = z.infer<typeof customerProfileSchema>;

// const genderSchema = z.nativeEnum(Gender).optional().catch(undefined);

const genderSchema = z
  .object({
    gender: z.nativeEnum(Gender),
  })
  .partial()
  .optional()
  .catch(undefined);

export function ProfileForm() {
  const { data: session } = useSession();
  const user = session?.user;
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(customerProfileSchema),
    defaultValues: {
      name: {
        firstName: "",
        lastName: "",
      },
      phoneNumber: "",
      birthday: null,
      gender: null,
    },
    values: {
      name: {
        firstName: user?.name?.split(" ")[0] ?? "",
        lastName: user?.name?.split(" ")[1] ?? "",
      },
      phoneNumber: user?.customerProfile?.phoneNumber
        ? user?.customerProfile?.phoneNumber
        : "",
      birthday: user?.customerProfile?.birthday,
      gender: user?.customerProfile?.gender,
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    // TODO: add error handling

    let image: string | null | undefined = null;

    // If user upload new image then upload it to server
    if (file) {
      const _file = await upload("image", file);
      image = _file.filename;
    }

    await axios.put("/user/me", { ...data, image });

    toast.success("บันทึกข้อมูลสำเร็จ");
  }

  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full flex items-center gap-3">
          <Avatar className="ml-auto w-20 h-20">
            <AvatarImage
              src={`${FILE_URL}/${session?.user.image}` ?? ""}
              alt={session?.user.name ?? ""}
            />
            <AvatarFallback>
              {session?.user.name ? session?.user.name[0] : null}
            </AvatarFallback>
          </Avatar>

          <div className="w-full">
            <Label htmlFor="avatar">เปลี่ยนรูปโปรไฟล์</Label>
            <Input
              type="file"
              onChange={onUpload}
              placeholder="เปลี่ยนรูปโปรไฟล์"
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="name.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>ชื่อจริง</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>นามสกุล</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
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
          name="birthday"
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
                        format(new Date(field.value), "dd MMMM yyyy")
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
                    selected={field.value as any}
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
              <Select
                onValueChange={field.onChange}
                value={genderSchema.parse(form.watch("gender"))?.gender}
                defaultValue={genderSchema.parse(field.value)?.gender}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเพศ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Gender.MALE}>ชาย</SelectItem>
                  <SelectItem value={Gender.FEMALE}>หญิง</SelectItem>
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
