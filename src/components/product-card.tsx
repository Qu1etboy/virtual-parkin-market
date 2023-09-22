import React from "react";
import Image from "next/image";
import Link from "next/link";
import Currency from "./currency";
import { Rating } from "@mui/material";

export default function ProductCard({
  product,
  href,
}: {
  product: any;
  href: string;
}) {
  return (
    <Link href={href} className="flex flex-col gap-3 group">
      <Image
        src={product.thumbnail}
        alt={product.name}
        height={300}
        width={300}
        className="rounded-lg object-cover object-center w-full h-[300px]"
      />
      <div>
        <h3 className="font-semibold group-hover:text-orange-600 duration-300">
          {product.name}
        </h3>
        <Rating value={product.rating} precision={0.1} size="small" readOnly />
        <Currency value={product.price} />
      </div>
    </Link>
  );
}
