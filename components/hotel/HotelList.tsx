import React from "react";
import { HotelWithRooms } from "./AddHotelForm";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels }: { hotels: HotelWithRooms[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 pt-[3rem] bg-slate-100 pb-4 bg-blend-luminosity pl-0 sm:pl-0 lg:pl-0 sm:pr-0 lg:pr-0 sm:gap-0 lg:gap-0 pr-0 gap-0">
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <HotelCard hotel={hotel} />
        </div>
      ))}
    </div>
  );
};

export default HotelList;
