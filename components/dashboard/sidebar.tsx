"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview", code: "01" },
  { href: "/dashboard/waitlist", label: "Waitlist", code: "02" },
  { href: "/dashboard/warmup", label: "Warmup", code: "03" },
  { href: "/dashboard/calendar", label: "Calendar", code: "04" },
  { href: "/dashboard/issues", label: "Issues", code: "05" },
];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/dashboard/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 border-r border-border bg-bg flex-shrink-0 flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="text-xl font-bold tracking-tight">Quest Club</div>
          <div className="text-xs text-text-muted mt-1 font-mono">
            operator dashboard
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => {
            const active =
              path === item.href ||
              (item.href !== "/dashboard" && path?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-surface text-lime-400"
                    : "text-text-muted hover:text-text hover:bg-surface/50"
                }`}
              >
                <span className="text-xs font-mono opacity-50">/ {item.code}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={logout}
            className="w-full text-left text-xs text-text-muted hover:text-text px-3 py-2 transition"
          >
            Cerrar sesión
          </button>
          <Link
            href="/"
            className="block text-xs text-text-muted hover:text-text px-3 py-2 transition"
          >
            ← Volver a la landing
          </Link>
        </div>
      </aside>

      {/* Mobile horizontal nav */}
      <div className="md:hidden border-b border-border bg-bg sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="font-bold">Quest Club</div>
          <button
            onClick={logout}
            className="text-xs text-text-muted hover:text-text"
          >
            Salir
          </button>
        </div>
        <nav className="flex gap-1 px-3 pb-3 overflow-x-auto">
          {NAV.map((item) => {
            const active =
              path === item.href ||
              (item.href !== "/dashboard" && path?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  active
                    ? "bg-lime-400 text-bg"
                    : "bg-surface text-text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
