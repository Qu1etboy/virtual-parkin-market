"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Image from "next/image";
import Dropzone from "@/components/dropzone";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import MainLayout from "@/components/layout/main-layout";

const AddProductSchema = z.object({
  name: z
    .string({
      required_error: "กรุณากรอกชื่อสินค้า",
    })
    .min(3, { message: "ชื่อสินค้าต้องมีอย่างน้อย 3 ตัวอักษรขึ้นไป" })
    .max(255, { message: "ชื่อสินค้าต้องไม่เกิน 255 ตัวอักษร" }),
  price: z
    .number({
      required_error: "กรุณากรอกราคาสินค้า",
    })
    .min(0, { message: "ราคาต้องมีมูลค่ามากกว่า 0" }),
  originalPrice: z
    .number({
      required_error: "กรุณากรอกราคาต้น",
    })
    .min(0, { message: "ราคาต้นต้องมีมูลค่ามากกว่า 0" }),
  stockQuantity: z
    .number({
      required_error: "กรุณากรอกจํานวนสินค้า",
    })
    .min(0, { message: "จำนวนสินค้าต้องมีมูลค่ามากกว่า 0" }),
  description: z
    .string({
      required_error: "กรุณากรอกคําอธิบายสินค้า",
    })
    .min(3, { message: "คําอธิบายสินค้าต้องมีอย่างน้อย 3 ตัวอักษรขึ้นไป" })
    .max(1000, { message: "คำอธิบายสินค้าต้องไม่เกิน 1000 ตัวอักษร" }),
  category: z.number({
    required_error: "กรุณาเลือกประเภทสินค้า",
  }),
});

type AddProduct = z.infer<typeof AddProductSchema>;

const productCategories = [
  { id: 1, name: "อิเล็กทรอนิกส์" },
  { id: 2, name: "เสื้อผ้า" },
  { id: 3, name: "เฟอร์นิเจอร์" },
  { id: 4, name: "ความงาม" },
  { id: 5, name: "หนังสือ" },
  { id: 6, name: "กีฬา" },
  { id: 7, name: "ของเล่น" },
  { id: 8, name: "สุขภาพ" },
  { id: 9, name: "ของชำร่วย" },
  { id: 10, name: "ยานยนต์" },
  { id: 11, name: "สัตว์เลี้ยง" },
  { id: 12, name: "เครื่องประดับ" },
  { id: 13, name: "ศิลปะ" },
  { id: 14, name: "เครื่องมือ" },
  { id: 15, name: "เด็ก" },
];

export default function AddProductPage() {
  const form = useForm<AddProduct>({
    resolver: zodResolver(AddProductSchema),
    mode: "onChange",
  });

  const [productImages, setProductImages] = useState<File[]>([]);

  function onSubmit(data: AddProduct) {
    console.log(data);
  }

  const onDrop = (acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    setProductImages([
      ...productImages,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  };

  const onRemove = (file: File) => {
    const newFiles = productImages.filter((f) => f.name !== file.name);
    setProductImages(newFiles);
  };

  const Previews = ({ files }: { files: File[] }) => (
    <div>
      <p className="text-sm text-gray-600">ไฟล์แนบ</p>
      <div className="flex flex-wrap gap-3 my-2">
        {files.length > 0 ? (
          <>
            {files.map((file: any) => (
              <div key={file.name} className="relative group">
                <Button
                  onClick={() => onRemove(file)}
                  variant="ghost"
                  className="group-hover:block hidden absolute bg-white top-0 right-0 rounded-full"
                >
                  <X className="w-3 h-3" />
                </Button>
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
      productImages.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout
      title="เพิ่มสินค้า"
      description="กรอกรายละเอียดเพื่อเพิ่มสินค้าเข้าร้าน"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          <div className="space-y-8 p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>ชื่อสินค้า</FormLabel>
                  <FormControl>
                    <Input placeholder="ชื่อสินค้า" {...field} />
                  </FormControl>
                  <FormDescription>ไม่เกิน 255 ตัวอักษร</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel asterisk>ประเภทสินค้า</FormLabel>
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
                            ? productCategories.find(
                                (category) => category.id === field.value
                              )?.name
                            : "เลือกประเภทสินค้า"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="ค้นหาประเภทสินค้า" />
                        <CommandEmpty>ไม่พบประเภทสินค้า</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-auto">
                          {productCategories.map((category) => (
                            <CommandItem
                              value={`${category.id}`}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("category", category.id);
                              }}
                              className="cursor-pointer"
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    เลือกประเภทของสินค้าให้ตรงกับสินค้าที่จะขายเพื่อให้ลูกค้าค้นหาสินค้าได้ง่ายขึ้น
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>ราคาต้น</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asterisk>ราคาขาย</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>จํานวนสินค้าในคลัง</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="จํานวนสินค้าในคลัง"
                      {...field}
                    />
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
                  <FormLabel asterisk>คําอธิบายสินค้า</FormLabel>
                  <FormControl>
                    <Textarea placeholder="คําอธิบายสินค้า" {...field} />
                  </FormControl>
                  <FormDescription>ไม่เกิน 1000 ตัวอักษร</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8 p-4">
            <div>
              <FormLabel asterisk>รูปภาพสินค้า</FormLabel>
              <FormDescription>
                ลงรูปภาพที่มีคุณภาพจะช่วยให้ลูกค้าสนใจในสินค้ามากขึ้น
              </FormDescription>
              <Dropzone
                options={{
                  onDrop,
                }}
                preview={<Previews files={productImages} />}
                className="my-3"
              />
            </div>
          </div>

          <div className="col-span-2 p-4">
            <Button>เพิ่มสินค้า</Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
}
