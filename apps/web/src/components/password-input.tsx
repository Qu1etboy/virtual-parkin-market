import React from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative flex rounded-md shadow-sm">
      <Input
        placeholder="••••••••••••••••"
        type={showPassword ? "text" : "password"}
        className="pr-24"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-0 h-full px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border-l font-semibold focus:z-10 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
