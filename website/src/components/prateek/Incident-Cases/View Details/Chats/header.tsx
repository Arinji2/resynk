"use client"

import { InfoIcon } from "@/components/icons/info"

export function HeaderChat() {
    return (
<header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm shrink-0">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-slate-500">
<span className="material-symbols-outlined">menu</span>
</button>
<div>
<h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Internal Incident Chat</h2>
</div>
</div>
<div className="flex items-center gap-3">
<button className="p-2 text-slate-500 hover:text-slate-700">
<InfoIcon className="size-7" />
</button>
</div>
</header>
    )
}