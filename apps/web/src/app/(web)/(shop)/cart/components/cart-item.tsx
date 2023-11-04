"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Quantity from "@/components/quantity";
import Currency from "@/components/currency";
import { Product, ProductImage } from "@prisma/client";
import axios from "@/lib/axios";
import { FILE_URL } from "@/services/upload";
import PriceLabel from "@/components/price-label";

type CartItemProps = {
  product: Product & {
    images: ProductImage[];
  };
  initialQuantity: number;
};

export default function CartItem({ product, initialQuantity }: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  async function handleSetQuantity(value: number) {
    if (value < 1 || value > product.stockQuantity) {
      return;
    }

    setQuantity(value);

    // Update quantity in cart
    await axios.put("/cart", {
      productId: product.id,
      quantity: value,
    });

    // Shouldn't do this but I'm lazy. (Better store in state)
    window.location.reload();
  }

  async function removeItem() {
    await axios.delete(`/cart`, {
      data: { productId: product.id },
    });

    window.location.reload();
  }

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={`${FILE_URL}/${product.images[0].image}`}
          alt={product.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button onClick={removeItem}>
            <X />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{product.name}</p>
          </div>
          <PriceLabel className="flex-col gap-0" product={product} />
          <Quantity
            value={quantity}
            onSetQuantity={handleSetQuantity}
            className="mt-6"
          />
        </div>
      </div>
    </li>
  );
}
