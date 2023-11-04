import { Separator } from "@/components/ui/separator";
import { AddressForm } from "./form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressBooks from "./address-books";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import AddressAction from "./action";

export default async function AddressPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">สมุดที่อยู่</h3>
        <p className="text-sm text-muted-foreground">
          รายการที่อยู่สําหรับใช้ในการจัดส่งสินค้า
        </p>
      </div>
      <Separator />
      <AddressAction defaultValues={user?.addresses} />
    </div>
  );
}
