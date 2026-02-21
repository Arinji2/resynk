"use client";

import { EmergencyHomeIcon } from "../icons/emergency-home";

export function IncidentCard({ incidentCount }: { incidentCount: number }) {
  return (
    <div className="flex items-center justify-between rounded border-slate-200 border-y border-r border-l-4 border-l-primary bg-white p-4 shadow-card dark:border-slate-700">
      <div>
        <p className="mb-1 font-bold text-slate-500 text-xs uppercase tracking-wider">
          Total Incidents
        </p>
        <h3 className="font-bold text-3xl text-slate-900">{incidentCount}</h3>
        <p className="mt-1 text-[10px] text-slate-400">
          Active cases currently logged
        </p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100 text-primary">
        <EmergencyHomeIcon className="size-8 text-destructive" />
      </div>
    </div>
  );
}
