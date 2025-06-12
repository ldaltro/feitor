"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CreditCard,
  Home,
  LayoutDashboard,
  MilkIcon as Cow,
  Baby,
  Menu,
  X,
  BoxesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Animais",
    icon: Cow,
    href: "/animais",
  },
  {
    label: "Lotes",
    icon: BoxesIcon,
    href: "/lotes",
  },
  {
    label: "Nascimentos",
    icon: Baby,
    href: "/nascimentos",
  },
  {
    label: "Transações",
    icon: CreditCard,
    href: "/transacoes",
  },
  {
    label: "Calendário",
    icon: Calendar,
    href: "/calendario",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay that appears when menu is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-secondary text-secondary-foreground transition-transform duration-300 md:static md:translate-x-0 md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center px-6">
          <Link href="/" className="flex items-center gap-3" prefetch={true}>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Cow className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-white">Vida de Gado</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium gap-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                prefetch={true}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors",
                  pathname === route.href
                    ? "bg-primary text-primary-foreground"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <route.icon className="h-5 w-5" />
                <span>{route.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-6">
          <p className="text-xs text-white/60 text-center">
            © 2024 Vida de Gado
          </p>
        </div>
      </div>
    </>
  );
}