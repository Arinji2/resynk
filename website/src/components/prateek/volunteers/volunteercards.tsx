"use client"

import { EmergencyVolIcon } from "@/components/icons/emergency-vol";
import { LoactionIcon } from "@/components/icons/location-vol";

const defaultAvatarUrl = "/images/default-avatar.png"

export function VolunteerCards({ volunteers }: { volunteers: { name: string; skills: string; location: string; status: string; phone: string; avatar: string; nearestIncident: string; nearestIncidentDesc: string }[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-6">
            {volunteers.map((v, i) => (
                <div key={v.name + i} className="bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col group relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${v.status === "Available" ? "bg-success" : v.status === "Deployed" ? "bg-warning" : v.status === "Unavailable" ? "bg-slate-300" : "bg-slate-300"}`}></div>
                    <div className="p-5 flex-1 flex flex-col items-center text-center">
                        <div className="relative mb-3">
                            <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                <img alt="Profile" className="h-full w-full object-cover" src={v.avatar || defaultAvatarUrl} />
                            </div>
                            <span className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ${v.status === "Available" ? "bg-success" : v.status === "Deployed" ? "bg-warning" : "bg-slate-400"} border-2 border-white`}></span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">{v.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                            <span className="material-symbols-outlined text-[14px]">call</span>
                            {v.phone || "+-- (---) --- ----"}
                        </div>
                        <div className="w-full bg-slate-50 rounded p-3 mb-3 border border-slate-100 ">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-bold text-slate-500 uppercase text-[10px]">Location (GPS)</span>
                                <LoactionIcon className="size-4 text-primary" />
                            </div>
                            <div className="font-mono text-xs text-slate-700">
                                {v.location || "--.----° N, --.----° E"}
                            </div>
                        </div>
                        <div className="w-full text-left">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nearest Active Incident</span>
                            <div className={`flex items-start gap-2 text-xs ${v.nearestIncident ? "bg-red-50 p-2 rounded border border-red-100" : "bg-slate-50 p-2 rounded border border-slate-100 text-slate-500"}`}>
                                <EmergencyVolIcon className="size-4 text-destruction shrink-0" />
                                <span className="font-medium text-slate-800 truncate">
                                    {v.nearestIncident ? `Close to: ${v.nearestIncident}` : "No incident nearby"}
                                    {v.nearestIncidentDesc ? <><br /><span className="text-[10px] font-normal text-slate-500">({v.nearestIncidentDesc})</span></> : null}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}