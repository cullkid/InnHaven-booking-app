import CarouselComponent from "@/components/layout/Caroul";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <CarouselComponent />
      <div className=" ">
        <div>Home page</div>
        <Button variant={"secondary"}>Home</Button>
      </div>
    </div>
  );
}
