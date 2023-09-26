import { prisma } from "@/lib/prisma";
import { storeSchema } from "@/types/main";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

  const validData = storeSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  // Check if store name is already taken
  const storeNameTaken = await prisma.store.findFirst({
    where: {
      name: validData.name,
    },
  });

  if (storeNameTaken) {
    return new NextResponse(
      JSON.stringify({ errors: { name: "ชื่อร้านนี้ถูกใช้ไปแล้ว" } }),
      { status: 400 }
    );
  }

  const store = await prisma.store.create({
    data: {
      name: validData.name,
      description: validData.description,
      address: validData.address,
      ownerIdCard: validData.ownerIdCard,
      ownerIdCardPhoto: validData.ownerIdCardPhoto,
      bankAccount: validData.bankAccount,
      bankName: validData.bankName,
      bankProvider: validData.bankProvider,
      bookBankPhoto: validData.bookBankPhoto,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return NextResponse.json("done");
}
