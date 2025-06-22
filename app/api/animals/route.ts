import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Get farm ID from headers (set by middleware)
    const farmId = request.headers.get("x-user-farm-id");
    
    if (!farmId) {
      return NextResponse.json(
        { error: "Farm ID not found" },
        { status: 400 }
      );
    }

    const animals = await prisma.animal.findMany({
      where: { farmId },
      select: {
        id: true,
        name: true,
        tag: true,
        breed: true,
        status: true,
        birthDate: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(animals);
  } catch (error) {
    console.error("Error fetching animals:", error);
    return NextResponse.json(
      { error: "Failed to fetch animals" },
      { status: 500 }
    );
  }
}
