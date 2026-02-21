"use client"


export function Reportcard(){
    return (
        <div className="bg-white dark:bg-surface-dark p-4 rounded border-l-4 border-l-primary-accent border-y border-r border-slate-200 dark:border-slate-700 shadow-card flex items-center justify-between">
<div>
<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Reports Added (Mo)</p>
<h3 className="text-3xl font-bold text-slate-900 dark:text-white">45</h3>
<p className="text-[10px] text-slate-400 mt-1">Increase of 12% from last month</p>
</div>
<div className="h-12 w-12 rounded bg-slate-100 flex items-center justify-center text-primary-accent dark:bg-slate-800">
<span className="material-symbols-outlined">post_add</span>
</div>
</div>
    )
}