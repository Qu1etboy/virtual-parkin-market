"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

export default function Quantity() {
  const [quantity, setQuantity] = useState(1);

  const handleSetQuantity = (value: number) => {
    if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <div className="mt-6">
      <Button
        variant={"outline"}
        onClick={() => handleSetQuantity(quantity - 1)}
        className="rounded-full"
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
