import { SearchBar } from "@/components/prateek/Incident-Cases/SearchBar";
import { IncidentManagement } from "@/components/prateek/Incident-Cases/incidentmanagement";
import { Header } from "@/components/prateek/Incident-Cases/header";

export default function Home() {
  const incidentsData = [
    {
      id: "1",
      incidentNumber: "INC-2024-884",
      title: "Flash Flood Sector 4",
      description: "Sudden water level rise reported near the industrial zone. Residential blocks A and B require immediate evacuation assistance.",
      status: "Active" as const,
      statusColor: "bg-red-100 text-red-800 border-red-200",
      priority: 9,
      priorityMax: 10,
      priorityColor: "text-danger",
      totalReports: 142,
      area: "Mumbai Central",
      latestUpdate: "12 mins ago",
      borderColor: "bg-danger",
      assignees: [
        { initials: "JD", bgColor: "bg-slate-200" },
        { initials: "AM", bgColor: "bg-blue-200", textColor: "text-blue-800" }
      ],
      footer: { button: "View Details", buttonIcon: "arrow_forward" }
    },
    {
      id: "2",
      incidentNumber: "INC-2024-891",
      title: "Bridge Structural Damage",
      description: "Reports of visible cracks on the North-East pillar of Flyover 12. Traffic halted as a precaution.",
      status: "Active" as const,
      statusColor: "bg-red-100 text-red-800 border-red-200",
      priority: 8,
      priorityMax: 10,
      priorityColor: "text-orange-500",
      totalReports: 45,
      area: "Andheri East",
      latestUpdate: "45 mins ago",
      borderColor: "bg-danger",
      assignees: [
        { initials: "RK", bgColor: "bg-green-200", textColor: "text-green-800" }
      ],
      footer: { button: "View Details", buttonIcon: "arrow_forward" }
    },
    {
      id: "3",
      incidentNumber: "INC-2024-812",
      title: "Power Outage Zone C",
      description: "Transformer blowout caused blackout in 3 blocks. Repairs completed and power restored.",
      status: "Resolved" as const,
      statusColor: "bg-green-100 text-green-800 border-green-200",
      priority: 0,
      priorityMax: 10,
      priorityColor: "text-slate-500",
      totalReports: 89,
      area: "Dadar West",
      latestUpdate: "2 hrs ago",
      borderColor: "bg-success",
      opacity: "opacity-90",
      footer: { button: "View Details", buttonIcon: "arrow_forward", info: "Closed by Officer Doe" }
    },
    {
      id: "4",
      incidentNumber: "INC-2024-905",
      title: "Fire Outbreak Market",
      description: "Small fire reported in textile storage. Fire brigade en route. Crowd control requested.",
      status: "Active" as const,
      statusColor: "bg-red-100 text-red-800 border-red-200",
      priority: 7,
      priorityMax: 10,
      priorityColor: "text-danger",
      totalReports: 12,
      area: "Crawford Market",
      latestUpdate: "Just now",
      borderColor: "bg-danger",
      footer: { button: "View Details", buttonIcon: "arrow_forward" }
    },
    {
      id: "5",
      incidentNumber: "INC-2024-800",
      title: "Duplicate Report #884",
      description: "Identified as duplicate of active case #INC-2024-884 regarding the Flash Flood.",
      status: "Irrelevant" as const,
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      priority: 0,
      priorityMax: 10,
      priorityColor: "text-slate-400",
      totalReports: 1,
      area: "Mumbai Central",
      latestUpdate: "1 day ago",
      borderColor: "bg-slate-400",
      opacity: "opacity-60",
      footer: { button: "View Details", buttonIcon: "arrow_forward" }
    },
    {
      id: "6",
      incidentNumber: "INC-2024-911",
      title: "Medical Emergency Hub",
      description: "Urgent request for insulin and first aid kits at Shelter 3. 20+ individuals affected.",
      status: "Active" as const,
      statusColor: "bg-red-100 text-red-800 border-red-200",
      priority: 9,
      priorityMax: 10,
      priorityColor: "text-danger",
      totalReports: 23,
      area: "Colaba",
      latestUpdate: "5 mins ago",
      borderColor: "bg-danger",
      footer: { button: "View Details", buttonIcon: "arrow_forward" }
    }
  ]

  return (
    <div className="h-svh w-full bg-background">
      <Header CMDID="884-21X" />
      <SearchBar />
      <IncidentManagement incidents={incidentsData} />
    </div>
  );
}
