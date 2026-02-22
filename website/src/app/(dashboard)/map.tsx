"use client";
import type { LatLngBoundsExpression } from "leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { IncidentsRecord } from "../../../pocketbase-types";

const DefaultIcon = L.icon({
  iconUrl: markerIcon.src ?? markerIcon,
  iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
  shadowUrl: markerShadow.src ?? markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const indiaBounds: LatLngBoundsExpression = [
  [6.5546079, 68.1113787],
  [35.6745457, 97.395561],
];

function RestrictToIndia() {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(indiaBounds);
    map.fitBounds(indiaBounds);
    map.setMinZoom(5);
    map.setMaxZoom(10);
  }, [map]);

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
          if (
            incident.location?.lat != null &&
            incident.location?.lon != null
          ) {
            return (
              <Marker
                key={incident.id}
                position={[incident.location.lat, incident.location.lon]}
              >
                <Popup>{incident.title}</Popup>
              </Marker>
            );
          }
          return null;
        })}

        <RestrictToIndia />
      </MapContainer>
    </div>
  );
}
