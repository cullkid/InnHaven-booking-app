"use client";

import { usePathname, useRouter } from "next/navigation";
import { HotelWithRooms } from "./AddHotelForm";
import { cn } from "@/lib/utils";
import Image from "next/image";
import RoomAmenity from "../RoomAmenity";
import useLocation from "@/hooks/useLocation";
import { DollarSign, Dumbbell, MapPin, Waves } from "lucide-react";
import { Container } from "../Container";
import { AnotherContainer } from "../AnotherContainer";
import { Button } from "../ui/button";

const HotelCard = ({ hotel }: { hotel: HotelWithRooms }) => {
  const pathName = usePathname();
  const isMyHotels = pathName.includes("my-hotels");
  const router = useRouter();

  const { getCountryByCode } = useLocation();
  const country = getCountryByCode(hotel.country);

  return (
    <div
      onClick={() => {
        !isMyHotels && router.push(`/hotel-details/${hotel.id}`);
      }}
      className={cn(
        " col-span-1 cursor-pointer transition hover:scale-105",
        isMyHotels && "cursor-default"
      )}
    >
      <AnotherContainer>
        <div className="flex flex-col mx-auto bg-slate-50  mt-5 rounded-lg p-4 border-primary/10 shadow-xl lg:w-[15rem] sm:w-[17rem] w-[18rem] h-[27rem]">
          <div className="aspect-square overflow-hidden relative w-full rounded-lg">
            <Image
              fill
              src={hotel.image}
              alt={hotel.title}
              className="w-full h-[4rem] object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <h2 className="font-semibold lg:text-xl sm:text-lg text-sm">
              {hotel.title}
            </h2>
            <div className="text-gray-400 lg:text-sm text-xs">
              {hotel.description.substring(0, 45)}...
            </div>
            <RoomAmenity>
              <MapPin size={16} className="font-black" />
              {country?.name},<span>{hotel.city}</span>
            </RoomAmenity>
            {hotel.swimmingPool && (
              <RoomAmenity>
                <Waves size={16} />
                pool
              </RoomAmenity>
            )}
            {hotel.gym && (
              <RoomAmenity>
                <Dumbbell size={16} />
                Gym
              </RoomAmenity>
            )}
            <RoomAmenity>
              <DollarSign size={16} />
              <div className="flex items-center justify-between w-full">
                {/* <div > */}
                {hotel?.rooms[0]?.roomPrice && (
                  <div className="flex items-center gap-2">
                    <div>${hotel.rooms[0].roomPrice}</div>
                    <div className="text-xs font-thin">/night</div>
                  </div>
                )}
                {/* </div> */}
                {isMyHotels && (
                  <Button
                    onClick={() => router.push(`/hotel/${hotel.id}`)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </RoomAmenity>
          </div>
        </div>
      </AnotherContainer>
    </div>
  );
};

export default HotelCard;
