"use client"

import { FilterAltIcon } from "@/components/icons/filter_alt_off"
import { SearchIcon } from "@/components/icons/search-incident"

export function SearchBarVictims() {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
<div className="relative flex-1 w-full lg:max-w-md">
<SearchIcon className="size-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
<input className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 transition-all" placeholder="Search by name, ID, or coordinates..." type="text" />
</div>
<div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
<div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
<span className="text-xs font-semibold text-slate-500 uppercase">Age:</span>
<select className="bg-transparent border-none p-0 text-sm text-slate-700 focus:ring-0 cursor-pointer">
<option>All Ages</option>
<option>0-12</option>
<option>13-18</option>
<option>19-60</option>
<option>60+</option>
</select>
</div>
<div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
<span className="text-xs font-semibold text-slate-500 uppercase">Gender:</span>
<select className="bg-transparent border-none p-0 text-sm text-slate-700 focus:ring-0 cursor-pointer">
<option>All</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
</div>
<button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors tooltip" title="Clear Filters">
<FilterAltIcon className="size-5" />
</button>
</div>
</div>
    )
}