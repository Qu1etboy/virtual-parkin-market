import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { getServerSession } from "next-auth";
import Link from "next/link";
import MyOrdersPagination from "./pagination";
import Currency from "@/components/currency";
import { Dot } from "lucide-react";

export default async function SettingsOrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);
  const page = parseInt(searchParams.page ?? "1");
  const size = 3;

  const receipts = await prisma.receipt.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      bill: {
        include: {
          order: {
            include: {
              store: true,
              orderItem: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      },
    },
    take: size,
    skip: (page - 1) * size,
  });

  const count = await prisma.receipt.count({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">รายการคําสั่งซื้อของฉัน</h3>
        <p className="text-sm text-muted-foreground">
          ข้อมูลนี้จะถูกนําไปใช้เพื่อเพิ่มประสบการณ์ในการใช้งานให้ดียิ่งขึ้น
        </p>
      </div>
      <Separator />
      {receipts.length > 0 ? (
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <Card key={receipt.id} className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">
                  ใบเสร็จ {receipt.id}
                </CardTitle>
                <CardDescription>
                  วันที่ {format(receipt.createdAt, "PPP", { locale: th })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h2 className="text-sm">รายการสินค้า</h2>
                <div>
                  {receipt.bill?.order.map((order) => (
                    <div key={order.id} className="mt-2">
                      <h3 className="text-sm">ร้าน {order.store.name}</h3>
                      <ol className="list-decimal mt-1 ml-4">
                        {order.orderItem.map((orderItem) => (
                          <li key={orderItem.id} className="text-sm">
                            <Link
                              href={`/products/${orderItem.product.slug}`}
                              className="w-full flex justify-between group"
                            >
                              <span className="group-hover:text-orange-600 group-hover:underline">
                                {orderItem.product.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Currency value={orderItem.price} />
                                <Dot className="h-4 w-4" />
                                {orderItem.quantity} ชิ้น
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    ยอดรวม: {receipt.amount}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <MyOrdersPagination page={page} count={Math.ceil(count / size)} />
        </div>
      ) : (
        <div className="text-center mt-12">คุณยังไม่มีรายการคําสั่งซื้อ</div>
      )}
    </div>
  );
}
