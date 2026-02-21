import { NavBar } from "@/components/prateek/Incident-Cases/View Details/dashboard/navbar";
import { Sidebar } from "@/components/prateek/Incident-Cases/View Details/dashboard/sidebar";

export default function Home() {
  
  return (
    <div className="h-svh w-full bg-background">
      <Sidebar />
      <NavBar />
    </div>
  );
}
