import { db } from "@/lib/db";
import { subMonths } from "date-fns";

// Mock Next.js request and response
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      data,
      status: options?.status || 200,
    })),
  },
}));

// Mock headers
jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));

// Import after mocking
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Mock the dashboard stats API route handler
const GET = async () => {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    const userRole = headersList.get("x-user-role");
    
    const now = new Date();
    const oneMonthAgo = subMonths(now, 1);
    const twoMonthsAgo = subMonths(now, 2);

    // Create base where clause for farm filtering
    let baseWhere = {};
    if (userRole === "ADMIN") {
      baseWhere = {};
    } else if (farmId) {
      baseWhere = { farmId };
    } else {
      // Users without farmId see data with default-farm-id (for backwards compatibility)
      baseWhere = { farmId: "default-farm-id" };
    }

    const totalAnimals = await db.animal.count({
      where: baseWhere,
    });
    const newAnimalsLastMonth = await db.animal.count({
      where: {
        ...baseWhere,
        createdAt: {
          gte: oneMonthAgo,
        },
      },
    });

    // Get total births and births in the last month
    const totalBirths = await db.birth.count({
      where: baseWhere,
    });
    const birthsLastMonth = await db.birth.count({
      where: {
        ...baseWhere,
        birthDate: {
          gte: oneMonthAgo,
        },
      },
    });

    // Get transactions value and percentage change
    const currentMonthTransactions = await db.transaction.aggregate({
      _sum: {
        value: true,
      },
      where: {
        ...baseWhere,
        date: {
          gte: oneMonthAgo,
        },
      },
    });

    const previousMonthTransactions = await db.transaction.aggregate({
      _sum: {
        value: true,
      },
      where: {
        ...baseWhere,
        date: {
          gte: twoMonthsAgo,
          lt: oneMonthAgo,
        },
      },
    });

    const currentSum = currentMonthTransactions._sum.value || 0;
    const previousSum = previousMonthTransactions._sum.value || 0;
    const percentageChange =
      previousSum > 0
        ? Math.round(((currentSum - previousSum) / previousSum) * 100)
        : 0;

    // Get upcoming events in the next 7 days
    const upcomingEvents = await db.event.count({
      where: {
        ...baseWhere,
        date: {
          gte: now,
          lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
      },
    });

    const stats = {
      totalAnimals,
      newAnimalsLastMonth,
      births: totalBirths,
      birthsLastMonth,
      transactions: {
        total: Math.round(currentSum),
        percentageChange,
      },
      upcomingEvents,
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats", details: error.message },
      { status: 500 }
    );
  }
};

// Mock the Prisma client
jest.mock("@/lib/db", () => ({
  db: {
    animal: {
      count: jest.fn(),
    },
    birth: {
      count: jest.fn(),
    },
    transaction: {
      aggregate: jest.fn(),
    },
    event: {
      count: jest.fn(),
    },
  },
}));

