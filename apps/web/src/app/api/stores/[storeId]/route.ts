import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  console.log("[PUT store] storeId = ", storeId);

  const data = await req.json();

  console.log("[PUT store] data = ", data);

  // Check if user is the owner of the store
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store || store.userId !== session.user.id) {
    return new NextResponse(null, { status: 401 });
  }

  const updatedStore = await prisma.store.update({
    where: { id: storeId },
    data: {
      name: data.name ? data.name : store.name,
      description: data.description ? data.description : store.description,
      profileImage: data.profileImage ? data.profileImage : store.profileImage,
      bannerImage: data.bannerImage ? data.bannerImage : store.bannerImage,
    },
  });

  console.log("[PUT store] updatedStore = ", updatedStore);

  return NextResponse.json(updatedStore);
}
