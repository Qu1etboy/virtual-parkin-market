"use client";

import Currency from "@/components/currency";
import { Gallery } from "@/components/gallery";
import Quantity from "@/components/quantity";
import ReviewCard from "@/components/review-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "@/lib/axios";
import { Rating } from "@mui/material";
import { Product, ProductImage, Review, Store } from "@prisma/client";
import { Dot, Heart, PenLine } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type ProductDetailProps = {
  product: Product & {
    images: ProductImage[];
  } & {
    review: Review[];
  } & {
    store: Store | null;
  };
};

const ratings = [
  {
    id: "1",
    star: 5,
    count: 10,
  },
  {
    id: "2",
    star: 4,
    count: 5,
  },
  {
    id: "3",
    star: 3,
    count: 2,
  },
  {
    id: "4",
    star: 2,
    count: 1,
  },
  {
    id: "5",
    star: 1,
    count: 0,
  },
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  async function addToCart() {
    await axios.post("/cart", {
      productId: product.id,
      quantity: 1,
    });

    window.location.href = "/cart";
  }

  function handleSetQuantity(value: number) {
    if (value > product.stockQuantity) {
      return;
    }

    if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  }

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  return (
    <>
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Gallery
            images={product.images.map((image, idx) => ({
              src: `http://localhost:4000/${image.image}`,
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
          <div className="flex items-center gap-6 mt-6 mb-3">
            <Quantity value={quantity} onSetQuantity={handleSetQuantity} />
            <span className="text-gray-600">
              สินค้าเหลืออยู่ {product.stockQuantity} ชิ้น
            </span>
          </div>
          <Button onClick={addToCart} className="w-full rounded-full py-6 mt-3">
            เพิ่มเข้าตะกร้า
          </Button>
          <Button variant="outline" className="w-full rounded-full py-6 mt-3">
            <Heart className="mr-3 w-5 h-5" />
            <span>รายการโปรด</span>
          </Button>

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

      <section className="my-12">
        <div className="container mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold my-3">
            รายละเอียดสินค้า
          </h2>
          <article className="prose max-w-none">{product.description}</article>
        </div>
      </section>

      <section className="my-12">
        <div className="container mx-auto">
          <h2 className="flex items-center text-lg sm:text-xl md:text-2xl font-semibold my-3">
            4.6 Rating <Dot /> {product.review.length} รีวิว
          </h2>
          <Button className="rounded-full" asChild>
            <Link href={`/products/${product.slug}/review#write-review`}>
              <PenLine className="inline-block w-4 h-4 mr-3" />
              รีวิวสินค้า
            </Link>
          </Button>
          <div className="flex gap-6">
            <Rating name="read-only" value={4.6} precision={0.5} readOnly />

            <div className="w-full max-w-xl">
              {ratings.map((rating) => (
                <div className="flex items-center gap-3" key={rating.id}>
                  <Rating
                    name="read-only"
                    value={rating.star}
                    size="small"
                    readOnly
                  />
                  <Progress value={(rating.count / 18) * 100} className="h-2" />
                  <span>{rating.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="my-6">
            {product.review.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
