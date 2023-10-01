"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios";
import { FILE_URL, upload } from "@/services/upload";
import { Store } from "@prisma/client";
import { MapPin, PenSquare } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function StoreSettingsForm({
  initialStore,
}: {
  initialStore: Store;
}) {
  const [store, setStore] = React.useState<Store>(initialStore);
  const [editName, setEditName] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState(false);

  const nameForm = useForm({
    defaultValues: {
      name: store.name,
    },
  });

  const descriptionForm = useForm({
    defaultValues: {
      description: store.description,
    },
  });

  const bannerImage = `${FILE_URL}/${store.bannerImage}`;
  const profileImage = `${FILE_URL}/${store.profileImage}`;

  function selectFile(callback: (file: File) => void) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        callback(file);
      }
    };
    input.click();
  }

  async function onSubmitName(data: { name: string }) {
    await axios.put(`/stores/${store.id}`, {
      name: data.name,
    });
    setStore((prev) => ({ ...prev, name: data.name }));
    setEditName(false);
    toast.success("บันทึกชื่อร้านค้าสำเร็จ");
  }

  async function onSubmitDescription(data: { description: string }) {
    await axios.put(`/stores/${store.id}`, {
      description: data.description,
    });
    setStore((prev) => ({ ...prev, description: data.description }));
    setEditDescription(false);
    toast.success("บันทึกคำอธิบายร้านค้าสำเร็จ");
  }

  function onBannerChange() {
    selectFile(async (file) => {
      const bannerImage = await upload("image", file);

      const { data } = await axios.put(`/stores/${store.id}`, {
        bannerImage: bannerImage.filename,
      });
      setStore(data);
      toast.success("อัพโหลดรูปปกสำเร็จ");
    });
  }

  function onProfileChange() {
    selectFile(async (file) => {
      const profileImage = await upload("image", file);

      const { data } = await axios.put(`/stores/${store.id}`, {
        profileImage: profileImage.filename,
      });

      setStore(data);
      toast.success("อัพโหลดรูปโปรไฟล์สำเร็จ");
    });
  }

  return (
    <>
      <div className="relative h-auto">
        <div
          onClick={onBannerChange}
          className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-t-xl bg-slate-400"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- `alt` is inherited from `props`, which is being enforced with TypeScript */}
          <img
            src={bannerImage}
            width="100%"
            alt="Shop cover"
            className="w-full h-[400px] object-center object-cover"
            // Display default image if image is not found
            onError={({ currentTarget }) => {
              console.log("Shop logo not found");
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center rounded-t-xl bg-black/50 text-lg text-white duration-300 group-hover:flex">
            คลิ๊กเพื่ออัพโหลดรูปใหม่
          </div>
        </div>
        <div
          onClick={onProfileChange}
          className="group relative bottom-[120px] left-5 h-[200px] w-[200px] cursor-pointer overflow-hidden rounded-full border md:absolute md:bottom-[-120px] md:left-20 bg-slate-200"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- `alt` is inherited from `props`, which is being enforced with TypeScript */}
          <img
            src={profileImage}
            alt="Shop logo"
            // Display default image if image is not found
            onError={({ currentTarget }) => {
              console.log("Shop logo not found");
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center rounded-t-xl bg-black/50 text-lg text-white duration-300 group-hover:flex">
            คลิ๊กเพื่ออัพโหลดรูปใหม่
          </div>
        </div>
      </div>
      <div className="relative top-[-120px] md:static">
        <div className="ml-0 py-6 md:ml-[325px]">
          {editName ? (
            <Form {...nameForm}>
              <form
                className="flex gap-3"
                onSubmit={nameForm.handleSubmit(onSubmitName)}
              >
                <FormField
                  name="name"
                  control={nameForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="ชื่อร้านค้า"
                          className="max-w-xl"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setEditName(false)}
                >
                  ยกเลิก
                </Button>
                <Button type="submit">บันทึก</Button>
              </form>
            </Form>
          ) : (
            <h2 className="mb-3 text-4xl font-bold">
              {store.name}{" "}
              <button onClick={() => setEditName(true)}>
                <PenSquare />
              </button>
            </h2>
          )}
          <p className="mt-3">
            <MapPin className="mr-2 inline-block" />
            {store.address}
          </p>
        </div>
        <section className="container mx-auto mt-12 px-6 md:px-20 mb-12 space-y-8">
          {editDescription ? (
            <Form {...descriptionForm}>
              <h2 className="font-semibold text-xl sm:text-2xl">
                เกี่ยวกับร้านค้า
              </h2>
              <form
                onSubmit={descriptionForm.handleSubmit(onSubmitDescription)}
              >
                <FormField
                  name="description"
                  control={descriptionForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="คำอธิบายร้านค้า"
                          className="mb-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mr-3"
                  onClick={() => setEditDescription(false)}
                >
                  ยกเลิก
                </Button>
                <Button type="submit">บันทึก</Button>
              </form>
            </Form>
          ) : (
            <>
              <h2 className="font-semibold text-xl sm:text-2xl">
                เกี่ยวกับร้านค้า{" "}
                <button onClick={() => setEditDescription(true)}>
                  <PenSquare className="h-5 w-5" />
                </button>
              </h2>
              <p className="prose">{store.description} </p>
            </>
          )}
        </section>
      </div>
    </>
  );
}
