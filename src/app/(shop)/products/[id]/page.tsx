import { products } from "@/app/__mock__/products";
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewCard from "@/components/review-card";
import { Dot } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
  // Get product from product id
  const product = products.find((product) => product.id === +params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="my-12">
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2">
        <div>
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>
          <p>฿ {product.price}</p>

          <div className="mt-6">
            <Button variant={"outline"} className="rounded-full">
              -
            </Button>
            <span className="px-3">1</span>
            <Button variant={"outline"} className="rounded-full">
              +
            </Button>
          </div>

          <Button className="w-full rounded-full py-6 mt-3">Add to cart</Button>
          <Button variant="outline" className="w-full rounded-full py-6 mt-3">
            Add to wishlist
          </Button>
        </div>
      </section>

      <section className="my-12">
        <div className="container mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold my-3">
            Product Description
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
          <h2 className="flex items-center text-lg sm:text-xl md:text-2xl font-bold my-3">
            4.6 Rating <Dot /> {product.reviews.length} Reviews
          </h2>
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
