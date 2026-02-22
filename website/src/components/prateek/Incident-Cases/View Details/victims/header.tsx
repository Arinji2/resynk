"use client"

import { AddCircleIcon } from "@/components/icons/add_circle-incident"
import { DownloadIcon } from "@/components/icons/download"
import { PersonSearchIcon } from "@/components/icons/person_search"

export function HeaderVictims() {
    return(
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
<div className="flex items-center gap-4">
<div className="flex flex-col">
<h1 className="text-lg font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
<PersonSearchIcon className="size-6 text-primary" />
                        Victim Tracking Database
                    </h1>
<p className="text-slate-500 text-xs">Official incident management record for Incident #4921</p>
</div>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-sm text-black hover:bg-slate-300 hover:border-slate-300 transition-all">
<DownloadIcon className="size-5 text-slate-600" />
                    Export CSV
                </button>
<button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-sm text-black hover:bg-slate-300 hover:border-slate-300 transition-all">
<AddCircleIcon className="size-5 text-slate-600" />
                    New Record
                </button>
</div>
</header>
    )
}