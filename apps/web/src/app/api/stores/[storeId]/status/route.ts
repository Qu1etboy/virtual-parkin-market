import { authOptions } from "@/app/api/auth/auth-options";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function PUT(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  // Check if user is admin
  if (session.user.role !== Role.ADMIN) {
    return new NextResponse(null, { status: 403 });
  }

  // Check if store exists
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    return new NextResponse(null, { status: 404 });
  }

  const data = await req.json();

  // Check if store status is valid
  if (
    data.status !== "PENDING" &&
    data.status !== "APPROVED" &&
    data.status !== "REJECTED" &&
    data.status !== "DELETED"
  ) {
    return new NextResponse(null, { status: 400 });
  }

  // Update store status
  const updatedStore = await prisma.store.update({
    where: { id: storeId },
    data: {
      status: data.status,
    },
  });

  return NextResponse.json(updatedStore);
}
