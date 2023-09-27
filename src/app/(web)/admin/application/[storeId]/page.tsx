import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import MainLayout from "@/components/layout/main-layout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ApplicationPage({
  params,
}: {
  params: { storeId: string };
}) {
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId,
    },
    include: {
      user: true,
    },
  });

  if (!store) {
    notFound();
  }

  const storeDetails = [
    {
      label: "ชื่อร้าน",
      value: store.name,
    },
    {
      label: "ที่อยู่ร้าน",
      value: store.address,
    },
    {
      label: "คําอธิบายร้าน",
      value: store.description,
    },
  ];

  return (
    <MainLayout
      title={`คําขอการสมัครร้านค้า ${params.storeId}`}
      description="รายละเอียดใบสมัคร"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 mb-6 gap-4">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>รายละเอียดร้าน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {storeDetails.map((detail) => (
              <div key={detail.label}>
                <h2>{detail.label}</h2>
                <p className="text-gray-600">{detail.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>รายละเอียดคนขาย</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={store.user?.image ? store.user.image : ""}
                  alt={store.user?.name ? store.user.name : ""}
                />
                <AvatarFallback>
                  {store.user?.name ? store.user?.name[0] : ""}
                </AvatarFallback>
              </Avatar>
              <span>{store.user?.name}</span>
            </div>
            <div>
              <h2>บัตรประชาชน</h2>
              <p className="text-gray-600">{store.ownerIdCard}</p>
            </div>
            <div>
              <h2>หลักฐานยืนยัน</h2>
              <Image
                src={`http://localhost:4000/${store.ownerIdCardPhoto}`}
                alt="Personal Id Card"
                width={300}
                height={200}
                className="rounded-lg mt-3"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 border-dashed">
          <CardHeader>
            <CardTitle>บัญชีธนาคาร</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h2>ธนาคาร</h2>
              <p className="text-gray-600">{store.bankProvider}</p>
            </div>
            <div>
              <h2>เลขบัญชีธนาคาร</h2>
              <p className="text-gray-600">{store.bankAccount}</p>
            </div>
            <div>
              <h2>ชื่อบัญชีธนาคาร</h2>
              <p className="text-gray-600">{store.bankName}</p>
            </div>
            <div>
              <h2>ภาพถ่ายสมุดบัญชี</h2>
              <Image
                src={`http://localhost:4000/${store.bookBankPhoto}`}
                alt="Book Bank"
                width={300}
                height={200}
                className="rounded-lg mt-3"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
