import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">ข้อมูลส่วนตัว</h3>
        <p className="text-sm text-muted-foreground">
          ข้อมูลนี้จะถูกนําไปใช้เพื่อเพิ่มประสบการณ์ในการใช้งานให้ดียิ่งขึ้น
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
