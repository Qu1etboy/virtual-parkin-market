import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  (await redis).hSet(`user:cart:${session.user.id}`, productId, quantity);

  return NextResponse.json("done");
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const cart = await (await redis).hGetAll(`user:cart:${session.user.id}`);

  return NextResponse.json(cart);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  (await redis).hSet(`user:cart:${session.user.id}`, productId, quantity);

  return NextResponse.json("done");
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const { productId } = await req.json();

  (await redis).hDel(`user:cart:${session.user.id}`, productId);

  return NextResponse.json("done");
}
