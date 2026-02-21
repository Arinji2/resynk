"use client"

import { SmartToyIcon } from "@/components/icons/smart_toy"

interface SummaryItem {
  label: string
  description: string
}

interface InfrastructureStatus {
  label: string
  status: Array<{ name: string; value: string; color: string }>
}

interface AISummaryProps {
  where: SummaryItem
  what: SummaryItem
  how: SummaryItem
  infrastructure: InfrastructureStatus
}

export function AISummary({ where, what, how, infrastructure }: AISummaryProps) {
    return (
        <div className="flex flex-col w-full bg-white rounded border border-slate-200 shadow-card p-4 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-200 pb-2">
                <SmartToyIcon className="size-7 text-primary" />
                <h3 className="text font-bold uppercase text-slate-800">AI Situation Summary</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <span className="text-[12px] uppercase font-bold text-slate-400 block mb-1">{where.label}</span>
                    <p className="text font-medium text-slate-800">{where.description}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <span className="text-[12px] uppercase font-bold text-slate-400 block mb-1">{what.label}</span>
                    <p className="text font-medium text-slate-800">{what.description}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <span className="text-[12px] uppercase font-bold text-slate-400 block mb-1">{how.label}</span>
                    <p className="text font-medium text-slate-800">{how.description}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <span className="text-[12px] uppercase font-bold text-slate-400 block mb-1">{infrastructure.label}</span>
                    {infrastructure.status.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 mt-1">
                        <span className={`h-2 w-2 rounded-full ${item.color}`}></span>
                        <p className="text-sm font-medium text-slate-800">{item.name}: {item.value}</p>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    )
}