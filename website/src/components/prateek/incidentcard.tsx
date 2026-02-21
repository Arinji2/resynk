"use client"


export function IncidentCard() {
    function getIncidentCount(){
        return 10;
    }
    return (
        <div className="bg-white p-4 rounded border-l-4 border-l-primary border-y border-r border-slate-200 dark:border-slate-700 shadow-card flex items-center justify-between">
<div>
<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Incidents</p>
<h3 className="text-3xl font-bold text-slate-900">{getIncidentCount()}</h3>
<p className="text-[10px] text-slate-400 mt-1">Active cases currently logged</p>
</div>
<div className="h-12 w-12 rounded bg-slate-100 flex items-center justify-center text-primary dark:bg-slate-800">
<span className="material-symbols-outlined">emergency_home</span>
</div>
</div>
    )
}