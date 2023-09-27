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
import { X } from "lucide-react";
import { productSchema } from "@/types/main";
import { upload } from "@/services/upload";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import { ProductCategory } from "@prisma/client";

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
  const form = useForm<AddProduct>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: product,
  });

  const [productImages, setProductImages] = useState<File[]>([]);
  const params = useParams();

  async function onSubmit(data: AddProduct) {
    // console.log(data);

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
        });
      }

      window.location.href = `/seller/${params.storeId}/products`;
    } catch (error) {
      console.log(error);
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
          <Button type="submit">
            {params.productId ? "บันทึก" : "เพิ่มสินค้า"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
