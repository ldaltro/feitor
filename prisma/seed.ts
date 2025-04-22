import { PrismaClient } from "../lib/generated/prisma";
import { parse, parseISO } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.birth.deleteMany();
  await prisma.animal.deleteMany();

  // Create animals
  const animals = [
    {
      name: "Mimosa",
      tag: "A001",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: parseDate("10/03/2020"),
      status: "Saudável",
    },
    {
      name: "Estrela",
      tag: "A002",
      breed: "Gir",
      gender: "Fêmea",
      birthDate: parseDate("15/05/2021"),
      status: "Gestante",
    },
    {
      name: "Trovão",
      tag: "A003",
      breed: "Angus",
      gender: "Macho",
      birthDate: parseDate("22/07/2019"),
      status: "Saudável",
    },
    {
      name: "Boneca",
      tag: "A004",
      breed: "Holandesa",
      gender: "Fêmea",
      birthDate: parseDate("05/11/2022"),
      status: "Em tratamento",
    },
    {
      name: "Sultão",
      tag: "A005",
      breed: "Brahman",
      gender: "Macho",
      birthDate: parseDate("18/02/2018"),
      status: "Saudável",
    },
  ];

  console.log("Seeding animals...");
  const createdAnimals = await Promise.all(
    animals.map((animal) =>
      prisma.animal.create({
        data: animal,
      })
    )
  );
  console.log(`Created ${createdAnimals.length} animals.`);

  // Map for animal lookup by tag
  const animalMap = createdAnimals.reduce((acc, animal) => {
    acc[animal.tag] = animal;
    return acc;
  }, {} as Record<string, (typeof createdAnimals)[0]>);

  // Create children animals for births
  const childAnimals = [
    {
      name: "Filhote 1",
      tag: "A010",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: parseDate("15/06/2022"),
      status: "Saudável",
    },
    {
      name: "Filhote 2",
      tag: "A015",
      breed: "Gir",
      gender: "Macho",
      birthDate: parseDate("20/07/2023"),
      status: "Saudável",
    },
    {
      name: "Filhote 3",
      tag: "A020",
      breed: "Holandesa",
      gender: "Fêmea",
      birthDate: parseDate("05/01/2023"),
      status: "Em tratamento",
    },
  ];

  console.log("Seeding child animals...");
  const createdChildAnimals = await Promise.all(
    childAnimals.map((animal) =>
      prisma.animal.create({
        data: animal,
      })
    )
  );
  console.log(`Created ${createdChildAnimals.length} child animals.`);

  // Map mothers to children
  const births = [
    {
      motherId: animalMap["A001"].id, // Mimosa
      childId: createdChildAnimals[0].id, // Filhote 1
      birthDate: parseDate("15/06/2022"),
    },
    {
      motherId: animalMap["A002"].id, // Estrela
      childId: createdChildAnimals[1].id, // Filhote 2
      birthDate: parseDate("20/07/2023"),
    },
    {
      motherId: animalMap["A004"].id, // Boneca
      childId: createdChildAnimals[2].id, // Filhote 3
      birthDate: parseDate("05/01/2023"),
    },
  ];

  console.log("Seeding births...");
  await Promise.all(
    births.map((birth) =>
      prisma.birth.create({
        data: birth,
      })
    )
  );
  console.log(`Created ${births.length} birth records.`);

  // Create transactions
  const transactions = [
    {
      type: "Compra",
      animalId: animalMap["A001"].id, // Mimosa
      date: parseDate("15/05/2020"),
      value: 2500.0,
      person: "João Silva",
    },
    {
      type: "Venda",
      animalId: animalMap["A003"].id, // Trovão
      date: parseDate("10/06/2023"),
      value: 3800.0,
      person: "Fazenda Boa Vista",
    },
    {
      type: "Compra",
      animalId: animalMap["A002"].id, // Estrela
      date: parseDate("20/03/2021"),
      value: 2200.0,
      person: "Maria Oliveira",
    },
    {
      type: "Venda",
      animalId: animalMap["A004"].id, // Boneca
      date: parseDate("05/08/2023"),
      value: 2900.0,
      person: "Carlos Mendes",
    },
  ];

  console.log("Seeding transactions...");
  await Promise.all(
    transactions.map((transaction) =>
      prisma.transaction.create({
        data: transaction,
      })
    )
  );
  console.log(`Created ${transactions.length} transaction records.`);

  console.log("Seeding completed!");
}

// Helper function to parse dates in format DD/MM/YYYY
function parseDate(dateString: string): Date {
  // Parse date in format DD/MM/YYYY
  return parse(dateString, "dd/MM/yyyy", new Date());
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
