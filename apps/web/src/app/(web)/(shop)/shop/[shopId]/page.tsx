import { products } from "@/__mock__/products";
import ProductCard from "@/components/product-card";
import { prisma } from "@/lib/prisma";
import { FILE_URL } from "@/services/upload";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

export default async function ShopPage({
  params,
}: {
  params: { shopId: string };
}) {
  // TODO: Get shop from shop id
  const shop = await prisma.store.findUnique({
    where: {
      id: params.shopId,
    },
  });

  // TODO: Check if shop is exist, if not return not found
  if (!shop) return notFound();
  // TODO: Get products from shop id
  const products = await prisma.product.findMany({
    where: {
      storeId: params.shopId,
      sell: true,
    },
    include: {
      images: true,
      review: true,
    },
  });

  const bannerImage = `${FILE_URL}/${shop.bannerImage}`;
  const profileImage = `${FILE_URL}/${shop.profileImage}`;

  return (
    <main>
      <div className="relative w-full h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerImage}
          alt="Shop banner"
          className="w-full h-[400px] object-cover object-center"
        />
        <div className="flex md:block justify-center">
          <div className="absolute bottom-[-30%] md:ml-20 ml-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImage}
              alt="Shop profile"
              className="w-[200px] h-[200px] rounded-full object-cover object-center border"
            />
          </div>
          <div className="py-6 text-center md:text-left mt-[125px] md:mt-0 md:ml-[325px]">
            <h2 className="mb-3 text-4xl font-bold">{shop.name}</h2>
            <p className="mt-3">
              <MapPin className="mr-2 inline-block" />
              {shop.address}
            </p>
          </div>
        </div>
      </div>
      <section className="container mx-auto mt-[275px] md:mt-[200px] px-6 md:px-20 mb-12 space-y-8">
        <div>
          <h2 className="font-semibold text-xl sm:text-2xl mb-3">
            เกี่ยวกับร้านค้า
          </h2>
          <article className="prose">
            <p>{shop.description}</p>
          </article>
        </div>
        <div>
          <h2 className="font-semibold text-xl sm:text-2xl mb-3">
            สินค้าในร้านทั้งหมด
          </h2>
          <section className="grid grid-cols-1 min-[568px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`/products/${product.slug}`}
              />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
