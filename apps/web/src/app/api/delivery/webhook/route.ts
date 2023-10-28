import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("[POST delivery webhook] data = ", data);

  for (const item of data.items) {
    // View delivery status here -> https://track.thailandpost.co.th/developerGuid
    if (item.status !== "501") {
      continue;
    }

    const delivery = await prisma.delivery.findFirst({
      where: { trackingNumber: item.barcode },
    });

    if (!delivery) {
      continue;
    }

    console.log("[POST delivery webhook] item = ", item);

    await prisma.order.update({
      where: { id: delivery.orderId },
      data: {
        status: OrderStatus.DELIVERED,
      },
    });
  }

  return new Response(data, { status: 200 });
}
