import React from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/auth-options";
import { getActualPrice } from "@/lib/utils";

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  console.log("[cart] user = ", session?.user);

  const cartItems = await (
    await redis
  ).hGetAll(`user:cart:${session?.user.id}`);

  console.log("[cart] cartItems = ", cartItems);

  const items = await prisma.product.findMany({
    where: {
      id: {
        in: Object.keys(cartItems),
      },
    },
    include: {
      images: true,
    },
  });

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">ตะกร้าสินค้า</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {items.length === 0 && (
                <div>
                  {/* eslint-disable @next/next/no-img-element */}
                  <img
                    src="/graphics/undraw_empty_cart.svg"
                    alt="empty cart"
                    width={300}
                    className="mx-auto"
                  />
                  <p className="text-neutral-500 text-center mt-6">
                    ตะกร้าว่าง ลองเพิ่มสินค้าดูสิ!
                  </p>
                </div>
              )}
              <ul>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    product={item}
                    initialQuantity={+cartItems[item.id]}
                  />
                ))}
              </ul>
            </div>
            <Summary
              total={items
                .map((item) => getActualPrice(item) * +cartItems[item.id])
                .reduce((p1, p2) => p1 + p2, 0)}
              itemsInCart={items.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
