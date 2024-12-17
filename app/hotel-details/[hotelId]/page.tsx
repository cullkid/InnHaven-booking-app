import { getHotelById } from "@/actions/getHotelById";
import { AnotherContainer } from "@/components/AnotherContainer";
import HotelDetialsClient from "@/components/hotel/HotelDetialsClient";

interface HotelDetailsParams {
  params: {
    hotelId: string;
  };
}

const page = async ({ params }: HotelDetailsParams) => {
  const hotel = await getHotelById(params.hotelId);

  if (!hotel) return <div>Oops! Hotel with given id not found!</div>;

  return (
    <AnotherContainer>
      <div className="mt-[4rem]">
        <HotelDetialsClient hotel={hotel} />
      </div>
    </AnotherContainer>
  );
};

export default page;
