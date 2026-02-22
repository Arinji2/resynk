import { SearchBarVol } from "@/components/prateek/volunteers/searchbar";
import { VolunteerCards } from "@/components/prateek/volunteers/volunteercards";
import pb from "../../../../pocketbase";

export default async function Home() {
  const volunteers = await pb.collection("users").getFullList({
    filter: `role = "volunteer"`,
  });
  const incidents = await pb.collection("incidents").getFullList();
  return (
    <div className="h-svh w-full">
      <SearchBarVol />
      <VolunteerCards volunteers={volunteers} incidents={incidents} />
    </div>
  );
}
