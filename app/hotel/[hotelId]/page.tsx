import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/hotel/AddHotelForm";
import { auth } from "@clerk/nextjs/server";

interface HotelPageProps {
  params: {
    hotelId: string;
  };
}

const Hotel = async ({ params }: HotelPageProps) => {
  //fetch hotel data from getHotelById function
  const hotel = await getHotelById(params.hotelId);

  //confirm if there is userId
  const { userId } = auth();

  //deny access when there is no user
  if (!userId)
    return (
      <div className="relative top-[4rem] left-0">Not Authenticated.... </div>
    );

  //deny access if the user is not the owner or creator of the hotel
  if (userId && hotel?.userId !== userId && hotel)
    return <div className="relative top-[4rem] left-0">Access Denied... </div>;

  return (
    <div className="relative top-[4rem] left-0 max-w-[1920px] w-full mx-auto xl:px-20 px-4 py-4">
      <AddHotelForm hotel={hotel} />
    </div>
  );
};

export default Hotel;
