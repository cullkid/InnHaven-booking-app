import React from "react";
import { HotelWithRooms } from "./AddHotelForm";
import { Booking } from "@prisma/client";
import useLocation from "@/hooks/useLocation";
import Image from "next/image";
import RoomAmenity from "../RoomAmenity";
import {
  Car,
  Clapperboard,
  Dumbbell,
  MapPin,
  ShoppingBasket,
  Utensils,
  Wine,
} from "lucide-react";
import { FaSpa, FaSwimmer } from "react-icons/fa";
import { MdOutlineDryCleaning } from "react-icons/md";
import RoomCard from "../room/RoomCard";

const HotelDetialsClient = ({
  hotel,
  bookings,
}: {
  hotel: HotelWithRooms;
  bookings?: Booking;
}) => {
  const { getCountryByCode, getStateByCode } = useLocation();
  const country = getCountryByCode(hotel.country);
  const state = getStateByCode(hotel.country, hotel.state);

  return (
    <div className="flex flex-col gap-4 pb-3">
      <div className="aspect-square overflow-hidden relative w-full h-[30rem] rounded-lg">
        <Image
          fill
          src={hotel.image}
          alt={hotel.title}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="lg:text-2xl md:text-xl text-md lg:font-bold md:font-semibold font-medium">
          {hotel.title}
        </h3>
        <div className="mt-1">
          <RoomAmenity>
            <MapPin />
            {hotel.city} in {state?.name} state, {country?.name}
          </RoomAmenity>
        </div>
        <h3 className="mt-4 lg:text-xl md:text-md text-sm lg:font-semibold md:font-semibold font-semibold">
          Location Details
        </h3>
        <p className="text-gray-400 lg:text-md md:text-sm text-xs">
          {hotel.locationDescription}
        </p>
        <h3 className="mt-4 lg:text-xl md:text-md text-sm lg:font-semibold md:font-semibold font-semibold">
          Hotel Details
        </h3>
        <p className="text-gray-400 lg:text-md md:text-sm text-xs">
          {hotel.description}
        </p>
        <h3 className="mt-4 lg:text-xl md:text-md text-sm lg:font-semibold md:font-semibold font-semibold">
          Hotel Popular Amenities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start">
          {hotel.swimmingPool && (
            <RoomAmenity>
              <FaSwimmer size={25} />
              <span className="lg:text-md md:text-sm text-xs">Pool</span>
            </RoomAmenity>
          )}
          {hotel.gym && (
            <RoomAmenity>
              <Dumbbell size={25} />
              <span className="lg:text-md md:text-sm text-xs">Gym</span>
            </RoomAmenity>
          )}
          {hotel.spa && (
            <RoomAmenity>
              <FaSpa size={25} />
              <span className="lg:text-md md:text-sm text-xs">Spa</span>
            </RoomAmenity>
          )}
          {hotel.bar && (
            <RoomAmenity>
              <Wine size={25} />
              <span className="lg:text-md md:text-sm text-xs">Bar</span>
            </RoomAmenity>
          )}
          {hotel.laundry && (
            <RoomAmenity>
              <MdOutlineDryCleaning size={25} />
              <span className="lg:text-md md:text-sm text-xs">
                Laundry Facilities
              </span>
            </RoomAmenity>
          )}
          {hotel.restaurant && (
            <RoomAmenity>
              <Utensils size={25} />
              <span className="lg:text-md md:text-sm text-xs">Restaurant</span>
            </RoomAmenity>
          )}
          {hotel.shopping && (
            <RoomAmenity>
              <ShoppingBasket size={25} />
              <span className="lg:text-md md:text-sm text-xs">Shopping</span>
            </RoomAmenity>
          )}
          {hotel.freeParking && (
            <RoomAmenity>
              <Car size={25} />
              <span className="lg:text-md md:text-sm text-xs">
                Free Parking
              </span>
            </RoomAmenity>
          )}
          {hotel.movieNight && (
            <RoomAmenity>
              <Clapperboard size={25} />
              <span className="lg:text-md md:text-sm text-xs">Movie Night</span>
            </RoomAmenity>
          )}
          {hotel.coffeeShop && (
            <RoomAmenity>
              <Wine size={25} />
              <span className="lg:text-md md:text-sm text-xs">Coffee Shop</span>
            </RoomAmenity>
          )}
        </div>
      </div>
      <div>
        {!!hotel.rooms.length && (
          <div>
            <h3 className="mt-4 lg:text-xl md:text-md text-sm lg:font-semibold md:font-semibold font-semibold">
              Hotel Rooms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hotel.rooms.map((room) => {
                return (
                  <RoomCard
                    hotel={hotel}
                    room={room}
                    key={room.id}
                    bookings={bookings}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetialsClient;
