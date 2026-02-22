import { findClosestIncident } from "@/app/(dashboard)/volunteers/nearest";
import { EmergencyVolIcon } from "@/components/icons/emergency-vol";
import { LoactionIcon } from "@/components/icons/location-vol";
import { cn } from "@/lib/utils";
import type {
  IncidentsRecord,
  UsersRecord,
} from "../../../../pocketbase-types";

export function VolunteerCards({
  volunteers,
  incidents,
}: {
  volunteers: UsersRecord[];
  incidents: IncidentsRecord[];
}) {
  const incidentCoords = incidents.map((i) => ({
    id: i.id,
    lat: i.location?.lat ?? 0,
    lon: i.location?.lon ?? 0,
  }));

  const formatCoords = (lat: number, lon: number) => {
    const latDir = lat >= 0 ? "N" : "S";
    const lonDir = lon >= 0 ? "E" : "W";

    return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(
      4,
    )}° ${lonDir}`;
  };

  return (
    <div className="grid grid-cols-1 gap-6 overflow-y-auto pb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {volunteers.map((v) => {
        const hasValidLocation =
          typeof v.last_location?.lat === "number" &&
          typeof v.last_location?.lon === "number";

        const nearestIncident = hasValidLocation
          ? findClosestIncident(v.last_location!, incidentCoords)
          : null;

        const nearestIncidentData: IncidentsRecord | undefined = nearestIncident
          ? incidents.find((i) => i.id === nearestIncident.incident.id)
          : undefined;

        const hasIncident = Boolean(nearestIncidentData);

        return (
          <div
            key={v.id}
            className="group relative flex flex-col overflow-hidden border border-slate-200 bg-white shadow-card transition-all duration-200 hover:shadow-card-hover"
          >
            <div className="flex flex-col items-center p-5 text-center">
              <h3 className="mb-2 font-bold text-base text-slate-900">
                {v.name}
              </h3>

              {/* PERSONAL INFO */}
              <div className="flex w-full flex-col items-center gap-3 text-slate-600 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Phone No:</span>
                  <span>{v.phone || "+-- (---) --- ----"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Adhaar No:</span>
                  <span>{v.adhar_number || "N/A"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Blood Grp:</span>
                  <span>{v.blood_type || "N/A"}</span>
                </div>
              </div>

              {/* LOCATION + INCIDENT SECTION */}
              <div className="mt-5 flex w-full flex-col gap-4">
                {/* LOCATION */}
                <div className="rounded border border-slate-100 bg-slate-200 p-3">
                  <span className="mb-2 block font-bold text-[10px] text-slate-500 uppercase">
                    Location (GPS)
                  </span>

                  <div className="flex items-center gap-2 text-slate-700 text-xs">
                    <LoactionIcon className="size-4 shrink-0 text-primary" />

                    <span className="font-mono">
                      {hasValidLocation
                        ? formatCoords(
                            v.last_location!.lat,
                            v.last_location!.lon,
                          )
                        : "Locating..."}
                    </span>
                  </div>
                </div>

                {/* NEAREST INCIDENT */}
                <div>
                  <span className="mb-2 block font-bold text-[10px] text-slate-500 uppercase">
                    Nearest Active Incident
                  </span>

                  <div
                    className={cn(
                      "flex items-start gap-2 rounded border p-3 text-xs",
                      hasIncident
                        ? "border-red-100 bg-red-100"
                        : "border-slate-100 bg-slate-50 text-slate-500",
                    )}
                  >
                    <EmergencyVolIcon className="size-4 shrink-0 text-destructive" />

                    <div className="flex flex-col items-start">
                      <span className="font-medium text-slate-800">
                        {hasIncident
                          ? (nearestIncidentData?.title ?? "Incident")
                          : "No incident nearby"}
                      </span>

                      {hasIncident && nearestIncident?.distance && (
                        <span className="text-[10px] text-slate-500">
                          {(nearestIncident.distance / 1000).toFixed(2)} km away
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
