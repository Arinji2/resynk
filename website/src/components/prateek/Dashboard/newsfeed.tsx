"use client";

import { NewsFeedIcon } from "@/components/icons/feed";

type Article = {
  query: string;
  title: string;
  summary: string;
  url: string;
  published_at: string;
  publisher: {
    title: string;
  };
};

interface NewsFeedProps {
  newsItems: Article[];
}

export function NewsFeed({ newsItems }: NewsFeedProps) {
  return (
    <div className="flex h-[400px] max-w-[500px] flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-card">
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
              key={item.url}
              className="p-4 transition-colors hover:bg-slate-50"
            >
              <div className="mb-1 flex items-start justify-between">
                <span className="font-mono text-[10px] text-slate-400">
                  {item.published_at}
                </span>
              </div>
              <h4 className="mb-1 font-semibold text-slate-900 text-sm">
                {item.title}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
