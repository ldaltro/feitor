"use client";

import { useAuth } from "@/components/auth-provider";
import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  // Don't show sidebar on login page or when not authenticated
  const showSidebar = !isLoginPage && user && !loading;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 overflow-auto ${showSidebar ? 'p-4 pt-16 md:p-8 md:pt-8' : ''}`}>
        {children}
      </main>
    </div>
  );
}