import { ActiveVolunteers } from "@/components/prateek/Dashboard/activevolunteers";
import { IncidentCard } from "@/components/prateek/Dashboard/incidentcard";
import { Reportcard } from "@/components/prateek/Dashboard/reportcard";
import pb from "../../../../pocketbase";
import IndiaMapWrapper from "./map-wrapper";

export default async function Home() {
  const incidentsData = await pb.collection("incidents").getFullList();

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mb-auto grid w-full shrink-0 grid-cols-1 gap-4 md:grid-cols-3">
          <IncidentCard incidentCount={10} />
          <Reportcard ReportCount={45} Reportpercent={12} />
          <ActiveVolunteers VolunteerCount={25} SectorName={"Sector 4"} />
        </div>
        <div className="flex h-fit w-full flex-row items-center justify-between">
          <IndiaMapWrapper incidentsData={incidentsData} />
          <NewsFeed newsItems={newsData} />
        </div>
      </div>
    </div>
  );
}
