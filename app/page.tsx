import { getHotels } from "@/actions/getHotels";
import HotelList from "@/components/hotel/HotelList";
import CarouselComponent from "@/components/layout/Caroul";
// import { Button } from "@/components/ui/button";

interface HomeProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const hotels = await getHotels(searchParams);

  return (
    <div>
      <CarouselComponent />
      <div className=" ">
        {/* <div>Home page</div>
        <Button variant={"secondary"}>Home</Button> */}
        <HotelList hotels={hotels} />
      </div>
    </div>
  );
}
