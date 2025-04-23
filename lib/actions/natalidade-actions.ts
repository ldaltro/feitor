"use server"

import { prisma } from "@/lib/prisma"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import { createExcelFile } from "@/lib/utils/excel"
import path from "path"
import fs from "fs-extra"
import { NextResponse } from "next/server"

export interface NatalidadeData {
  stats: {
    totalAnimals: number
    femaleAnimals: number
    pregnantAnimals: number
    inseminatedAnimals: number
    birthsThisMonth: number
    birthsLastMonth: number
  }
  chartData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
    }[]
  }
  tableData: {
    id: string
    tag: string
    name: string
    status: string
    birthDate: string
    reproductiveStatus: string
    inseminationDate: string
    expectedBirthDate: string
  }[]
}

export async function getNatalidadeData(): Promise<NatalidadeData> {
  try {
    // Get total animals
    const totalAnimals = await prisma.animal.count({
      where: { active: true }
    })

    // Get female animals
    const femaleAnimals = await prisma.animal.count({
      where: {
        gender: "Fêmea",
        active: true
      }
    })

    // Get pregnant animals
    const pregnantAnimals = await prisma.animal.count({
      where: {
        gender: "Fêmea",
        reproductiveStatus: "Gestante",
        active: true
      }
    })

    // Get inseminated animals
    const inseminatedAnimals = await prisma.animal.count({
      where: {
        gender: "Fêmea",
        reproductiveStatus: "Inseminada",
        active: true
      }
    })

    // Get births this month
    const now = new Date()
    const startThisMonth = startOfMonth(now)
    const endThisMonth = endOfMonth(now)

    const birthsThisMonth = await prisma.birth.count({
      where: {
        birthDate: {
          gte: startThisMonth,
          lte: endThisMonth
        }
      }
    })

    // Get births last month
    const lastMonth = subMonths(now, 1)
    const startLastMonth = startOfMonth(lastMonth)
    const endLastMonth = endOfMonth(lastMonth)

    const birthsLastMonth = await prisma.birth.count({
      where: {
        birthDate: {
          gte: startLastMonth,
          lte: endLastMonth
        }
      }
    })

    // Get chart data - last 6 months of births
    const labels = []
    const birthCounts = []

    for (let i = 0; i < 6; i++) {
      const month = subMonths(now, i)
      const start = startOfMonth(month)
      const end = endOfMonth(month)
      
      const count = await prisma.birth.count({
        where: {
          birthDate: {
            gte: start,
            lte: end
          }
        }
      })
      
      labels.unshift(format(month, "MMM/yyyy", { locale: ptBR }))
      birthCounts.unshift(count)
    }

    // Get female animals for table
    const femaleAnimalsData = await prisma.animal.findMany({
      where: {
        gender: "Fêmea",
        active: true
      },
      orderBy: {
        tag: "asc"
      }
    })

    // Format data for table
    const tableData = femaleAnimalsData.map(animal => ({
      id: animal.id,
      tag: animal.tag,
      name: animal.name,
      status: animal.status,
      birthDate: animal.birthDate ? format(animal.birthDate, "dd/MM/yyyy", { locale: ptBR }) : "—",
      reproductiveStatus: animal.reproductiveStatus || "—",
      inseminationDate: animal.inseminationDate ? format(animal.inseminationDate, "dd/MM/yyyy", { locale: ptBR }) : "—",
      expectedBirthDate: animal.expectedBirthDate ? format(animal.expectedBirthDate, "dd/MM/yyyy", { locale: ptBR }) : "—",
    }))

    return {
      stats: {
        totalAnimals,
        femaleAnimals,
        pregnantAnimals,
        inseminatedAnimals,
        birthsThisMonth,
        birthsLastMonth
      },
      chartData: {
        labels,
        datasets: [
          {
            label: "Nascimentos",
            data: birthCounts
          }
        ]
      },
      tableData
    }
  } catch (error) {
    console.error("Error fetching natalidade data:", error)
    throw new Error("Falha ao buscar dados de natalidade")
  }
}

export async function exportToExcel(): Promise<{ success: boolean, filePath: string }> {
  try {
    // Get the data
    const data = await getNatalidadeData()
    
    // Format date for filename
    const dateStr = format(new Date(), "dd-MM-yyyy", { locale: ptBR })
    
    // Prepare data for Excel export
    const statsSheet = [
      {
        "Estatística": "Total de Animais",
        "Valor": data.stats.totalAnimals
      },
      {
        "Estatística": "Fêmeas",
        "Valor": data.stats.femaleAnimals
      },
      {
        "Estatística": "Gestantes",
        "Valor": data.stats.pregnantAnimals
      },
      {
        "Estatística": "Inseminadas",
        "Valor": data.stats.inseminatedAnimals
      },
      {
        "Estatística": "Nascimentos Este Mês",
        "Valor": data.stats.birthsThisMonth
      },
      {
        "Estatística": "Nascimentos Mês Anterior",
        "Valor": data.stats.birthsLastMonth
      }
    ]
    
    // Format table data for Excel
    const animalsSheet = data.tableData.map(animal => ({
      "Tag": animal.tag,
      "Nome": animal.name,
      "Status": animal.status,
      "Data de Nascimento": animal.birthDate,
      "Status Reprodutivo": animal.reproductiveStatus,
      "Data de Inseminação": animal.inseminationDate,
      "Previsão de Parto": animal.expectedBirthDate
    }))
    
    // Create Excel file
    const filePath = await createExcelFile({
      filename: `Relatório_Natalidade_${dateStr}`,
      sheets: [
        {
          name: "Estatísticas",
          data: statsSheet
        },
        {
          name: "Animais",
          data: animalsSheet
        }
      ]
    })
    
    return { success: true, filePath }
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    throw new Error("Falha ao exportar dados para Excel")
  }
}

export async function downloadExcel(): Promise<Response> {
  try {
    const { filePath } = await exportToExcel()
    
    // Read file
    const fileBuffer = await fs.readFile(filePath)
    
    // Create response
    const response = new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="Relatório_Natalidade.xlsx"`,
      },
    })
    
    // Delete the temporary file after sending
    fs.unlink(filePath).catch(err => console.error("Error deleting temporary file:", err))
    
    return response
  } catch (error) {
    console.error("Error downloading Excel:", error)
    return new NextResponse("Erro ao gerar arquivo Excel", { status: 500 })
  }
}
