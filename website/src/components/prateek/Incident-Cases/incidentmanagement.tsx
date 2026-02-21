"use client"

import { ArrowForwardIcon } from "@/components/icons/arrow_forward-incident"

interface Incident {
  id: string
  incidentNumber: string
  title: string
  description: string
  status: "Active" | "Resolved" | "Irrelevant"
  statusColor: string
  priority: number
  priorityMax: number
  priorityColor: string
  totalReports: number
  area: string
  latestUpdate: string
  borderColor: string
  assignees?: Array<{ initials: string; bgColor: string; textColor?: string }>
  footer?: { button: string; buttonIcon: string; info?: string }
  opacity?: string
}

interface IncidentManagementProps {
  incidents: Incident[]
}

export function IncidentManagement({ incidents }: IncidentManagementProps) {
    
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pb-6">
          {incidents.map((incident) => (
            <div key={incident.id} className={`bg-white rounded border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col group relative overflow-hidden ${incident.opacity || ""}`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${incident.borderColor}`}></div>
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">#{incident.incidentNumber}</span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{incident.title}</h3>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase ${incident.statusColor} border`}>{incident.status}</span>
                </div>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {incident.description}
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs border-t border-slate-100 pt-4">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Priority</span>
                    <span className={`font-bold ${incident.priorityColor} text-sm flex items-center gap-1`}>
                      {incident.priority}/{incident.priorityMax}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Reports</span>
                    <span className="font-bold text-slate-800 text-sm">{incident.totalReports}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Area</span>
                    <span className="font-medium text-slate-700">{incident.area}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Latest Update</span>
                    <span className="font-medium text-slate-700">{incident.latestUpdate}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-between items-center">
                <button className={`text-xs font-bold ${incident.status === "Irrelevant" ? "text-slate-500 hover:text-slate-700" : "text-primary"} hover:underline uppercase tracking-wide flex items-center gap-1`}>
                  {incident.footer?.button} <ArrowForwardIcon className="size-4" />
                </button>
                {incident.assignees ? (
                  <div className="flex -space-x-2">
                    {incident.assignees.map((assignee, idx) => (
                      <div key={idx} className={`h-6 w-6 rounded-full border-2 border-white ${assignee.bgColor} flex items-center justify-center text-[8px] font-bold ${assignee.textColor || ""}`}>
                        {assignee.initials}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-400 italic">{incident.footer?.info}</div>
                )}
              </div>
            </div>
          ))}
        </div>
    )
}