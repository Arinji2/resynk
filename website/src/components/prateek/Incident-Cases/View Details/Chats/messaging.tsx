"use client"
import { MedicalDelivery } from "./medicaldelivery"
import { MsgSend } from "./msgsend"

export function Messaging() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex gap-4 max-w-3xl">
                    <div className="h-10 w-10 rounded bg-slate-300 flex-shrink-0 flex items-center justify-center text-slate-600 font-bold border border-slate-200">AS</div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-slate-900">Sgt. A. Smith</span>
                            <span className="text-[10px] text-slate-400 uppercase">Oct 24, 2023 14:15</span>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-r-lg rounded-bl-lg p-3 shadow-sm">
                            <p className="text-sm text-slate-700">
                                High voltage lines down across 4th Avenue intersection. I've requested a utility team dispatch.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 max-w-3xl mt-4">
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-baseline gap-2">
                            <div className="h-10 w-10 rounded bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">MC</div>
                            <span className="text-sm font-bold text-slate-900">Driver M. Chen</span>
                            <span className="text-[10px] text-slate-400 uppercase">Oct 24, 2023 14:20</span>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-r-lg rounded-bl-lg p-3 shadow-sm">
                            <p className="text-sm text-slate-700 mb-3">
                                Copy that, Sgt. Smith. I'm rerouting the medical supply delivery to avoid 4th Ave.
                            </p>
                            <MedicalDelivery />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 max-w-3xl ml-auto flex-row-reverse mt-4">
                    <div className="h-10 w-10 rounded bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold shadow-md">JD</div>
                    <div className="flex flex-col gap-1 items-end">
                        <div className="flex items-baseline gap-2 flex-row-reverse">
                            <span className="text-sm font-bold text-slate-900">You (Officer Doe)</span>
                            <span className="text-[10px] text-slate-400 uppercase">Oct 24, 2023 14:32</span>
                        </div>
                        <div className="bg-primary text-white rounded-l-lg rounded-br-lg p-3 shadow-sm">
                            <p className="text-sm">
                                Attention all units: Levee Breach reported in Zone A. Immediate evacuation protocol is in effect for residential blocks 4 and 5.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 border-t border-slate-200 bg-white">
                <MsgSend />
            </div>
        </div>
    )
}