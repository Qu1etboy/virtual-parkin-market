import { authOptions } from "@/app/api/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/types/main";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.json();

  const validData = addressSchema.parse(data);

  console.log("[/user/me]", session.user);

  const address = await prisma.address.create({
    data: {
      address: validData.address,
      province: validData.province.provinceName!,
      provinceId: validData.province.provinceId!,
      district: validData.district.districtName!,
      districtId: validData.district.districtId!,
      subDistrict: validData.subDistrict?.subDistrictName!,
      subDistrictId: validData.subDistrict?.subDistrictId,
      postalCode: validData.postalCode.zipcode!,
      postalCodeId: validData.postalCode.zipcodeId!,
      userId: session.user.id,
    },
  });

  return NextResponse.json(address);
}
