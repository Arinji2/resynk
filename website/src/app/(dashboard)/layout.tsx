import { LiveFeed } from "@/components/prateek/Dashboard/LiveFeed";
import { Navbar } from "@/components/prateek/Dashboard/Navbar";
import { Header } from "./header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh w-full flex-row items-start justify-center bg-background">
      <Navbar />
      <div className="flex h-full w-full flex-col items-start justify-start gap-4">
        <Header IncidentName={"Flash Flood Sector 4"} INC={"2024-884"} />
        <div className="h-full w-full px-4">{children}</div>
        <div className="mt-auto h-fit w-full">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}