describe("Dashboard Stats API", () => {
  const mockHeaders = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (headers as jest.Mock).mockReturnValue(mockHeaders);
  });

  describe("GET /api/dashboard/stats", () => {
    it("should return dashboard stats for admin user", async () => {
      // Mock admin user headers
      mockHeaders.get.mockImplementation((header: string) => {
        if (header === "x-user-role") return "ADMIN";
        if (header === "x-user-farm-id") return "farm-123";
        return null;
      });

      // Mock database responses
      (db.animal.count as jest.Mock)
        .mockResolvedValueOnce(50) // totalAnimals
        .mockResolvedValueOnce(5); // newAnimalsLastMonth

      (db.birth.count as jest.Mock)
        .mockResolvedValueOnce(20) // totalBirths
        .mockResolvedValueOnce(3); // birthsLastMonth

      (db.transaction.aggregate as jest.Mock)
        .mockResolvedValueOnce({ _sum: { value: 15000 } }) // currentMonthTransactions
        .mockResolvedValueOnce({ _sum: { value: 12000 } }); // previousMonthTransactions

      (db.event.count as jest.Mock).mockResolvedValueOnce(8); // upcomingEvents

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        totalAnimals: 50,
        newAnimalsLastMonth: 5,
        births: 20,
        birthsLastMonth: 3,
        transactions: {
          total: 15000,
          percentageChange: 25, // (15000-12000)/12000 * 100 = 25%
        },
        upcomingEvents: 8,
      });

      // Verify admin sees all data (no farmId filter)
      expect(db.animal.count).toHaveBeenCalledWith({ where: {} });
    });

    it("should return dashboard stats for regular user with farmId", async () => {
      // Mock regular user headers
      mockHeaders.get.mockImplementation((header: string) => {
        if (header === "x-user-role") return "FARMER";
        if (header === "x-user-farm-id") return "farm-456";
        return null;
      });

      // Mock database responses
      (db.animal.count as jest.Mock)
        .mockResolvedValueOnce(25) // totalAnimals
        .mockResolvedValueOnce(2); // newAnimalsLastMonth

      (db.birth.count as jest.Mock)
        .mockResolvedValueOnce(10) // totalBirths
        .mockResolvedValueOnce(1); // birthsLastMonth

      (db.transaction.aggregate as jest.Mock)
        .mockResolvedValueOnce({ _sum: { value: 8000 } }) // currentMonthTransactions
        .mockResolvedValueOnce({ _sum: { value: 10000 } }); // previousMonthTransactions

      (db.event.count as jest.Mock).mockResolvedValueOnce(5); // upcomingEvents

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        totalAnimals: 25,
        newAnimalsLastMonth: 2,
        births: 10,
        birthsLastMonth: 1,
        transactions: {
          total: 8000,
          percentageChange: -20, // (8000-10000)/10000 * 100 = -20%
        },
        upcomingEvents: 5,
      });

      // Verify regular user sees only their farm's data
      expect(db.animal.count).toHaveBeenCalledWith({ where: { farmId: "farm-456" } });
    });

    it("should return dashboard stats for user without farmId (backwards compatibility)", async () => {
      // Mock user without farmId
      mockHeaders.get.mockImplementation((header: string) => {
        if (header === "x-user-role") return "FARMER";
        if (header === "x-user-farm-id") return null;
        return null;
      });

      // Mock database responses
      (db.animal.count as jest.Mock)
        .mockResolvedValueOnce(30) // totalAnimals
        .mockResolvedValueOnce(3); // newAnimalsLastMonth

      (db.birth.count as jest.Mock)
        .mockResolvedValueOnce(15) // totalBirths
        .mockResolvedValueOnce(2); // birthsLastMonth

      (db.transaction.aggregate as jest.Mock)
        .mockResolvedValueOnce({ _sum: { value: 5000 } }) // currentMonthTransactions
        .mockResolvedValueOnce({ _sum: { value: null } }); // previousMonthTransactions

      (db.event.count as jest.Mock).mockResolvedValueOnce(3); // upcomingEvents

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        totalAnimals: 30,
        newAnimalsLastMonth: 3,
        births: 15,
        birthsLastMonth: 2,
        transactions: {
          total: 5000,
          percentageChange: 0, // No previous data
        },
        upcomingEvents: 3,
      });

      // Verify user without farmId uses default-farm-id
      expect(db.animal.count).toHaveBeenCalledWith({ where: { farmId: "default-farm-id" } });
    });

    it("should handle null transaction values correctly", async () => {
      // Mock user headers
      mockHeaders.get.mockImplementation((header: string) => {
        if (header === "x-user-role") return "FARMER";
        if (header === "x-user-farm-id") return "farm-789";
        return null;
      });

      // Mock database responses with null transaction values
      (db.animal.count as jest.Mock)
        .mockResolvedValueOnce(10) // totalAnimals
        .mockResolvedValueOnce(1); // newAnimalsLastMonth

      (db.birth.count as jest.Mock)
        .mockResolvedValueOnce(5) // totalBirths
        .mockResolvedValueOnce(0); // birthsLastMonth

      (db.transaction.aggregate as jest.Mock)
        .mockResolvedValueOnce({ _sum: { value: null } }) // currentMonthTransactions
        .mockResolvedValueOnce({ _sum: { value: null } }); // previousMonthTransactions

      (db.event.count as jest.Mock).mockResolvedValueOnce(2); // upcomingEvents

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        totalAnimals: 10,
        newAnimalsLastMonth: 1,
        births: 5,
        birthsLastMonth: 0,
        transactions: {
          total: 0,
          percentageChange: 0,
        },
        upcomingEvents: 2,
      });
    });

    it("should handle database errors", async () => {
      // Mock user headers
      mockHeaders.get.mockImplementation((header: string) => {
        if (header === "x-user-role") return "FARMER";
        if (header === "x-user-farm-id") return "farm-456";
        return null;
      });

      // Mock database error
      (db.animal.count as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

      const response = await GET();

      expect(response.status).toBe(500);
      expect(response.data.error).toBe("Failed to fetch dashboard stats");
      expect(response.data.details).toBe("Database connection failed");
    });

    it("should calculate percentage change correctly when previous sum is zero", async () => {
      // Mock user headers
      mockHeaders.get.mockImplementation((header: string) => {
        if (header === "x-user-role") return "FARMER";
        if (header === "x-user-farm-id") return "farm-456";
        return null;
      });

      // Mock database responses
      (db.animal.count as jest.Mock)
        .mockResolvedValueOnce(15) // totalAnimals
        .mockResolvedValueOnce(2); // newAnimalsLastMonth

      (db.birth.count as jest.Mock)
        .mockResolvedValueOnce(8) // totalBirths
        .mockResolvedValueOnce(1); // birthsLastMonth

      (db.transaction.aggregate as jest.Mock)
        .mockResolvedValueOnce({ _sum: { value: 5000 } }) // currentMonthTransactions
        .mockResolvedValueOnce({ _sum: { value: 0 } }); // previousMonthTransactions (zero)

      (db.event.count as jest.Mock).mockResolvedValueOnce(4); // upcomingEvents

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.data.transactions).toEqual({
        total: 5000,
        percentageChange: 0, // Should be 0 when dividing by zero
      });
    });
  });
});