"use client"

import { NewsFeedIcon } from "@/components/icons/feed"  
import { cn } from "@/lib/utils"

interface NewsItem {
  id: string
  status: "UPDATE" | "ALERT" | "RESOLVED" | "INFO"
  time: string
  title: string
  description: string
  badgeColor: string
}

interface NewsFeedProps {
  newsItems: NewsItem[]
}

export function NewsFeed({ newsItems }: NewsFeedProps){
    return (
        <div className="flex-1 bg-white rounded border border-slate-200  shadow-card flex flex-col overflow-hidden h-[400px]">
<div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
<h3 className="text-sm font-bold text-slate-800  flex items-center gap-2">
<NewsFeedIcon className="size-5 text-primary" />
                                    Official News Feed
                                </h3>
<button className="text-[10px] font-bold text-primary hover:underline uppercase">View Archive</button>
</div>
<div className="flex-1 overflow-y-auto news-scroll p-0">
<div className="divide-y divide-slate-100 ">
    
{newsItems.map((item) => (
    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
      <div className="flex justify-between items-start mb-1">
        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${item.badgeColor} border`}>
          {item.status}
        </span>
        <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
      </div>
      <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">
        {item.description}
      </p>
    </div>
  ))}
</div>
</div>
</div>
    )
}