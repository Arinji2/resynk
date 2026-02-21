"use client"

interface Report {
  id: string
  type: string
  typeColor: string
  description: string
  reportedBy: string
  reportedByInitials: string
  reportedByBgColor: string
  time: string
}

interface ReportsProps {
  columnTitles: string[]
  reports: Report[]
}

export function Reports({ columnTitles, reports }: ReportsProps) {
    return(
        <div className="w-full bg-white rounded border border-slate-200 shadow-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold uppercase text-slate-700">Last 5 Reports Added</h3>
              <span className="bg-foreground text-white text-[11px] font-bold px-2 py-0.5 rounded-full">New</span>
            </div>
            <button className="text-xs text-primary hover:underline font-medium">View All Reports</button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase sticky top-0">
                <tr>
                  {columnTitles.map((title, idx) => (
                    <th key={idx} className={`px-6 py-3 tracking-wider ${idx === columnTitles.length - 1 ? 'text-right' : ''}`}>
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-mono text-slate-500">{report.id}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${report.typeColor}`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-800">{report.description}</td>
                    <td className="px-6 py-3 flex items-center gap-2">
                      <div className={`h-5 w-5 rounded-full ${report.reportedByBgColor} flex items-center justify-center text-[8px] font-bold`}>
                        {report.reportedByInitials}
                      </div>
                      <span className="text-slate-600">{report.reportedBy}</span>
                    </td>
                    <td className="px-6 py-3 text-slate-500">{report.time}</td>
                    <td className="px-6 py-3 text-right">
                      <button className="text-primary hover:text-blue-700 font-bold text-[10px] uppercase">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}