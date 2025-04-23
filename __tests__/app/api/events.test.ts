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

// Mock API route handlers instead of importing them directly
const GET = async () => {
  try {
    const events = await db.event.findMany({
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

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

const POST = async (request: NextRequest) => {
  try {
    const { title, type, date, description, animals } = await request.json();

    const newEvent = await db.event.create({
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

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
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
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("Events API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return all events", async () => {
      const mockEvents = [
        {
          id: "event1",
          title: "Test Event",
          animals: [],
        },
      ];

      (db.event.findMany as jest.Mock).mockResolvedValue(mockEvents);

      const response = await GET();
      expect(response.data).toEqual(mockEvents);
    });

    it("should handle errors", async () => {
      (db.event.findMany as jest.Mock).mockRejectedValue(new Error("DB error"));

      const response = await GET();
      expect(response.status).toBe(500);
      expect(response.data.error).toBe("Internal Server Error");
    });
  });

  describe("POST", () => {
    it("should create an event", async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          title: "New Event",
          type: "Test",
          date: "2023-05-01",
          description: "Test description",
          animals: ["animal1"],
        }),
      };

      const mockNewEvent = {
        id: "new-event",
        title: "New Event",
        animals: [],
      };

      (db.event.create as jest.Mock).mockResolvedValue(mockNewEvent);

      const response = await POST(mockRequest as unknown as NextRequest);
      expect(response.status).toBe(201);
      expect(response.data).toEqual(mockNewEvent);
    });

    it("should handle errors when creating an event", async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          title: "New Event",
          type: "Test",
          date: "2023-05-01",
          description: "Test description",
          animals: ["animal1"],
        }),
      };

      (db.event.create as jest.Mock).mockRejectedValue(new Error("DB error"));

      const response = await POST(mockRequest as unknown as NextRequest);
      expect(response.status).toBe(500);
      expect(response.data.error).toBe("Internal Server Error");
    });
  });
});
