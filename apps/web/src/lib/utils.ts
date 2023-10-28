import { OrderItem, Product } from "@prisma/client";
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

export function getActualPrice(product: Product) {
  let price = product.price;

  if (
    product.specialPrice &&
    product.specialFrom &&
    product.specialTo &&
    product.specialFrom <= new Date() &&
    product.specialTo >= new Date()
  ) {
    price = product.specialPrice;
  }

  return price;
}
