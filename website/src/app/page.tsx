import { IncidentCard } from "@/components/prateek/incidentcard";
import { Reportcard } from "@/components/prateek/reportcard";

export default function Home() {
  return (
    <div className="h-svh w-full bg-background">
      <IncidentCard incidentCount={10} />
      <Reportcard />
    </div>
  );
}
