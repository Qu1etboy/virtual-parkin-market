"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Image from "next/image";
import { ProductInStock } from "@/__mock__/products";
import { DataTableRowActions } from "./data-table-row-actions";
import ToggleSell from "./toggle-sell";
import { Product } from "@prisma/client";
import { FILE_URL } from "@/services/upload";
import PriceLabel from "@/components/price-label";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="รหัสสินค้า" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อสินค้า" />
    ),
    cell: ({ row }) => {
      const product: any = row.getValue("product");
      const name: string = product.name;
      const thumbnail: string = product.images[0].image;

      return (
        <div className="flex items-center gap-6">
          <Image
            src={`${FILE_URL}/${thumbnail}`}
            alt={name}
            width={100}
            height={100}
            className="rounded-lg"
          />
          {product.sell ? (
            <a
              href={`/products/${product.slug}`}
              className="hover:text-orange-600"
            >
              {name}
            </a>
          ) : (
            <span>{name}</span>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ราคาขาย" />
    ),
    cell: ({ row }) => {
      const product: Product = row.getValue("product");
      return <PriceLabel product={product} />;
      // return <span>{row.getValue("price")}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "stockQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="จํานวนสินค้าในคลัง" />
    ),
    cell: ({ row }) => {
      const stockQuantity: number = row.getValue("stockQuantity");
      return (
        <div className="w-[80px]">
          {stockQuantity.toLocaleString("en-US")} ชิ้น
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "sell",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="วางขายสินค้า" />
    ),
    cell: ({ row }) => {
      return (
        <ToggleSell
          productId={row.getValue("id")}
          sell={row.getValue("sell")}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
