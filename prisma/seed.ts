const { PrismaClient } = require("../lib/generated/prisma");
const {
  addDays,
  addWeeks,
  addMonths,
  subYears,
  subMonths,
  subDays,
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
  reproductiveStatus?: string;
  inseminationDate?: Date;
  expectedBirthDate?: Date;
  abortionDate?: Date;
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
      reproductiveStatus: "Gestante",
      inseminationDate: subDays(new Date(), 60),
      expectedBirthDate: addDays(subDays(new Date(), 60), 280),
    },
    {
      name: "Estrela",
      tag: "A002",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: new Date("2018-03-15"),
      status: "Ativo",
      reproductiveStatus: "Inseminada",
      inseminationDate: subDays(new Date(), 20),
      expectedBirthDate: addDays(subDays(new Date(), 20), 280),
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
      reproductiveStatus: "Não gestante",
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
      childReproductiveStatus: "Não gestante",
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
      childReproductiveStatus: "Não gestante",
    },
  ];

  for (const birthData of birthsData) {
    // Create the child animal
    const childData = {
      name: birthData.childName,
      tag: birthData.childTag,
      breed: birthData.childBreed,
      gender: birthData.childGender,
      birthDate: birthData.birthDate,
      status: birthData.childStatus,
    };
    
    // Add reproductive status for females
    if (birthData.childGender === "Fêmea" && birthData.childReproductiveStatus) {
      (childData as any).reproductiveStatus = birthData.childReproductiveStatus;
    }
    
    const child = await prisma.animal.create({
      data: childData,
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

  // Create reproductive events for female animals
  const reproEvents = [
    {
      title: "Inseminação",
      type: "Manejo Reprodutivo",
      date: subDays(now, 90),
      description: "Inseminação artificial",
      animals: [animals[0].id], // Mimosa
    },
    {
      title: "Confirmação de Gestação",
      type: "Manejo Reprodutivo",
      date: subDays(now, 60),
      description: "Gestação confirmada por ultrassom",
      animals: [animals[0].id], // Mimosa
    },
    {
      title: "Inseminação",
      type: "Manejo Reprodutivo",
      date: subDays(now, 20),
      description: "Inseminação artificial",
      animals: [animals[1].id], // Estrela
    },
    {
      title: "Parto",
      type: "Manejo Reprodutivo",
      date: subMonths(now, 8),
      description: "Parto realizado com sucesso",
      animals: [animals[1].id], // Estrela - previous pregnancy
    },
    {
      title: "Aborto",
      type: "Manejo Reprodutivo",
      date: subMonths(now, 3),
      description: "Registro de aborto",
      animals: [animals[3].id], // Boneca
    },
  ];

  // Add reproductive events to the events list
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
      animals: [animals[3].id], // Boneca
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
      animals: [animals[1].id, animals[3].id],
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
    ...reproEvents,
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

  // Create transactions data
  const transactionsData = [
    {
      type: "Compra",
      date: subMonths(new Date(), 2),
      value: 5000,
      person: "João Silva",
      animalId: animals[0].id,
    },
    {
      type: "Venda",
      date: subMonths(new Date(), 2),
      value: 3500,
      person: "Maria Oliveira",
      animalId: animals[1].id,
    },
    {
      type: "Compra",
      date: subMonths(new Date(), 1.5),
      value: 7500,
      person: "Carlos Santos",
      animalId: animals[2].id,
    },
    {
      type: "Venda",
      date: subMonths(new Date(), 1),
      value: 8000,
      person: "Ana Pereira",
      animalId: animals[3].id,
    },
    {
      type: "Compra",
      date: subMonths(new Date(), 0.5),
      value: 12000,
      person: "Roberto Costa",
      animalId: animals[4].id,
    },
    {
      type: "Venda",
      date: new Date(),
      value: 15000,
      person: "Patricia Lima",
      animalId: animals[0].id,
    },
  ];

  for (const transactionData of transactionsData) {
    await prisma.transaction.create({
      data: transactionData,
    });
    console.log(
      `Created transaction: ${transactionData.type} - R$ ${transactionData.value}`
    );
  }

  // Create some lotes
  const lote1 = await prisma.lote.create({
    data: {
      nome: "Lote de Cria 1",
      descricao: "Lote para cria de bezerros",
      finalidade: "Cria",
    },
  });

  const lote2 = await prisma.lote.create({
    data: {
      nome: "Lote de Engorda",
      descricao: "Lote para engorda de bois",
      finalidade: "Engorda",
    },
  });

  const lote3 = await prisma.lote.create({
    data: {
      nome: "Lote de Leite",
      descricao: "Lote de vacas leiteiras",
      finalidade: "Leite",
    },
  });

  // Assign some animals to lotes
  await prisma.animal.update({
    where: { id: animals[0].id },
    data: { loteId: lote1.id },
  });

  await prisma.animal.update({
    where: { id: animals[1].id },
    data: { loteId: lote2.id },
  });

  await prisma.animal.update({
    where: { id: animals[2].id },
    data: { loteId: lote3.id },
  });

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
