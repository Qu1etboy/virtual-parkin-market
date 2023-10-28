"use client";

import Currency from "@/components/currency";
import { Gallery } from "@/components/gallery";
import PriceLabel from "@/components/price-label";
import Quantity from "@/components/quantity";
import ReviewCard from "@/components/review-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { FILE_URL } from "@/services/upload";
import { Rating } from "@mui/material";
import {
  Product,
  ProductImage,
  ReservedStock,
  Review,
  Store,
  User,
  WishList,
} from "@prisma/client";
import { Dot, Heart, PenLine } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ReviewWithUser = {
  user: User;
} & Review;

type ProductDetailProps = {
  product: Product & {
    images: ProductImage[];
  } & {
    review: ReviewWithUser[];
  } & {
    store: Store | null;
  } & {
    reservedStock: ReservedStock[];
  };
  defaultWishList: WishList | null;
};

export default function ProductDetail({
  product,
  defaultWishList,
}: ProductDetailProps) {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [wishList, setWishList] = useState<WishList | null>(defaultWishList);

  async function addToCart() {
    await axios.post("/cart", {
      productId: product.id,
      quantity,
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

  async function handleAddToWishlist() {
    const { data } = await axios.post(`/wishlists/${product.id}`);
    console.log(data.wishlist);
    setWishList(data.wishlist);
    toast.success(
      data.wishlist
        ? "เพิ่มเข้ารายการโปรดเรียบร้อยแล้ว"
        : "ลบออกจากรายการโปรดเรียบร้อยแล้ว"
    );
  }

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  const totalReservedStock = product.reservedStock.reduce(
    (acc, current) => acc + current.quantity,
    0
  );

  return (
    <>
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
          <PriceLabel product={product} />
          <div className="flex items-center gap-6 mt-6 mb-3">
            <Quantity value={quantity} onSetQuantity={handleSetQuantity} />
            <span className="text-gray-600">
              สินค้าเหลืออยู่ {product.stockQuantity - totalReservedStock} ชิ้น
            </span>
          </div>
          {session ? (
            <>
              <Button
                onClick={addToCart}
                className="w-full rounded-full py-6 mt-3"
                disabled={product.stockQuantity === 0}
              >
                เพิ่มเข้าตะกร้า
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="w-full rounded-full py-6 mt-3"
              >
                <Heart
                  className={cn(
                    "mr-3 w-5 h-5",
                    wishList ? "fill-red-500 stroke-red-500" : ""
                  )}
                />
                <span>รายการโปรด</span>
              </Button>
            </>
          ) : (
            <Button className="w-full rounded-full py-6 mt-3" asChild>
              <Link href="/login">เข้าสู่ระบบเพื่อซื้อสินค้า</Link>
            </Button>
          )}

          <div className="mt-6">
            <h2 className="text-sm text-gray-600">จําหน่ายโดย</h2>
            <Link
              href={`/shop/${product.store?.id}`}
              className="flex items-center gap-3 mt-3 group"
            >
              <Avatar>
                <AvatarImage
                  src={`${FILE_URL}/${product.store?.profileImage}`}
                  alt={product.store?.name}
                />
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
    </>
  );
}
