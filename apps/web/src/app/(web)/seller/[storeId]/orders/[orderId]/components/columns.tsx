"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { OrderItem, Product, ProductImage } from "@prisma/client";
import { FILE_URL } from "@/services/upload";

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สินค้า" />
    ),
    cell: ({ row }) => {
      const product: Product & { images: ProductImage[] } =
        row.getValue("product");
      return (
        <div className="flex items-center gap-3">
          <Image
            src={`${FILE_URL}/${product.images[0].image}`}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <span>{product.name}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ราคา" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("price")}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="จํานวน" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("quantity")}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
