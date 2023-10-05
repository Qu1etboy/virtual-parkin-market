import React from "react";
import SellerNavbar from "../components/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SellerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    notFound();
  }

  if (store?.userId !== session?.user?.id) {
    redirect("/");
  }

  return (
    <div>
      <SellerNavbar storeId={params.storeId} />
      {children}
    </div>
  );
}
