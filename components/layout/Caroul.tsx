// components/CarouselComponent.tsx
"use client"; // Required for client-side components in Next.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import default carousel styles
import Head from "next/head";
import { SearchInput } from "../SearchInput";
import { Search } from "lucide-react";

const CarouselComponent: React.FC = () => {
  // Handlers for carousel events
  const onChange = (index: number) => {
    console.log("Slide changed to:", index);
  };

  const onClickItem = (index: number) => {
    console.log("Item clicked:", index);
  };

  const onClickThumb = (index: number) => {
    console.log("Thumbnail clicked:", index);
  };

  return (
    <>
      <Carousel
        showArrows={true}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
        autoPlay={true}
        interval={3000} // Set interval to 5 seconds
        infiniteLoop={true}
        stopOnHover={true}
        className=""
        showThumbs={false} // This removes the thumbnails
        showIndicators={false} // Removes the bullet points
        showStatus={false} // Removes the status indicator
      >
        <div className="relative">
          <img
            src="/fly2.jpg"
            alt="Image 1"
            className="h-[30rem] md:h-[40rem] lg:h-[40rem] filter brightness-50"
          />
          <div className="flex flex-row gap-2 items-center justify-center top-[14rem] right-[8.50rem]  sm:top-[18rem] sm:right-[20rem] lg:text-5xl lg:top-[18rem] lg:right-[23rem] absolute  border-l-8  border-l-amber-500  rounded-lg pl-1 ">
            <h1 className="m-0 p-0 text-white uppercase text-4xl sm:text-7xl lg:text-9xl tracking-tighter font-black">
              Early
            </h1>
            <div className="flex flex-col items-start">
              <h1 className="lg:text-5xl lg:h-[2rem] sm:h-[1rem] h-[0.80rem] text-white tracking-widest font-extrabold font-mono">
                Plan
              </h1>
              <h1 className="lg:text-5xl lg:h-[2rem] sm:h-[1rem] h-[0.80rem] text-white tracking-widest font-mono font-extrabold">
                Booking
              </h1>
              <h1 className="lg:text-5xl  text-white tracking-widest font-mono font-extrabold">
                Arrival
              </h1>
            </div>
          </div>
          <div className="absolute flex items-center justify-center lg:hidden md:hidden top-[22rem] right-[7rem] border-2 border-gray-400 rounded-sm">
            <Search className="relative h-4 w-4 top-[.10rem] left-6 text-muted-foreground" />
            <input
              placeholder="Search For Locations"
              className="pl-[3rem] bg-primary/10 focus:outline-none focus:ring-0 focus:border-none text-white"
            />
          </div>
        </div>
        <div className="relative">
          <img
            src="/new-year-light.jpg"
            alt="Image 2"
            className="h-[30rem] md:h-[40rem] lg:h-[40rem] filter brightness-50"
          />
          <div className="flex flex-row gap-2 items-center justify-center top-[15rem] right-[9rem]  sm:top-[18rem] sm:right-[20rem] lg:text-5xl lg:top-[18rem] lg:right-[24rem] absolute  border-l-8  border-l-amber-500  rounded-lg pl-1 ">
            <h1 className="m-0 p-0 text-white uppercase text-4xl sm:text-7xl lg:text-9xl tracking-tighter font-black">
              New
            </h1>
            <div className="flex flex-col items-start">
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[0.80rem] text-white tracking-widest font-extrabold font-mono">
                Year
              </h1>
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[1rem] text-white tracking-widest font-mono font-extrabold">
                Vacation
              </h1>
            </div>
          </div>
          <h1 className="lg:text-6xl sm:text-4xl text-2xl text-white top-[18rem] right-[3rem] sm:top-[23rem] sm:right-[12rem] lg:top-[26rem] lg:right-[16rem] absolute tracking-widest font-mono font-extrabold">
            Experience Best Of It All
          </h1>
          <div className="absolute flex items-center justify-center lg:hidden md:hidden top-[22rem] right-[7rem] border-2 border-gray-400 rounded-sm">
            <Search className="relative h-4 w-4 top-[.10rem] left-6 text-muted-foreground" />
            <input
              placeholder="Search For Locations"
              className="pl-[3rem] bg-primary/10 focus:outline-none focus:ring-0 focus:border-none text-white"
            />
          </div>
        </div>
        <div className="relative">
          <img
            src="/carabean.jpg"
            alt="Image 1"
            className="h-[30rem] md:h-[40rem] lg:h-[40rem] filter brightness-50"
          />
          <div className="flex flex-row gap-2 items-center justify-center top-[15rem] right-[11rem]  sm:top-[18rem] sm:right-[22rem] lg:text-5xl lg:top-[18rem] lg:right-[28rem] absolute  border-l-8  border-l-amber-500  rounded-lg pl-1 ">
            <h1 className="m-0 p-0 text-white uppercase text-4xl sm:text-7xl lg:text-9xl tracking-tighter font-black">
              Sky
            </h1>
            <div className="flex flex-col items-start">
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[0.80rem] text-white tracking-widest font-extrabold font-mono">
                Blue
              </h1>
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[1rem] text-white tracking-widest font-mono font-extrabold">
                Coast
              </h1>
            </div>
          </div>
          <h1 className="lg:text-5xl sm:text-3xl text-xl text-white top-[18rem] right-[3rem]  sm:top-[23rem] sm:right-[12rem] lg:top-[26rem] lg:right-[16rem] absolute tracking-widest font-mono font-extrabold">
            Caribeans Best Location For You
          </h1>
          <div className="absolute flex items-center justify-center lg:hidden md:hidden top-[22rem] right-[7rem] border-2 border-gray-400 rounded-sm">
            <Search className="relative h-4 w-4 top-[.10rem] left-6 text-muted-foreground" />
            <input
              placeholder="Search For Locations"
              className="pl-[3rem] bg-primary/10 focus:outline-none focus:ring-0 focus:border-none text-white"
            />
          </div>
        </div>
        <div className="relative">
          <img
            src="/dubai.jpg"
            alt="Image 1"
            className="h-[30rem] md:h-[40rem] lg:h-[40rem] filter brightness-50"
          />
          <div className="flex flex-row gap-2 items-center justify-center top-[15rem] right-[8rem]  sm:top-[18rem] sm:right-[19.5rem] lg:text-5xl lg:top-[18rem] lg:right-[20rem] absolute  border-l-8  border-l-amber-500  rounded-lg pl-1 ">
            <h1 className="m-0 p-0 text-white uppercase text-4xl sm:text-7xl lg:text-9xl tracking-tighter font-black">
              Dubai
            </h1>
            <div className="flex flex-col items-start">
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[0.80rem] text-white tracking-widest font-extrabold font-mono">
                City
              </h1>
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[1rem] text-white tracking-widest font-mono font-extrabold">
                Tourist
              </h1>
            </div>
          </div>
          <h1 className="lg:text-5xl sm:text-3xl text-md text-white top-[18rem] right-[1rem]  sm:top-[23rem] sm:right-[4rem] lg:top-[26rem] lg:right-[3rem] absolute tracking-widest font-mono font-extrabold">
            A Most Popular City In The Minds Of Tourisms
          </h1>
          <div className="absolute flex items-center justify-center lg:hidden md:hidden top-[22rem] right-[7rem] border-2 border-gray-400 rounded-sm">
            <Search className="relative h-4 w-4 top-[.10rem] left-6 text-muted-foreground" />
            <input
              placeholder="Search For Locations"
              className="pl-[3rem] bg-primary/10 focus:outline-none focus:ring-0 focus:border-none text-white"
            />
          </div>
        </div>
        <div className="relative">
          <img
            src="/baloon.jpg"
            alt="Image 1"
            className="h-[30rem] md:h-[40rem] lg:h-[40rem] filter brightness-50"
          />
          <div className="flex flex-row gap-2 items-center justify-center top-[15rem] right-[7.60rem]  sm:top-[18rem] sm:right-[18rem] lg:text-5xl lg:top-[18rem] lg:right-[25rem] absolute  border-l-8  border-l-amber-500  rounded-lg pl-1 ">
            <h1 className="m-0 p-0 text-white uppercase text-4xl sm:text-7xl lg:text-9xl tracking-tighter font-black">
              Nice
            </h1>
            <div className="flex flex-col items-start">
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[0.80rem] text-white tracking-widest font-extrabold font-mono">
                Views
              </h1>
              <h1 className="lg:text-5xl sm:text-2xl lg:h-[2rem] sm:h-[1rem] h-[1rem] text-white tracking-widest font-mono font-extrabold">
                Capturing
              </h1>
            </div>
          </div>
          <h1 className="lg:text-5xl sm:text-3xl text-xl text-white top-[18rem] right-[3rem]  sm:top-[23rem] sm:right-[13rem] lg:top-[26rem] lg:right-[19rem] absolute tracking-widest font-mono font-extrabold">
            Viewing Entire City Locations
          </h1>
          <div className="absolute flex items-center justify-center lg:hidden md:hidden top-[22rem] right-[7rem] border-2 border-gray-400 rounded-sm">
            <Search className="relative h-4 w-4 top-[.10rem] left-6 text-muted-foreground" />
            <input
              placeholder="Search For Locations"
              className="pl-[3rem] bg-primary/10 focus:outline-none focus:ring-0 focus:border-none text-white"
            />
          </div>
        </div>
        <div className="relative">
          <img
            src="/museum.jpg"
            alt="Image 1"
            className="h-[30rem] md:h-[40rem] lg:h-[40rem] filter brightness-50"
          />
          <div className="flex flex-col items-start text-xl top-[14rem] right-[2rem] sm:text-3xl sm:top-[18rem] sm:right-[13rem] lg:text-5xl lg:top-[18rem] lg:right-[14rem] absolute  border-l-8  border-l-amber-500  rounded-lg pl-1 ">
            <h1 className=" text-white tracking-widest font-extrabold font-mono">
              A Visit To The,
            </h1>
            <h1 className=" text-white tracking-widest font-mono font-extrabold">
              World's Historical Art,
            </h1>
            <h1 className=" text-white tracking-widest font-mono font-extrabold">
              Pictures The World Early Story
            </h1>
          </div>
          <div className="absolute flex items-center justify-center lg:hidden md:hidden top-[22rem] right-[8rem] border-2 border-gray-400 rounded-sm">
            <Search className="relative h-4 w-4 top-[.10rem] left-6 text-muted-foreground" />
            <input
              placeholder="Search For Locations"
              className="pl-[3rem] bg-primary/10 focus:outline-none focus:ring-0 focus:border-none text-white"
            />
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default CarouselComponent;
