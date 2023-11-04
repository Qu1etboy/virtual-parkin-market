import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const userId = decoded.sub as string;

    if (!userId) {
      return new NextResponse(null, { status: 401 });
    }

    // Update user emailVerified to true
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: `${process.env.FRONTEND_STORE_URL}/account`,
      },
    });
  } catch (err) {
    return new NextResponse(null, { status: 401 });
  }
}
