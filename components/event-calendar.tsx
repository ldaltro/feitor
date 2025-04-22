"use client"

import { useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Plus, Stethoscope, Heart, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Event = {
  id: string
  title: string
  date: Date
  type: "Manejo Sanitário" | "Manejo Reprodutivo" | "Pesagem"
  description: string
  animals: number
}

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock events - would be fetched from API in a real app
  const events: Event[] = [
    {
      id: "1",
      title: "Vacinação",
      date: new Date(2023, 4, 12), // May 12, 2023
      type: "Manejo Sanitário",
      description: "Vacinação contra febre aftosa",
      animals: 15,
    },
    {
      id: "2",
      title: "Inseminação",
      date: new Date(2023, 4, 10), // May 10, 2023
      type: "Manejo Reprodutivo",
      description: "Inseminação artificial",
      animals: 5,
    },
    {
      id: "3",
      title: "Pesagem Mensal",
      date: new Date(2023, 4, 5), // May 5, 2023
      type: "Pesagem",
      description: "Pesagem mensal de todos os animais",
      animals: 30,
    },
    {
      id: "4",
      title: "Vermifugação",
      date: new Date(2023, 4, 1), // May 1, 2023
      type: "Manejo Sanitário",
      description: "Aplicação de vermífugo",
      animals: 25,
    },
    {
      id: "5",
      title: "Diagnóstico de Gestação",
      date: new Date(2023, 4, 20), // May 20, 2023
      type: "Manejo Reprodutivo",
      description: "Diagnóstico de gestação por ultrassom",
      animals: 8,
    },
    {
      id: "6",
      title: "Pesagem de Bezerros",
      date: new Date(2023, 4, 25), // May 25, 2023
      type: "Pesagem",
      description: "Pesagem de bezerros recém-nascidos",
      animals: 12,
    },
  ]

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day))
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return <Stethoscope className="h-4 w-4" />
      case "Manejo Reprodutivo":
        return <Heart className="h-4 w-4" />
      case "Pesagem":
        return <Scale className="h-4 w-4" />
      default:
        return null
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return "bg-blue-500"
      case "Manejo Reprodutivo":
        return "bg-pink-500"
      case "Pesagem":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy", { locale: ptBR })}</h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Link href="/eventos/adicionar">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Evento
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="py-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="h-24 p-1 border rounded-md bg-muted/20"></div>
        ))}

        {daysInMonth.map((day) => {
          const dayEvents = getEventsForDay(day)
          return (
            <div
              key={day.toString()}
              className={cn(
                "h-24 p-1 border rounded-md overflow-hidden",
                !isSameMonth(day, currentMonth) && "bg-muted/20",
                isToday(day) && "border-primary",
              )}
            >
              <div className="flex justify-between items-start">
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                    isToday(day) && "bg-primary text-primary-foreground",
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>
              <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-1.5rem)]">
                {dayEvents.map((event) => (
                  <button key={event.id} onClick={() => handleEventClick(event)} className="w-full text-left">
                    <div
                      className={cn(
                        "flex items-center gap-1 px-1 py-0.5 rounded text-xs text-white truncate",
                        getEventColor(event.type),
                      )}
                    >
                      {getEventIcon(event.type)}
                      <span className="truncate">{event.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-sm">Manejo Sanitário</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-pink-500"></div>
          <span className="text-sm">Manejo Reprodutivo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Pesagem</span>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEvent && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getEventIcon(selectedEvent.type)}
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription>{format(selectedEvent.date, "PPP", { locale: ptBR })}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Badge>{selectedEvent.type}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium">Descrição</h4>
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Animais Envolvidos</h4>
                <p className="text-sm text-muted-foreground">{selectedEvent.animals} animais</p>
              </div>
              <div className="flex justify-end">
                <Button asChild>
                  <Link href={`/eventos/${selectedEvent.id}`}>Ver Detalhes Completos</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
