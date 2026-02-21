"use client"

import { EmergencyHomeIcon } from "@/components/icons/emergency-home"
import { DashboardIcon } from "@/components/icons/dashboardNav"
import { VolunteerNavIcon } from "@/components/icons/volunteernav"
import { ChatNavIcon } from "@/components/icons/chatNav"
import { SettingsNavIcon } from "@/components/icons/SettingsNav"
import { HomeNavIcon } from "@/components/icons/HomeNav"

export function Navbar(){
    return (
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-300 bg-white ">
<div className="flex h-16 items-center justify-start px-6 border-b border-slate-200 ">
<div className="flex items-center gap-3">
<div className="flex h-8 w-8 items-center justify-center rounded bg-foreground text-white shadow-sm">
<HomeNavIcon className="size-6" />
</div>
<div>
<h1 className="text-sm font-bold tracking-tight text-slate-900 uppercase leading-tight">National<span className="text-primary block text-xs font-semibold">Recovery Cmd</span></h1>
</div>
</div>
</div>
<nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
<div className="px-3 pb-2">
<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Menu</span>
</div>
<a className="flex h-10 items-center gap-3 rounded px-3 bg-foreground text-white shadow-sm" href="#">
<DashboardIcon className="size-6"  />
<span className="text-sm font-medium">Dashboard</span>
</a>
<a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
<EmergencyHomeIcon className="size-6 text-foreground" />
<span className="text-sm font-medium">Incident Cases</span>
</a>
<a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
<VolunteerNavIcon className="size-6 text-foreground" />
<span className="text-sm font-medium">Volunteers</span>
</a>
<a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
<ChatNavIcon className="size-6 text-foreground" />
<span className="text-sm font-medium">Chat</span>
</a>
<div className="px-3 pt-4 pb-2">
<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System</span>
</div>
<a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
<SettingsNavIcon className="size-6 text-foreground" />
<span className="text-sm font-medium">Settings</span>
</a>
</nav>
<div className="border-t border-slate-200 bg-slate-50 p-4">
<div className="flex items-center gap-3">
<div className="h-9 w-9 rounded bg-slate-300 flex items-center justify-center text-slate-600 font-bold">JD</div>
<div className="flex flex-col">
<span className="text-xs font-bold text-slate-900 uppercase">Officer Doe</span>
<span className="text-[10px] text-slate-500">Chief Coordinator</span>
</div>
</div>
</div>
</aside>
    )
}