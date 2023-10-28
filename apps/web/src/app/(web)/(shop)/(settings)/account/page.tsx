import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">บัญชีของฉัน</h3>
        <p className="text-sm text-muted-foreground">ยืนยันอีเมลของคุณ</p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
