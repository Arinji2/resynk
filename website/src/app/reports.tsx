import { Sidebar } from "@/components/prateek/Incident-Cases/View Details/dashboard/sidebar";
import { NavBarRep } from "@/components/prateek/Incident-Cases/View Details/Reports/navbar";
import { HeaderRep } from "@/components/prateek/Incident-Cases/View Details/Reports/header";
import { SearchBar } from "@/components/prateek/Incident-Cases/SearchBar";
import { ReportCardsRep } from "@/components/prateek/Incident-Cases/View Details/Reports/reportcards";
export default function Home() {
  return (
    <div className="h-svh w-full bg-background flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <NavBarRep SectorName="Alpha" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderRep />
          <main className="flex-1 overflow-y-auto p-6">
            <SearchBar />
            <ReportCardsRep
              reports={[
                {
                  imageSrc: "...",
                  imageId: "IMG-001",
                  title: "Levee Breach - Zone A",
                  status: "Critical",
                  statusColor: "red",
                  reportId: "#RPT-2024-884",
                  description: "...",
                  coordinates: "34.0522° N, 118.2437° W",
                  category: "Infrastructure",
                  reporter: "Ofc. J. Doe",
                  timestamp: "Oct 24, 14:32",
                },
                {
                  imageSrc: "...",
                  imageId: "IMG-002",
                  title: "Flooding in Downtown",
                  status: "Warning",
                  statusColor: "yellow",
                  reportId: "#RPT-2024-885",
                  description: "...",
                  coordinates: "34.0522° N, 118.2437° W",
                  category: "Weather",
                  reporter: "Ofc. J. Smith",
                  timestamp: "Oct 24, 15:15",
                },
                {
                  imageSrc: "...",
                  imageId: "IMG-003",
                  title: "Power Outage - Sector B",
                  status: "Resolved",
                  statusColor: "green",
                  reportId: "#RPT-2024-886",
                  description: "...",
                  coordinates: "34.0522° N, 118.2437° W",
                  category: "Infrastructure",
                  reporter: "Ofc. J. Johnson",
                  timestamp: "Oct 24, 16:45",
                },
              ]}
              pagination={{
                currentPage: 1,
                totalPages: 10,
                startResult: 1,
                endResult: 3,
                totalResults: 30,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
