import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { stores } from "@/__mock__/stores";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/auth-options";
import { cn } from "@/lib/utils";

export default async function SelectStorePage() {
  const session = await getServerSession(authOptions);

  const stores = await prisma.store.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  // console.log("[store page] ", session?.user);
  const color = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    DELETED: "bg-gray-100 text-gray-800",
  };

  return (
    <main className="bg-gray-50 min-h-screen w-full flex flex-col justify-center items-center">
      <Store className="text-gray-500 h-20 w-20 m-4" />
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>โปรดเลือกร้านค้าของคุณ</CardTitle>
          <CardDescription>
            เลือกร้านค้าของคุณที่ต้องการจะจัดการ
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[450px] overflow-y-scroll">
          {stores.length > 0 ? (
            <div>
              {stores.map((store) => (
                <Link
                  key={store.id}
                  href={`/seller/${store.id}`}
                  className="p-4 rounded-md border mb-4 flex items-start last:mb-0 hover:bg-gray-100"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {store.name}{" "}
                      <span
                        className={cn(
                          color[store.status],
                          "text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                        )}
                      >
                        {store.status}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {store.address}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>คุณยังไม่มีร้านค้า</div>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/seller/create">สร้างร้านค้าใหม่</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
