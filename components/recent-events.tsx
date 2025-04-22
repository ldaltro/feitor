"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Stethoscope, Heart, Scale } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { addWeeks, addMonths, isAfter, isBefore, parseISO } from "date-fns";

type Event = {
  id: string;
  title: string;
  date: string;
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

export function RecentEvents() {
  const [filterPeriod, setFilterPeriod] = useState<
    "week" | "month" | "3months"
  >("week");
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return <Stethoscope className="h-4 w-4" />;
      case "Manejo Reprodutivo":
        return <Heart className="h-4 w-4" />;
      case "Pesagem":
        return <Scale className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return "default";
      case "Manejo Reprodutivo":
        return "secondary";
      case "Pesagem":
        return "outline";
      default:
        return "default";
    }
  };

  const getFilteredEvents = () => {
    const now = new Date();
    let endDate: Date;

    switch (filterPeriod) {
      case "week":
        endDate = addWeeks(now, 1);
        break;
      case "month":
        endDate = addMonths(now, 1);
        break;
      case "3months":
        endDate = addMonths(now, 3);
        break;
      default:
        endDate = addWeeks(now, 1);
    }

    return events
      .filter((event) => {
        const eventDate = parseISO(event.date);
        return isAfter(eventDate, now) && isBefore(eventDate, endDate);
      })
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  };

  const filteredEvents = getFilteredEvents();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>Carregando eventos...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-muted"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-muted rounded"></div>
                  <div className="h-3 w-1/4 bg-muted rounded"></div>
                </div>
                <div className="h-6 w-24 bg-muted rounded-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>
              Eventos agendados para o período selecionado
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterPeriod === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPeriod("week")}
            >
              7 dias
            </Button>
            <Button
              variant={filterPeriod === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPeriod("month")}
            >
              1 mês
            </Button>
            <Button
              variant={filterPeriod === "3months" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPeriod("3months")}
            >
              3 meses
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Nenhum evento encontrado para este período
            </p>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  {getIcon(event.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <Link
                    href={`/eventos/${event.id}`}
                    className="font-medium hover:underline"
                  >
                    {event.title}
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(event.date).toLocaleDateString("pt-BR")} •{" "}
                    {event.animals.length} animais
                  </div>
                </div>
                <Badge variant={getBadgeVariant(event.type)}>
                  {event.type}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
