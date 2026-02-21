"use client"

import { Diversity1Icon } from "@/components/icons/diversity-1"

export function ActiveVolunteers({VolunteerCount, SectorName}: {VolunteerCount : number, SectorName: String}) {
    return (
        <div className="bg-white p-4 rounded border-l-4 border-l-success border-y border-r border-slate-200 shadow-card flex items-center justify-between">
<div>
<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Volunteers</p>
<h3 className="text-3xl font-bold text-slate-900">{VolunteerCount}</h3>
<p className="text-[10px] text-slate-400 mt-1">Deployed in {SectorName}</p>
</div>
<div className="h-12 w-12 rounded bg-slate-100 flex items-center justify-center text-success">
<Diversity1Icon className="size-8 text-success" />
</div>
</div>
    )
}