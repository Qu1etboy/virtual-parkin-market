import MainLayout from "@/components/layout/main-layout";
import React from "react";
import StoreSettingsForm from "./form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SellerSettingsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    return notFound();
  }

  return (
    <MainLayout
      title="ตั้งค่าร้านค้าของคุณ"
      description="ตั้งค่าและปรับแต่งร้านค้าของคุณ"
    >
      <StoreSettingsForm initialStore={store} />
    </MainLayout>
  );
}
