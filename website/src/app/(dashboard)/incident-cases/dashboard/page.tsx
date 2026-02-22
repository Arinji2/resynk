import { Sidebar } from "@/components/prateek/Incident-Cases/View Details/dashboard/sidebar";
import { NavBar } from "@/components/prateek/Incident-Cases/View Details/dashboard/navbar";
import { Header } from "@/components/prateek/Incident-Cases/View Details/dashboard/header";
import { AISummary } from "@/components/prateek/Incident-Cases/View Details/dashboard/AIsituation-summary";
import { Reports } from "@/components/prateek/Incident-Cases/View Details/dashboard/reports";
export default function Home() {
  
  return (
    <div className="h-svh w-full bg-background flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <NavBar SectorName={"4"} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header IncidentName={"Flash Flood Sector 4"} INC={"2024-884"} />
          <main className="flex-1 overflow-y-auto p-6">
            <AISummary 
              where={{ label: "Where", description: "Sector 4, North Quadrant, primarily impacting residential zones A and B." }}
              what={{ label: "What", description: "Flash flood caused by levee breach. Water levels rising 2 inches/hour." }}
              how={{ label: "How", description: "Heavy rainfall caused flooding in low-lying areas." }}
              infrastructure={{
                label: "Infrastructure Status",
                status: [
                  { name: "Power Supply", value: "Operational", color: "bg-green-500" },
                  { name: "Water Supply", value: "Partially Operational", color: "bg-yellow-500" },
                  { name: "Communication", value: "Disrupted", color: "bg-red-500" }
                ]
              }}
            />
            <Reports 
              columnTitles={["Report ID", "Type", "Description", "Reported By", "Time", "Actions"]}
              reports={[
                {
                  id: "#RPT-089",
                  type: "Critical",
                  typeColor: "bg-red-100 text-red-800",
                  description: "Elderly resident trapped on ground floor.",
                  reportedBy: "Mike K.",
                  reportedByInitials: "MK",
                  reportedByBgColor: "bg-purple-200",
                  time: "1 hr ago"
                },
                {
                  id: "#RPT-088",
                  type: "Warning",
                  typeColor: "bg-yellow-100 text-yellow-800",
                  description: "Road blocked by fallen tree.",
                  reportedBy: "Sarah T.",
                  reportedByInitials: "ST",
                  reportedByBgColor: "bg-slate-200",
                  time: "1.5 hrs ago"
                },
                {
                  id: "#RPT-087",
                  type: "Info",
                  typeColor: "bg-blue-100 text-blue-800",
                  description: "Water levels rising in Sector 4.",
                  reportedBy: "John D.",
                  reportedByInitials: "JD",
                  reportedByBgColor: "bg-blue-200",
                  time: "2 hrs ago"
                },
                {
                  id: "#RPT-086",
                  type: "Info",
                  typeColor: "bg-blue-100 text-blue-800",
                  description: "Emergency services deployed.",
                  reportedBy: "Lisa M.",
                  reportedByInitials: "LM",
                  reportedByBgColor: "bg-green-200",
                  time: "3 hrs ago"
                },
                {
                  id: "#RPT-085",
                  type: "Resolved",
                  typeColor: "bg-green-100 text-green-800",
                  description: "All residents evacuated safely.",
                  reportedBy: "David L.",
                  reportedByInitials: "DL",
                  reportedByBgColor: "bg-indigo-200",
                  time: "4 hrs ago"
                }
              ]}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
