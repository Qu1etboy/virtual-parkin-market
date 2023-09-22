import React from "react";
import ReviewForm from "./form";
import { products } from "@/__mock__/products";
import { notFound } from "next/navigation";
import Currency from "@/components/currency";
import { Gallery } from "@/components/gallery";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function WriteReviewPage({
  params,
}: {
  params: { id: string };
}) {
  // Get product from product id
  const product = products.find((product) => product.id === +params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="my-12">
      <div className="container mx-auto">
        {/* Product detail */}
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div>
            <Gallery images={product.images} />
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
                href="/shop/1"
                className="flex items-center gap-3 mt-3 group"
              >
                <Avatar>
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <span className="group-hover:text-orange-600">
                  Nike Thailand
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section id="write-review" className="mt-6">
          <h1>ให้คะแนนสินค้า</h1>
          <ReviewForm />
        </section>
      </div>
    </main>
  );
}
