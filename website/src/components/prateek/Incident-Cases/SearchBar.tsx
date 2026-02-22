"use client";

import { SearchIcon } from "@/components/icons/search-incident";

export function SearchBar() {
    return(
        <div className="p-6 pb-2 border-b border-slate-100 bg-white sticky top-1 z-10 shadow-sm">
<div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
<div className="relative w-full xl:w-96">
<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
<input className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-700" placeholder="Search report ID, keywords..." type="text" />
</div>
<div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
<div className="flex items-center gap-2">
<label className="text-xs font-bold text-slate-500 uppercase">Status:</label>
<select className="px-2 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-accent">
<option>All Statuses</option>
<option>Critical</option>
<option>Warning</option>
<option>Safe</option>
<option>Pending</option>
</select>
</div>
<div className="flex items-center gap-2">
<label className="text-xs font-bold text-slate-500 uppercase">Date:</label>
<select className="px-2 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-accent">
<option>Last 24 Hours</option>
<option>Last 7 Days</option>
<option>This Month</option>
<option>Custom Range</option>
</select>
</div>
<div className="flex items-center gap-2">
<label className="text-xs font-bold text-slate-500 uppercase">Category:</label>
<select className="px-2 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-accent">
<option>All Categories</option>
<option>Infrastructure</option>
<option>Medical</option>
<option>Supplies</option>
<option>Security</option>
</select>
</div>
</div>
</div>
</div>
    )
}
