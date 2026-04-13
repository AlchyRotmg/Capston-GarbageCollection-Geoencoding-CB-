import { useEffect, useState } from 'react';
import { geocodeCornerBrookAddress, pointInZones } from '../lib/maps';

const MANUAL_ZONES = [
  'Day 1 Garbage Collection Zone',
  'Day 2 Garbage Collection Zone',
  'Day 3 Garbage Collection Zone',
  'Day 4 Garbage Collection Zone',
  'Day 5 Garbage Collection Zone',
];

function SearchSection({
  address,
  setAddress,
  selectedZone,
  setSelectedZone,
  setSelectedCoords,
}) {
  const [inputValue, setInputValue] = useState(address || '');
  const [statusMessage, setStatusMessage] = useState('Search a Corner Brook civic address or choose a zone manually.');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setInputValue(address || '');
  }, [address]);

  const applySearchResult = async (result) => {
    const coords = { lat: result.lat, lng: result.lng };
    setInputValue(result.label);
    setAddress(result.label);
    setSelectedCoords(coords);

    const zone = await pointInZones(coords);
    setSelectedZone(zone || '');
    setSearchResults([]);
    setStatusMessage(
      zone
        ? `Matched ${result.label} to ${zone}.`
        : 'Address found, but it falls outside the local zone layer.'
    );
  };

  const handleSearch = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setStatusMessage('Enter an address before searching.');
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setAddress(trimmed);

    try {
      const results = await geocodeCornerBrookAddress(trimmed);
      setSearchResults(results);

      if (!results.length) {
        setStatusMessage('No matching Corner Brook address was found. Try a civic number and street name.');
        return;
      }

      if (results.length === 1) {
        await applySearchResult(results[0]);
        return;
      }

      setStatusMessage(`Found ${results.length} possible addresses. Choose the best match below.`);
    } catch {
      setStatusMessage('Address lookup failed right now. You can still choose a zone manually below.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="panel-card search-card">
      <div className="section-heading-row compact">
        <div>
          <p className="eyebrow">Address lookup</p>
          <h3>Search or assign a zone</h3>
        </div>
      </div>

      <label className="field-label" htmlFor="address-input">
        Civic address
      </label>
      <div className="search-row">
        <input
          id="address-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter a civic address in Corner Brook"
        />
        <button className="primary-button" type="button" onClick={handleSearch}>
          {isSearching ? 'Searching…' : 'Search'}
        </button>
      </div>

      {searchResults.length > 1 && (
        <div className="search-results-list">
          {searchResults.map((result) => (
            <button
              key={result.id}
              type="button"
              className="search-result-item"
              onClick={() => applySearchResult(result)}
            >
              <strong>{result.label}</strong>
              <span>{result.addressType ? `Type: ${result.addressType}` : 'Address match'}</span>
            </button>
          ))}
        </div>
      )}

      <div className="manual-select-row">
        <label className="field-label" htmlFor="zone-select">
          Manual fallback zone
        </label>
        <select
          id="zone-select"
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          <option value="">Select a collection zone</option>
          {MANUAL_ZONES.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      <p className="search-status">{statusMessage}</p>
    </section>
  );
}

export default SearchSection;
