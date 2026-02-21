import { IncidentCard } from "@/components/prateek/incidentcard";
import { Reportcard } from "@/components/prateek/reportcard";

export default function Home() {
  return (
    <div className="h-svh w-full bg-background">
      <h1 className="font-bold text-2xl text-primary"></h1>
      <IncidentCard />
      <Reportcard />
    </div>
  );
}
