import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Baby, Scale, Tags, Presentation } from "lucide-react"
import { ExportButton, ReportButton } from "@/components/relatorios/relatorios-buttons"

export const metadata: Metadata = {
  title: "Relatórios",
  description: "Visualize relatórios sobre seu rebanho",
}

export default function RelatoriosPage() {
  const reports = [
    {
      id: "natalidade",
      title: "Relatório de Estação Reprodutiva",
      description: "Estimação de partos, vacas inseminadas, gestantes e abortos",
      icon: <Baby className="h-8 w-8" />,
      href: "/relatorios/natalidade",
    },
    {
      id: "producao",
      title: "Relatório de Produção",
      description: "Análise de desempenho produtivo do rebanho",
      icon: <TrendingUp className="h-8 w-8" />,
      href: "/relatorios/producao",
    },
    {
      id: "pesagem",
      title: "Relatório de Pesagem",
      description: "Histórico e evolução de pesagem dos animais",
      icon: <Scale className="h-8 w-8" />,
      href: "/relatorios/pesagem",
    },
    {
      id: "calendario",
      title: "Relatório de Eventos",
      description: "Resumo dos eventos do calendário",
      icon: <Calendar className="h-8 w-8" />,
      href: "/relatorios/eventos",
    },
    {
      id: "lotes",
      title: "Relatório de Lotes",
      description: "Análise de composição dos lotes",
      icon: <Tags className="h-8 w-8" />,
      href: "/relatorios/lotes",
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Visualize e exporte relatórios sobre seu rebanho
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">{report.title}</CardTitle>
              <div className="text-primary">{report.icon}</div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-2 line-clamp-2 min-h-[40px]">
                {report.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <ReportButton href={report.href} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
