import { useEffect, useMemo, useState } from 'react';
import { CircleMarker, GeoJSON, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CORNER_BROOK_CENTER, getZoneColor } from '../lib/maps';

function FlyToSelection({ selectedCoords }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCoords) {
      map.flyTo([selectedCoords.lat, selectedCoords.lng], 14, { duration: 1.1 });
    }
  }, [map, selectedCoords]);

  return null;
}

function MapSection({ selectedZone, setSelectedZone, selectedCoords }) {
  const [zonesData, setZonesData] = useState(null);

  useEffect(() => {
    fetch('/zones.geojson')
      .then((response) => response.json())
      .then(setZonesData)
      .catch(() => setZonesData(null));
  }, []);

  const legendItems = useMemo(
    () => [
      'Day 1 Garbage Collection Zone',
      'Day 2 Garbage Collection Zone',
      'Day 3 Garbage Collection Zone',
      'Day 4 Garbage Collection Zone',
      'Day 5 Garbage Collection Zone',
    ],
    []
  );

  return (
    <div className="map-wrapper">
      <div className="map-legend-card">
        <h3>Legend</h3>
        <ul>
          {legendItems.map((zone) => (
            <li key={zone}>
              <span className="legend-swatch" style={{ background: getZoneColor(zone) }} />
              <span>{zone}</span>
            </li>
          ))}
        </ul>
      </div>

      <MapContainer center={[CORNER_BROOK_CENTER.lat, CORNER_BROOK_CENTER.lng]} zoom={14} className="map-canvas">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToSelection selectedCoords={selectedCoords} />

        {zonesData && (
          <GeoJSON
            data={zonesData}
            style={(feature) => {
              const zone = feature?.properties?.Layer || '';
              const active = zone === selectedZone;
              return {
                color: getZoneColor(zone),
                fillColor: getZoneColor(zone),
                weight: active ? 3 : 2,
                fillOpacity: active ? 0.52 : 0.26,
              };
            }}
            onEachFeature={(feature, layer) => {
              const zone = feature?.properties?.Layer || 'Unknown Zone';
              layer.bindTooltip(zone);
              layer.on({
                click: () => setSelectedZone(zone),
              });
            }}
          />
        )}

        {selectedCoords && (
          <CircleMarker center={[selectedCoords.lat, selectedCoords.lng]} radius={7} pathOptions={{ color: '#ffffff', fillColor: '#111827', fillOpacity: 1, weight: 2.5 }}>
            <Tooltip permanent direction="top" offset={[0, -10]}>
              Selected address
            </Tooltip>
          </CircleMarker>
        )}
      </MapContainer>

      <div className="map-overlay-note">
        Click a colored zone to load the next pickup date and sync the calendar below. The map now starts closer to
        the middle of Corner Brook so the highlighted collection areas are visible right away.
      </div>
    </div>
  );
}

export default MapSection;
