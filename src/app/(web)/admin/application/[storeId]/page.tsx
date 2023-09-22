import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import MainLayout from "@/components/layout/main-layout";

const storeDetails = [
  {
    label: "ชื่อร้าน",
    value: "Nike Thailand",
  },
  {
    label: "ที่อยู่ร้าน",
    value: "A-01",
  },
  {
    label: "คําอธิบายร้าน",
    value: "ขายอุปกรณ์กีฬา Nike",
  },
];

export default function ApplicationPage({
  params,
}: {
  params: { storeId: string };
}) {
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
                <AvatarImage src="" alt="" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <span>Rufus Stewart</span>
            </div>
            <div>
              <h2>บัตรประชาชน</h2>
              <p className="text-gray-600">123456789123</p>
            </div>
            <div>
              <h2>หลักฐานยืนยัน</h2>
              <Image
                src="https://marketplace.canva.com/EAFOvBgrUOM/1/0/1600w/canva-gray-modern-name-id-card-h47cMu1Mmlk.jpg"
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
              <p className="text-gray-600">SCB</p>
            </div>
            <div>
              <h2>เลขบัญชีธนาคาร</h2>
              <p className="text-gray-600">123456789</p>
            </div>
            <div>
              <h2>ชื่อบัญชีธนาคาร</h2>
              <p className="text-gray-600">Rufus Stewart</p>
            </div>
            <div>
              <h2>ภาพถ่ายสมุดบัญชี</h2>
              <Image
                src="https://www.wesignlab.co.th/images/editor/%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97-05.jpg"
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
