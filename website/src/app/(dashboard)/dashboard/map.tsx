"use client";
import type { LatLngBoundsExpression } from "leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { IncidentsRecord } from "../../../../pocketbase-types";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const indiaBounds: LatLngBoundsExpression = [
  [6.5546079, 68.1113787],
  [35.6745457, 97.395561],
];

const punePosition: [number, number] = [18.52, 73.85];

function RestrictToIndia() {
  const map = useMap();
  const [defined, setDefined] = useState(false);

  useEffect(() => setDefined(true), []);

  useEffect(() => {
    map.setMaxBounds(indiaBounds);
    map.fitBounds(indiaBounds);
    map.setMinZoom(5);
    map.setMaxZoom(10);
  }, [map]);

  if (!defined) return null;

  return null;
}

export default function IndiaMap({
  incidentsData,
}: {
  incidentsData: IncidentsRecord[];
}) {
  return (
    <div style={{ width: 600, height: 500 }}>
      <MapContainer
        bounds={indiaBounds}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {incidentsData.map((incident) => {
          if (incident.location?.lat && incident.location.lon) {
            return (
              <Marker
                key={incident.id}
                position={[incident.location?.lat, incident.location.lon]}
              >
                <Popup>{incident.title}</Popup>
              </Marker>
            );
          } else {
            return null;
          }
        })}

        <Marker position={punePosition}>
          <Popup>Pune</Popup>
        </Marker>

        <RestrictToIndia />
      </MapContainer>
    </div>
  );
}
