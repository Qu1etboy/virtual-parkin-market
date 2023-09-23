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
