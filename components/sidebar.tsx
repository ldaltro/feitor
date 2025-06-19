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
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Badge } from "@/components/ui/badge";

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
  const { user, logout, isAdmin } = useAuth();

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
            
            {isAdmin() && (
              <>
                <div className="h-px bg-white/10 mx-4 my-2" />
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  prefetch={true}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors",
                    pathname === "/admin"
                      ? "bg-primary text-primary-foreground"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  <span>Administração</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    ADMIN
                  </Badge>
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="border-t border-white/10 p-4 space-y-4">
          {user && (
            <div className="bg-white/10 rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-semibold truncate">{user.fullName}</p>
                  <p className="text-xs text-white/80 truncate">@{user.username}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/30 hover:bg-white/20">
                  {user.role === 'ADMIN' ? 'Admin' : user.role === 'OWNER' ? 'Proprietário' : 'Funcionário'}
                </Badge>
                {user.farmName && (
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0 hover:bg-white/30 truncate max-w-[120px]">
                    {user.farmName}
                  </Badge>
                )}
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
        <div className="p-4 pt-0">
          <p className="text-xs text-white/60 text-center">
            © 2024 VDG
          </p>
        </div>
      </div>
    </>
  );
}