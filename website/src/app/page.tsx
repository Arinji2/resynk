import { SidebarChat } from "@/components/prateek/Incident-Cases/View Details/Chats/sidebar";
import { NavBarChat } from "@/components/prateek/Incident-Cases/View Details/Chats/navbar";
import { HeaderChat } from "@/components/prateek/Incident-Cases/View Details/Chats/header";
import { Messaging } from "@/components/prateek/Incident-Cases/View Details/Chats/messaging";
import { SidebarVictims } from "@/components/prateek/Incident-Cases/View Details/victims/sidebar";
import { NavBarVictims } from "@/components/prateek/Incident-Cases/View Details/victims/navbar";
import { HeaderVictims } from "@/components/prateek/Incident-Cases/View Details/victims/header";
import { SearchBarVictims } from "@/components/prateek/Incident-Cases/View Details/victims/searchbar";
import { VictimCard, VictimCards } from "@/components/prateek/Incident-Cases/View Details/victims/victimcards";
export default function Home() {
  const victims: VictimCard[] = [
  {
    id: "VIC-9921",
    name: "Sarah Connor",
    status: "missing",
    statusLabel: "Missing since 2h",
    gender: "female",
    age: 29,
    coordinates: "34.0522, -118.2437",
    familyReference: {
      name: "Connor Family",
      id: "8842",
      href: "#",
    },
  },
  {
    id: "VIC-9922",
    name: "John Reese",
    status: "found",
    statusLabel: "Found - Stable",
    gender: "male",
    age: 40,
    coordinates: "40.7128, -74.0060",
  },
  {
    id: "VIC-9925",
    name: "Kyle Reese",
    status: "critical",
    statusLabel: "Critical Condition",
    gender: "male",
    age: 22,
    coordinates: "34.0522, -118.2437",
    familyReference: {
      name: "Reese Family",
      id: "8850",
      href: "#",
    },
  },
]
  return (
    <div className="h-svh w-full bg-background flex flex-col">
      <div className="flex flex-1">
        <SidebarVictims />
        <NavBarVictims SectorName="Alpha" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderVictims />
          <main className="flex-1 overflow-y-auto p-6">
            <SearchBarVictims />
            <VictimCards victims={victims} />
          </main>
        </div>
      </div>
    </div>
  );
}
