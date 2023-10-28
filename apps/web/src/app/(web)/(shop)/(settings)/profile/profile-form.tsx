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
import { useRef, useState } from "react";
import { ca } from "date-fns/locale";
import { FILE_URL, upload } from "@/services/upload";
import Field from "../components/field";

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
  // const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      image: null,
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
      image: user?.image,
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      await axios.put("/user/me", { ...data });

      toast.success("บันทึกข้อมูลสำเร็จ");
    } catch (error) {
      toast.error("บันทึกข้อมูลไม่สำเร็จ");
      console.error(error);
    }
  }

  const onChangeAvatar = () => {
    console.log("clicked");
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      let image: string | null | undefined = null;

      // If user upload new image then upload it to server
      if (file) {
        const _file = await upload("image", file);
        image = _file.filename;
      }

      await axios.put("/user/me", { ...form.getValues(), image });
      form.setValue("image", image);
      toast.success("อัพโหลดรูปภาพสำเร็จ");
    } catch (error) {
      toast.error("อัพโหลดรูปภาพไม่สำเร็จ");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <div className="w-full flex items-center gap-3">
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
        </div> */}
        <Field
          label={
            <Avatar className="w-20 h-20">
              <AvatarImage src={`${FILE_URL}/${form.watch("image")}`} />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          }
          defaultValue={
            <>
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={onChangeAvatar}
              >
                เปลี่ยนรูปโปรไฟล์
              </button>
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={onFileChange}
                accept="image/*" // Accept only image files
              />
            </>
          }
        />
        <Field
          label="ชื่อจริง"
          editable
          defaultValue={form.watch("name.firstName")}
          form={
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
          }
        />
        <Field
          label="นามสกุล"
          editable
          defaultValue={form.watch("name.lastName")}
          form={
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
          }
        />
        <Field
          label="เบอร์โทรศัพท์"
          editable
          defaultValue={form.watch("phoneNumber")}
          form={
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
          }
        />
        <Field
          label="วันเกิด"
          editable
          defaultValue={form.watch("birthday")}
          form={
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
          }
        />
        <Field
          label="เพศ"
          editable
          defaultValue={form.watch("gender")}
          form={
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
          }
        />
      </form>
    </Form>
  );
}
