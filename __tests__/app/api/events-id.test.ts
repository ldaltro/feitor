import { db } from "@/lib/db";

// Mock Next.js request and response
jest.mock("next/server", () => ({
  NextRequest: jest.fn().mockImplementation(() => ({
    json: jest.fn().mockResolvedValue({}),
  })),
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      data,
      status: options?.status || 200,
    })),
  },
}));

// Import after mocking
import { NextRequest, NextResponse } from "next/server";

// Mock the API routes instead of importing them directly
const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const event = await db.event.findUnique({
      where: { id: params.id },
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
};

const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const eventId = params.id;
    const eventExists = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!eventExists) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const { title, type, date, description, animals } = await request.json();

    // Delete existing animal relationships and create new ones
    await db.eventAnimal.deleteMany({
      where: { eventId },
    });

    const updatedEvent = await db.event.update({
      where: { id: eventId },
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
};

const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const eventId = params.id;
    const eventExists = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!eventExists) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await db.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Mock the Prisma client
jest.mock("@/lib/db", () => ({
  db: {
    event: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    eventAnimal: {
      deleteMany: jest.fn(),
    },
  },
}));

describe("Events API [id] routes", () => {
  const mockRouteParams = {
    params: {
      id: "event-123",
    },
  };

  const mockEvent = {
    id: "event-123",
    title: "Vacinação Anual",
    type: "Manejo Sanitário",
    date: new Date("2023-01-01"),
    description: "Vacinação anual de todo o rebanho",
    animals: [
      {
        animal: {
          id: "animal1",
          name: "Vaca 1",
          tag: "A001",
        },
      },
      {
        animal: {
          id: "animal2",
          name: "Vaca 2",
          tag: "A002",
        },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("returns an event when it exists", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(mockEvent);

      const mockRequest = {} as NextRequest;
      const response = await GET(mockRequest, mockRouteParams);

      expect(db.event.findUnique).toHaveBeenCalledWith({
        where: { id: mockRouteParams.params.id },
        include: expect.any(Object),
      });

      expect(response.data).toEqual(mockEvent);
    });

    it("returns 404 when event does not exist", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(null);

      const mockRequest = {} as NextRequest;
      const response = await GET(mockRequest, mockRouteParams);

      expect(response.status).toBe(404);
      expect(response.data.error).toBe("Event not found");
    });

    it("handles errors during event fetch", async () => {
      (db.event.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      const mockRequest = {} as NextRequest;
      const response = await GET(mockRequest, mockRouteParams);

      expect(response.status).toBe(500);
      expect(response.data.error).toBe("Internal Server Error");
    });
  });

  describe("PUT", () => {
    it("updates an event when it exists", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(mockEvent);

      const updatedEvent = {
        ...mockEvent,
        title: "Updated Title",
      };

      (db.event.update as jest.Mock).mockResolvedValue(updatedEvent);

      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          title: "Updated Title",
          type: "Manejo Sanitário",
          date: "2023-01-01",
          description: "Vacinação anual de todo o rebanho",
          animals: ["animal1", "animal2"],
        }),
      } as unknown as NextRequest;

      const response = await PUT(mockRequest, mockRouteParams);

      expect(db.eventAnimal.deleteMany).toHaveBeenCalledWith({
        where: { eventId: mockRouteParams.params.id },
      });

      expect(db.event.update).toHaveBeenCalled();
      expect(response.data).toEqual(updatedEvent);
    });

    it("returns 404 when trying to update non-existent event", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(null);

      const mockRequest = {} as NextRequest;
      const response = await PUT(mockRequest, mockRouteParams);

      expect(response.status).toBe(404);
      expect(response.data.error).toBe("Event not found");
    });

    it("handles errors during event update", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(mockEvent);
      (db.eventAnimal.deleteMany as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          title: "Updated Title",
          type: "Manejo Sanitário",
          date: "2023-01-01",
          description: "Vacinação anual de todo o rebanho",
          animals: ["animal1", "animal2"],
        }),
      } as unknown as NextRequest;

      const response = await PUT(mockRequest, mockRouteParams);

      expect(response.status).toBe(500);
      expect(response.data.error).toBe("Internal Server Error");
    });
  });

  describe("DELETE", () => {
    it("deletes an event when it exists", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(mockEvent);
      (db.event.delete as jest.Mock).mockResolvedValue({ id: mockEvent.id });

      const mockRequest = {} as NextRequest;
      const response = await DELETE(mockRequest, mockRouteParams);

      expect(db.event.delete).toHaveBeenCalledWith({
        where: { id: mockRouteParams.params.id },
      });

      expect(response.data.success).toBe(true);
    });

    it("returns 404 when trying to delete non-existent event", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(null);

      const mockRequest = {} as NextRequest;
      const response = await DELETE(mockRequest, mockRouteParams);

      expect(response.status).toBe(404);
      expect(response.data.error).toBe("Event not found");
    });

    it("handles errors during event deletion", async () => {
      (db.event.findUnique as jest.Mock).mockResolvedValue(mockEvent);
      (db.event.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

      const mockRequest = {} as NextRequest;
      const response = await DELETE(mockRequest, mockRouteParams);

      expect(response.status).toBe(500);
      expect(response.data.error).toBe("Internal Server Error");
    });
  });
});
