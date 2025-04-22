import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const animals = await db.animal.findMany({
      select: {
        id: true,
        name: true,
        tag: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(animals);
  } catch (error) {
    console.error("Error fetching animals:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
