"use client";

import { Pagination } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function MyOrdersPagination({
  count,
  page,
}: {
  count: number;
  page: number;
}) {
  const searchParams = useSearchParams();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Add page search params to the URL
    window.location.href = `/settings/orders?page=${value}`;
  };
  return (
    <div className="flex justify-center">
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
}
