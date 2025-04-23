import {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "@/lib/actions/animals";
import { db } from "@/lib/db";

// Mock next/cache
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Mock the Prisma client
jest.mock("@/lib/db", () => ({
  db: {
    animal: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Animal actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAnimals", () => {
    it("should return all animals", async () => {
      const mockAnimals = [
        {
          id: "1",
          name: "Cow 1",
          tag: "A001",
          breed: "Holstein",
          gender: "Female",
          birthDate: new Date("2022-01-01"),
          status: "Healthy",
        },
        {
          id: "2",
          name: "Bull 1",
          tag: "B001",
          breed: "Angus",
          gender: "Male",
          birthDate: new Date("2021-05-15"),
          status: "Healthy",
        },
      ];

      // Mock the findMany function to return the mock animals
      (db.animal.findMany as jest.Mock).mockResolvedValue(mockAnimals);

      const result = await getAnimals();

      expect(db.animal.findMany).toHaveBeenCalledWith({
        orderBy: { name: "asc" },
      });
      expect(result).toEqual({ animals: mockAnimals });
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (db.animal.findMany as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await getAnimals();

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch animals:",
        error
      );
      expect(result).toEqual({ error: "Failed to fetch animals" });

      consoleSpy.mockRestore();
    });
  });

  describe("getAnimalById", () => {
    it("should return an animal by ID", async () => {
      const mockAnimal = {
        id: "1",
        name: "Cow 1",
        tag: "A001",
        breed: "Holstein",
        gender: "Female",
        birthDate: new Date("2022-01-01"),
        status: "Healthy",
      };

      (db.animal.findUnique as jest.Mock).mockResolvedValue(mockAnimal);

      const result = await getAnimalById("1");

      expect(db.animal.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(result).toEqual({ animal: mockAnimal });
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (db.animal.findUnique as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await getAnimalById("1");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch animal with ID 1:",
        error
      );
      expect(result).toEqual({ error: "Failed to fetch animal with ID 1" });

      consoleSpy.mockRestore();
    });
  });

  describe("createAnimal", () => {
    it("should create an animal record", async () => {
      const animalData = {
        name: "New Cow",
        tag: "N001",
        breed: "Jersey",
        gender: "Female",
        birthDate: new Date("2023-03-15"),
        status: "Healthy",
      };

      const createdAnimal = {
        id: "3",
        ...animalData,
      };

      (db.animal.create as jest.Mock).mockResolvedValue(createdAnimal);

      const result = await createAnimal(animalData);

      expect(db.animal.create).toHaveBeenCalledWith({
        data: animalData,
      });
      expect(result).toEqual({ animal: createdAnimal });
    });

    it("should handle validation errors", async () => {
      const invalidData = {
        // Missing required fields
        name: "Invalid Cow",
        // Missing tag, breed, gender, birthDate and status
      };

      const result = await createAnimal(invalidData as any);

      expect(result).toHaveProperty("error");
      expect(Array.isArray(result.error)).toBe(true); // Zod error array
    });

    it("should handle database errors", async () => {
      const animalData = {
        name: "New Cow",
        tag: "N001",
        breed: "Jersey",
        gender: "Female",
        birthDate: new Date("2023-03-15"),
        status: "Healthy",
      };

      const error = new Error("Database error");
      (db.animal.create as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await createAnimal(animalData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to create animal:",
        error
      );
      expect(result).toEqual({ error: "Failed to create animal" });

      consoleSpy.mockRestore();
    });
  });

  describe("updateAnimal", () => {
    it("should update an animal record", async () => {
      const updateData = {
        id: "1",
        name: "Updated Cow",
        tag: "U001",
        breed: "Holstein",
        gender: "Female",
        birthDate: new Date("2022-01-01"),
        status: "Pregnant",
      };

      const updatedAnimal = { ...updateData };

      (db.animal.update as jest.Mock).mockResolvedValue(updatedAnimal);

      const result = await updateAnimal(updateData);

      expect(db.animal.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: {
          name: updateData.name,
          tag: updateData.tag,
          breed: updateData.breed,
          gender: updateData.gender,
          birthDate: updateData.birthDate,
          status: updateData.status,
        },
      });
      expect(result).toEqual({ animal: updatedAnimal });
    });

    it("should handle validation errors", async () => {
      const invalidData = {
        id: "1",
        // Missing required fields
        name: "Invalid Update",
        // Missing tag, breed, gender, birthDate and status
      };

      const result = await updateAnimal(invalidData as any);

      expect(result).toHaveProperty("error");
      expect(Array.isArray(result.error)).toBe(true); // Zod error array
    });

    it("should handle database errors", async () => {
      const updateData = {
        id: "1",
        name: "Updated Cow",
        tag: "U001",
        breed: "Holstein",
        gender: "Female",
        birthDate: new Date("2022-01-01"),
        status: "Pregnant",
      };

      const error = new Error("Database error");
      (db.animal.update as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await updateAnimal(updateData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to update animal:",
        error
      );
      expect(result).toEqual({ error: "Failed to update animal" });

      consoleSpy.mockRestore();
    });
  });

  describe("deleteAnimal", () => {
    it("should delete an animal record", async () => {
      const mockDeleteResult = { id: "1" };
      (db.animal.delete as jest.Mock).mockResolvedValue(mockDeleteResult);

      const result = await deleteAnimal("1");

      expect(db.animal.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(result).toEqual({ success: true });
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (db.animal.delete as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await deleteAnimal("1");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to delete animal with ID 1:",
        error
      );
      expect(result).toEqual({ error: "Failed to delete animal with ID 1" });

      consoleSpy.mockRestore();
    });
  });
});
