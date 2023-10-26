import { authOptions } from "@/app/api/auth/auth-options";
import ProductCard from "@/components/product-card";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";

export default async function MyWishListPage() {
  const session = await getServerSession(authOptions);

  const wishLists = await prisma.wishList.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      product: {
        include: {
          images: true,
          review: true,
        },
      },
    },
  });

  return (
    <main className="container mx-auto my-12">
      <h1 className="mb-6 text-xl sm:text-2xl md:text-3xl font-bold">
        รายการโปรดของฉัน
      </h1>
      {wishLists.length > 0 ? (
        <section className="grid grid-cols-1 min-[568px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {wishLists.map((wishList) => (
            <ProductCard
              key={wishList.id}
              product={wishList.product}
              href={`/products/${wishList.product.slug}`}
            />
          ))}
        </section>
      ) : (
        <div className="flex flex-col my-12 justify-center items-center">
          <img src="/graphics/undraw_love_it.svg" width={150} />
          <p className="mt-6">สิ่งที่คุณเพิ่มลงในรายการโปรดจะปรากฏที่นี่</p>
        </div>
      )}
    </main>
  );
}
