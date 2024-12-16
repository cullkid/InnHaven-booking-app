import React from "react";

const RoomAmenity = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-3">{children}</div>;
};

export default RoomAmenity;
