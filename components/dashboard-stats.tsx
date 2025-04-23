import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MilkIcon as Cow, Baby, CreditCard, Calendar } from "lucide-react";
import { getDashboardStats } from "@/lib/actions/dashboard";

export async function DashboardStats() {
  const stats = await getDashboardStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Animais
          </CardTitle>
          <Cow className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAnimals}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.newAnimalsLastMonth} no último mês
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nascimentos</CardTitle>
          <Baby className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.births}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.birthsLastMonth} no último mês
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transações</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {stats.transactions.total.toLocaleString("pt-BR")}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.transactions.percentageChange >= 0 ? "+" : ""}
            {stats.transactions.percentageChange}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Eventos Próximos
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
          <p className="text-xs text-muted-foreground">Nos próximos 7 dias</p>
        </CardContent>
      </Card>
    </div>
  );
}
