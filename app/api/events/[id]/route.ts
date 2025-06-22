import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return NextResponse.json(
        { error: "Farm ID not found" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findFirst({
      where: {
        id,
        farmId,
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

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const { title, type, date, description, animals } = await request.json();
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return NextResponse.json(
        { error: "Farm ID not found" },
        { status: 400 }
      );
    }

    // First check if the event exists and belongs to the farm
    const existingEvent = await prisma.event.findFirst({
      where: {
        id,
        farmId,
      },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

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

    // Delete existing animal relations
    await prisma.eventAnimal.deleteMany({
      where: { eventId: id },
    });

    // Update the event with new data
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title,
        type,
        date: new Date(date),
        description,
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

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return NextResponse.json(
        { error: "Farm ID not found" },
        { status: 400 }
      );
    }

    // Check if the event exists and belongs to the farm
    const existingEvent = await prisma.event.findFirst({
      where: {
        id,
        farmId,
      },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Delete the event
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
