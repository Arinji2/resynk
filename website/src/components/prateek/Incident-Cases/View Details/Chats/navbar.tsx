"use client"

import { ChatNavIcon } from "@/components/icons/chatNav"
import { DashboardIcon } from "@/components/icons/dashboardNav"
import { DescriptionIcon } from "@/components/icons/description"
import { Diversity3Icon } from "@/components/icons/diversity_3"
import { PersonalInjuryIcon } from "@/components/icons/personal_injury"
import { SettingsNavIcon } from "@/components/icons/SettingsNav"

export function NavBarChat({SectorName}: {SectorName: String}) {
    
return (
        <div className="w-64 h-svh flex flex-col border-r border-slate-200 bg-white shadow-lg">
            <div className="p-6 border-b border-slate-200">
                <h1 className="text font-bold tracking-tight text-slate-900 uppercase">Sector {SectorName}<br /> <span className="text-primary text-xs font-semibold">Incident Cmd</span></h1>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                <a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
                    <DashboardIcon className="size-7 text-slate" />
                    <span className="text font-medium text-slate">Dashboard</span>
                </a>
                <a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
                    <DescriptionIcon className="size-7 text-slate" />
                    <span className="text font-medium text-slate">Reports</span>
                </a>
                <a className="flex h-10 items-center gap-3 rounded px-3 bg-slate-100 text-foreground shadow-sm font-semibold border border-slate-200 " href="#">
                    <ChatNavIcon className="size-7 text-slate" />
                    <span className="text font-medium text-slate">Chat</span>
                </a>
                <a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
                    <Diversity3Icon className="size-7 text-slate" />
                    <span className="text font-medium text-slate">Team</span>
                </a>
                <a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
                    <PersonalInjuryIcon className="size-7 text-slate" />
                    <span className="text font-medium text-slate">Victims</span>
                </a>
                <a className="group flex h-10 items-center gap-3 rounded px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" href="#">
                    <SettingsNavIcon className="size-7 text-slate" />
                    <span className="text font-medium text-slate">Settings</span>
                </a>
                </nav>
            <div className="mt-auto w-full">
                <div className="border-t border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded bg-slate-300 flex items-center justify-center text-slate-600 font-bold">JD</div>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-bold text-slate-900 uppercase">Officer Doe</span>
                            <span className="text-[11px] text-slate-500">Chief Coordinator</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}