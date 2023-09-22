"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import provinces from "@/data/address/thai/provinces.json";
import subDistricts from "@/data/address/thai/subDistricts.json";
import districts from "@/data/address/thai/districts.json";
import zipcodes from "@/data/address/thai/zipcodes.json";
import { cn } from "@/lib/utils";

const addressFormSchema = z.object({
  address: z.string(),
  subDistrict: z.object({
    SUB_DISTRICT_ID: z.number(),
    SUB_DISTRICT_CODE: z.string(),
    SUB_DISTRICT_NAME: z.string(),
    GEO_ID: z.number(),
    DISTRICT_ID: z.number(),
    PROVINCE_ID: z.number(),
  }),
  province: z.object({
    PROVINCE_ID: z.number(),
    PROVINCE_NAME: z.string(),
    PROVINCE_CODE: z.string(),
    GEO_ID: z.number(),
  }),
  postalCode: z.object({
    ZIPCODE_ID: z.number(),
    ZIPCODE: z.string(),
    SUB_DISTRICT_ID: z.string(),
    DISTRICT_ID: z.string(),
    PROVINCE_ID: z.string(),
  }),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

export function AddressForm() {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: "",
    },
  });

  function onSubmit(data: AddressFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่</FormLabel>
              <FormControl>
                <Input
                  placeholder="กรุณาระบุที่อยู่ (บ้านเลขที่, ถนน, ตําบล)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>จังหวัด</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? provinces.find(
                            (province) =>
                              province.PROVINCE_ID === field.value.PROVINCE_ID
                          )?.PROVINCE_NAME
                        : "เลือกจังหวัด"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="ค้นหาจังหวัด" />
                    <CommandEmpty>ไม่พบจังหวัด</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-auto">
                      {provinces.map((province) => (
                        <CommandItem
                          value={province.PROVINCE_NAME}
                          key={province.PROVINCE_ID}
                          onSelect={() => {
                            form.setValue("province", province);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              province.PROVINCE_ID === field.value?.PROVINCE_ID
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {province.PROVINCE_NAME}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subDistrict"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>เขต/ตําบล</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                        !form.watch("province") && "cursor-not-allowed"
                      )}
                      disabled={!form.watch("province")}
                    >
                      {field.value
                        ? subDistricts.find(
                            (subDistrict) =>
                              subDistrict.SUB_DISTRICT_ID ===
                              field.value?.SUB_DISTRICT_ID
                          )?.SUB_DISTRICT_NAME
                        : "เลือกเขต/ตําบล"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="ค้นหาเขต/ตําบล" />
                    <CommandEmpty>ไม่พบเขต/ตําบล</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-auto">
                      {subDistricts
                        .filter(
                          (subDistrict) =>
                            subDistrict.PROVINCE_ID ===
                            form.watch("province")?.PROVINCE_ID
                        )
                        .map((subDistrict) => (
                          <CommandItem
                            value={subDistrict.SUB_DISTRICT_NAME}
                            key={subDistrict.SUB_DISTRICT_ID}
                            onSelect={() => {
                              form.setValue("subDistrict", subDistrict);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                subDistrict.SUB_DISTRICT_ID ===
                                  field.value?.SUB_DISTRICT_ID
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {subDistrict.SUB_DISTRICT_NAME}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>รหัสไปรษณีย์</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                        !form.watch("province") || !form.watch("subDistrict")
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      )}
                      disabled={
                        !form.watch("province") || !form.watch("subDistrict")
                      }
                    >
                      {field.value
                        ? zipcodes.find(
                            (zipcode) =>
                              zipcode.ZIPCODE_ID === field.value?.ZIPCODE_ID
                          )?.ZIPCODE
                        : "เลือกรหัสไปรษณีย์"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 z-10">
                  <Command>
                    <CommandInput placeholder="ค้นหารหัสไปรษณีย์" />
                    <CommandEmpty>ไม่พบรหัสไปรษณีย์</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-auto">
                      {zipcodes
                        .filter(
                          (zipcode) =>
                            zipcode.PROVINCE_ID ===
                              form.watch("province")?.PROVINCE_ID.toString() &&
                            zipcode.SUB_DISTRICT_ID ===
                              form
                                .watch("subDistrict")
                                ?.SUB_DISTRICT_ID.toString()
                        )
                        .map((zipcode) => (
                          <CommandItem
                            value={zipcode.ZIPCODE}
                            key={zipcode.ZIPCODE_ID}
                            onSelect={() => {
                              form.setValue("postalCode", zipcode);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                zipcode.ZIPCODE_ID === field.value?.ZIPCODE_ID
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {zipcode.ZIPCODE}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">บันทึก</Button>
      </form>
    </Form>
  );
}
