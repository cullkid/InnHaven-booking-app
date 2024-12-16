import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthaurized", { status: 401 });
    }

    const hotel = await prismadb.hotel.create({
      data: { ...body, userId },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.log("error at api/hotel post", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
