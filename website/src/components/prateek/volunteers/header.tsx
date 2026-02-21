"use client"

import { PersonAddIcon } from "@/components/icons/person_add-vol"

export function HeaderVol({CMDID}: {CMDID: string}) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm shrink-0">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-slate-500">
<span className="material-symbols-outlined">menu</span>
</button>
<div>
<h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Volunteer Management</h2>
<div className="flex items-center gap-2">
<span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
<span className="text-[10px] font-bold text-success uppercase tracking-wider">Network Active</span>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">CMD-ID: {CMDID}</span>
<div className="h-6 w-px bg-slate-300 mx-1"></div>
<button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-foreground hover:bg-slate-800 rounded shadow transition-colors uppercase tracking-wide">
<PersonAddIcon className="size-4" />
                        Log New Volunteer
                    </button>
</div>
</header>
    )
}