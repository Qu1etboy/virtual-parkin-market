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
  ownerIdCardPhoto: z.string({
    required_error: "กรุณาอัพโหลดรูปบัตรประชาชน",
  }),
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
  bookBankPhoto: z.string({ required_error: "กรุณาอัพโหลดรูปถ่ายสมุดเงินฝาก" }),
});
