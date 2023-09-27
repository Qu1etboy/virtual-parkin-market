import React from "react";
import MainLayout from "@/components/layout/main-layout";
import ProductForm from "../components/product-form";

export default function AddProductPage() {
  return (
    <MainLayout
      title="เพิ่มสินค้า"
      description="กรอกรายละเอียดเพื่อเพิ่มสินค้าเข้าร้าน"
    >
      <ProductForm />
    </MainLayout>
  );
}
