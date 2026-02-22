"use client"

import { usePathname } from "next/navigation"
import { DashboardIcon } from "@/components/icons/dashboardNav"
import { DescriptionIcon } from "@/components/icons/description"
import { FamilyRestroomIcon } from "@/components/icons/fam-restroom"
import { HomeNavIcon } from "@/components/icons/HomeNav"
import { NotificationsIcon } from "@/components/icons/notifications"
import { SettingsNavIcon } from "@/components/icons/SettingsNav"

interface NavItem {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

export function SidebarVictims() {
    return (
        <aside className="hidden xl:flex w-20 h-svh flex-col border-r border-slate-300 bg-foreground shadow-xl items-center py-4 space-y-8">
<div className="flex h-12 w-12 items-center justify-center rounded bg-primary text-white shadow-sm shrink-0">
<HomeNavIcon className="size-7" />
</div>
<nav className="flex-1 flex flex-col gap-6 w-full items-center">
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors" href="#">
<DashboardIcon className="size-7 text-white" />
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors" href="#">
<DescriptionIcon className="size-7 text-white" />
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors" href="#">
<NotificationsIcon className="size-7 text-white" />
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors" href="#">
<FamilyRestroomIcon className="size-7 text-white" />
</a>
<div className="mt-auto">
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors" href="#">
<SettingsNavIcon className="size-7 text-white" />
</a>
</div>
</nav>
</aside>
    )
}