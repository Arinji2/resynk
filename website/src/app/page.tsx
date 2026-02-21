import { IncidentCard } from "@/components/prateek/Dashboard/incidentcard";
import { Reportcard } from "@/components/prateek/Dashboard/reportcard";
import { ActiveVolunteers } from "@/components/prateek/Dashboard/activevolunteers";
import { NewsFeed } from "@/components/prateek/Dashboard/newsfeed";
import { LiveFeed } from "@/components/prateek/Dashboard/LiveFeed";
import { Navbar } from "@/components/prateek/Dashboard/Navbar";

export default function Home() {
  const newsData = [
    {
      id: "1",
      status: "UPDATE" as const,
      time: "10:42 UTC",
      title: "Regional Relief Protocol Alpha",
      description: "New distribution centers opened in District 9. All volunteer units required to report status by 14:00.",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      id: "2",
      status: "ALERT" as const,
      time: "09:15 UTC",
      title: "Weather Advisory: Heavy Rainfall",
      description: "Forecast indicates severe conditions for coastal zones. Evacuation warning upgraded to Level 2.",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      id: "3",
      status: "RESOLVED" as const,
      time: "08:30 UTC",
      title: "Power Grid Stabilization",
      description: "Maintenance crews have restored full functionality to Substation B.",
      badgeColor: "bg-green-100 text-green-800 border-green-200"
    },
    {
      id: "4",
      status: "INFO" as const,
      time: "07:00 UTC",
      title: "Volunteer Shift Change",
      description: "Night shift teams are relieved. Morning briefing scheduled at HQ.",
      badgeColor: "bg-slate-100 text-slate-600 border-slate-200"
    }
  ]

  return (
    <div className="h-svh w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
      <IncidentCard incidentCount={10} />
      <Reportcard ReportCount={45} Reportpercent={12}/>
      <ActiveVolunteers VolunteerCount={25} SectorName={"Sector 4"} />
      <NewsFeed newsItems={newsData} />
      <LiveFeed />
      <Navbar />
</div>
</div>
  );
}
