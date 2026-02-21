"use client"

import { ChevLeftIcon } from "@/components/icons/chevron_left"
import { ChevRightIcon } from "@/components/icons/chevron_right"

interface ReportCard {
    imageSrc: string
    imageId: string
    title: string
    status: "Critical" | "Warning" | "Resolved"
    statusColor: "red" | "yellow" | "green"
    reportId: string
    description: string
    coordinates: string
    category: string
    reporter: string
    timestamp: string
}

interface PaginationData {
    currentPage: number
    startResult: number
    endResult: number
    totalResults: number
    totalPages: number
}

interface ReportCardsRepProps {
    reports: ReportCard[]
    pagination: PaginationData
    onViewMap?: (reportId: string) => void
    onViewDetails?: (reportId: string) => void
    onPageChange?: (page: number) => void
}

const statusColorMap = {
    red: {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-200"
    },
    yellow: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200"
    },
    green: {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200"
    }
}

export function ReportCardsRep({
    reports,
    pagination,
    onViewMap,
    onViewDetails,
    onPageChange
}: ReportCardsRepProps) {
    const colors = statusColorMap[reports[0]?.statusColor || "red"]

    return (
        <div className="p-6 flex-1 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="grid grid-cols-1 gap-4">
                {reports.map((report) => {
                    const reportColors = statusColorMap[report.statusColor]
                    return (
                        <div
                            key={report.reportId}
                            className="bg-white dark:bg-surface-dark rounded border border-slate-200 dark:border-slate-700 shadow-card hover:shadow-card-hover transition-shadow overflow-hidden group flex flex-col md:flex-row"
                        >
                            <div className="w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-200 relative overflow-hidden">
                                <img
                                    alt="Report Evidence"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    src={report.imageSrc}
                                />
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                    {report.imageId}
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 uppercase group-hover:text-primary-accent transition-colors">
                                                {report.title}
                                            </h3>
                                            <span
                                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${reportColors.bg} ${reportColors.text} ${reportColors.border}`}
                                            >
                                                {report.status}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-400 font-mono">{report.reportId}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                                        {report.description}
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-500 mb-2">
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase text-slate-400">Coordinates</span>
                                            <span className="font-mono text-slate-700 dark:text-slate-300">{report.coordinates}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase text-slate-400">Category</span>
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{report.category}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase text-slate-400">Reporter</span>
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{report.reporter}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase text-slate-400">Timestamp</span>
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{report.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-3 mt-1 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                                    <button
                                        onClick={() => onViewMap?.(report.reportId)}
                                        className="px-3 py-1 text-[10px] font-bold uppercase text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                                    >
                                        View Map
                                    </button>
                                    <button
                                        onClick={() => onViewDetails?.(report.reportId)}
                                        className="px-3 py-1 text-[10px] font-bold uppercase text-white bg-foreground hover:bg-slate-600 rounded transition-colors"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-slate-700 dark:text-slate-400">
                            Showing
                            <span className="font-bold text-slate-900 dark:text-white"> {pagination.startResult} </span>
                            to
                            <span className="font-bold text-slate-900 dark:text-white"> {pagination.endResult} </span>
                            of
                            <span className="font-bold text-slate-900 dark:text-white"> {pagination.totalResults} </span>
                            results
                        </p>
                    </div>
                    <div>
                        <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                                onClick={() => onPageChange?.(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevLeftIcon className="w-5 h-5" />
                            </button>
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => onPageChange?.(page)}
                                    aria-current={page === pagination.currentPage ? "page" : undefined}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        page === pagination.currentPage
                                            ? "z-10 bg-primary-accent border-primary-accent text-white font-bold"
                                            : "bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    } ${page > 3 && page < pagination.totalPages - 1 ? "hidden md:inline-flex" : ""}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => onPageChange?.(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                            >
                                <span className="sr-only">Next</span>
                                <ChevRightIcon className="w-5 h-5" />
                            </button>
                        </nav>
                    </div>
                </div>
                <div className="flex items-center justify-between sm:hidden w-full">
                    <button
                        onClick={() => onPageChange?.(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => onPageChange?.(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}