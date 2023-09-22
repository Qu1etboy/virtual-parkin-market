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

const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  content: z.string().nullable(),
});

type ReviewForm = z.infer<typeof reviewSchema>;

export default function ReviewForm() {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  function onSubmit(data: ReviewForm) {
    console.log(data);
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
