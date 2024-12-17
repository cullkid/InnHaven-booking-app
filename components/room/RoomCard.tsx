"use client";

import { Booking, Hotel, Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import RoomAmenity from "../RoomAmenity";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  House,
  Loader2,
  MountainSnow,
  Pencil,
  Plus,
  Ship,
  Trash,
  Trees,
  Tv,
  User,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddRoomForm from "./AddRoomForm";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { DatePickerWithRange } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";
import { Checkbox } from "../ui/checkbox";

interface RoomCardProps {
  hotel?: Hotel & {
    room: Room[];
  };
  room: Room;
  bookings?: Booking[];
}

const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const isHotelDetails = pathName.includes("hotel-details");

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState(room.roomPrice);
  const [addBreakFast, setAddBreakFast] = useState(false);
  const [days, setDays] = useState(1);

  //calculating the roomPrice by the days of the booked room
  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);

      setDays(dayCount);

      if (dayCount && room.roomPrice) {
        if (addBreakFast && room.breakFastPrice) {
          setTotalPrice(
            dayCount * room.roomPrice + dayCount * room.breakFastPrice
          );
        } else {
          setTotalPrice(dayCount * room.roomPrice);
        }
      }
    } else {
      setTotalPrice(room.roomPrice);
    }
  }, [date, room.roomPrice, addBreakFast]);

  //handlle function for the open and close of AddRoomForm
  const handleOpenDialog = () => {
    setOpen((prev) => !prev);
  };

  //handle room delete function
  const handleRoomDelete = (room: Room) => {
    setIsLoading(true);
    const imageKey = room.image.substring(room.image.lastIndexOf("/" + 1));

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then(() => {
        axios
          .delete(`/api/room/${room.id}`)
          .then(() => {
            router.refresh();
            toast({
              variant: "success",
              description: "Hotel Room Deleted!",
            });
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong!",
            });
          });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="aspect-square overflow-hidden relative h-[12rem] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 content-start text-[.7rem]">
          <RoomAmenity>
            <Bed />
            {room.bedCount} Bed
          </RoomAmenity>
          <RoomAmenity>
            <User />
            {room.guestCount} Guest
          </RoomAmenity>
          <RoomAmenity>
            <Bath />
            {room.bathroomCount} Bathroom
          </RoomAmenity>
          {!!room.KingBed && (
            <RoomAmenity>
              <BedDouble />
              {room.KingBed} King Bed
            </RoomAmenity>
          )}
          {!!room.queenBed && (
            <RoomAmenity>
              <Bed />
              {room.queenBed} Queen Bed
            </RoomAmenity>
          )}
          {room.roomService && (
            <RoomAmenity>
              <UtensilsCrossed />
              Room Service
            </RoomAmenity>
          )}
          {room.TV && (
            <RoomAmenity>
              <Tv />
              TV
            </RoomAmenity>
          )}
          {room.balcony && (
            <RoomAmenity>
              <House />
              Balcony
            </RoomAmenity>
          )}
          {room.freeWifi && (
            <RoomAmenity>
              <Wifi />
              Free Wifi
            </RoomAmenity>
          )}
          {room.cityView && (
            <RoomAmenity>
              <Castle />
              City View
            </RoomAmenity>
          )}
          {room.oceanView && (
            <RoomAmenity>
              <Ship />
              Ocean Vie
            </RoomAmenity>
          )}
          {room.forestView && (
            <RoomAmenity>
              <Trees />
              Forest view
            </RoomAmenity>
          )}
          {room.mountainView && (
            <RoomAmenity>
              <MountainSnow />
              Mountin View
            </RoomAmenity>
          )}
          {room.airCondition && (
            <RoomAmenity>
              <AirVent />
              Air Condition
            </RoomAmenity>
          )}
          {room.soundProofed && (
            <RoomAmenity>
              <VolumeX />
              Sound Proofed
            </RoomAmenity>
          )}
        </div>
        <Separator />
        <div className="flex gap 4 justify-between">
          <div className="text-[.8rem]">
            Room Price: <span className="font-bold">${room.roomPrice}</span>
            <span className="font-xs text-[.7rem]">/night</span>
          </div>
          {!!room.breakFastPrice && (
            <div className="text-[.8rem]">
              Breakfast Price:
              <span className="font-bold">${room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        {isHotelDetails ? (
          <div className="flex flex-col">
            <div className="font-semibold">Pick your booking date</div>
            <DatePickerWithRange date={date} setDate={setDate} />
            {room.breakFastPrice > 0 && (
              <div className="my-5">
                <div className="font-semibold text-sm">
                  Do you want breakfast each day?
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Checkbox
                    id="breakFast"
                    onCheckedChange={(value) => setAddBreakFast(!!value)}
                  />
                  <label>Add BreakFast</label>
                </div>
              </div>
            )}
            <div>
              <span className="text-sm">Total Price: </span>
              <span className="font-semibold pr-[0.30rem]">${totalPrice}</span>
              for <span className="font-semibold">{days} </span>
              <span className="text-sm">Days</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between gap-[3rem]">
            <Button
              disabled={isLoading}
              type="button"
              className="text-[.8rem] "
              variant="destructive"
              onClick={() => handleRoomDelete(room)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-2 w-2 mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="h-4 w-4 mr-2" /> Delete
                </>
              )}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[.8rem]"
                >
                  <Pencil className="h-4 w-4 mr-2" /> Edit Room
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white max-w-[100rem] w-[90%]">
                <DialogHeader>
                  <DialogTitle>Update your hotel rooms</DialogTitle>
                  <DialogDescription>
                    Make changes to your hotel rooms
                  </DialogDescription>
                </DialogHeader>
                <AddRoomForm
                  hotel={hotel}
                  room={room}
                  handleOpenDialog={handleOpenDialog}
                  // room={room}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
