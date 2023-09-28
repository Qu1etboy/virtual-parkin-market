"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Image from "next/image";
import { ProductInStock } from "@/__mock__/products";
import { DataTableRowActions } from "./data-table-row-actions";
import ToggleSell from "./toggle-sell";
import { Product } from "@prisma/client";
import { FILE_URL } from "@/services/upload";

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

      console.log(thumbnail);

      return (
        <div className="flex items-center gap-6">
          <Image
            src={`${FILE_URL}/${thumbnail}`}
            alt={name}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <span>{name}</span>
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
      return <span>{row.getValue("price")}</span>;
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
      return <div className="w-[80px]">{row.getValue("stockQuantity")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "forSell",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="วางขายสินค้า" />
    ),
    cell: ({ row }) => {
      return <ToggleSell forSell={row.getValue("forSell")} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
