"use client";

import { NewsFeedIcon } from "@/components/icons/feed";

interface NewsItem {
  id: string;
  time: string;
  title: string;
  description: string;
  badgeColor: string;
}

interface NewsFeedProps {
  newsItems: NewsItem[];
}

export function NewsFeed({ newsItems }: NewsFeedProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-card">
      <div className="flex shrink-0 items-center justify-between border-slate-200 border-b bg-slate-50 p-3">
        <h3 className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <NewsFeedIcon className="size-5 text-primary" />
          Official News Feed
        </h3>
      </div>
      <div className="overflow-y-auto p-0">
        <div className="divide-y divide-slate-100">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="p-4 transition-colors hover:bg-slate-50"
            >
              <div className="mb-1 flex items-start justify-between">
                <span className="font-mono text-[10px] text-slate-400">
                  {item.time}
                </span>
              </div>
              <h4 className="mb-1 font-semibold text-slate-900 text-sm">
                {item.title}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
