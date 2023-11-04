import React from "react";
import ReviewForm from "./form";
import { products } from "@/__mock__/products";
import { notFound, redirect } from "next/navigation";
import Currency from "@/components/currency";
import { Gallery } from "@/components/gallery";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import { FILE_URL } from "@/services/upload";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";

export default async function WriteReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  // Get product from product id
  const product = await prisma.product.findUnique({
    where: {
      slug: params.id,
    },
    include: {
      images: true,
      review: true,
      store: true,
    },
  });

  if (!product) {
    notFound();
  }

  const order = await prisma.order.count({
    where: {
      orderItem: {
        some: {
          productId: product.id,
        },
      },
    },
  });

  if (order === 0) {
    redirect(`/products/${product.slug}`);
  }

  // Check if user already review this product
  const review = await prisma.review.findFirst({
    where: {
      productId: product.id,
      userId: session?.user?.id,
    },
  });

  if (review) {
    redirect(`/products/${product.slug}`);
  }

  return (
    <main className="my-12">
      <div className="container mx-auto">
        {/* Product detail */}
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div>
            <Gallery
              images={product.images.map((image, idx) => ({
                src: `${FILE_URL}/${image.image}`,
                altText: `${product.name} image ${idx}`,
              }))}
            />
          </div>
          <div className="py-4 px-8">
            <span className="text-orange-500">{product.category}</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              {product.name}
            </h1>
            <Currency value={product.price} />

            <div className="mt-6">
              <h2 className="text-sm text-gray-600">จําหน่ายโดย</h2>
              <Link
                href={`/shop/${product.store?.id}`}
                className="flex items-center gap-3 mt-3 group"
              >
                <Avatar>
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>{product.store?.name[0]}</AvatarFallback>
                </Avatar>
                <span className="group-hover:text-orange-600">
                  {product.store?.name}
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section id="write-review" className="mt-6">
          <h1>ให้คะแนนสินค้า</h1>
          <ReviewForm productId={product.id} productSlug={product.slug} />
        </section>
      </div>
    </main>
  );
}
