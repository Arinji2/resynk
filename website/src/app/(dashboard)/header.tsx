"use client";
import { usePathname } from "next/navigation";
import { DownloadIcon } from "@/components/icons/download";
import { NotificationAlertIcon } from "@/components/icons/notifalert";

export function Header({
  IncidentName,
  INC,
}: {
  IncidentName: string;
  INC: string;
}) {
  const pathname = usePathname();
  let name = "Dashboard";
  switch (pathname) {
    case "/":
      name = "Incident Dashboard";
      break;
    case "/incident-cases":
      name = "Incident Management";
      break;

    case "/volunteers":
      name = "Volunteer Management";
      break;
  }

  return (
    <header className="top-0 z-20 flex w-full shrink-0 items-center justify-between border-slate-200 border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-4">
        <button type="button" className="p-2 text-slate-500 md:hidden">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-lg text-slate-900 uppercase leading-tight tracking-tight">
              {name}
            </h2>
            <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-bold text-[10px] text-slate-600 uppercase">
              #INC-{INC}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success"></span>
            <span className="font-bold text-[10px] text-success uppercase tracking-wider">
              Online - Monitoring
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5 font-bold text-slate-700 text-xs uppercase tracking-wide shadow-sm transition-colors hover:bg-slate-300"
        >
          <DownloadIcon className="size-5 text-slate-700" />
          Download Report
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded bg-red-500 px-3 py-1.5 font-bold text-white text-xs uppercase tracking-wide shadow transition-colors hover:bg-red-700"
        >
          <NotificationAlertIcon className="size-5 text-white" />
          Broadcast Alert
        </button>
      </div>
    </header>
  );
}
