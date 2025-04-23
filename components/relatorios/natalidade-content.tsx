"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Download, Printer } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { NatalidadeChart } from "@/components/relatorios/natalidade-chart"
import { NatalidadeTable } from "@/components/relatorios/natalidade-table"
import { getNatalidadeData, exportToExcel, type NatalidadeData } from "@/lib/actions/natalidade-actions"
import { useToast } from "@/components/ui/use-toast"

export function NatalidadeContent() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    to: new Date(),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [natalidadeData, setNatalidadeData] = useState<NatalidadeData | null>(null)
  const { toast } = useToast()

  // Fetch data on initial load
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setIsLoading(true)
      const data = await getNatalidadeData()
      setNatalidadeData(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExportToExcel() {
    try {
      setIsExporting(true)
      
      const { filePath } = await exportToExcel()
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a')
      link.href = `/tmp/${filePath.split('/').pop()}` // Just the filename
      link.download = `Relatório_Natalidade_${format(new Date(), 'dd-MM-yyyy')}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast({
        title: "Relatório exportado",
        description: "O relatório foi exportado com sucesso para Excel.",
      })
    } catch (error) {
      console.error("Error exporting:", error)
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar o relatório. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Default values in case data is still loading
  const stats = natalidadeData?.stats || {
    totalAnimals: 0,
    femaleAnimals: 0,
    pregnantAnimals: 0,
    inseminatedAnimals: 0,
    birthsThisMonth: 0,
    birthsLastMonth: 0
  }

  const chartData = natalidadeData?.chartData || {
    labels: [],
    datasets: []
  }
  
  const tableData = natalidadeData?.tableData || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Relatório de Natalidade</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportToExcel}
            disabled={isLoading || isExporting}
          >
            {isExporting ? "Exportando..." : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar Excel
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.print()}
            disabled={isLoading}
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Fêmeas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.femaleAnimals}</div>
            <p className="text-xs text-muted-foreground">
              de {stats.totalAnimals} animais ativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gestantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pregnantAnimals}</div>
            <p className="text-xs text-muted-foreground">
              {stats.femaleAnimals > 0 
                ? `${((stats.pregnantAnimals / stats.femaleAnimals) * 100).toFixed(1)}% do rebanho de fêmeas` 
                : "0% do rebanho de fêmeas"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inseminadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inseminatedAnimals}</div>
            <p className="text-xs text-muted-foreground">
              aguardando confirmação de gestação
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nascimentos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.birthsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {stats.birthsLastMonth > 0 
                ? `${((stats.birthsThisMonth / stats.birthsLastMonth - 1) * 100).toFixed(1)}% vs. mês anterior` 
                : "sem dados do mês anterior"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grafico" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grafico">Gráfico</TabsTrigger>
          <TabsTrigger value="tabela">Tabela</TabsTrigger>
        </TabsList>
        <TabsContent value="grafico" className="space-y-4">
          <div className="h-[400px]">
            <NatalidadeChart data={chartData} />
          </div>
        </TabsContent>
        <TabsContent value="tabela">
          <NatalidadeTable data={tableData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
