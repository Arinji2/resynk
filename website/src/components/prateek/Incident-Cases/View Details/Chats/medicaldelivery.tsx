"use client"

import { ShippingIcon } from "@/components/icons/local_shipping"
import { OpenInNewIcon } from "@/components/icons/open_in_new"

export function MedicalDelivery() {
    return (
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded p-2 hover:bg-slate-100 cursor-pointer transition-colors group">
<div className="h-10 w-10 bg-green-100 text-green-600 rounded flex items-center justify-center shrink-0">
<ShippingIcon className="size-6" />
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-2">
<p className="text-xs font-bold text-slate-800 truncate uppercase">Medical Supply Delivery</p>
<span className="text-[9px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold uppercase border border-green-200">Resolved</span>
</div>
<p className="text-[10px] text-slate-500 truncate">#RPT-2024-886 • Logistics</p>
</div>
<OpenInNewIcon className="size-5 text-primary group-hover:text-slate-600 transition-colors" />
</div>
    )
}