import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: session.user.email as string,
  //   },
  // });
  console.log("[add product] user = ", session.user);
  console.log(
    "[add product] category = ",
    validData.category,
    // @ts-ignore
    ProductCategory[+validData.category],
    // @ts-ignore
    ProductCategory[Object.keys(ProductCategory)[+validData.category]]
  );

  // Check if user is the owner of the store
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store || store.userId !== session.user.id) {
    return new NextResponse(null, { status: 401 });
  }

  const product = await prisma.product.create({
    data: {
      name: validData.name,
      description: validData.description,
      price: validData.price,
      originalPrice: validData.originalPrice,
      stockQuantity: validData.stockQuantity,
      slug: slugify(validData.name),
      category:
        // @ts-ignore
        ProductCategory[Object.keys(ProductCategory)[+validData.category]],
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
