import { cn, getActualPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import React from "react";
import Currency from "./currency";

interface PriceLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export default function PriceLabel({
  product,
  className,
  ...props
}: PriceLabelProps) {
  const actualPrice = getActualPrice(product);

  if (actualPrice === product.price) {
    return <Currency value={product.price} />;
  }

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Currency className="text-orange-600 font-semibold" value={actualPrice} />
      <Currency
        value={product.price}
        className="text-sm text-gray-600 line-through"
      />
    </div>
  );
}
