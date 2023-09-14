import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import Image from "next/image";
import Quantity from "@/components/quantity";
import Currency from "@/components/currency";

export default function CartItem({ product }: { product: any }) {
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={product.thumbnail}
          alt={product.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button>
            <X />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{product.name}</p>
          </div>

          {/* <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div> */}
          <Currency value={product.price} />
          <Quantity />
        </div>
      </div>
    </li>
  );
}
