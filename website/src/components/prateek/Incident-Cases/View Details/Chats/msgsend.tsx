"use client"

import { ExpandMoreIcon } from "@/components/icons/expand_more-incident"
import { SendIcon } from "@/components/icons/send"
import { Sen } from "next/font/google"

export function MsgSend(){
    return (
      <div className="p-4 bg-white border-t border-slate-200 shrink-0 z-10">
<div className="max-w-4xl mx-auto flex flex-col gap-3">
<div className="relative">
<textarea className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-accent focus:border-transparent resize-none h-24 custom-scrollbar" placeholder="Type a message to the secure channel..."></textarea>
</div>
<div className ="flex items-center justify-between">
<div className="flex items-center gap-2 relative group">
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-bold uppercase text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-accent cursor-pointer transition-colors">
<option disabled selected value="">Attach Report</option>
<option value="884">#RPT-2024-884 (Levee Breach)</option>
<option value="885">#RPT-2024-885 (Downed Lines)</option>
<option value="886">#RPT-2024-886 (Medical Supply)</option>
</select>
<ExpandMoreIcon className="size-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
</div>
<div className="hidden md:block text-[12px] text-slate-500 italic">
                                Link an incident report to this message
                            </div>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-bold uppercase rounded shadow-sm transition-colors">
<span>Send</span>
<SendIcon className="size-5 text-white" />
</button>
</div>
</div>
</div>
</div>
    )
}