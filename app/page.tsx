import { DashboardStats } from "@/components/dashboard-stats"
import { RecentEvents } from "@/components/recent-events"
import { RecentAnimals } from "@/components/recent-animals"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

async function getRecentAnimals(farmId: string) {
  try {
    const animals = await prisma.animal.findMany({
      where: { farmId },
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: {
        id: true,
        name: true,
        breed: true,
        birthDate: true,
        status: true,
      }
    })
    return animals
  } catch (error) {
    console.error('Failed to fetch recent animals:', error)
    return []
  }
}

export default async function Home() {
  const headersList = headers()
  const farmId = headersList.get("x-user-farm-id") || ""
  const recentAnimals = farmId ? await getRecentAnimals(farmId) : []

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentAnimals animals={recentAnimals} />
        <RecentEvents />
      </div>
    </div>
  )
}
