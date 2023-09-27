"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Quantity({
  value,
  onSetQuantity,
  className,
  ...props
}: {
  value: number;
  onSetQuantity: (value: number) => void;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <div className={className} {...props}>
      <Button
        variant={"outline"}
        onClick={() => onSetQuantity(value - 1)}
        aria-disabled={value === 1}
        className={cn(
          value === 1 ? "cursor-not-allowed hover:bg-inherit" : "",
          "rounded-full"
        )}
      >
        <Minus className="w-2 h-2 scale-150" />
      </Button>
      <span className="px-3">{value}</span>
      <Button
        variant={"outline"}
        onClick={() => onSetQuantity(value + 1)}
        className="rounded-full"
      >
        <Plus className="w-2 h-2 scale-150" />
      </Button>
    </div>
  );
}
