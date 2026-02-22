"use client";

import { SearchIcon } from "@/components/icons/search-incident";

export function SearchBar() {
  return (
    <div className="sticky top-1 z-10 w-full border-slate-100 border-b bg-white p-6 pb-2 shadow-sm dark:border-slate-700 dark:bg-surface-dark">
      <div className="flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
        <div className="relative w-full xl:w-96">
          <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-3 text-slate-400" />
          <input
            className="w-full rounded border border-slate-300 bg-slate-50 py-2 pr-4 pl-10 text-slate-700 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary-accent dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            placeholder="Search report ID, keywords..."
            type="text"
          />
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 xl:w-auto">
          <div className="flex items-center gap-2">
            <text className="font-bold text-slate-500 text-xs uppercase">
              Status:
            </text>
            <select className="rounded border border-slate-300 bg-white px-2 py-1.5 font-medium text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <option>All Statuses</option>
              <option>Critical</option>
              <option>Warning</option>
              <option>Safe</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <text className="font-bold text-slate-500 text-xs uppercase">
              Date:
            </text>
            <select className="rounded border border-slate-300 bg-white px-2 py-1.5 font-medium text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <text className="font-bold text-slate-500 text-xs uppercase">
              Category:
            </text>
            <select className="rounded border border-slate-300 bg-white px-2 py-1.5 font-medium text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
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
  );
}
