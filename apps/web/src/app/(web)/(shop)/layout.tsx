import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
