import { Gender } from "@prisma/client";
import * as z from "zod";

export const customerProfileSchema = z.object({
  name: z.object({
    firstName: z
      .string()
      .min(2, {
        message: "first name must be at least 2 characters.",
      })
      .max(30, {
        message: "first name must not be longer than 30 characters.",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "last name must be at least 2 characters.",
      })
      .max(30, {
        message: "last name must not be longer than 30 characters.",
      }),
  }),
  phoneNumber: z
    .string()
    .length(10, { message: "phone number must be only 10 characters." })
    .optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.nativeEnum(Gender).optional().nullable(),
  image: z.string().optional().nullable(),
});

export const addressSchema = z.object({
  address: z.string().min(1),
  district: z.object({
    districtId: z.number(),
    districtName: z.string(),
  }),
  subDistrict: z
    .object({
      subDistrictId: z.number(),
      subDistrictName: z.string(),
    })
    .optional()
    .nullable(),
  province: z.object({
    provinceId: z.number(),
    provinceName: z.string(),
  }),
  postalCode: z.object({
    zipcodeId: z.number(),
    zipcode: z.string(),
  }),
});

export const storeSchema = z.object({
  name: z.string().min(4, "กรุณากรอกชื่อร้านค้า"),
  description: z
    .string({ required_error: "กรุณากรอกรายละเอียดร้านค้า" })
    .min(1, "กรุณากรอกรายละเอียดร้านค้า"),
  address: z
    .string({ required_error: "กรุณากรอกตําแหน่งของร้าน" })
    .min(1, "กรุณากรอกตําแหน่งของร้าน"),
  ownerIdCard: z
    .string({ required_error: "กรุณากรอกหมายเลขบัตรประชาชน" })
    .length(13, "กรุณากรอกหมายเลขบัตรประชาชนที่ถูกต้อง"),
  ownerIdCardPhoto: z.string().nonempty("กรุณาอัพโหลดรูปบัตรประชาชน"),
  bankAccount: z
    .string({ required_error: "กรุณากรอกเลขบัญชีธนาคาร" })
    .min(8, "กรุณากรอกเลขบัญชีธนาคารที่ถูกต้อง")
    .max(12, "กรุณากรอกเลขบัญชีธนาคารที่ถูกต้อง"),
  bankName: z
    .string({ required_error: "กรุณากรอกเลขชื่อบัญชีธนาคาร" })
    .min(1, "กรุณากรอกเลขชื่อบัญชีธนาคาร"),
  bankProvider: z
    .string({ required_error: "กรุณาเลือกธนาคารของคุณ" })
    .min(1, "กรุณาเลือกธนาคารของคุณ"),
  bookBankPhoto: z.string().nonempty("กรุณาอัพโหลดรูปถ่ายสมุดเงินฝาก"),
});

export const productSchema = z
  .object({
    name: z
      .string({
        required_error: "กรุณากรอกชื่อสินค้า",
      })
      .min(3, "ชื่อสินค้าต้องมีอย่างน้อย 3 ตัวอักษรขึ้นไป")
      .max(255, "ชื่อสินค้าต้องไม่เกิน 255 ตัวอักษร"),
    price: z.coerce
      .number({
        required_error: "กรุณากรอกราคาสินค้า",
      })
      .min(1, "ราคาต้องมีมูลค่ามากกว่า 0"),
    specialPrice: z.coerce
      .number({
        required_error: "กรุณากรอกราคาต้น",
      })
      .min(1, "ราคาต้นต้องมีมูลค่ามากกว่า 0")
      .nullable()
      .optional()
      .or(z.literal("")),
    date: z
      .object({
        from: z.coerce.date().nullable().optional(),
        to: z.coerce.date().nullable().optional(),
      })
      .nullable()
      .optional()
      .refine(
        (data) => (data?.from && data?.to) || (!data?.from && !data?.to),
        {
          message: "กรุณาเลือกวันที่เริ่มและสิ้นสุดการลดราคา",
          path: ["date"],
        }
      ),
    stockQuantity: z.coerce
      .number({
        required_error: "กรุณากรอกจํานวนสินค้า",
      })
      .min(0, "จำนวนสินค้าต้องมีมูลค่ามากกว่าหรือเท่ากับ 0"),
    description: z
      .string({
        required_error: "กรุณากรอกคําอธิบายสินค้า",
      })
      .min(3, "คําอธิบายสินค้าต้องมีอย่างน้อย 3 ตัวอักษรขึ้นไป")
      .max(1000, "คำอธิบายสินค้าต้องไม่เกิน 1000 ตัวอักษร"),
    category: z.number({
      required_error: "กรุณาเลือกประเภทสินค้า",
    }),
    images: z
      .array(z.string({ required_error: "กรุณาอัพโหลดรูปภาพสินค้า" }))
      .optional(),
  })
  .refine(
    (data) => !(data.specialPrice && (!data.date?.from || !data.date?.to)),
    {
      message: "กรุณาเลือกวันที่เริ่มและสิ้นสุดการลดราคา",
      path: ["date"],
    }
  )
  .refine((data) => !(!data.specialPrice && data.date?.from && data.date?.to), {
    message: "กรุณากรอกราคาสินค้าที่ลดราคา",
    path: ["specialPrice"],
  });
