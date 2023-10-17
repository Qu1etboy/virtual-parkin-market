import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { authOptions } from "@/app/api/auth/auth-options";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import OrderDetail from "./order-detail";

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
              delivery: {
                include: {
                  deliveryImages: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: size,
    skip: (page - 1) * size,
  });

  const count = await prisma.receipt.count({
    where: {
      userId: session?.user.id,
    },
  });

  const color = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PACKED: "bg-orange-100 text-orange-800",
    SHIPPED: "bg-green-100 text-green-800",
    DELIVERED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">รายการคําสั่งซื้อของฉัน</h3>
        <p className="text-sm text-muted-foreground">
          ดูรายการคําสั่งซื้อทั้งหมดที่คุณได้สั่งซื้อ
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
                  <span className="block">
                    จัดส่งไปที่ {receipt.shippingAddress}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h2 className="text-sm">รายการสินค้า</h2>
                <div>
                  {receipt.bill?.order.map((order) => (
                    <div key={order.id} className="mt-2">
                      <h3 className="text-sm">
                        ร้าน {order.store.name}{" "}
                        <span
                          className={cn(
                            color[order.status],
                            "text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                          )}
                        >
                          {order.status}
                        </span>
                      </h3>
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
                      {/* <OrderDetail order={order as any} /> */}
                      <Link href={`/orders/${order.id}`}>รายละเอียด</Link>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="ml-auto flex gap-3">
                  ยอดรวม: <Currency value={receipt.amount} />
                </div>
              </CardFooter>
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
