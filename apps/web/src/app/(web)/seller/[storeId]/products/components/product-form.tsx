"use client";

import React, { useEffect, useState } from "react";
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
import { CalendarIcon, X } from "lucide-react";
import { productSchema } from "@/types/main";
import { FILE_URL, getFileFromUrl, upload } from "@/services/upload";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import { ProductCategory, ProductImage } from "@prisma/client";
import toast from "react-hot-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/ui/icons";
import { th } from "date-fns/locale";

type AddProduct = z.infer<typeof productSchema>;

const productCategories = [
  { id: 1, name: "อิเล็กทรอนิกส์", value: ProductCategory.Electronics },
  { id: 2, name: "เสื้อผ้า", value: ProductCategory.Apparel },
  { id: 3, name: "เฟอร์นิเจอร์", value: ProductCategory.Furniture },
  { id: 4, name: "ความงาม", value: ProductCategory.Beauty },
  { id: 5, name: "หนังสือ", value: ProductCategory.Books },
  { id: 6, name: "กีฬา", value: ProductCategory.Sports },
  { id: 7, name: "ของเล่น", value: ProductCategory.Toys },
  { id: 8, name: "สุขภาพ", value: ProductCategory.Wellness },
  { id: 9, name: "ของชำร่วย", value: ProductCategory.Groceries },
  { id: 10, name: "ยานยนต์", value: ProductCategory.Automotive },
  { id: 11, name: "สัตว์เลี้ยง", value: ProductCategory.Pets },
  { id: 12, name: "เครื่องประดับ", value: ProductCategory.Jewelry },
  { id: 13, name: "ศิลปะ", value: ProductCategory.Art },
  { id: 14, name: "เครื่องมือ", value: ProductCategory.Tools },
  { id: 15, name: "เด็ก", value: ProductCategory.Baby },
];

type ProductFormProps = {
  product?: AddProduct;
};

export default function ProductForm({ product }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<AddProduct>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: product,
  });

  const [productImages, setProductImages] = useState<File[]>([]);
  const params = useParams();

  async function onSubmit(data: AddProduct) {
    // console.log(data);
    setLoading(true);
    try {
      const result = await upload("images[]", productImages);
      const images = result.map((image: any) => image.filename);

      // console.log(images);
      if (params.productId) {
        await axios.put(
          `/stores/${params.storeId}/products/${params.productId}`,
          {
            ...data,
            images,
          }
        );
      } else {
        await axios.post(`/stores/${params.storeId}/products`, {
          ...data,
          images,
          date: data.date
            ? {
                from: data.date.from
                  ? new Date(format(data.date.from, "yyyy-MM-dd"))
                  : null,
                to: data.date.to
                  ? new Date(format(data.date.to, "yyyy-MM-dd"))
                  : null,
              }
            : null,
        });
      }

      window.location.href = `/seller/${params.storeId}/products`;
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
      setLoading(false);
    }
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

  useEffect(() => {
    form.setValue(
      "images",
      productImages.map((image) => image.name) as [string, ...string[]]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productImages]);

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
    const result: any = [];

    const handle = async () => {
      for (const image of product?.images || []) {
        const file: any = await getFileFromUrl(`${FILE_URL}/${image}`, image);
        result.push(
          Object.assign(file, {
            path: image,
            preview: `${FILE_URL}/${image}`,
          })
        );
      }

      setProductImages(result);
    };

    handle();

    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      productImages.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("productImages = ", productImages);
  }, [productImages]);

  return (
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
                  <Input
                    placeholder="ชื่อสินค้า"
                    {...field}
                    disabled={loading}
                  />
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
                        disabled={loading}
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>ราคาปกติ</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 content-start gap-3">
            <FormField
              control={form.control}
              name="specialPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ราคาพิเศษ</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...(field as any)}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="mt-auto flex flex-col">
                  <FormLabel>ช่วงเวลาโปรโมชั่น</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn("text-center font-normal")}
                          disabled={loading}
                        >
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span className="text-gray-600">
                              เลือกช่วงเวลาโปรโมชั่น
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value as any}
                        onSelect={(date) => {
                          if (!date) {
                            form.setValue("date", null);
                            return;
                          }

                          form.setValue("date", {
                            from: date.from,
                            to: date.to,
                          });
                        }}
                        locale={th}
                        numberOfMonths={2}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    disabled={loading}
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
                  <Textarea
                    placeholder="คําอธิบายสินค้า"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>ไม่เกิน 1000 ตัวอักษร</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-8 p-4">
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 p-4">
          <Button type="submit" disabled={loading}>
            {loading && <Icons.spinner className="animate-spin mr-2" />}
            {params.productId ? "บันทึก" : "เพิ่มสินค้า"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
