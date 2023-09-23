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

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>เพิ่มที่อยู่จัดส่ง</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เพิ่มที่อยู่จัดส่ง</DialogTitle>
              <DialogDescription>
                กรุณากรอกข้อมูลที่อยู่สําหรับจัดส่งสินค้าให้ครบถ้วน
              </DialogDescription>
            </DialogHeader>
            <AddressForm />
          </DialogContent>
        </Dialog>
      </div>
      <AddressBooks />
    </div>
  );
}
