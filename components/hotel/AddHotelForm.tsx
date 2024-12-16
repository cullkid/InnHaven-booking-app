"use client";

import * as z from "zod";
import { Hotel, Room } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { UploadButton } from "../uploadthing";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Eye,
  Loader2,
  Pencil,
  PencilLine,
  Plus,
  Terminal,
  Trash,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { ICity, IState } from "country-state-city";
import useLocation from "@/hooks/useLocation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddRoomForm from "../room/AddRoomForm";
import RoomCard from "../room/RoomCard";
import { Separator } from "@/components/ui/separator";

//distructuring hotel object data to the props of addhotelform
interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

//destruction the hotel object data further to include hotelrooms
export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

//pass form object into formSchema variable using zod to manage the form validation message
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be atleast 3 character long",
  }),
  description: z.string().min(10, {
    message: "Discription must be atleast 10 character long",
  }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: "Location Discription must be atleast 10 character long",
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNight: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
});

const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [deleteImage, setDeleteImage] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [hotelIsDeleting, setHotelIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const [cities, setCities] = useState<ICity[]>([]);
  const [states, setStates] = useState<IState[]>([]);

  //import and descructure the useLocation functions
  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const countries = getAllCountries();

  // sign the formShema variable into the useform function to check and create default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: hotel || {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNight: false,
      swimmingPool: false,
      coffeeShop: false,
    },
  });

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

  //create useEffect that watch the country value inside the formschema & asign it's value
  useEffect(() => {
    const country = form.watch("country");
    if (country) {
      const countryStates = getCountryStates(country);
      setStates(countryStates || []);
    }
  }, [form.watch("country")]);

  //create useEffect that watch the state value inside the formschema & asign it's value
  useEffect(() => {
    const country = form.watch("country");
    const state = form.watch("state");
    if (country && state) {
      const citiesInState = getStateCities(country, state);
      setCities(citiesInState || []);
    }
  }, [form.watch("country"), form.watch("state")]);

  // Define a submit handler for the form.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    setIsLoading(true);
    if (hotel) {
      //update hotel info with update hotel butto
      axios
        .patch(`/api/hotel/${hotel.id}`, values)
        .then((res) => {
          toast({
            variant: "success",
            description: "Hotel updated !",
          });
          router.push(`/hotel/${res.data.id}`);
          setIsLoading(false);
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
      axios
        .post("/api/hotel", values)
        .then((res) => {
          toast({
            variant: "success",
            description: "Hotel created !",
          });
          router.push(`/hotel/${res.data.id}`);
          setIsLoading(false);
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

  //event handle to delete hotel & hotel image in uploadthing
  const hanleDeleteHotel = async (hotel: HotelWithRooms) => {
    setHotelIsDeleting(true);

    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);

    try {
      const imageKey = getImageKey(hotel.image);

      await axios.post("/api/uploadthing/delete", { imageKey });
      await axios.delete(`/api/hotel/${hotel.id}`);

      setHotelIsDeleting(false);
      toast({
        variant: "success",
        description: "Hotel deleted !",
      });
      router.push("/hotel/new");
    } catch (err) {
      setHotelIsDeleting(false);
      console.log(err);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

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

  //handlle function for the open and close of AddRoomForm
  const handleOpenDialog = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="py-4 lg:text-4xl lg:font-extrabold sm:text-2xl sm:font-bold text-xl font-semibold">
          {hotel ? "Update Your Hotel" : "Create New Hotel"}
        </h2>
        <div className="flex flex-col sm:flex-row lg:flex-row gap-[3rem]">
          <div className="flex-1 flex flex-col gap-10 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black">Hotel title*</FormLabel>
                  <FormDescription>Enter your hotel name</FormDescription>
                  <FormControl>
                    <Input placeholder="Hotel name" {...field} />
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
                  <FormLabel className="font-black">
                    Hotel discription*
                  </FormLabel>
                  <FormDescription>
                    Describe more about your hotel
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="Describe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel className="font-black">
                Select Hotel Amenities (optional)
              </FormLabel>
              <FormDescription>
                Make a choice of amenities the hotel will contain
              </FormDescription>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <FormField
                  control={form.control}
                  name="gym"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Gym</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spa"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Spa</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bar"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Bar</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="laundry"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Laundry</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="restaurant"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Restaurant</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shopping"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Shopping</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="freeParking"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Free parking</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bikeRental"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Bike rental</FormLabel>
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
                      <FormLabel>Free wifi</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="movieNight"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Movie night</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="swimmingPool"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Swimming pool</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coffeeShop"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Coffee shop</FormLabel>
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
                  <FormLabel className="font-extrabold">
                    Upload image*
                  </FormLabel>
                  <FormDescription>
                    Upload the hotel image that shows the nice look of a new
                    hotel
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
          </div>
          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-5 lg:gap-5">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-extrabold">
                      Chose Country*
                    </FormLabel>
                    <FormDescription>
                      Which country is your hotel located
                    </FormDescription>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a country"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => {
                          return (
                            <SelectItem
                              value={country.isoCode}
                              key={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="mt-[3rem] md:mt-[0] lg:mt-0 ">
                    <FormLabel className="font-extrabold">
                      Chose State
                    </FormLabel>
                    <FormDescription>
                      Which state is your hotel located
                    </FormDescription>
                    <Select
                      disabled={isLoading || states.length < 1}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a state"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => {
                          return (
                            <SelectItem
                              value={state.isoCode}
                              key={state.isoCode}
                            >
                              {state.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="mt-[3rem]">
                  <FormLabel className="font-extrabold">Chose City</FormLabel>
                  <FormDescription>
                    Which town/city is your hotel located
                  </FormDescription>
                  <Select
                    disabled={isLoading || cities.length < 1}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a city"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => {
                        return (
                          <SelectItem value={city.name} key={city.name}>
                            {city.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationDescription"
              render={({ field }) => (
                <FormItem className="mt-[3rem]">
                  <FormLabel className="font-extrabold">
                    Location discription*
                  </FormLabel>
                  <FormDescription>
                    Describe more about the location of your hotel
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="Describe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {hotel && !hotel.rooms.length && (
              <Alert className="bg-blue-700 top-5 text-white">
                <Terminal className="h-6 w-6 text-2xl" />
                <AlertTitle className="font-bold text-xl">
                  Congratulations!
                </AlertTitle>
                <AlertDescription className="font-semibold text-md">
                  You are one step away to finish your hotel creation
                </AlertDescription>
                <div className="font-medium">
                  Chose the rooms that belongs to the hotel and finish up the
                  hotel creation
                </div>
              </Alert>
            )}

            <div className="flex md:flex-row lg:flex-row flex-col justify-between mt-[3rem] gap-3">
              <div>
                {hotel && (
                  <Button
                    onClick={() => hanleDeleteHotel(hotel)}
                    variant="destructive"
                    type="button"
                    className="flex items-center border-2 max-w-[11rem] py-2 justify-center rounded-md font-extrabold"
                    disabled={hotelIsDeleting || isLoading}
                  >
                    {hotelIsDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 flex items-center mr-3" />
                        Hotel Deleting
                      </>
                    ) : (
                      <>
                        <Trash className="w-4 h-4 flex items-center mr-3" />
                        Delete Hotel
                      </>
                    )}
                  </Button>
                )}

                {hotel && (
                  <Button
                    onClick={() => router.push(`/hotel-details/${hotel.id}`)}
                    className="flex items-center border-2 max-w-[11rem] px-3 justify-center rounded-md font-extrabold mt-5"
                    type="button"
                    // variant="outline"
                  >
                    <Eye className="w-4 h-4 flex items-center mr-3" /> View
                    Hotels
                  </Button>
                )}
              </div>

              <div>
                {hotel && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <Button
                        type="button"
                        variant="outline"
                        className="font-extrabold text-wh"
                      >
                        <Plus className="w-4 h-4 flex items-center mr-3" /> Add
                        Room
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white max-w-[100rem] w-[90%]">
                      <DialogHeader>
                        <DialogTitle>Add your hotel rooms</DialogTitle>
                        <DialogDescription>
                          Decribe the your hotel rooms
                        </DialogDescription>
                      </DialogHeader>
                      <AddRoomForm
                        hotel={hotel}
                        handleOpenDialog={handleOpenDialog}
                        // room={room}
                      />
                    </DialogContent>
                  </Dialog>
                )}

                {hotel ? (
                  <button
                    disabled={isLoading || hotelIsDeleting}
                    className="flex items-center border-2 max-w-[11rem] px-3 justify-center rounded-md font-extrabold mt-5"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 flex items-center mr-3" />
                        Hotel Updating
                      </>
                    ) : (
                      <>
                        <PencilLine className="w-4 h-4 flex items-center mr-3" />
                        Update Hotel
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled={isLoading}
                    className="flex items-center border-2 max-w-[11rem] px-3 justify-center rounded-md font-extrabold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 flex items-center mr-3" />
                        Creating Hotel
                      </>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 font-bold flex items-center mr-3" />
                        Create Hotel
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            {hotel && !!hotel.rooms.length && (
              <div className="mt-[3rem]">
                <Separator />
                <h3 className="font-extrabold">Hotel rooms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-[2rem]">
                  {hotel.rooms.map((room) => {
                    return <RoomCard key={room.id} hotel={hotel} room={room} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddHotelForm;
