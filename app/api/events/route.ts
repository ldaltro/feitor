import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    console.log("📅 GET events - Starting to fetch events");
    
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    const userRole = headersList.get("x-user-role");
    
    console.log("🏠 Farm ID from headers:", farmId);
    console.log("👤 User role from headers:", userRole);
    
    // Create where clause based on user role and farmId
    let whereClause = {};
    if (userRole === "ADMIN") {
      // Admins can see all events
      whereClause = {};
    } else if (farmId) {
      // Regular users with farmId see their farm's events
      whereClause = { farmId };
    } else {
      // Users without farmId see events with default-farm-id (for backwards compatibility)
      whereClause = { farmId: "default-farm-id" };
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      include: {
        animals: {
          include: {
            animal: {
              select: {
                id: true,
                name: true,
                tag: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    console.log("📊 Found events:", events.length);
    return NextResponse.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return NextResponse.json(
        { error: "Farm ID not found" },
        { status: 400 }
      );
    }

    const { title, type, date, description, animals } = await request.json();

    // Verify that all animals belong to the user's farm
    if (animals && animals.length > 0) {
      const validAnimals = await prisma.animal.findMany({
        where: {
          id: { in: animals },
          farmId,
        },
      });

      if (validAnimals.length !== animals.length) {
        return NextResponse.json(
          { error: "Some animals not found or access denied" },
          { status: 400 }
        );
      }
    }

    const event = await prisma.event.create({
      data: {
        title,
        type,
        date: new Date(date),
        description,
        farmId,
        animals: {
          create: animals.map((animalId: string) => ({
            animal: {
              connect: {
                id: animalId,
              },
            },
          })),
        },
      },
      include: {
        animals: {
          include: {
            animal: {
              select: {
                id: true,
                name: true,
                tag: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
