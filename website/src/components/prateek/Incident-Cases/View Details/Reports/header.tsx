"use client"

import { DownloadIcon } from "@/components/icons/download"

export function HeaderRep() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm shrink-0">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-slate-500">
<span className="material-symbols-outlined">menu</span>
</button>
<div>
<h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Reports Management</h2>
<div className="flex items-center gap-2">
<span className="text-[10px] uppercase text-slate-500 font-medium">Viewing 25 of 1,204 Records</span>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-3 py-1.5 text-[14px] font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-200 rounded shadow-sm transition-colors uppercase tracking-wide">
<DownloadIcon className="w-5 h-5" />
                    Download All
                </button>
</div>
</header>
    )
}