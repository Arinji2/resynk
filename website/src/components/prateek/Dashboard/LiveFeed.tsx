"use client";

export function LiveFeed() {
  return (
    <div className="bottom-0 z-30 mt-auto flex h-8 w-full shrink-0 items-center overflow-hidden border-slate-700 border-t bg-black text-white">
      <div className="z-10 flex h-full items-center bg-red-600 px-3 font-bold text-[10px] uppercase tracking-wider shadow-lg">
        Live Feed
      </div>
      <div className="relative h-full flex-1 overflow-hidden">
        <div className="absolute flex h-full animate-ticker items-center whitespace-nowrap">
          <span className="mx-4 inline-flex items-center font-mono text-xs">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Sector 4 Report: Supplies arrived safely.
          </span>
          <span className="mx-4 inline-flex items-center font-mono text-xs">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
            Weather Update: Wind speeds decreasing in North quadrant.
          </span>
          <span className="mx-4 inline-flex items-center font-mono text-xs">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
            Urgent: Medical team requested at Point Delta.
          </span>
          <span className="mx-4 inline-flex items-center font-mono text-xs">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            System Status: All communication nodes online.
          </span>
          <span className="mx-4 inline-flex items-center font-mono text-xs">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-500"></span>
            Logistics: 5000 units of water dispatched.
          </span>
        </div>
      </div>
    </div>
  );
}
