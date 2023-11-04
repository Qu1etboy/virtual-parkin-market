import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/types/main";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { addressId: string };
  }
) {
  const data = await req.json();
  const validData = addressSchema.parse(data);

  const address = await prisma.address.update({
    where: {
      id: params.addressId,
    },
    data: {
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
  });

  if (!address) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(address);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { addressId: string } }
) {
  await prisma.address.delete({
    where: {
      id: params.addressId,
    },
  });

  return NextResponse.json({ success: true });
}
