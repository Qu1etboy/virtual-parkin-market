"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Quantity({
  className,
  ...props
}: {
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const [quantity, setQuantity] = useState(1);

  const handleSetQuantity = (value: number) => {
    if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <div className={className} {...props}>
      <Button
        variant={"outline"}
        onClick={() => handleSetQuantity(quantity - 1)}
        aria-disabled={quantity === 1}
        className={cn(
          quantity === 1 ? "cursor-not-allowed hover:bg-inherit" : "",
          "rounded-full"
        )}
      >
        <Minus className="w-2 h-2 scale-150" />
      </Button>
      <span className="px-3">{quantity}</span>
      <Button
        variant={"outline"}
        onClick={() => handleSetQuantity(quantity + 1)}
        className="rounded-full"
      >
        <Plus className="w-2 h-2 scale-150" />
      </Button>
    </div>
  );
}
