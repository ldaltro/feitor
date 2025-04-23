import {
  getBirths,
  getBirthById,
  createBirth,
  deleteBirth,
} from "@/lib/actions/births";
import { db } from "@/lib/db";

// Mock the Prisma client
jest.mock("@/lib/db", () => ({
  db: {
    birth: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    animal: {
      create: jest.fn(),
    },
  },
}));

// Mock Next.js's revalidatePath
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Birth actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getBirths", () => {
    it("should return all births", async () => {
      const mockBirths = [
        {
          id: "1",
          birthDate: new Date("2023-01-01"),
          motherId: "mother1",
          fatherId: "father1",
          childId: "child1",
          mother: { id: "mother1", name: "Mother 1" },
          father: { id: "father1", name: "Father 1" },
        },
        {
          id: "2",
          birthDate: new Date("2023-02-01"),
          motherId: "mother2",
          fatherId: "father2",
          childId: "child2",
          mother: { id: "mother2", name: "Mother 2" },
          father: { id: "father2", name: "Father 2" },
        },
      ];

      // Mock the findMany function to return the mock births
      (db.birth.findMany as jest.Mock).mockResolvedValue(mockBirths);

      const result = await getBirths();

      expect(db.birth.findMany).toHaveBeenCalledWith({
        include: {
          mother: true,
          father: true,
        },
        orderBy: { birthDate: "desc" },
      });
      expect(result).toEqual({ births: mockBirths });
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (db.birth.findMany as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await getBirths();

      expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch births:", error);
      expect(result).toEqual({ error: "Failed to fetch births" });

      consoleSpy.mockRestore();
    });
  });

  describe("getBirthById", () => {
    it("should return a birth by ID", async () => {
      const mockBirth = {
        id: "1",
        birthDate: new Date("2023-01-01"),
        motherId: "mother1",
        fatherId: "father1",
        childId: "child1",
        mother: { id: "mother1", name: "Mother 1" },
        father: { id: "father1", name: "Father 1" },
      };

      (db.birth.findUnique as jest.Mock).mockResolvedValue(mockBirth);

      const result = await getBirthById("1");

      expect(db.birth.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
        include: {
          mother: true,
          father: true,
        },
      });
      expect(result).toEqual({ birth: mockBirth });
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (db.birth.findUnique as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await getBirthById("1");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch birth with ID 1:",
        error
      );
      expect(result).toEqual({ error: "Failed to fetch birth with ID 1" });

      consoleSpy.mockRestore();
    });
  });

  describe("createBirth", () => {
    it("should create a birth record", async () => {
      const birthData = {
        birthDate: new Date("2023-01-01"),
        motherId: "mother1",
        fatherId: "father1",
        childId: "child1",
        newbornCount: 1,
      };

      const createdBirth = {
        id: "1",
        ...birthData,
      };

      (db.birth.create as jest.Mock).mockResolvedValue(createdBirth);

      const result = await createBirth(birthData);

      expect(db.birth.create).toHaveBeenCalledWith({
        data: {
          birthDate: birthData.birthDate,
          motherId: birthData.motherId,
          fatherId: birthData.fatherId,
          childId: birthData.childId,
        },
      });
      expect(result).toEqual({ birth: createdBirth });
    });

    it("should handle validation errors", async () => {
      const invalidData = {
        // Missing required fields
        birthDate: new Date("2023-01-01"),
        motherId: "mother1",
        // Missing fatherId and childId
        newbornCount: 0, // Invalid value (should be positive)
      };

      const result = await createBirth(invalidData as any);

      expect(result).toHaveProperty("error");
      expect(Array.isArray(result.error)).toBe(true); // Zod error array
    });

    it("should handle database errors", async () => {
      const birthData = {
        birthDate: new Date("2023-01-01"),
        motherId: "mother1",
        fatherId: "father1",
        childId: "child1",
        newbornCount: 1,
      };

      const error = new Error("Database error");
      (db.birth.create as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await createBirth(birthData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to create birth record:",
        error
      );
      expect(result).toEqual({ error: "Failed to create birth record" });

      consoleSpy.mockRestore();
    });
  });

  describe("deleteBirth", () => {
    it("should delete a birth record", async () => {
      const mockDeleteResult = { id: "1" };
      (db.birth.delete as jest.Mock).mockResolvedValue(mockDeleteResult);

      const result = await deleteBirth("1");

      expect(db.birth.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(result).toEqual({ success: true });
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (db.birth.delete as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await deleteBirth("1");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to delete birth with ID 1:",
        error
      );
      expect(result).toEqual({ error: "Failed to delete birth with ID 1" });

      consoleSpy.mockRestore();
    });
  });
});
