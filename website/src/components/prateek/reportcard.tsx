"use client";
import { PostAddIcon } from "../icons/post-add";
export function Reportcard() {
  return (
    <div className="flex items-center justify-between rounded border-slate-200 border-y border-r border-l-4 border-l-primary-accent bg-white p-4 shadow-card dark:border-slate-700 dark:bg-surface-dark">
      <div>
        <p className="mb-1 font-bold text-slate-500 text-xs uppercase tracking-wider">
          Reports Added (Mo)
        </p>
        <h3 className="font-bold text-3xl text-slate-900 dark:text-white">
          45
        </h3>
        <p className="mt-1 text-[10px] text-slate-400">
          Increase of 12% from last month
        </p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100 text-primary-accent dark:bg-slate-800">
        <PostAddIcon className="size-8 text-primary-accent" />
      </div>
    </div>
  );
}

