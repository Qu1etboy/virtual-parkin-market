import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Banner />
      <Navbar />
      {children}
    </>
  );
}
