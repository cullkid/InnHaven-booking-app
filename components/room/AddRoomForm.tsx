"use client";

import * as z from "zod";
import { Hotel, Room } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PencilLine, Plus, XCircle } from "lucide-react";
import { UploadButton } from "../uploadthing";
import { useRouter } from "next/navigation";

//pass and destructure hotel and room props
interface AddRoomFormProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleOpenDialog: () => void;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  bedCount: z.coerce.number().min(1, { message: "Bed count is required" }),
  guestCount: z.coerce.number().min(1, { message: "Guest count is required" }),
  bathroomCount: z.coerce
    .number()
    .min(1, { message: "Bathrrom count is required" }),
  KingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.coerce.string().min(1, { message: "Image count is required" }),
  breakFastPrice: z.coerce.number().min(0).optional(),
  roomPrice: z.coerce
    .number()
    .min(1, { message: "Room price count is required" }),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProofed: z.boolean().optional(),
});

const AddRoomForm = ({ hotel, room, handleOpenDialog }: AddRoomFormProps) => {
  const [image, setImage] = useState<string | undefined>(room?.image);
  const [deleteImage, setDeleteImage] = useState(false);

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [hotelIsDeleting, setHotelIsDeleting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: "",
      description: "",
      bedCount: 0,
      guestCount: 0,
      bathroomCount: 0,
      KingBed: 0,
      queenBed: 0,
      image: "",
      breakFastPrice: 0,
      roomPrice: 0,
      roomService: false,
      TV: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
      soundProofed: false,
    },
  });

  //event handle for upload and delete image in uploadthing
  const handleDeleteImage = (image: string) => {
    setDeleteImage(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast({
            variant: "success",
            description: "Image removed",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      })
      .finally(() => {
        setDeleteImage(false);
      });
  };

  // Define a submit handler for the form.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    setIsLoading(true);
    if (hotel && room) {
      //update hotel info with update hotel butto
      axios
        .patch(`/api/room/${room.id}`, values)
        .then((res) => {
          toast({
            variant: "success",
            description: "Room updated !",
          });
          router.refresh();
          setIsLoading(false);
          handleOpenDialog();
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    } else {
      //create hotel form with create button
      if (!hotel) return;
      axios
        .post("/api/room", { ...values, hotelId: hotel.id })
        .then((res) => {
          toast({
            variant: "success",
            description: "Room created !",
          });
          router.refresh();
          setIsLoading(false);
          handleOpenDialog();
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    }
  }

  // use typeof function to update the state of image inside the form whenever image is uploaded
  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [image]);

  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black">Room title*</FormLabel>
                <FormDescription>Enter your room name</FormDescription>
                <FormControl>
                  <Input placeholder="Room name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black">Room discription*</FormLabel>
                <FormDescription>Describe more about your room</FormDescription>
                <FormControl>
                  <Textarea placeholder="Describe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel className="font-black">
              Select room Amenities (optional)
            </FormLabel>
            <FormDescription>
              Make a choice of amenities the room will contain
            </FormDescription>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <FormField
                control={form.control}
                name="roomService"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>24hrs Room Services</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="TV"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>TV</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balcony"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Balcony</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="freeWifi"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Free Wifi</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cityView"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>City view</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oceanView"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Ocean view</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="forestView"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Forest view</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mountainView"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Mountain view</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="airCondition"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Air condition</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soundProofed"
                render={({ field }) => (
                  <FormItem className="flex items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Sound proofed</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-extrabold">Upload image*</FormLabel>
                <FormDescription>
                  Upload the room images that shows the nice look of a new hotel
                </FormDescription>
                <FormControl>
                  {image ? (
                    <>
                      <div className="relative max-w-[400px] min-w-[200px]  max-h-[400px] min-h-[200px] mt-5">
                        <Image
                          fill
                          src={image}
                          alt="hotel image"
                          sizes=""
                          className="objext-contain"
                        />
                        <Button
                          onClick={() => handleDeleteImage(image)}
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-[12px] top-0"
                        >
                          {deleteImage ? <Loader2 /> : <XCircle />}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center border-dotted border-4 py-[6rem] border-gray-300 rounded">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);
                            setImage(res[0].url);
                            //toast from shancn
                            toast({
                              variant: "success",
                              description: "Image Uploaded",
                            });
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast({
                              variant: "destructive",
                              description: `ERROR! ${error.message}`,
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-5">
            <div className="flex-1 flex flex-col  gap-5">
              <FormField
                control={form.control}
                name="roomPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">
                      Room price in USD*
                    </FormLabel>
                    <FormDescription>
                      What is the price of your room per night
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">Bed count*</FormLabel>
                    <FormDescription>
                      How many beds are in this room?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">Guest count*</FormLabel>
                    <FormDescription>
                      How many guest are allow in this room?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathroomCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">
                      Bathroom count*
                    </FormLabel>
                    <FormDescription>
                      How many bathroom are in this room?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 flex flex-col  gap-5">
              <FormField
                control={form.control}
                name="breakFastPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">
                      Break fast price in USD
                    </FormLabel>
                    <FormDescription>Add the break fast price?</FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="KingBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">king bed</FormLabel>
                    <FormDescription>
                      How many king bed are available in this room?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="queenBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black">Queen bed</FormLabel>
                    <FormDescription>
                      How many queen bed are available in this room?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            {room ? (
              <button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
                className="flex items-center border-2 max-w-[11rem] px-3 justify-center rounded-md font-extrabold mt-5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 flex items-center mr-3" />
                    Room Updating
                  </>
                ) : (
                  <>
                    <PencilLine className="w-4 h-4 flex items-center mr-3" />
                    Update Room
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={form.handleSubmit(onSubmit)}
                type="button"
                disabled={isLoading}
                className="flex items-center border-2 max-w-[15rem] px-3 justify-center rounded-md font-extrabold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 flex items-center mr-3" />
                    Creating Room
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6 font-bold flex items-center mr-3" />
                    Create Room
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;

// import React from "react";

// const AddRoomForm = () => {
//   return <div>hello</div>;
// };

// export default AddRoomForm;
