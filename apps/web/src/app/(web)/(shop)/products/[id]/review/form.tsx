"use client";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@mui/material";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, "กรุณาใส่คะแนน")
    .max(5, "ใส่คะแนนได้ไม่เกิน 5 ดาว"),
  content: z.string().nullable(),
});

type ReviewForm = z.infer<typeof reviewSchema>;

export default function ReviewForm({
  productSlug,
  productId,
}: {
  productSlug: string;
  productId: string;
}) {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  async function onSubmit(data: ReviewForm) {
    console.log(data);
    try {
      await axios.post(`/reviews`, {
        productId: productId,
        rating: data.rating,
        content: data.content,
      });
      toast.success("เขียนรีวิวสำเร็จ");
      window.location.href = `/products/${productSlug}`;
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">คะแนน</FormLabel>
              <FormControl>
                <Rating {...field} size="large" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เนื้อหา</FormLabel>
              <FormControl>
                <Textarea {...field}></Textarea>
              </FormControl>
              <FormDescription>
                สามารถเลือกที่จะเขียนเนื้อหารีวิวหรือไม่ก็ได้
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">เขียนรีวิว</Button>
      </form>
    </Form>
  );
}
