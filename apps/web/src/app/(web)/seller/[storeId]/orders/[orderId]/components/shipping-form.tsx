"use client";

import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "@/components/dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { upload } from "@/services/upload";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";

const shippingSchema = z.object({
  trackingNumber: z.string().length(13, "กรุณากรอกหมายเลขพัสดุ 13 หลัก"),
  // images: z.string().array().min(1, "กรุณาอัพโหลดไฟล์"),
  images: z
    .array(z.string({ required_error: "กรุณาอัพโหลดหลักฐานการส่ง" }))
    .min(1, "กรุณาอัพโหลดหลักฐานการส่ง")
    .max(10, "อัพโหลดได้ไม่เกิน 10 รูป"),
});

type TShippingForm = z.infer<typeof shippingSchema>;

export default function ShippingForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const form = useForm({
    defaultValues: {
      trackingNumber: "",
      images: [],
    },
    resolver: zodResolver(shippingSchema),
  });

  const onSubmit = async (data: TShippingForm) => {
    console.log(files);
    setLoading(true);
    if (files.length === 0) {
      setError("กรุณาอัพโหลดไฟล์");
      setLoading(false);
      return;
    }
    try {
      const images = await upload("images[]", files);

      await axios.post(
        `/stores/${params.storeId}/orders/${params.orderId}/delivery`,
        {
          images: images.map((image: any) => image.filename),
          trackingNumber: data.trackingNumber,
        }
      );

      toast.success("ส่งสินค้าสำเร็จ");
      window.location.href = `/seller/${params.storeId}/orders`;
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      setLoading(false);
      console.error(error);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    setFiles(
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
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setValue("images", files.map((file) => file.name) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="trackingNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  หมายเลขพัสดุ<span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  ขณะนี้รองรับเฉพาะไปรษณีย์ไทยเท่านั้น
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="เช่น EF582568151TH"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  หลักฐานการส่งสินค้า<span className="text-red-500">*</span>
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  อัพโหลดได้ไม่เกิน 10 รูป
                </p>
                <Dropzone
                  options={{
                    onDrop,
                    maxFiles: 10,
                  }}
                  preview={<Previews files={files} />}
                  className="my-3"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <>{error && <p className="text-sm text-red-500">{error}</p>}</>
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading && <Icons.spinner className="animate-spin mr-2" />}
            ยืนยันการส่งสินค้า
          </Button>
        </form>
      </Form>
    </section>
  );
}
