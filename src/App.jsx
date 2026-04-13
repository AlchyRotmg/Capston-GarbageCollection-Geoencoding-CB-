import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MapSection from './components/MapSection';
import SearchSection from './components/SearchSection';
import Footer from './components/Footer';
import {
  getNextCollection,
  OFFICIAL_CALENDAR_IMAGES,
  RECYCLING_META,
  ZONE_SCHEDULES,
} from './lib/zoneSchedule';

const STORAGE_KEY = 'cbgc_address';
const ZONE_STORAGE_KEY = 'cbgc_zone';

const ZONE_META = {
  'Day 1 Garbage Collection Zone': { short: 'Day 1', color: '#8b5cf6' },
  'Day 2 Garbage Collection Zone': { short: 'Day 2', color: '#3b82f6' },
  'Day 3 Garbage Collection Zone': { short: 'Day 3', color: '#22c55e' },
  'Day 4 Garbage Collection Zone': { short: 'Day 4', color: '#facc15' },
  'Day 5 Garbage Collection Zone': { short: 'Day 5', color: '#ef4444' },
};

function App() {
  const [address, setAddress] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [selectedZone, setSelectedZone] = useState(() => localStorage.getItem(ZONE_STORAGE_KEY) || '');
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [calendarZone, setCalendarZone] = useState(() => localStorage.getItem(ZONE_STORAGE_KEY) || 'Day 1 Garbage Collection Zone');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, address);
  }, [address]);

  useEffect(() => {
    if (selectedZone) localStorage.setItem(ZONE_STORAGE_KEY, selectedZone);
    else localStorage.removeItem(ZONE_STORAGE_KEY);
  }, [selectedZone]);

  const setZoneEverywhere = (zone) => {
    setSelectedZone(zone);
    if (zone) setCalendarZone(zone);
  };

  const zoneMeta = useMemo(() => ZONE_META[selectedZone] || null, [selectedZone]);
  const nextCollection = useMemo(() => getNextCollection(selectedZone), [selectedZone]);
  const nextStreamMeta = nextCollection ? RECYCLING_META[nextCollection.stream] : null;
  const activeCalendarZone = calendarZone || selectedZone || 'Day 1 Garbage Collection Zone';
  const calendarEntries = useMemo(() => ZONE_SCHEDULES[activeCalendarZone]?.dates || [], [activeCalendarZone]);
  const calendarImage = OFFICIAL_CALENDAR_IMAGES[activeCalendarZone];

  return (
    <div className="app-shell">
      <Header />

      <main className="experience-layout">
        <aside className="left-panel">
          <section className="panel-card hero-card">
            <p className="eyebrow">Search by collection zone</p>
            <h2>Find garbage collection details by civic address</h2>
            <p className="hero-copy">
              Enter your civic address below and select the matching result. This version keeps your existing
              frontend shell, but now shows one next scheduled pickup plus whether that week is fibres or
              containers.
            </p>
          </section>

          <SearchSection
            address={address}
            setAddress={setAddress}
            selectedZone={selectedZone}
            setSelectedZone={setZoneEverywhere}
            setSelectedCoords={setSelectedCoords}
          />

          <section className="panel-card summary-card">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Selected result</p>
                <h3>Address summary</h3>
              </div>
              {zoneMeta && (
                <span className="zone-chip" style={{ '--zone-color': zoneMeta.color }}>
                  <span className="zone-chip-dot" />
                  {zoneMeta.short}
                </span>
              )}
            </div>

            <div className="summary-block">
              <span className="summary-label">Address</span>
              <p>{address || '[Placeholder: civic address selection pending]'}</p>
            </div>

            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Collection zone</span>
                <strong>{selectedZone || '[Placeholder: zone not resolved yet]'}</strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">Status</span>
                <strong>{selectedZone ? 'Matched to local zone layer' : '[Placeholder: connect official lookup]'}</strong>
              </div>
            </div>
          </section>

          <section className="panel-card dates-card">
            <div className="section-heading-row compact">
              <div>
                <p className="eyebrow">Upcoming pickup</p>
                <h3>Next collection date</h3>
              </div>
            </div>

            {nextCollection && nextStreamMeta ? (
              <div className="next-collection-card">
                <div className="next-collection-date">{nextCollection.label}</div>
                <div className="recycling-badges">
                  <span
                    className="recycling-badge"
                    style={{ '--recycling-color': nextStreamMeta.color }}
                  >
                    <span className="recycling-badge-dot" />
                    {nextStreamMeta.label}
                  </span>
                  <span className="recycling-note">{nextStreamMeta.description}</span>
                </div>
              </div>
            ) : (
              <div className="placeholder-note">
                Select a zone to show the next scheduled garbage collection day and whether that pickup week is
                fibres or containers.
              </div>
            )}
          </section>

          <section className="panel-card notes-card">
            <p className="eyebrow">Recycling stream key</p>
            <div className="stream-key-grid">
              <div className="stream-key-card" style={{ '--stream-color': '#c89a5b' }}>
                <span className="stream-key-swatch" />
                <div>
                  <strong>Fibres</strong>
                  <p>Brown week</p>
                </div>
              </div>
              <div className="stream-key-card" style={{ '--stream-color': '#8fd6e1' }}>
                <span className="stream-key-swatch" />
                <div>
                  <strong>Containers</strong>
                  <p>Blue week</p>
                </div>
              </div>
            </div>
          </section>
        </aside>

        <section className="map-panel panel-card">
          <div className="map-panel-header">
            <div>
              <p className="eyebrow">Collection zones map</p>
              <h2>Interactive zone viewer</h2>
            </div>
            <div className="map-panel-actions">
              <a href="https://www.cornerbrook.com/city-services-bak/garbage-and-recycling/" target="_blank" rel="noreferrer">
                Official page
              </a>
            </div>
          </div>

          <MapSection
            selectedZone={selectedZone}
            setSelectedZone={setZoneEverywhere}
            selectedCoords={selectedCoords}
          />
        </section>
      </main>

      <section id="calendar-view" className="calendar-view-section panel-card">
        <div className="calendar-heading-row">
          <div>
            <p className="eyebrow">Calendar view</p>
            <h2>2026 garbage and recycling schedule</h2>
          </div>
          <div className="calendar-zone-tabs">
            {Object.entries(ZONE_META).map(([zoneName, meta]) => (
              <button
                key={zoneName}
                type="button"
                className={`calendar-tab ${activeCalendarZone === zoneName ? 'active' : ''}`}
                style={{ '--zone-color': meta.color }}
                onClick={() => setZoneEverywhere(zoneName)}
              >
                {meta.short}
              </button>
            ))}
          </div>
        </div>

        <div className="calendar-layout">
          <div className="calendar-list-panel">
            <div className="calendar-zone-header">
              <strong>{ZONE_META[activeCalendarZone]?.short || 'Day schedule'}</strong>
              <span>{activeCalendarZone}</span>
            </div>

            <div className="calendar-list">
              {calendarEntries.map((entry) => {
                const streamMeta = RECYCLING_META[entry.stream];
                const isNext = selectedZone === activeCalendarZone && nextCollection?.iso === entry.iso;
                return (
                  <button
                    key={entry.iso}
                    type="button"
                    className={`calendar-list-item ${isNext ? 'is-next' : ''}`}
                    onClick={() => setZoneEverywhere(activeCalendarZone)}
                  >
                    <div>
                      <div className="calendar-date">{entry.label}</div>
                    </div>
                    <span className="recycling-badge" style={{ '--recycling-color': streamMeta.color }}>
                      <span className="recycling-badge-dot" />
                      {streamMeta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="calendar-image-panel">
            <div className="calendar-image-header">
              <strong>Official calendar</strong>
              <span>{ZONE_META[activeCalendarZone]?.short}</span>
            </div>
            <div className="calendar-image-frame">
              <img src={calendarImage} alt={`${ZONE_META[activeCalendarZone]?.short} official collection calendar`} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
