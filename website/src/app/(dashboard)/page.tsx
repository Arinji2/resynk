import { ActiveVolunteers } from "@/components/prateek/Dashboard/activevolunteers";
import { IncidentCard } from "@/components/prateek/Dashboard/incidentcard";
import { NewsFeed } from "@/components/prateek/Dashboard/newsfeed";
import { Reportcard } from "@/components/prateek/Dashboard/reportcard";
import pb from "../../../pocketbase";
import IndiaMapWrapper from "./map-wrapper";
import { getNews } from "./news";

export default async function Home() {
  const incidentsData = await pb.collection("incidents").getFullList();
  const reportsData = await pb.collection("reports").getFullList();
  const volunteers = await pb.collection("users").getFullList({
    filter: `role = "volunteer"`,
  });
  const newsData = (await getNews("Disaster Recovery News In India")).slice(
    0,
    5,
  );

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mb-auto grid w-full shrink-0 grid-cols-1 gap-4 md:grid-cols-3">
          <IncidentCard incidentCount={incidentsData.length} />
          <Reportcard ReportCount={reportsData.length} />
          <ActiveVolunteers
            VolunteerCount={volunteers.length}
            SectorName={"India"}
          />
        </div>
        <div className="flex h-fit w-full flex-row items-center justify-between">
          <IndiaMapWrapper incidentsData={incidentsData} />
          <NewsFeed newsItems={newsData} />
        </div>
      </div>
    </div>
  );
}
