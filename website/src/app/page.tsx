import { Sidebar } from "@/components/prateek/Incident-Cases/View Details/dashboard/sidebar";
import { NavBarRep } from "@/components/prateek/Incident-Cases/View Details/Reports/navbar";
import { HeaderRep } from "@/components/prateek/Incident-Cases/View Details/Reports/header";
import { SearchBar } from "@/components/prateek/Incident-Cases/SearchBar";
import { ReportCardsRep } from "@/components/prateek/Incident-Cases/View Details/Reports/reportcards";
import { SidebarChat } from "@/components/prateek/Incident-Cases/View Details/Chats/sidebar";
import { NavBarChat } from "@/components/prateek/Incident-Cases/View Details/Chats/navbar";
import { HeaderChat } from "@/components/prateek/Incident-Cases/View Details/Chats/header";
import { Messaging } from "@/components/prateek/Incident-Cases/View Details/Chats/messaging";
export default function Home() {
  
  return (
    <div className="h-svh w-full bg-background flex flex-col">
      <div className="flex flex-1">
        <SidebarChat />
        <NavBarChat SectorName="Alpha" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderChat />
          <main className="flex-1 overflow-y-auto p-6">
           <Messaging />
           
          </main>
        </div>
      </div>
    </div>
  );
}
