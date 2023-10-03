import React from "react";
import SellerNavbar from "../components/navbar";

export default function SellerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <div>
      <SellerNavbar storeId={params.storeId} />
      {children}
    </div>
  );
}
