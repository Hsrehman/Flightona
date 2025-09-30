import React, { useEffect, useMemo, useState } from 'react';
import SafeImage from './SafeImage';
import { packagesData as PACKAGES } from './mockData';
import './SearchResults.css';

const ALL_FEATURES = [
  'Family-friendly',
  'Beachfront',
  'City center',
  'All-inclusive',
  'Activities',
  'Free cancellation'
];

const ALL_BOARD_TYPES = [
  'Any',
  'Room only',
  'Breakfast included',
  'Half board',
  'Full board',
  'All-inclusive'
];

const MOCK_RESULTS = PACKAGES;

const SearchResults = () => {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [nights, setNights] = useState('');
  const [guestsRooms, setGuestsRooms] = useState('2 guests, 1 room');
  const [boardType, setBoardType] = useState('Any');
  const [minStars, setMinStars] = useState(0);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev => (
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    ));
  };

  const clearAll = () => {
    setDestination('');
    setDepartureDate('');
    setNights('');
    setGuestsRooms('2 guests, 1 room');
    setBoardType('Any');
    setMinStars(0);
    setPriceMin('');
    setPriceMax('');
    setSelectedFeatures([]);
  };

  const filteredResults = useMemo(() => {
    return MOCK_RESULTS.filter(item => {
      if (destination && !(`${item.location} ${item.name}`.toLowerCase().includes(destination.toLowerCase()))) return false;
      if (boardType !== 'Any' && item.boardType !== boardType) return false;
      if (minStars && item.starRating < minStars) return false;
      if (priceMin && item.price < Number(priceMin)) return false;
      if (priceMax && item.price > Number(priceMax)) return false;
      if (selectedFeatures.length > 0 && !selectedFeatures.every(f => item.features.includes(f))) return false;
      return true;
    });
  }, [destination, boardType, minStars, priceMin, priceMax, selectedFeatures]);

  return (
    <section className="results-page">
      <div className="results-background">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
      </div>

      <div className="results-container">
        <div className="results-header">
          <div>
            <h1>Search results</h1>
            <p>Find the perfect package with flexible dates and curated stays.</p>
          </div>
          <button className="mobile-filters-button" onClick={() => setMobileFiltersOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
            </svg>
            Filters
          </button>
        </div>

        <div className="results-layout">
          {/* Filters Panel */}
          <aside className={`filters-panel ${mobileFiltersOpen ? 'open' : ''}`}>
            <div className="filters-inner">
              <div className="filters-top">
                <h3>Filters</h3>
                <button className="close-filters" onClick={() => setMobileFiltersOpen(false)}>Close</button>
              </div>

              <div className="filter-group">
                <label>Destination</label>
                <div className="field-input">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?"/>
                </div>
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label>Departure date</label>
                  <div className="field-input">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                  </div>
                </div>
                <div className="filter-group">
                  <label>Nights</label>
                  <div className="field-input">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <input type="number" min="1" step="1" placeholder="e.g. 5" value={nights} onChange={(e) => setNights(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="filter-group">
                <label>Guests / rooms</label>
                <div className="field-input">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                  </svg>
                  <input value={guestsRooms} onChange={(e) => setGuestsRooms(e.target.value)} placeholder="2 guests, 1 room"/>
                </div>
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label>Board type</label>
                  <div className="field-input">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 3h18v6H3z"/>
                      <path d="M16 21H8l-1-6h10z"/>
                    </svg>
                    <select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
                      {ALL_BOARD_TYPES.map(bt => (
                        <option key={bt} value={bt}>{bt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="filter-group">
                  <label>Star rating</label>
                  <div className="stars">
                    {[0,1,2,3,4,5].map(s => (
                      <button key={s} className={`star-chip ${minStars===s ? 'active' : ''}`} onClick={() => setMinStars(s)}>
                        {s === 0 ? 'Any' : `${s}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label>Price range (USD)</label>
                  <div className="price-range">
                    <div className="field-input">
                      <span className="currency">$</span>
                      <input type="number" min="0" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                    </div>
                    <div className="field-input">
                      <span className="currency">$</span>
                      <input type="number" min="0" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-group">
                <label>Special features</label>
                <div className="features">
                  {ALL_FEATURES.map(feat => (
                    <label key={feat} className={`checkbox-field ${selectedFeatures.includes(feat) ? 'checked' : ''}`}>
                      <div className="checkbox">
                        {selectedFeatures.includes(feat) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <input type="checkbox" checked={selectedFeatures.includes(feat)} onChange={() => toggleFeature(feat)} style={{ display: 'none' }} />
                      <span>{feat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-actions">
                <button className="apply-button" onClick={() => setMobileFiltersOpen(false)}>Apply filters</button>
                <button className="reset-button" onClick={clearAll}>Reset</button>
              </div>
            </div>
            <div className="filters-backdrop" onClick={() => setMobileFiltersOpen(false)}></div>
          </aside>

          {/* Results List */}
          <div className="results-list">
            <div className="results-summary">
              <span>{filteredResults.length} places found</span>
              <div className="sort">
                <span>Sort by:</span>
                <select>
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="cards-grid">
              {filteredResults.map((item, index) => (
                <div className="result-card" key={item.id} style={{ animationDelay: `${index * 80}ms` }}>
                  <div className="card-media">
                    <SafeImage src={item.image} alt={item.name} className="card-image" />
                    <div className="media-badges">
                      {item.boardType && <span className="badge">{item.boardType}</span>}
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <div>
                        <h3>{item.name}</h3>
                        <div className="location-row">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{item.location}{item.distance ? ` • ${item.distance}` : ''}</span>
                        </div>
                      </div>
                      <div className="rating">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
                        </svg>
                        <span>{item.starRating}</span>
                        <span className="reviews">{item.reviewScore} ({item.reviewsCount.toLocaleString()})</span>
                      </div>
                    </div>

                    <div className="tags">
                      {(item.features || []).slice(0, 3).map(t => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>

                    <div className="card-footer">
                      <div className="price">
                        <span className="amount">${item.price.toLocaleString()}</span>
                        <span className="unit">{item.priceUnit}</span>
                      </div>
                      <div className="cta-group">
                        <button className="secondary-cta" onClick={() => { window.location.hash = `#package/${item.id}`; }}>View details</button>
                        <button className="primary-cta">Book now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResults;


