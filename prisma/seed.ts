const { PrismaClient } = require("../lib/generated/prisma");
const {
  addDays,
  addWeeks,
  addMonths,
  subYears,
  subMonths,
} = require("date-fns");

const prisma = new PrismaClient();

// Define interfaces for type safety
interface Animal {
  id: string;
  name: string;
  tag: string;
  breed: string;
  gender: string;
  birthDate: Date;
  status: string;
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.birth.deleteMany();
  await prisma.eventAnimal.deleteMany();
  await prisma.event.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.animal.deleteMany();

  // Create some animals
  const animalsData = [
    {
      name: "Mimosa",
      tag: "A001",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: new Date("2018-05-10"),
      status: "Ativo",
    },
    {
      name: "Estrela",
      tag: "A002",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: new Date("2018-03-15"),
      status: "Ativo",
    },
    {
      name: "Trovão",
      tag: "A003",
      breed: "Nelore",
      gender: "Macho",
      birthDate: new Date("2018-07-22"),
      status: "Ativo",
    },
    {
      name: "Boneca",
      tag: "A004",
      breed: "Gir",
      gender: "Fêmea",
      birthDate: new Date("2018-01-30"),
      status: "Ativo",
    },
    {
      name: "Sultão",
      tag: "A005",
      breed: "Gir",
      gender: "Macho",
      birthDate: new Date("2017-11-05"),
      status: "Ativo",
    },
  ];

  // Create main animals
  const createdAnimals: Animal[] = [];
  for (const animalData of animalsData) {
    const animal = await prisma.animal.create({
      data: animalData,
    });
    createdAnimals.push(animal as Animal);
    console.log(`Created animal: ${animalData.name} (${animalData.tag})`);
  }

  // Create child animals and birth records
  const birthsData = [
    {
      childName: "Florzinha",
      childTag: "A006",
      childBreed: "Nelore",
      childGender: "Fêmea",
      motherIndex: 0, // Mimosa
      fatherIndex: 2, // Trovão
      birthDate: subMonths(new Date(), 6),
      childStatus: "Ativo",
    },
    {
      childName: "Relâmpago",
      childTag: "A007",
      childBreed: "Nelore",
      childGender: "Macho",
      motherIndex: 1, // Estrela
      fatherIndex: 2, // Trovão
      birthDate: subMonths(new Date(), 8),
      childStatus: "Ativo",
    },
    {
      childName: "Beleza",
      childTag: "A008",
      childBreed: "Gir",
      childGender: "Fêmea",
      motherIndex: 3, // Boneca
      fatherIndex: 4, // Sultão
      birthDate: subMonths(new Date(), 4),
      childStatus: "Ativo",
    },
  ];

  for (const birthData of birthsData) {
    // Create the child animal
    const child = await prisma.animal.create({
      data: {
        name: birthData.childName,
        tag: birthData.childTag,
        breed: birthData.childBreed,
        gender: birthData.childGender,
        birthDate: birthData.birthDate,
        status: birthData.childStatus,
      },
    });

    // Create the birth record linking the mother, father and child
    await prisma.birth.create({
      data: {
        birthDate: birthData.birthDate,
        motherId: createdAnimals[birthData.motherIndex].id,
        fatherId: createdAnimals[birthData.fatherIndex].id,
        childId: child.id,
      },
    });

    console.log(
      `Created birth record for: ${birthData.childName} (${birthData.childTag})`
    );
  }

  // Get all animals (including the newly created ones)
  const animals = await prisma.animal.findMany();

  const now = new Date();

  // Create events distributed across different time periods
  const eventsData = [
    // Next week events
    {
      title: "Vacinação",
      type: "Manejo Sanitário",
      date: addDays(now, 3),
      description: "Vacinação contra febre aftosa",
      animals: [animals[0].id, animals[1].id, animals[3].id],
    },
    {
      title: "Pesagem de Bezerros",
      type: "Pesagem",
      date: addDays(now, 6),
      description: "Pesagem de bezerros recém-nascidos",
      animals: [animals[2].id, animals[4].id],
    },
    // Next month events
    {
      title: "Inseminação",
      type: "Manejo Reprodutivo",
      date: addDays(now, 12),
      description: "Inseminação artificial",
      animals: [animals[1].id, animals[3].id],
    },
    {
      title: "Pesagem Mensal",
      type: "Pesagem",
      date: addDays(now, 20),
      description: "Pesagem mensal de todos os animais",
      animals: animals.map((animal: Animal) => animal.id),
    },
    {
      title: "Vermifugação",
      type: "Manejo Sanitário",
      date: addWeeks(now, 3),
      description: "Aplicação de vermífugo",
      animals: [animals[0].id, animals[1].id, animals[2].id, animals[3].id],
    },
    // Next 3 months events
    {
      title: "Diagnóstico de Gestação",
      type: "Manejo Reprodutivo",
      date: addMonths(now, 2),
      description: "Diagnóstico de gestação por ultrassom",
      animals: [animals[0].id, animals[1].id, animals[3].id],
    },
    {
      title: "Vacinação Semestral",
      type: "Manejo Sanitário",
      date: addMonths(now, 2.5),
      description: "Vacinação semestral do rebanho",
      animals: animals.map((animal: Animal) => animal.id),
    },
    {
      title: "Avaliação Reprodutiva",
      type: "Manejo Reprodutivo",
      date: addMonths(now, 3),
      description: "Avaliação do estado reprodutivo das matrizes",
      animals: [animals[0].id, animals[1].id, animals[3].id],
    },
  ];

  for (const eventData of eventsData) {
    const { animals: animalIds, ...eventInfo } = eventData;

    await prisma.event.create({
      data: {
        ...eventInfo,
        animals: {
          create: animalIds.map((animalId: string) => ({
            animal: {
              connect: {
                id: animalId,
              },
            },
          })),
        },
      },
    });
    console.log(`Created event: ${eventData.title}`);
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
