import { Separator } from "@/components/ui/separator";
import { AddressForm } from "./form";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      <div className="space-y-3">
        <h2>รายการที่อยู่</h2>
        {true ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardDescription>
                9/67 ซอย สุขุมวิท 77 แขวง สวนหลวง เขต สวนหลวง กรุงเทพมหานคร
              </CardDescription>
              <div className="space-x-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">แก้ไข</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>แก้ไขอยู่จัดส่ง</DialogTitle>
                      <DialogDescription>
                        กรุณากรอกข้อมูลที่อยู่สําหรับจัดส่งสินค้าให้ครบถ้วน
                      </DialogDescription>
                    </DialogHeader>
                    <AddressForm />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">ลบ</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        เมื่อลบแล้วจะไม่สามารถยกเลิกได้
                        กรุณาตรวจสอบให้ดีก่อนกดตกลง
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction>ตกลง</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
          </Card>
        ) : (
          <div>ไม่มีรายการที่อยู่</div>
        )}
      </div>
    </div>
  );
}
