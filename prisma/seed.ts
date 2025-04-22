const { PrismaClient } = require("../lib/generated/prisma");
const { addDays, addWeeks, addMonths } = require("date-fns");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create some animals if they don't exist
  const animalsData = [
    {
      name: "Mimosa",
      tag: "A001",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: new Date("2020-05-10"),
      status: "Ativo",
    },
    {
      name: "Estrela",
      tag: "A002",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: new Date("2019-03-15"),
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
      birthDate: new Date("2021-01-30"),
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

  for (const animalData of animalsData) {
    const existingAnimal = await prisma.animal.findUnique({
      where: { tag: animalData.tag },
    });

    if (!existingAnimal) {
      await prisma.animal.create({
        data: animalData,
      });
      console.log(`Created animal: ${animalData.name} (${animalData.tag})`);
    }
  }

  // Get all animals
  const animals = await prisma.animal.findMany();

  // Delete existing events
  await prisma.eventAnimal.deleteMany();
  await prisma.event.deleteMany();

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
      animals: animals.map((animal: { id: string }) => animal.id),
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
      animals: animals.map((animal: { id: string }) => animal.id),
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
