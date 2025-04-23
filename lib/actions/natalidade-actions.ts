"use server"

import { prisma } from "@/lib/prisma"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import { createExcelFile, saveExcelFile } from "@/lib/utils/excel"
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
    console.log("Fetching natalidade data...");
    
    // Get total animals
    const totalAnimals = await prisma.animal.count({
      where: { active: true }
    })
    console.log("Total animals:", totalAnimals);

    // Get female animals
    const femaleAnimals = await prisma.animal.count({
      where: {
        gender: "Fêmea",
        active: true
      }
    })
    console.log("Female animals:", femaleAnimals);

    // Get pregnant animals - using case insensitive contains
    const pregnantAnimals = await prisma.animal.count({
      where: {
        gender: "Fêmea",
        reproductiveStatus: {
          in: ["Gestante", "gestante"], // Check for both capitalization options
        },
        active: true
      }
    })
    console.log("Pregnant animals:", pregnantAnimals);

    // Get inseminated animals
    const inseminatedAnimals = await prisma.animal.count({
      where: {
        gender: "Fêmea",
        reproductiveStatus: {
          in: ["Inseminada", "inseminada"], // Check for both capitalization options
        },
        active: true
      }
    })
    console.log("Inseminated animals:", inseminatedAnimals);

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
    console.log("Births this month:", birthsThisMonth);

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
    console.log("Births last month:", birthsLastMonth);

    // Alternative approach - count all births in the last 1-2 months
    const oneMonthAgo = subMonths(now, 1);
    const twoMonthsAgo = subMonths(now, 2);
    
    const recentBirths = await prisma.birth.count({
      where: {
        birthDate: {
          gte: oneMonthAgo
        }
      }
    });
    console.log("Recent births (1 month):", recentBirths);
    
    const previousPeriodBirths = await prisma.birth.count({
      where: {
        birthDate: {
          gte: twoMonthsAgo,
          lt: oneMonthAgo
        }
      }
    });
    console.log("Previous period births (1-2 months ago):", previousPeriodBirths);

    // Get chart data - last 6 months of births
    const labels = []
    const birthCounts = []
    const pregnancyCounts = []
    const inseminationCounts = []

    for (let i = 5; i >= 0; i--) {
      const month = subMonths(now, i)
      const start = startOfMonth(month)
      const end = endOfMonth(month)
      
      const birthCount = await prisma.birth.count({
        where: {
          birthDate: {
            gte: start,
            lte: end
          }
        }
      })
      
      // Count animals that were pregnant during this month
      const pregnantCount = await prisma.animal.count({
        where: {
          gender: "Fêmea",
          reproductiveStatus: {
            in: ["Gestante", "gestante"], // Check for both capitalization options
          },
          // Consider animals that were marked as pregnant before or during this month
          inseminationDate: {
            lt: end
          },
          active: true
        }
      });
      
      // Count inseminations performed this month
      const inseminationCount = await prisma.event.count({
        where: {
          type: "Manejo Reprodutivo",
          title: {
            contains: "Inseminaç",
          },
          date: {
            gte: start,
            lte: end
          }
        }
      });
      
      const monthLabel = format(month, "MMM/yyyy", { locale: ptBR });
      labels.push(monthLabel);
      birthCounts.push(birthCount);
      pregnancyCounts.push(pregnantCount);
      inseminationCounts.push(inseminationCount);
      
      console.log(`Month ${monthLabel}: births=${birthCount}, pregnant=${pregnantCount}, inseminations=${inseminationCount}`);
    }

    // Get female animals for table
    const femaleAnimalsData = await prisma.animal.findMany({
      where: {
        gender: "Fêmea",
        active: true,
        OR: [
          { reproductiveStatus: { not: null } },
          { inseminationDate: { not: null } },
          { expectedBirthDate: { not: null } }
        ]
      },
      orderBy: {
        tag: "asc"
      }
    })
    console.log(`Found ${femaleAnimalsData.length} female animals with reproductive data`);

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
        birthsThisMonth: recentBirths || birthsThisMonth,
        birthsLastMonth: previousPeriodBirths || birthsLastMonth
      },
      chartData: {
        labels,
        datasets: [
          {
            label: "Nascimentos",
            data: birthCounts
          },
          {
            label: "Gestantes",
            data: pregnancyCounts
          },
          {
            label: "Inseminações",
            data: inseminationCounts
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
    
    // Create workbook with multiple sheets using our new utility
    const workbook = await createExcelFile(
      [
        {
          name: "Estatísticas",
          data: statsSheet
        },
        {
          name: "Dados Detalhados",
          data: data.tableData
        }
      ],
      {
        creator: "Sistema Feitor",
        title: "Relatório de Natalidade"
      }
    )
    
    // Save the workbook to a file
    const filename = `relatorio-natalidade-${dateStr}.xlsx`
    const filePath = await saveExcelFile(
      workbook, 
      filename, 
      path.join(process.cwd(), "public", "tmp")
    )
    
    return {
      success: true,
      filePath: `/tmp/${filename.split('/').pop()}` // Return relative path for frontend
    }
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    throw new Error("Falha ao exportar para Excel")
  }
}

export async function downloadExcel() {
  try {
    const { filePath } = await exportToExcel()
    
    // Serve the file
    const file = await fs.readFile(path.join(process.cwd(), "public", filePath))
    
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="relatorio-natalidade.xlsx"`
      }
    })
  } catch (error) {
    console.error("Error serving Excel file:", error)
    return new NextResponse(JSON.stringify({ error: "Falha ao baixar arquivo Excel" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
