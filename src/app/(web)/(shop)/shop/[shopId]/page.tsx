import { products } from "@/__mock__/products";
import ProductCard from "@/components/product-card";
import { MapPin } from "lucide-react";
import React from "react";

export default function ShopPage() {
  // TODO: Get shop from shop id
  // TODO: Check if shop is exist, if not return not found
  // TODO: Get products from shop id
  return (
    <main>
      <div className="relative w-full h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://static01.nyt.com/images/2021/03/30/multimedia/28xp-shoes-09/28xp-shoes-09-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
          alt="Shop cover"
          className="w-full h-[400px] object-cover object-center"
        />
        <div className="flex md:block justify-center">
          <div className="absolute bottom-[-30%] md:ml-20 ml-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png"
              alt="Shop logo"
              className="w-[200px] h-[200px] rounded-full object-cover object-center border"
            />
          </div>
          <div className="py-6 text-center md:text-left mt-[125px] md:mt-0 md:ml-[325px]">
            <h2 className="mb-3 text-4xl font-bold">Nike Thailand</h2>
            <p className="mt-3">
              <MapPin className="mr-2 inline-block" />
              A-01
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              culpa nobis, odit corrupti, a fugiat eaque, rerum neque omnis iste
              maiores sit molestiae atque? Accusantium similique aspernatur nisi
              quidem exercitationem!
            </p>
          </article>
        </div>
        <div>
          <h2 className="font-semibold text-xl sm:text-2xl mb-3">
            สินค้าในร้านทั้งหมด
          </h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex flex-wrap gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`/products/${product.id}`}
              />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
