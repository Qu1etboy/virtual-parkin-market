"use client";

import React, { useState, useEffect } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";
import { stores } from "@/__mock__/stores";
import { useParams } from "next/navigation";
import { Store } from "@prisma/client";
import { FILE_URL } from "@/services/upload";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  className?: string;
  stores: Store[];
  selectedStore: Store;
}

export default function StoreSwitcher({
  className,
  stores,
  selectedStore,
}: StoreSwitcherProps) {
  // const params = useParams();
  // const storeId = params.storeId;
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  // const [selectedStore, setSelectedStore] = useState(stores[+storeId - 1]);

  const router = useRouter();

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("justify-between", className)}
          >
            <Avatar className="mr-4 h-10 w-10">
              <AvatarImage
                src={`${FILE_URL}/${selectedStore.profileImage}`}
                alt={selectedStore.name}
              />
              <AvatarFallback>{selectedStore.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-base font-normal mr-4">
              {selectedStore.name}
            </span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="ค้นหาร้านค้า" />
              <CommandEmpty>ไม่พบร้านค้า</CommandEmpty>
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => {
                    // setSelectedStore(store);
                    setOpen(false);
                    router.push(`/seller/${store.id}`);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage
                      src={`${FILE_URL}/${store.profileImage}`}
                      alt={store.name}
                      className="grayscale"
                    />
                    <AvatarFallback>{store.name[0]}</AvatarFallback>
                  </Avatar>
                  {store.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedStore?.id === store.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem>
                  <Link href="/seller/create" className="flex items-center">
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    สร้างร้านค้าใหม่
                  </Link>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
