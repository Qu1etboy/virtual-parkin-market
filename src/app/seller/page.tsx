import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { stores } from "../__mock__/stores";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

export default function SelectStorePage() {
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
        <CardContent>
          <div>
            {stores.map((store) => (
              <Link
                key={store.id}
                href="#"
                className="p-4 rounded-md border mb-4 flex items-start last:mb-0 hover:bg-gray-100"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {store.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {store.address}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="#">สร้างร้านค้าใหม่</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
