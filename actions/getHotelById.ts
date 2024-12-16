import prismadb from "@/lib/prismadb";

export const getHotelById = async (hotelId: string) => {
  try {
    //fetching and finding hotel data from prismadb
    const hotel = await prismadb.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        rooms: true,
      },
    });

    //if no hotel
    if (!hotel) return null;

    return hotel;
  } catch (error: any) {
    throw new Error(error);
  }
};
