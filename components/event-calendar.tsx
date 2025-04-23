"use client";

import { useState, useEffect } from "react";
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
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Stethoscope,
  Heart,
  Scale,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

type Event = {
  id: string;
  title: string;
  date: Date;
  type: string;
  description: string;
  animals: {
    animal: {
      id: string;
      name: string;
      tag: string;
    };
  }[];
};

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os eventos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/events/${selectedEvent.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      toast({
        title: "Sucesso",
        description: "Evento excluído com sucesso!",
      });

      setIsDeleteDialogOpen(false);
      setIsDialogOpen(false);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o evento.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return <Stethoscope className="h-4 w-4" />;
      case "Manejo Reprodutivo":
        return <Heart className="h-4 w-4" />;
      case "Pesagem":
        return <Scale className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return "bg-blue-500";
      case "Manejo Reprodutivo":
        return "bg-pink-500";
      case "Pesagem":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            data-testid="prev-month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            data-testid="next-month"
          >
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
        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map(
          (_, i) => (
            <div
              key={`empty-${i}`}
              className="h-24 p-1 border rounded-md bg-muted/20"
            ></div>
          )
        )}

        {daysInMonth.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={day.toString()}
              className={cn(
                "h-24 p-1 border rounded-md overflow-hidden",
                !isSameMonth(day, currentMonth) && "bg-muted/20",
                isToday(day) && "border-primary"
              )}
            >
              <div className="flex justify-between items-start">
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                    isToday(day) && "bg-primary text-primary-foreground"
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>
              <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-1.5rem)]">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="w-full text-left"
                  >
                    <div
                      className={cn(
                        "flex items-center gap-1 px-1 py-0.5 rounded text-xs text-white truncate",
                        getEventColor(event.type)
                      )}
                    >
                      {getEventIcon(event.type)}
                      <span className="truncate">{event.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
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
              <DialogDescription>
                {format(new Date(selectedEvent.date), "PPP", { locale: ptBR })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Badge>{selectedEvent.type}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium">Descrição</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Animais Envolvidos</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.animals.length} animais
                </p>
                <div className="mt-2 max-h-40 overflow-y-auto">
                  <ul className="text-sm list-disc pl-5">
                    {selectedEvent.animals.map((animalRelation) => (
                      <li key={animalRelation.animal.id}>
                        {animalRelation.animal.name} (
                        {animalRelation.animal.tag})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                <div className="space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/eventos/${selectedEvent.id}/editar`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este evento? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent} disabled={isLoading}>
              {isLoading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
