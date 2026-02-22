"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChatNavIcon } from "@/components/icons/chatNav";
import { DashboardIcon } from "@/components/icons/dashboardNav";
import { EmergencyHomeIcon } from "@/components/icons/emergency-home";
import { HomeNavIcon } from "@/components/icons/HomeNav";
import { SettingsNavIcon } from "@/components/icons/SettingsNav";
import { VolunteerNavIcon } from "@/components/icons/volunteernav";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function Navbar() {
  const pathname = usePathname();

  const mainNav: NavItem[] = [
    { label: "Dashboard", href: "/", icon: DashboardIcon },
    {
      label: "Incident Cases",
      href: "/incident-cases",
      icon: EmergencyHomeIcon,
    },
    { label: "Volunteers", href: "/volunteers", icon: VolunteerNavIcon },
    { label: "Chat", href: "/chat", icon: ChatNavIcon },
  ];

  const systemNav: NavItem[] = [
    { label: "Settings", href: "/settings", icon: SettingsNavIcon },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="sticky top-0 hidden h-full w-64 flex-col border-slate-300 border-r bg-white md:flex">
      {/* Header */}
      <div className="flex h-16 items-center border-slate-200 border-b px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-foreground text-white shadow-sm">
            <HomeNavIcon className="size-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-sm uppercase leading-tight tracking-tight">
              National
              <span className="block font-semibold text-primary text-xs">
                Recovery Cmd
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="px-3 pb-2">
          <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">
            Main Menu
          </span>
        </div>

        {mainNav.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 items-center gap-3 rounded px-3 font-medium text-sm transition-colors",
                active
                  ? "bg-foreground text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <Icon
                className={cn(
                  "size-6",
                  active ? "text-white" : "text-foreground",
                )}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="px-3 pt-4 pb-2">
          <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">
            System
          </span>
        </div>

        {systemNav.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 items-center gap-3 rounded px-3 font-medium text-sm transition-colors",
                active
                  ? "bg-foreground text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <Icon
                className={cn(
                  "size-6",
                  active ? "text-white" : "text-foreground",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-slate-200 border-t bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-300 font-bold text-slate-600">
            JD
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-xs uppercase">
              Officer Doe
            </span>
            <span className="text-[10px] text-slate-500">
              Chief Coordinator
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
