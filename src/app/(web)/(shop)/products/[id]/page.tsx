import { products } from "@/__mock__/products";
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewCard from "@/components/review-card";
import { Dot, Heart, PenLine } from "lucide-react";
import Quantity from "@/components/quantity";
import Currency from "@/components/currency";
import Rating from "@mui/material/Rating";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Gallery } from "@/components/gallery";

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

export default function ProductPage({ params }: { params: { id: string } }) {
  // Get product from product id
  const product = products.find((product) => product.id === +params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="my-12">
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
          <div className="flex items-center gap-6 mt-6 mb-3">
            <Quantity />
            <span className="text-gray-600">สินค้าเหลืออยู่ 6 ชิ้น</span>
          </div>
          <Button className="w-full rounded-full py-6 mt-3">
            เพิ่มเข้าตะกร้า
          </Button>
          <Button variant="outline" className="w-full rounded-full py-6 mt-3">
            <Heart className="mr-3 w-5 h-5" />
            <span>รายการโปรด</span>
          </Button>

          <div className="mt-6">
            <h2 className="text-sm text-gray-600">จําหน่ายโดย</h2>
            <Link href="/shop/1" className="flex items-center gap-3 mt-3 group">
              <Avatar>
                <AvatarImage src="" alt="" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <span className="group-hover:text-orange-600">Nike Thailand</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="my-12">
        <div className="container mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold my-3">
            รายละเอียดสินค้า
          </h2>
          <article className="prose max-w-none">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              repellat quas voluptatibus vel autem necessitatibus aut in dolorum
              quod architecto eius maiores libero esse! Voluptatum repellat
              debitis ipsum quae nam!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              repellat quas voluptatibus vel autem necessitatibus aut in dolorum
              quod architecto eius maiores libero esse! Voluptatum repellat
              debitis ipsum quae nam!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              repellat quas voluptatibus vel autem necessitatibus aut in dolorum
              quod architecto eius maiores libero esse! Voluptatum repellat
              debitis ipsum quae nam!
            </p>
          </article>
        </div>
      </section>

      <section className="my-12">
        <div className="container mx-auto">
          <h2 className="flex items-center text-lg sm:text-xl md:text-2xl font-semibold my-3">
            4.6 Rating <Dot /> {product.reviews.length} รีวิว
          </h2>
          <Button className="rounded-full" asChild>
            <Link href={`/products/${params.id}/review#write-review`}>
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
            {product.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
