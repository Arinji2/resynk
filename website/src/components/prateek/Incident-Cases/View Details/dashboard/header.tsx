"use client"

import { DownloadIcon } from "@/components/icons/download"
import { NotificationAlertIcon } from "@/components/icons/notifalert"

export function Header({IncidentName, INC}: {IncidentName: String, INC: String}) {
    return (
        <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm shrink-0">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-slate-500">
<span className="material-symbols-outlined">menu</span>
</button>
<div>
<div className="flex items-center gap-3">
<h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight leading-tight">{IncidentName}</h2>
<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">#INC-{INC}</span>
</div>
<div className="flex items-center gap-2 mt-1">
<span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
<span className="text-[10px] font-bold text-success uppercase tracking-wider">Online - Monitoring</span>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-300 rounded shadow-sm transition-colors uppercase tracking-wide">
<DownloadIcon className="size-5 text-slate-700" />
                    Download Report
                </button>
<button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-700 rounded shadow transition-colors uppercase tracking-wide">
<NotificationAlertIcon className="size-5 text-white" />
                    Broadcast Alert
                </button>
</div>
</header>
    )
}