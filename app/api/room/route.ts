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

    const room = await prismadb.room.create({
      data: { ...body },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log("error at api/room post", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
