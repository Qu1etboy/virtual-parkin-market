import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/types/main";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

  const validData = addressSchema.parse(data);

  console.log("[/user/me]", session.user);

  const user = await prisma.user.update({
    where: {
      email: session.user.email as string,
    },
    data: {
      addresses: {
        create: {
          address: validData.address,
          province: validData.province.provinceName,
          provinceId: validData.province.provinceId,
          district: validData.district.districtName,
          districtId: validData.district.districtId,
          subDistrict: validData.subDistrict?.subDistrictName,
          subDistrictId: validData.subDistrict?.subDistrictId,
          postalCode: validData.postalCode.zipcode,
          postalCodeId: validData.postalCode.zipcodeId,
        },
      },
    },
  });

  return NextResponse.json(user);
}
