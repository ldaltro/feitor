import { PrismaClient } from "@/lib/generated/prisma";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting production seed...");

  // Create user
  const username = "feitor";
  const password = "Feitor1234";
  
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser) {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    console.log(`User created: ${user.username}`);
  } else {
    console.log(`User ${username} already exists`);
  }

  // Create animals
  const animals = [
    {
      name: "Mimosa",
      tag: "001",
      breed: "Nelore",
      gender: "F",
      birthDate: new Date("2020-03-15"),
      status: "active",
      reproductiveStatus: "Gestante",
      inseminationDate: new Date("2023-11-01"),
      expectedBirthDate: new Date("2024-08-01"),
      weight: 450.5,
      purchaseDate: new Date("2021-06-10"),
      purchaseValue: 3500,
    },
    {
      name: "Estrela",
      tag: "002",
      breed: "Angus",
      gender: "F",
      birthDate: new Date("2019-07-22"),
      status: "active",
      weight: 480.0,
      purchaseDate: new Date("2020-09-15"),
      purchaseValue: 4200,
    },
    {
      name: "Tornado",
      tag: "003",
      breed: "Nelore",
      gender: "M",
      birthDate: new Date("2018-11-10"),
      status: "active",
      weight: 850.0,
      purchaseDate: new Date("2020-03-20"),
      purchaseValue: 8500,
    },
  ];

  for (const animal of animals) {
    const existing = await prisma.animal.findUnique({
      where: { tag: animal.tag },
    });

    if (!existing) {
      await prisma.animal.create({ data: animal });
      console.log(`Animal created: ${animal.name} (${animal.tag})`);
    } else {
      console.log(`Animal ${animal.name} (${animal.tag}) already exists`);
    }
  }

  // Create lotes
  const lotes = [
    {
      nome: "Lote Matrizes",
      descricao: "Matrizes reprodutoras principais",
      finalidade: "Cria",
    },
    {
      nome: "Lote Engorda 2024",
      descricao: "Animais em fase de engorda",
      finalidade: "Engorda",
    },
  ];

  for (const lote of lotes) {
    const existing = await prisma.lote.findFirst({
      where: { nome: lote.nome },
    });

    if (!existing) {
      await prisma.lote.create({ data: lote });
      console.log(`Lote created: ${lote.nome}`);
    } else {
      console.log(`Lote ${lote.nome} already exists`);
    }
  }

  // Create some events
  const mimosa = await prisma.animal.findUnique({ where: { tag: "001" } });
  if (mimosa) {
    const eventData = {
      title: "Vacinação - Febre Aftosa",
      type: "Manejo Sanitário",
      date: new Date("2024-01-15"),
      description: "Aplicação de vacina contra febre aftosa - dose semestral",
    };

    const existingEvent = await prisma.event.findFirst({
      where: {
        title: eventData.title,
        date: eventData.date,
      },
    });

    if (!existingEvent) {
      const event = await prisma.event.create({
        data: {
          ...eventData,
          animals: {
            create: {
              animalId: mimosa.id,
            },
          },
        },
      });
      console.log(`Event created: ${event.title}`);
    } else {
      console.log(`Event ${eventData.title} already exists`);
    }
  }

  console.log("Production seed completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });