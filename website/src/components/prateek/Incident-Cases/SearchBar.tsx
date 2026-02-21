"use client"

import { ExpandMoreIcon } from "@/components/icons/expand_more-incident"
import { SearchIcon } from "@/components/icons/search-incident"
import { SortIcon } from "@/components/icons/sort-incident"

export function SearchBar() {
    return(
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
<div className="relative w-full md:w-96">
<SearchIcon className="size-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
<input className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-slate-400 text-slate-800 " placeholder="Search incidents by name or ID..." type="text" />
</div>
<div className="flex w-full md:w-auto gap-3">
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-2 text-sm font-medium border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer hover:bg-slate-50 transition-colors">
<option value="all">Status: All</option>
<option value="active">Active</option>
<option value="resolved">Resolved</option>
<option value="irrelevant">Irrelevant</option>
</select>
<ExpandMoreIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
</div>
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-2 text-sm font-medium border border-slate-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer hover:bg-slate-50 transition-colors">
<option value="reports-desc">Sort: Reports (High to Low)</option>
<option value="reports-asc">Sort: Reports (Low to High)</option>
<option value="date-desc">Sort: Date (Newest)</option>
<option value="priority-desc">Sort: Priority</option>
</select>
<SortIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
</div>
</div>
</div>
    )
}