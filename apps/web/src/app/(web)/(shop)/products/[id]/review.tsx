import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewCard from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/lib/prisma";
import { Rating } from "@mui/material";
import { Product, ProductImage, Review, Store, User } from "@prisma/client";
import { Dot, PenLine } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

type ReviewWithUser = {
  user: User;
} & Review;

type ProductReviewProps = {
  product: Product & {
    images: ProductImage[];
  } & {
    review: ReviewWithUser[];
  } & {
    store: Store | null;
  };
};

export default async function ProductReview({ product }: ProductReviewProps) {
  const session = await getServerSession(authOptions);

  const order = await prisma.order.count({
    where: {
      userId: session?.user.id,
      orderItem: {
        some: {
          productId: product.id,
        },
      },
    },
  });

  const reviews = await prisma.review.findMany({
    where: {
      productId: product.id,
      AND: {
        NOT: {
          userId: session?.user.id,
        },
      },
    },
    include: {
      user: true,
    },
  });

  const rating = await prisma.review.aggregate({
    where: {
      productId: product.id,
    },
    _avg: {
      rating: true,
    },
  });

  const oneStar = await prisma.review.count({
    where: {
      productId: product.id,
      rating: 1,
    },
  });

  const twoStar = await prisma.review.count({
    where: {
      productId: product.id,
      rating: 2,
    },
  });

  const threeStar = await prisma.review.count({
    where: {
      productId: product.id,
      rating: 3,
    },
  });

  const fourStar = await prisma.review.count({
    where: {
      productId: product.id,
      rating: 4,
    },
  });

  const fiveStar = await prisma.review.count({
    where: {
      productId: product.id,
      rating: 5,
    },
  });

  const ratings = [
    {
      id: "1",
      star: 5,
      count: fiveStar,
    },
    {
      id: "2",
      star: 4,
      count: fourStar,
    },
    {
      id: "3",
      star: 3,
      count: threeStar,
    },
    {
      id: "4",
      star: 2,
      count: twoStar,
    },
    {
      id: "5",
      star: 1,
      count: oneStar,
    },
  ];

  const myReview = await prisma.review.findFirst({
    where: {
      productId: product.id,
      userId: session?.user.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <section className="my-12">
      <div className="container mx-auto">
        <h2 className="flex items-center text-lg sm:text-xl md:text-2xl font-semibold my-3">
          {rating._avg.rating ?? "0"} Rating <Dot /> {product.review.length}{" "}
          รีวิว
        </h2>

        <div className="flex gap-6">
          <Rating
            name="read-only"
            value={rating._avg.rating}
            precision={0.5}
            readOnly
          />

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
          <>
            {session &&
            order &&
            product.store?.userId !== session?.user.id &&
            !myReview ? (
              <Button className="rounded-full" asChild>
                <Link href={`/products/${product.slug}/review#write-review`}>
                  <PenLine className="inline-block w-4 h-4 mr-3" />
                  รีวิวสินค้า
                </Link>
              </Button>
            ) : myReview ? (
              <ReviewCard review={myReview} />
            ) : null}
          </>
          <>
            {reviews.length ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center my-12">สินค้านี้ยังไม่มีรีวิว</div>
            )}
          </>
        </div>
      </div>
    </section>
  );
}
