import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  product,
  href,
}: {
  product: any;
  href: string;
}) {
  return (
    <Link href={href} className="flex flex-col gap-3">
      <Image
        src={product.thumbnail}
        alt={product.name}
        height={300}
        width={300}
        className="rounded-lg object-cover object-center w-[300px] h-[300px]"
      />
      <div>
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm">฿ {product.price}</p>
      </div>
    </Link>
  );
}
