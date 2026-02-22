"use client"

export type VictimStatus = "missing" | "found" | "critical" | "stable"

export interface VictimCard {
  id: string
  name: string
  status: VictimStatus
  statusLabel: string
  gender: "male" | "female" | "other"
  age: number
  coordinates: string
  familyReference?: {
    name: string
    id: string
    href: string
  }
}

const statusColors: Record<VictimStatus, { dot: string; ring: string }> = {
  missing:  { dot: "bg-orange-500", ring: "ring-orange-100" },
  found:    { dot: "bg-green-500",  ring: "ring-green-100"  },
  critical: { dot: "bg-red-500",   ring: "ring-red-100"    },
  stable:   { dot: "bg-blue-500",  ring: "ring-blue-100"   },
}

interface VictimCardsProps {
  victims: VictimCard[]
}

export function VictimCards({ victims }: VictimCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {victims.map((victim) => {
        const colors = statusColors[victim.status]
        return (
          <div
            key={victim.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all group"
          >
            {/* Card Header */}
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex justify-between items-center group-hover:bg-slate-100/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${colors.dot} ring-2 ${colors.ring}`} />
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-tight">{victim.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {victim.statusLabel}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                {victim.id}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Demographics</span>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-900">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">{victim.gender}</span>
                    {victim.gender.charAt(0).toUpperCase() + victim.gender.slice(1)}, {victim.age}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Last Coordinates</span>
                  <div className="flex items-center gap-1.5 text-sm font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded w-fit">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">pin_drop</span>
                    {victim.coordinates}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Family Reference</span>
                  {victim.familyReference ? (
                    <a
                      href={victim.familyReference.href}
                      className="flex items-center gap-1 text-primary hover:text-blue-700 transition-colors text-sm font-semibold"
                    >
                      {victim.familyReference.name}
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400 italic flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">link_off</span>
                      No data linked
                    </span>
                  )}
                </div>
                {victim.familyReference && (
                  <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
                    ID: {victim.familyReference.id}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
