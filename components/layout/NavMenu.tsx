"use client";

import * as React from "react";
import { BookOpenCheck, ChevronsUpDown, Hotel, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function NavMenu() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-black">
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <div>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push("/hotels/new")}>
            <Plus size="15" />
            <span>Add Hotel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/myHotel")}>
            <Hotel size="15" />
            <span>My Hotel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/booking")}>
            <BookOpenCheck size="15" />
            <span>My Bookings</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
