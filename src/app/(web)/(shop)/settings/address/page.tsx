import { Separator } from "@/components/ui/separator";
import { AddressForm } from "./form";

export default function AddressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">สมุดที่อยู่</h3>
        <p className="text-sm text-muted-foreground">
          รายการที่อยู่สําหรับใช้ในการจัดส่งสินค้า
        </p>
      </div>
      <Separator />
      <AddressForm />
    </div>
  );
}
