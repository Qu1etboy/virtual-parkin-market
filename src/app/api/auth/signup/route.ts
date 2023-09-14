import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      { message: "User already exists", success: false },
      { status: 400 }
    );
  }

  await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      name: name.firstName + " " + name.lastName,
    },
  });

  // const data = await res.json();
  return NextResponse.json({ message: "User registered", success: true });
}
