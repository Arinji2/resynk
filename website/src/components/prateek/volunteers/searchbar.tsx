"use client"

import { ExpandMoreIcon } from "@/components/icons/expand_more-incident"
import { SearchIcon } from "@/components/icons/search-incident"

export function SearchBarVol() {
    return (
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
<div className="relative w-full md:w-96">
<SearchIcon className="size-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
<input className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-slate-400 text-slate-800" placeholder="Search volunteers by name, skills..." type="text" />
</div>
<div className="flex w-full md:w-auto gap-3">
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-2 text-sm font-medium border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer hover:bg-slate-50 transition-colors">
<option value="all">Proximity: All Zones</option>
<option value="5km">Within 5km</option>
<option value="10km">Within 10km</option>
<option value="20km">Within 20km</option>
</select>
<ExpandMoreIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
</div>
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-2 text-sm font-medium border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer hover:bg-slate-50 transition-colors">
<option value="all">Status: All</option>
<option value="available">Available</option>
<option value="deployed">Deployed</option>
<option value="unavailable">Unavailable</option>
</select>
<ExpandMoreIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
</div>
</div>
</div>
    )
}