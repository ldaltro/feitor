import { DashboardStats } from "@/components/dashboard-stats"
import { RecentEvents } from "@/components/recent-events"
import { RecentAnimals } from "@/components/recent-animals"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentAnimals />
        <RecentEvents />
      </div>
    </div>
  )
}
