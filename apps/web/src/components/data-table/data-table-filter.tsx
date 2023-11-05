import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import React from "react";

interface DataTableFilterProps<TData> {
  table: Table<TData>;
}

function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
  return (
    <div className="space-x-4">
      <Button
        // variant={table.getColumn("status")?.getFilterValue() ? "solid" : "outline"}
        variant={
          table.getColumn("status")?.getFilterValue() === undefined
            ? "default"
            : "outline"
        }
        onClick={(event) => table.getColumn("status")?.setFilterValue("")}
      >
        ทั้งหมด
      </Button>
      <Button
        variant={
          table.getColumn("status")?.getFilterValue() === "PENDING"
            ? "default"
            : "outline"
        }
        onClick={(event) =>
          table.getColumn("status")?.setFilterValue("PENDING")
        }
      >
        รอดำเนินการ
      </Button>
      <Button
        variant={
          table.getColumn("status")?.getFilterValue() === "PACKED"
            ? "default"
            : "outline"
        }
        onClick={(event) => table.getColumn("status")?.setFilterValue("PACKED")}
      >
        แพ็คแล้ว
      </Button>

      <Button
        variant={
          table.getColumn("status")?.getFilterValue() === "SHIPPED"
            ? "default"
            : "outline"
        }
        onClick={(event) =>
          table.getColumn("status")?.setFilterValue("SHIPPED")
        }
      >
        ส่งแล้ว
      </Button>

      <Button
        variant={
          table.getColumn("status")?.getFilterValue() === "DELIVERED"
            ? "default"
            : "outline"
        }
        onClick={(event) =>
          table.getColumn("status")?.setFilterValue("DELIVERED")
        }
      >
        ได้รับแล้ว
      </Button>
    </div>
  );
}

export default DataTableFilter;
