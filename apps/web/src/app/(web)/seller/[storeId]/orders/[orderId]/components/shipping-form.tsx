"use client";

import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "@/components/dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { upload } from "@/services/upload";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ShippingForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const onSubmit = async () => {
    console.log(files);

    if (files.length === 0) {
      setError("กรุณาอัพโหลดไฟล์");
      return;
    }
    try {
      const images = await upload("images[]", files);

      await axios.post(
        `/stores/${params.storeId}/orders/${params.orderId}/delivery`,
        {
          images: images.map((image: any) => image.filename),
        }
      );

      toast.success("ส่งสินค้าสำเร็จ");
      window.location.href = `/seller/${params.storeId}/orders`;
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
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
  }, []);

  return (
    <div>
      <label>
        หลักฐานการส่งสินค้า<span className="text-red-500">*</span>
      </label>
      <p className="text-sm text-muted-foreground">อัพโหลดได้ไม่เกิน 10 รูป</p>
      <Dropzone
        options={{
          onDrop,
          maxFiles: 10,
        }}
        preview={<Previews files={files} />}
        className="my-3"
      />
      <>{error && <p className="text-sm text-red-500">{error}</p>}</>
      <Button onClick={onSubmit} className="mt-4">
        ยืนยันการส่งสินค้า
      </Button>
    </div>
  );
}
