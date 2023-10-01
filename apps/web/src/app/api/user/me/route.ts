import { prisma } from "@/lib/prisma";
import { customerProfileSchema } from "@/types/main";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

  const { name, phoneNumber, birthday, gender, image } =
    customerProfileSchema.parse(data);

  console.log("[/user/me]", session.user);

  const user = await prisma.user.update({
    where: {
      email: session.user.email as string,
    },
    data: {
      name: name.firstName + " " + name.lastName,
      image,
    },
  });

  const customerProfile = await prisma.customerProfile.upsert({
    where: {
      userId: user.id,
    },
    create: {
      phoneNumber,
      birthday,
      gender,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    update: {
      phoneNumber,
      birthday,
      gender,
    },
  });

  return NextResponse.json(customerProfile);
}
