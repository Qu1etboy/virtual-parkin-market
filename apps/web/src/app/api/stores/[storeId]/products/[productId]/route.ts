import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/types/main";
import { ProductCategory } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params: { storeId, productId },
  }: {
    params: { storeId: string; productId: string };
  }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

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

  // Check if product name is already taken but not by the current product
  const productNameTaken = await prisma.product.findFirst({
    where: {
      name: validData.name,
      id: {
        not: productId,
      },
    },
  });

  if (productNameTaken) {
    return new NextResponse(
      JSON.stringify({ errors: { name: "ชื่อสินค้านี้ถูกใช้ไปแล้ว" } }),
      { status: 400 }
    );
  }

  console.log(
    "[PUT product] category = ",
    validData.category,
    // @ts-ignore
    ProductCategory[Object.keys(ProductCategory)[+validData.category - 1]]
  );

  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: validData.name,
      description: validData.description,
      price: validData.price,
      originalPrice: validData.originalPrice,
      stockQuantity: validData.stockQuantity,
      slug: slugify(validData.name),
      category:
        // @ts-ignore
        ProductCategory[Object.keys(ProductCategory)[+validData.category - 1]],
      // images: {
      //   create: validData.images?.map((image) => ({
      //     image: image,
      //   })),
      // },
    },
  });

  return NextResponse.json(product);
}
