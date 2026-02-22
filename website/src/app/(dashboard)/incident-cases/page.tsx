import { IncidentManagement } from "@/components/prateek/Incident-Cases/incidentmanagement";
import { SearchBar } from "@/components/prateek/Incident-Cases/SearchBar";
import pb from "../../../../pocketbase";

export default async function Home() {
  const incidents = await pb.collection("incidents").getFullList();
  return (
    <div className="flex h-svh w-full flex-col items-center justify-start gap-4">
      <SearchBar />
      <IncidentManagement incidents={incidents} />
    </div>
  );
}
