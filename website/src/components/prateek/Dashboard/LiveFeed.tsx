"use client"

export function LiveFeed(){
    return (
        <div className="h-8 bg-black dark:bg-black text-white flex items-center overflow-hidden border-t border-slate-700 shrink-0 z-30">
<div className="bg-red-600 px-3 h-full flex items-center text-[10px] font-bold uppercase tracking-wider z-10 shadow-lg">
                    Live Feed
                </div>
<div className="flex-1 overflow-hidden relative h-full">
<div className="absolute whitespace-nowrap animate-ticker flex items-center h-full">
<span className="inline-flex items-center mx-4 text-xs font-mono"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>Sector 4 Report: Supplies arrived safely.</span>
<span className="inline-flex items-center mx-4 text-xs font-mono"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>Weather Update: Wind speeds decreasing in North quadrant.</span>
<span className="inline-flex items-center mx-4 text-xs font-mono"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>Urgent: Medical team requested at Point Delta.</span>
<span className="inline-flex items-center mx-4 text-xs font-mono"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>System Status: All communication nodes online.</span>
<span className="inline-flex items-center mx-4 text-xs font-mono"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-2"></span>Logistics: 5000 units of water dispatched.</span>
</div>
</div>
</div>

    )
}