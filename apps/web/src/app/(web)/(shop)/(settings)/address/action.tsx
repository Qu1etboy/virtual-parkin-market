"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import AddressBooks from "./address-books";
import { AddressForm } from "./form";
import { Address } from "@prisma/client";

export default function AddressAction({
  defaultValues,
}: {
  defaultValues: Address[] | null | undefined;
}) {
  const [addresses, setAddresses] = useState<Address[] | null | undefined>(
    defaultValues
  );

  const handleAddAddress = (address: Address) => {
    setAddresses((prev) => [...(prev ?? []), address]);
  };

  const handleUpdateAddress = (address: Address) => {
    setAddresses(
      (prev) =>
        prev?.map((prevAddress) =>
          prevAddress.id === address.id ? address : prevAddress
        )
    );
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(
      (prev) => prev?.filter((prevAddress) => prevAddress.id !== addressId)
    );
  };

  return (
    <>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>เพิ่มที่อยู่จัดส่ง</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เพิ่มที่อยู่จัดส่ง</DialogTitle>
              <DialogDescription>
                กรุณากรอกข้อมูลที่อยู่สําหรับจัดส่งสินค้าให้ครบถ้วน
              </DialogDescription>
            </DialogHeader>
            <AddressForm
              onAddAddress={handleAddAddress}
              onUpdateAddress={handleUpdateAddress}
            />
          </DialogContent>
        </Dialog>
      </div>
      <AddressBooks
        addresses={addresses}
        onAddAddress={handleAddAddress}
        onUpdateAddress={handleUpdateAddress}
        onDeleteAddress={handleDeleteAddress}
      />
    </>
  );
}
