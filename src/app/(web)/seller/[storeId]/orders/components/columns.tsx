"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Order } from "@prisma/client";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ไอดีออเดอร์" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ลูกค้า" />
    ),
    cell: ({ row }) => {
      const user: any = row.getValue("user");
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" alt="" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "price",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ราคารวม" />
  //   ),
  //   cell: ({ row }) => {
  //     return <span>{row.getValue("price")}</span>;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สถานะ" />
    ),
    cell: ({ row }) => {
      const status: "pending" | "shipped" | "delivered" =
        row.getValue("status");

      const color = {
        pending: "bg-yellow-500",
        shipped: "bg-orange-600",
        delivered: "bg-green-600",
      };

      return (
        <div className="flex w-[100px] items-center">
          <Badge className={cn(color[status])}>{row.getValue("status")}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="การกระทํา" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="outline" asChild>
            <Link href={`orders/${row.getValue("id")}`}>ดูรายละเอียด</Link>
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
