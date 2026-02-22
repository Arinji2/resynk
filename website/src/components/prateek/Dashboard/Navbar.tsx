"use client";

import { ChatNavIcon } from "@/components/icons/chatNav";
import { DashboardIcon } from "@/components/icons/dashboardNav";
import { EmergencyHomeIcon } from "@/components/icons/emergency-home";
import { HomeNavIcon } from "@/components/icons/HomeNav";
import { SettingsNavIcon } from "@/components/icons/SettingsNav";
import { VolunteerNavIcon } from "@/components/icons/volunteernav";

export function Navbar() {
  return (
    <aside className="sticky top-0 hidden h-full w-64 flex-col border-slate-300 border-r bg-white md:flex">
      <div className="flex h-16 items-center justify-start border-slate-200 border-b px-6">
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
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="px-3 pb-2">
          <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">
            Main Menu
          </span>
        </div>
        <a
          className="flex h-10 items-center gap-3 rounded bg-foreground px-3 text-white shadow-sm"
          href="#"
        >
          <DashboardIcon className="size-6" />
          <span className="font-medium text-sm">Dashboard</span>
        </a>
        <a
          className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          href="#"
        >
          <EmergencyHomeIcon className="size-6 text-foreground" />
          <span className="font-medium text-sm">Incident Cases</span>
        </a>
        <a
          className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          href="#"
        >
          <VolunteerNavIcon className="size-6 text-foreground" />
          <span className="font-medium text-sm">Volunteers</span>
        </a>
        <a
          className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          href="#"
        >
          <ChatNavIcon className="size-6 text-foreground" />
          <span className="font-medium text-sm">Chat</span>
        </a>
        <div className="px-3 pt-4 pb-2">
          <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">
            System
          </span>
        </div>
        <a
          className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          href="#"
        >
          <SettingsNavIcon className="size-6 text-foreground" />
          <span className="font-medium text-sm">Settings</span>
        </a>
      </nav>
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
