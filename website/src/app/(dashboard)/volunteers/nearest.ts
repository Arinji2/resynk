type Coordinates = {
  lat: number;
  lon: number;
};

type Incident = {
  id: string;
  lat: number;
  lon: number;
};

/**
 * Returns distance in meters between two coordinates
 */
function haversineDistance(a: Coordinates, b: Coordinates): number {
  const R = 6371e3; // Earth radius in meters

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const Δφ = toRad(b.lat - a.lat);
  const Δλ = toRad(b.lon - a.lon);

  const sinΔφ = Math.sin(Δφ / 2);
  const sinΔλ = Math.sin(Δλ / 2);

  const h = sinΔφ * sinΔφ + Math.cos(φ1) * Math.cos(φ2) * sinΔλ * sinΔλ;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return R * c; // meters
}

/**
 * Returns the closest incident to the user
 */
export function findClosestIncident(
  user: Coordinates,
  incidents: Incident[],
): { incident: Incident; distance: number } | null {
  if (incidents.length === 0) return null;

  let closest = incidents[0];
  let minDistance = haversineDistance(user, closest);

  for (let i = 1; i < incidents.length; i++) {
    const distance = haversineDistance(user, incidents[i]);

    if (distance < minDistance) {
      minDistance = distance;
      closest = incidents[i];
    }
  }

  return { incident: closest, distance: minDistance };
}
