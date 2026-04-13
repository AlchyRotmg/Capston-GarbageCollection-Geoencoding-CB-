import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const hasApiKey = !!apiKey;

if (apiKey) {
  setOptions({ apiKey, version: 'weekly' });
}

export { importLibrary };

const NOMINATIM_ENDPOINT = 'https://nominatim.openstreetmap.org/search';

export const CORNER_BROOK_CENTER = { lat: 48.9519, lng: -57.95 };

export const CORNER_BROOK_BOUNDS = {
  north: 48.975,
  south: 48.92,
  east: -57.88,
  west: -58.06,
};

export const ZONE_COLORS = {
  'Day 1 Garbage Collection Zone': '#8b5cf6',
  'Day 2 Garbage Collection Zone': '#3b82f6',
  'Day 3 Garbage Collection Zone': '#22c55e',
  'Day 4 Garbage Collection Zone': '#facc15',
  'Day 5 Garbage Collection Zone': '#ef4444',
};

export function getZoneColor(zone) {
  return ZONE_COLORS[zone] || '#94a3b8';
}

let cachedZonesPromise;

async function getZonesData() {
  if (!cachedZonesPromise) {
    cachedZonesPromise = fetch('/zones.geojson').then((response) => response.json());
  }
  return cachedZonesPromise;
}

function isPointInRing(point, ring) {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];

    const intersect =
      yi > point[1] !== yj > point[1] &&
      point[0] < ((xj - xi) * (point[1] - yi)) / ((yj - yi) || Number.EPSILON) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

function isPointInPolygon(point, coordinates) {
  if (!coordinates?.length) return false;
  const [outerRing, ...holes] = coordinates;
  if (!isPointInRing(point, outerRing)) return false;
  return !holes.some((hole) => isPointInRing(point, hole));
}

export async function pointInZones({ lat, lng }) {
  const geojson = await getZonesData();
  const point = [lng, lat];

  for (const feature of geojson.features || []) {
    const geometry = feature?.geometry;
    const zone = feature?.properties?.Layer;
    if (!geometry || !zone) continue;

    if (geometry.type === 'Polygon' && isPointInPolygon(point, geometry.coordinates)) {
      return zone;
    }

    if (
      geometry.type === 'MultiPolygon' &&
      geometry.coordinates.some((polygon) => isPointInPolygon(point, polygon))
    ) {
      return zone;
    }
  }

  return null;
}


export async function geocodeCornerBrookAddress(query) {
  const trimmed = query?.trim();
  if (!trimmed) return [];

  const localizedQuery = /corner brook/i.test(trimmed)
    ? trimmed
    : `${trimmed}, Corner Brook, Newfoundland and Labrador, Canada`;

  const params = new URLSearchParams({
    q: localizedQuery,
    format: 'jsonv2',
    addressdetails: '1',
    limit: '5',
    countrycodes: 'ca',
    bounded: '1',
    viewbox: `${CORNER_BROOK_BOUNDS.west},${CORNER_BROOK_BOUNDS.north},${CORNER_BROOK_BOUNDS.east},${CORNER_BROOK_BOUNDS.south}`,
  });

  const response = await fetch(`${NOMINATIM_ENDPOINT}?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Geocoding failed with status ${response.status}`);
  }

  const results = await response.json();
  return (results || [])
    .map((item) => ({
      id: String(item.place_id),
      label: item.display_name,
      lat: Number(item.lat),
      lng: Number(item.lon),
      addressType: item.type || '',
    }))
    .filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng));
}
