const { PrismaClient } = require("../lib/generated/prisma");
const {
  addDays,
  addWeeks,
  addMonths,
  subYears,
  subMonths,
  subDays,
  subWeeks,
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
  weight?: number;
}

// Helper functions to generate random data
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number, decimals = 2) {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.birth.deleteMany();
  await prisma.eventAnimal.deleteMany();
  await prisma.event.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.lote.deleteMany();

  // Create some animals
  const femaleNames = [
    "Mimosa", "Estrela", "Boneca", "Florzinha", "Princesa", 
    "Joia", "Esmeralda", "Pérola", "Lua", "Sol", 
    "Dália", "Rosa", "Violeta", "Margarida", "Jasmin",
    "Beleza", "Formosa", "Rainha", "Fortuna", "Vitória"
  ];
  
  const maleNames = [
    "Trovão", "Sultão", "Relâmpago", "Campeão", "Diamante", 
    "Ouro", "Meteor", "Valente", "Bravo", "Rei", 
    "Gigante", "Nobre", "Duque", "Príncipe", "Mestre",
    "Guerreiro", "Conquistador", "Vencedor", "Dominante", "Orgulho"
  ];
  
  const breeds = ["Nelore", "Gir", "Brahman", "Angus", "Girolando", "Guzerá", "Senepol"];
  
  // Create adult females (matrices)
  const matricesData = [];
  for (let i = 0; i < 15; i++) {
    const name = femaleNames[i];
    const tag = `A${(i + 1).toString().padStart(3, '0')}`;
    const breed = getRandomElement(breeds);
    const birthYear = getRandomInt(2017, 2021);
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28);
    
    const reproductiveStatuses = ["Não gestante", "Inseminada", "Gestante", "Parto", "Aborto"];
    const reproStatus = getRandomElement(reproductiveStatuses);
    
    let inseminationDate = null;
    let expectedBirthDate = null;
    let abortionDate = null;
    
    if (reproStatus === "Inseminada" || reproStatus === "Gestante") {
      const daysAgo = reproStatus === "Inseminada" ? getRandomInt(10, 40) : getRandomInt(41, 250);
      inseminationDate = subDays(new Date(), daysAgo);
      expectedBirthDate = addDays(inseminationDate, 280);
    } else if (reproStatus === "Aborto") {
      inseminationDate = subDays(new Date(), getRandomInt(60, 150));
      abortionDate = subDays(new Date(), getRandomInt(10, 50));
    }
    
    const weight = getRandomFloat(350, 550);
    
    matricesData.push({
      name,
      tag,
      breed,
      gender: "Fêmea",
      birthDate: new Date(`${birthYear}-${birthMonth}-${birthDay}`),
      status: "Ativo",
      reproductiveStatus: reproStatus,
      inseminationDate,
      expectedBirthDate,
      abortionDate,
      weight,
    });
  }

  // Create adult males (reprodutores)
  const reprodutoresData = [];
  for (let i = 0; i < 8; i++) {
    const name = maleNames[i];
    const tag = `B${(i + 1).toString().padStart(3, '0')}`;
    const breed = getRandomElement(breeds);
    const birthYear = getRandomInt(2017, 2021);
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28);
    const weight = getRandomFloat(450, 750);
    
    reprodutoresData.push({
      name,
      tag,
      breed,
      gender: "Macho",
      birthDate: new Date(`${birthYear}-${birthMonth}-${birthDay}`),
      status: "Ativo",
      weight,
    });
  }

  // Combine all adult animals
  const animalsData = [...matricesData, ...reprodutoresData];

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
  const childrenData = [];
  
  // Create past births (at least 30 births)
  for (let i = 0; i < 30; i++) {
    const isFemale = Math.random() > 0.5;
    const nameIndex = getRandomInt(0, isFemale ? femaleNames.length - 1 : maleNames.length - 1);
    const name = isFemale ? femaleNames[nameIndex] + " Jr." : maleNames[nameIndex] + " Jr.";
    const tag = `C${(i + 1).toString().padStart(3, '0')}`;
    const motherIndex = getRandomInt(0, matricesData.length - 1);
    const fatherIndex = getRandomInt(0, reprodutoresData.length - 1) + matricesData.length; // Offset by number of females
    
    // Determine breed based on parents
    const motherBreed = createdAnimals[motherIndex].breed;
    const fatherBreed = createdAnimals[fatherIndex].breed;
    let breed = motherBreed;
    if (motherBreed !== fatherBreed) {
      breed = `${motherBreed}/${fatherBreed}`;
    }
    
    // Determine birth date
    const monthsAgo = getRandomInt(1, 18);
    const birthDate = subMonths(new Date(), monthsAgo);
    
    // Determine weight based on age and gender
    const maxWeight = isFemale ? 300 : 400;
    const minWeight = 30;
    const weightFactor = (monthsAgo + 1) / 19; // 1-18 months old
    const weight = getRandomFloat(minWeight, minWeight + (maxWeight - minWeight) * weightFactor);
    
    childrenData.push({
      childName: name,
      childTag: tag,
      childBreed: breed,
      childGender: isFemale ? "Fêmea" : "Macho",
      motherIndex,
      fatherIndex,
      birthDate,
      childStatus: "Ativo",
      childReproductiveStatus: isFemale ? "Não gestante" : undefined,
      weight,
    });
  }

  for (const birthData of childrenData) {
    // Create the child animal
    const childData = {
      name: birthData.childName,
      tag: birthData.childTag,
      breed: birthData.childBreed,
      gender: birthData.childGender,
      birthDate: birthData.birthDate,
      status: birthData.childStatus,
      weight: birthData.weight,
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
  const reproEvents = [];
  
  // Create insemination events
  const femaleAnimals = animals.filter((a: Animal) => a.gender === "Fêmea");
  for (const female of femaleAnimals) {
    if (female.reproductiveStatus === "Inseminada" || female.reproductiveStatus === "Gestante") {
      reproEvents.push({
        title: "Inseminação",
        type: "Manejo Reprodutivo",
        date: female.inseminationDate || subDays(now, getRandomInt(30, 150)),
        description: "Inseminação artificial",
        animals: [female.id],
      });
      
      // Add pregnancy confirmation for gestating females
      if (female.reproductiveStatus === "Gestante") {
        reproEvents.push({
          title: "Confirmação de Gestação",
          type: "Manejo Reprodutivo",
          date: addDays(female.inseminationDate || subDays(now, getRandomInt(30, 150)), getRandomInt(25, 40)),
          description: "Gestação confirmada por ultrassom",
          animals: [female.id],
        });
      }
    }
    
    // Add abortion events
    if (female.reproductiveStatus === "Aborto" && female.abortionDate) {
      reproEvents.push({
        title: "Aborto",
        type: "Manejo Reprodutivo",
        date: female.abortionDate,
        description: "Registro de aborto",
        animals: [female.id],
      });
    }
  }
  
  // Create birth events for all births
  const birthRecords = await prisma.birth.findMany({
    include: {
      mother: true,
      child: true,
    },
  });
  
  for (const birth of birthRecords) {
    reproEvents.push({
      title: "Parto",
      type: "Manejo Reprodutivo",
      date: birth.birthDate,
      description: `Nascimento de ${birth.child.name}`,
      animals: [birth.motherId, birth.childId],
    });
  }

  // Add reproductive events to the events list
  const eventsData = [
    // Next week events
    {
      title: "Vacinação",
      type: "Manejo Sanitário",
      date: addDays(now, 3),
      description: "Vacinação contra febre aftosa",
      animals: femaleAnimals.slice(0, 15).map((a: Animal) => a.id),
    },
    {
      title: "Pesagem de Bezerros",
      type: "Pesagem",
      date: addDays(now, 6),
      description: "Pesagem de bezerros recém-nascidos",
      animals: animals.filter((a: Animal) => {
        const birthDate = new Date(a.birthDate);
        const ageInMonths = (now.getFullYear() - birthDate.getFullYear()) * 12 + now.getMonth() - birthDate.getMonth();
        return ageInMonths <= 6;
      }).slice(0, 10).map((a: Animal) => a.id),
    },
    // Next month events
    {
      title: "Inseminação",
      type: "Manejo Reprodutivo",
      date: addDays(now, 12),
      description: "Inseminação artificial",
      animals: femaleAnimals.filter((a: Animal) => a.reproductiveStatus === "Não gestante").slice(0, 5).map((a: Animal) => a.id),
    },
    {
      title: "Pesagem Mensal",
      type: "Pesagem",
      date: addDays(now, 20),
      description: "Pesagem mensal de todos os animais",
      animals: animals.slice(0, 30).map((a: Animal) => a.id),
    },
    {
      title: "Vermifugação",
      type: "Manejo Sanitário",
      date: addWeeks(now, 3),
      description: "Aplicação de vermífugo",
      animals: animals.slice(0, 25).map((a: Animal) => a.id),
    },
    // Next 3 months events
    {
      title: "Diagnóstico de Gestação",
      type: "Manejo Reprodutivo",
      date: addMonths(now, 2),
      description: "Diagnóstico de gestação por ultrassom",
      animals: femaleAnimals.filter((a: Animal) => a.reproductiveStatus === "Inseminada").map((a: Animal) => a.id),
    },
    {
      title: "Vacinação Semestral",
      type: "Manejo Sanitário",
      date: addMonths(now, 2.5),
      description: "Vacinação semestral do rebanho",
      animals: animals.slice(0, 40).map((a: Animal) => a.id),
    },
    {
      title: "Avaliação Reprodutiva",
      type: "Manejo Reprodutivo",
      date: addMonths(now, 3),
      description: "Avaliação do estado reprodutivo das matrizes",
      animals: femaleAnimals.slice(0, 15).map((a: Animal) => a.id),
    },
    ...reproEvents,
  ];

  // Add past weight events (several months of history)
  for (let month = 1; month <= 12; month++) {
    // Create monthly weight recordings for the past year
    const eventDate = subMonths(now, month);
    const weighingEvent = {
      title: `Pesagem ${month === 1 ? 'do Mês Passado' : `de ${month} Meses Atrás`}`,
      type: "Pesagem",
      date: eventDate,
      description: `Pesagem mensal - ${eventDate.toLocaleDateString('pt-BR')}`,
      animals: animals.slice(0, 35).map((a: Animal) => a.id),
    };
    eventsData.push(weighingEvent);
  }

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
  const personNames = [
    "João Silva", "Maria Oliveira", "Carlos Santos", "Ana Pereira", 
    "Roberto Costa", "Patricia Lima", "Fernando Souza", "Luiza Castro",
    "Ricardo Almeida", "Camila Rodrigues", "Marcos Ferreira", "Juliana Ribeiro"
  ];
  
  const transactionsData = [];
  
  // Create purchase transactions
  for (let i = 0; i < 20; i++) {
    const animalIndex = getRandomInt(0, Math.min(animals.length - 1, 30));
    const monthsAgo = getRandomInt(1, 24);
    transactionsData.push({
      type: "Compra",
      date: subMonths(now, monthsAgo),
      value: getRandomFloat(2000, 15000),
      person: getRandomElement(personNames),
      animalId: animals[animalIndex].id,
    });
  }
  
  // Create sale transactions
  for (let i = 0; i < 15; i++) {
    const animalIndex = getRandomInt(0, Math.min(animals.length - 1, 30));
    const monthsAgo = getRandomInt(0, 18);
    transactionsData.push({
      type: "Venda",
      date: subMonths(now, monthsAgo),
      value: getRandomFloat(3000, 18000),
      person: getRandomElement(personNames),
      animalId: animals[animalIndex].id,
    });
  }

  for (const transactionData of transactionsData) {
    await prisma.transaction.create({
      data: transactionData,
    });
    console.log(
      `Created transaction: ${transactionData.type} - R$ ${transactionData.value}`
    );
  }

  // Create a variety of lotes with different purposes
  const lotesData = [
    {
      nome: "Matrizes A",
      descricao: "Lote de vacas matrizes de alta produção",
      finalidade: "Cria"
    },
    {
      nome: "Matrizes B",
      descricao: "Lote de vacas matrizes em recuperação",
      finalidade: "Cria"
    },
    {
      nome: "Novilhas Prontas",
      descricao: "Novilhas prontas para reprodução",
      finalidade: "Recria"
    },
    {
      nome: "Bezerros Desmama",
      descricao: "Bezerros em fase de desmama",
      finalidade: "Cria"
    },
    {
      nome: "Touros Reprodutores",
      descricao: "Touros utilizados para reprodução",
      finalidade: "Reprodução"
    },
    {
      nome: "Engorda Fase 1",
      descricao: "Bovinos em primeira fase de engorda",
      finalidade: "Engorda"
    },
    {
      nome: "Engorda Fase 2",
      descricao: "Bovinos em fase final de engorda",
      finalidade: "Engorda"
    },
    {
      nome: "Vacas Leiteiras",
      descricao: "Vacas em produção de leite",
      finalidade: "Leite"
    }
  ];
  
  const createdLotes = [];
  for (const loteData of lotesData) {
    const lote = await prisma.lote.create({
      data: loteData
    });
    createdLotes.push(lote);
    console.log(`Created lote: ${loteData.nome}`);
  }

  // Assign animals to lotes
  for (const animal of animals) {
    let loteId = null;
    
    // Logic to determine which lote an animal belongs to
    if (animal.gender === "Fêmea") {
      const birthDate = new Date(animal.birthDate);
      const ageInMonths = (now.getFullYear() - birthDate.getFullYear()) * 12 + now.getMonth() - birthDate.getMonth();
      
      if (ageInMonths < 6) {
        loteId = createdLotes[3].id; // Bezerros Desmama
      } else if (ageInMonths < 18) {
        loteId = createdLotes[2].id; // Novilhas Prontas
      } else {
        // Adult females
        if (animal.reproductiveStatus === "Gestante" || animal.reproductiveStatus === "Inseminada") {
          loteId = createdLotes[0].id; // Matrizes A
        } else if (animal.reproductiveStatus === "Aborto") {
          loteId = createdLotes[1].id; // Matrizes B
        } else {
          // Randomly assign to Matrizes A, Matrizes B or Vacas Leiteiras
          const loteIndex = getRandomInt(0, 2);
          loteId = loteIndex === 2 ? createdLotes[7].id : createdLotes[loteIndex].id;
        }
      }
    } else {
      // Males
      const birthDate = new Date(animal.birthDate);
      const ageInMonths = (now.getFullYear() - birthDate.getFullYear()) * 12 + now.getMonth() - birthDate.getMonth();
      
      if (ageInMonths < 6) {
        loteId = createdLotes[3].id; // Bezerros Desmama
      } else if (ageInMonths < 12) {
        loteId = createdLotes[5].id; // Engorda Fase 1
      } else if (ageInMonths < 24) {
        loteId = createdLotes[6].id; // Engorda Fase 2
      } else {
        loteId = createdLotes[4].id; // Touros Reprodutores
      }
    }
    
    if (loteId) {
      await prisma.animal.update({
        where: { id: animal.id },
        data: { loteId },
      });
    }
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
