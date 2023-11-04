import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth-options";
import jwt from "jsonwebtoken";
import { send } from "process";
import { sendEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  // Create jwt token
  const token = jwt.sign(
    {
      sub: session.user.id,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "10m",
    }
  );

  // Send email
  sendEmail({
    to: session.user.email!,
    subject: "ยืนยันอีเมล",
    html: `
      <h1>ยืนยันอีเมล</h1>
      <p>กรุณากดลิงค์ด้านล่างเพื่อยืนยันอีเมลของคุณ</p>
      <a href="${process.env.FRONTEND_STORE_URL}/api/auth/verify-email/${token}">ยืนยันอีเมล</a>
    `,
  });

  return NextResponse.json({ success: true });
}
