"use client";

import { ArrowForwardIcon } from "@/components/icons/arrow_forward-incident";
import { cn } from "@/lib/utils";
import type { IncidentsRecord } from "../../../../pocketbase-types";

interface IncidentManagementProps {
  incidents: IncidentsRecord[];
}

export function IncidentManagement({ incidents }: IncidentManagementProps) {
  return (
    <div className="grid grid-cols-1 gap-6 overflow-y-auto pb-6 lg:grid-cols-2 xl:grid-cols-3">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className={cn(
            `group relative flex flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-card transition-all duration-200 hover:shadow-card-hover`,
            {
              "opacity-50": incident.status === "irrelevant",
            },
          )}
        >
          <div
            className={cn(`absolute top-0 left-0 h-full w-1`, {
              "bg-red-500": incident.status === "active",
              "bg-green-500": incident.status === "resolved",
              "bg-slate-500": incident.status === "irrelevant",
            })}
          ></div>
          <div className="flex-1 p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex flex-col">
                <span className="mb-1 font-bold text-[10px] text-slate-400 uppercase tracking-wider">
                  #INC-{incident.ref_id ?? Math.floor(Math.random() * 1000)}
                </span>
                <h3 className="font-bold text-base text-slate-900 leading-tight">
                  {incident.title}
                </h3>
              </div>
              <span
                className={cn(
                  `inline-flex items-center rounded border px-2 py-1 font-bold text-[10px] uppercase`,
                  {
                    "bg-red-200 text-red-500": incident.status === "active",
                    "bg-green-200 text-green-500":
                      incident.status === "resolved",
                    "bg-slate-200 text-slate-500":
                      incident.status === "irrelevant",
                  },
                )}
              >
                {incident.status}
              </span>
            </div>
            <p className="mb-4 line-clamp-2 text-slate-600 text-xs leading-relaxed">
              {incident.ai_what ?? "Unknown"}
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 border-slate-100 border-t pt-4 text-xs">
              <div>
                <span className="block font-bold text-[10px] text-slate-400 uppercase">
                  Priority
                </span>
                <span
                  className={`flex items-center gap-1 font-bold text-foreground text-sm`}
                >
                  {incident.priority_score ?? 2}/10
                </span>
              </div>
              <div>
                <span className="block font-bold text-[10px] text-slate-400 uppercase">
                  Total Reports
                </span>
                <span className="font-bold text-slate-800 text-sm">10</span>
              </div>
              <div>
                <span className="block font-bold text-[10px] text-slate-400 uppercase">
                  Area
                </span>
                <span className="font-medium text-slate-700">
                  {incident.zone_sector ?? "Unknown"}
                </span>
              </div>
              <div>
                <span className="block font-bold text-[10px] text-slate-400 uppercase">
                  Latest Update
                </span>
                <span className="font-medium text-slate-700">
                  {incident.updated}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-slate-200 border-t bg-slate-50 px-5 py-3">
            <button
              type="button"
              className={`flex items-center gap-1 font-bold text-xs uppercase tracking-wide hover:underline`}
            >
              View Details <ArrowForwardIcon className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
