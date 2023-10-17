import { OrderItem } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create a slug from a string
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function getTotalPrice(items: OrderItem[]) {
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}
