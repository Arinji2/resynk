import { SearchBar } from "@/components/prateek/Incident-Cases/SearchBar";
import { IncidentManagement } from "@/components/prateek/Incident-Cases/incidentmanagement";
import { Header } from "@/components/prateek/Incident-Cases/header";
import { HeaderVol } from "@/components/prateek/volunteers/header";
import { SearchBarVol } from "@/components/prateek/volunteers/searchbar";
import { VolunteerCards } from "@/components/prateek/volunteers/volunteercards";

export default function Home() {
  
  return (
    <div className="h-svh w-full bg-background">
      <HeaderVol CMDID="884-21X" />
      <SearchBarVol />
      <VolunteerCards volunteers={[
        { name: "John Doe",
          skills: "First Aid, CPR",
          location: "19.0760° N, 72.8777° E",
          status: "Available",
          phone: "+91 9876543210",
          avatar: "/images/john-doe.jpg",
          nearestIncident: "Building Collapse",
          nearestIncidentDesc: "Nearby building collapsed due to structural failure." },
        
          { name: "Jane Smith",
          skills: "Firefighting, Rescue Operations",
          location: "28.7041° N, 77.1025° E",
          status: "Deployed",
          phone: "+91 9876543211",
          avatar: "/images/jane-smith.jpg",
          nearestIncident: "Forest Fire",
          nearestIncidentDesc: "Fire spreading in the nearby forest." },

          { name: "Alex Johnson",
          skills: "Search and Rescue, Navigation",
          location: "17.3850° N, 78.4867° E",
          status: "Unavailable",
          phone: "+91 9876543212",
          avatar: "/images/alex-johnson.jpg",
          nearestIncident: "River Flood",
          nearestIncidentDesc: "River overflow causing flooding in the area." },

        { name: "Emily Davis",
          skills: "First Aid, Counseling",
          location: "19.0760° N, 72.8777° E",
          status: "Available",
          phone: "+91 9876543213",
          avatar: "/images/emily-davis.jpg",
          nearestIncident: "Medical Emergency",
          nearestIncidentDesc: "Patient requires immediate medical attention." },

          { name: "Michael Brown",
          skills: "Logistics, Coordination",
          location: "28.7041° N, 77.1025° E",
          status: "Unavailable",
          phone: "+91 9876543214",
          avatar: "/images/michael-brown.jpg",
          nearestIncident: "Road Blockage",
          nearestIncidentDesc: "Road blocked due to debris from recent storm." },

          { name: "Sarah Wilson",
          skills: "Firefighting, Evacuation",
          location: "17.3850° N, 78.4867° E",
          status: "Available",
          phone: "+91 9876543215",
          avatar: "/images/sarah-wilson.jpg",
          nearestIncident: "Building Fire",
          nearestIncidentDesc: "Fire in a residential building requiring evacuation." },
      ]} />
    </div>
  );
}
