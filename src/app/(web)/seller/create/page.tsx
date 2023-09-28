"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import banks from "@/data/banks.json";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Dropzone from "@/components/dropzone";
import { Step } from "../components/stepper";
import { storeSchema } from "@/types/main";
import { upload } from "@/services/upload";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

type CreateStore = z.infer<typeof storeSchema>;

export default function CreateStorePage() {
  const form = useForm<CreateStore>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      ownerIdCard: "",
      ownerIdCardPhoto: "",
      bankAccount: "",
      bankName: "",
      bankProvider: "",
      bookBankPhoto: "",
    },
  });

  const [idCardfiles, setIdCardfiles] = useState<File[]>([]);
  const [bookBankFiles, setBookBankFiles] = useState<File[]>([]);

  // const router = useRouter();

  async function onSubmit(data: CreateStore) {
    // TODO: Upload files
    let error = false;

    if (idCardfiles.length > 0) {
      const idCardUpload = await upload("image", idCardfiles[0]);
      data.ownerIdCardPhoto = idCardUpload.filename;
    }

    if (bookBankFiles.length > 0) {
      const bookBankUpload = await upload("image", bookBankFiles[0]);
      data.bookBankPhoto = bookBankUpload.filename;
    }

    if (data.ownerIdCardPhoto === "") {
      form.setError("ownerIdCardPhoto", {
        message: "กรุณาอัพโหลดรูปบัตรประชาชน",
      });
      error = true;
    }

    if (data.bookBankPhoto === "") {
      form.setError("bookBankPhoto", {
        message: "กรุณาอัพโหลดรูปสมุดเงินฝาก",
      });
      error = true;
    }

    if (error) {
      return;
    }

    // Submit form with file urls returned from upload

    console.log(data);

    try {
      await axios.post("stores", data);
      window.location.href = "/seller";
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          form.setError(key as any, {
            message: value as string,
          });
        }
      } else {
        toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง");
      }
    }
  }

  const onDropIdCard = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    setIdCardfiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const onDropBookBank = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    setBookBankFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const Previews = ({ files }: { files: File[] }) => (
    <div>
      <p className="text-sm text-gray-600">ไฟล์แนบ</p>
      <div className="flex flex-wrap gap-3 my-2">
        {files.length > 0 ? (
          <>
            {files.map((file: any) => (
              <div key={file.name}>
                <Image
                  src={file.preview}
                  alt={file.name}
                  // Revoke data uri after image is loaded
                  width={100}
                  height={100}
                  className="rounded-lg"
                  // onLoad={() => {
                  //   URL.revokeObjectURL(file.preview);
                  // }}
                />
              </div>
            ))}
          </>
        ) : (
          <span className="text-xs text-gray-600">ไม่มีไฟล์</span>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      idCardfiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
      bookBankFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <main className="bg-gray-50 py-16">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl mb-12">
        สมัครขายสินค้ากับตลาดพาร์คอิน
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <Step
            number={1}
            title="ข้อมูลร้านค้า"
            description="กรอกรายละเอียดเพื่ออธิบายร้านค้าของคุณ"
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>ชื่อร้าน</FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อร้านค้า" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>รายละเอียดร้านค้า</FormLabel>
                    <FormControl>
                      <Textarea placeholder="รายละเอียดร้านค้า" {...field} />
                    </FormControl>
                    <FormDescription>
                      แนะนําสินค้าของคุณให้ผู้ซื้อเห็นว่าคุณมีสินค้าที่น่าสนใจ
                      ซึ่งจะช่วยให้ผู้ซื้อตัดสินใจซื้อได้ง่ายขึ้น
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Step>

          <Step
            number={2}
            title="ตําแหน่งของร้าน"
            description="หมายถึงตําแหน่งที่ขายในตลาดพารค์อิน"
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>หมายเลขล็อต</FormLabel>
                    <FormControl>
                      <Input placeholder="A-01" {...field} />
                    </FormControl>
                    <FormDescription>
                      หมายถึงตําแหน่งที่ขายในตลาดพารค์อิน
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Step>

          <Step
            number={3}
            title="รายละเอียดคนขาย"
            description="ยืนยันตัวตนของคุณด้วยบัตรประชาชน
                  เพื่อให้เรามั่นใจว่าคุณเป็นคนขายจริง"
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="ownerIdCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>เลขบัตรประชาชน</FormLabel>
                    <FormControl>
                      <Input placeholder="เลขบัตรประชาชน" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel asterisk>ภาพถ่ายบัตรประชาชน</FormLabel>
                <FormDescription>
                  สําหรับใช้ยืนยันว่าคุณมีตัวตนจริง
                </FormDescription>
                <Dropzone
                  options={{
                    onDrop: onDropIdCard,
                    maxFiles: 1,
                  }}
                  preview={<Previews files={idCardfiles} />}
                  className="my-3"
                />
              </div>
            </div>
          </Step>

          <Step
            number={4}
            title="บัญชีธนาคาร"
            description="สําหรับรับเงินจากการขายสินค้า"
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="bankProvider"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel asterisk>ธนาคาร</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? Object.keys(banks.th).find(
                                  (bank) => bank === field.value
                                )
                              : "เลือกธนาคาร"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="ค้นหาธนาคาร" />
                          <CommandEmpty>ไม่พบธนาคาร</CommandEmpty>
                          <CommandGroup className="max-h-[200px] overflow-auto">
                            {Object.keys(banks.th).map((bank) => (
                              <CommandItem
                                value={bank}
                                key={bank}
                                onSelect={() => {
                                  form.setValue("bankProvider", bank);
                                }}
                                className="cursor-pointer"
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    bank === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div
                                  className="p-2 rounded-lg mr-3"
                                  style={{
                                    backgroundColor: (banks.th as any)[bank]
                                      .color,
                                  }}
                                >
                                  <Image
                                    src={`/th/${bank}.svg`}
                                    alt={bank}
                                    width="20"
                                    height="20"
                                  />
                                </div>
                                {(banks.th as any)[bank].nice_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      เลือกธนาคารของคุณเพื่อใช้รับเงิน
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>ชื่อบัญชีธนาคาร</FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อบัญชีธนาคาร" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>เลขบัญชีธนาคาร</FormLabel>
                    <FormControl>
                      <Input placeholder="เลขบัญชีธนาคาร" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel asterisk>ภาพถ่ายสมุดเงินฝาก</FormLabel>
                <FormDescription>
                  สําหรับใช้ยืนยันว่าบัญชีนี้เป็นของคุณ
                </FormDescription>
                <Dropzone
                  options={{
                    onDrop: onDropBookBank,
                    maxFiles: 1,
                  }}
                  preview={<Previews files={bookBankFiles} />}
                  className="my-3"
                />
              </div>
            </div>
          </Step>

          <section className="w-full max-w-3xl mx-auto">
            <Button type="submit">สมัครร้านค้า</Button>
          </section>
        </form>
      </Form>
    </main>
  );
}
