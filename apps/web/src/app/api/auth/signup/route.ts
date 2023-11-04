import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import WelcomeEmail from "../../../../../emails";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return new NextResponse(
      JSON.stringify({ errors: { email: "อีเมลนี้ถูกใช้ไปแล้ว" } }),
      { status: 400 }
    );
  }

  console.log(name, email, password);

  await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      name: name.firstName + " " + name.lastName,
    },
  });

  sendEmail({
    to: email,
    subject: "ยินดีต้อนรับสู่ตลาดนัดพาร์คอินออนไลน์",
    html: render(WelcomeEmail({ userFirstname: name.firstName })),
  });

  // const data = await res.json();
  return NextResponse.json({ message: "User registered", success: true });
}
