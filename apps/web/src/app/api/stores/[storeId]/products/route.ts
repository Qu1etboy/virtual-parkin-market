import { authOptions } from "@/app/api/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/types/main";
import { ProductCategory } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params: { storeId },
  }: {
    params: { storeId: string };
  }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

  // const validData = storeSchema.parse(data);
  const validData = productSchema.parse(data);

  // Check if user is the owner of the store
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store || store.userId !== session.user.id) {
    return new NextResponse(null, { status: 401 });
  }

  // Check if product name is already taken
  const productNameTaken = await prisma.product.findFirst({
    where: {
      name: validData.name,
    },
  });

  if (productNameTaken) {
    return new NextResponse(
      JSON.stringify({ errors: { name: "ชื่อสินค้านี้ถูกใช้ไปแล้ว" } }),
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name: validData.name,
      description: validData.description,
      price: validData.price,
      specialPrice: validData.specialPrice ? validData.specialPrice : null,
      specialFrom: validData.date?.from,
      specialTo: validData.date?.to,
      stockQuantity: validData.stockQuantity,
      slug: slugify(validData.name),
      category:
        // @ts-ignore
        ProductCategory[Object.keys(ProductCategory)[+validData.category - 1]],
      images: {
        create: validData.images?.map((image) => ({
          image: image,
        })),
      },
      store: {
        connect: {
          id: storeId,
        },
      },
    },
  });

  return NextResponse.json(product);
}
