"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type ReproductiveStatus = 
  | "Não gestante" 
  | "Inseminada" 
  | "Gestante" 
  | "Parto" 
  | "Aborto"

export async function getAnimalDetails(id: string) {
  if (!id) throw new Error("ID do animal é obrigatório")

  const animal = await prisma.animal.findUnique({
    where: { id },
    include: {
      lote: true,
    }
  })

  if (!animal) {
    throw new Error("Animal não encontrado")
  }

  // Get animal events
  const eventAnimals = await prisma.eventAnimal.findMany({
    where: { animalId: id },
    include: {
      event: true,
    },
    orderBy: {
      event: {
        date: 'desc',
      },
    },
  })

  const events = eventAnimals.map(ea => ea.event)

  // Get births where this animal is the mother
  const birthsAsMother = await prisma.birth.findMany({
    where: { motherId: id },
    include: {
      child: true,
    },
    orderBy: {
      birthDate: 'desc',
    },
  })

  // Get transactions for this animal
  const transactions = await prisma.transaction.findMany({
    where: { animalId: id },
    orderBy: {
      date: 'desc',
    },
  })

  return {
    animal,
    events,
    births: birthsAsMother,
    transactions,
  }
}

export async function updateReproductiveStatus(
  id: string, 
  status: ReproductiveStatus
) {
  if (!id) throw new Error("ID do animal é obrigatório")

  try {
    const animal = await prisma.animal.findUnique({
      where: { id },
    })

    if (!animal) {
      throw new Error("Animal não encontrado")
    }

    if (animal.gender !== "Fêmea") {
      throw new Error("Apenas fêmeas podem ter status reprodutivo")
    }

    const now = new Date()
    let updateData: any = {
      reproductiveStatus: status,
    }

    // Create a reproductive event
    let eventTitle
    let eventDescription

    switch (status) {
      case "Inseminada":
        eventTitle = "Inseminação"
        eventDescription = "Animal inseminado"
        // Add 9 months (approximately 280 days) for expected birth date
        const expectedBirthDate = new Date(now)
        expectedBirthDate.setDate(now.getDate() + 280)
        updateData.inseminationDate = now
        updateData.expectedBirthDate = expectedBirthDate
        break
      case "Gestante":
        eventTitle = "Confirmação de Gestação"
        eventDescription = "Gestação confirmada"
        break
      case "Parto":
        eventTitle = "Parto"
        eventDescription = "Parto realizado"
        break
      case "Aborto":
        eventTitle = "Aborto"
        eventDescription = "Registro de aborto"
        updateData.abortionDate = now
        break
      case "Não gestante":
        eventTitle = "Atualização de Status"
        eventDescription = "Status alterado para não gestante"
        break
    }

    // Update the animal
    await prisma.animal.update({
      where: { id },
      data: updateData,
    })

    // Create an event for this reproductive status change
    const event = await prisma.event.create({
      data: {
        title: eventTitle,
        type: "Manejo Reprodutivo",
        date: now,
        description: eventDescription,
        animals: {
          create: [
            {
              animal: {
                connect: {
                  id,
                },
              },
            },
          ],
        },
      },
    })

    revalidatePath(`/animais/${id}`)
    return { success: true, eventId: event.id }
  } catch (error) {
    console.error("Error updating reproductive status:", error)
    throw new Error("Erro ao atualizar status reprodutivo")
  }
}
