import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Hero.css';
import Calendar from './Calendar';
import DATA from '../data/mockData.json';

const SearchBar = ({ variant = 'home' }) => {
  const [searchData, setSearchData] = useState({
    destination: 'Anywhere',
    checkin: '',
    checkout: '',
    guests: '2 guests, 1 room',
    adults: 2,
    children: 0,
    rooms: 1,
    duration: '',
    budget: '',
    sort: 'Recommended'
  });

  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [showGuestsMenu, setShowGuestsMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [destinationSearchMode, setDestinationSearchMode] = useState(false);
  const [destinationSearchValue, setDestinationSearchValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarPosition, setCalendarPosition] = useState(null);
  const [showNightsMenu, setShowNightsMenu] = useState(false);
  const calendarRef = useRef(null);
  const destinationFieldRef = useRef(null);
  const nightsMenuRef = useRef(null);
  const guestsMenuRef = useRef(null);

  const cities = useMemo(() => {
    return ['Anywhere', ...Array.from(new Set((DATA?.packages || []).map(p => p.city))).filter(Boolean).sort()];
  }, []);

  const nightsOptions = [
    { value: '', label: 'Select nights' },
    { value: '1', label: '1 night' },
    { value: '2', label: '2 nights' },
    { value: '3', label: '3 nights' },
    { value: '4', label: '4 nights' },
    { value: '5', label: '5 nights' },
    { value: '6', label: '6 nights' },
    { value: '7', label: '7 nights' },
    { value: '8', label: '8 nights' },
    { value: '9', label: '9 nights' },
    { value: '10', label: '10 nights' },
    { value: '14', label: '14 nights' },
    { value: '21', label: '21 nights' },
    { value: '30', label: '30 nights' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (destinationFieldRef.current && !destinationFieldRef.current.contains(event.target)) {
        setShowDestinationMenu(false);
        setDestinationSearchMode(false);
        setDestinationSearchValue('');
      }
      if (nightsMenuRef.current && !nightsMenuRef.current.contains(event.target)) {
        setShowNightsMenu(false);
      }
      if (guestsMenuRef.current && !guestsMenuRef.current.contains(event.target)) {
        setShowGuestsMenu(false);
      }
    };

    if (showCalendar || showDestinationMenu || showNightsMenu || showGuestsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [showCalendar, showDestinationMenu, showNightsMenu, showGuestsMenu]);

  const handleDestinationSelect = (destination) => {
    setSearchData({ ...searchData, destination });
    setShowDestinationMenu(false);
    setDestinationSearchMode(false);
    setDestinationSearchValue('');
  };

  const handleGuestsChange = (type, direction) => {
    const newData = { ...searchData };
    if (direction === 'inc') newData[type]++; else newData[type] = Math.max(type === 'adults' ? 1 : 0, newData[type] - 1);
    const total = newData.adults + newData.children;
    newData.guests = `${total} ${total === 1 ? 'guest' : 'guests'}, ${newData.rooms} ${newData.rooms === 1 ? 'room' : 'rooms'}`;
    setSearchData(newData);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const isoDate = `${year}-${month}-${day}`;
    setSearchData({ ...searchData, checkin: isoDate });
  };

  const handleNightsSelect = (nights) => {
    setSearchData({ ...searchData, duration: nights });
    setShowNightsMenu(false);
  };

  const buildSearchHash = () => {
    const params = new URLSearchParams();
    if (searchData.destination && searchData.destination !== 'Anywhere') params.set('city', searchData.destination.split(',')[0]);
    if (searchData.checkin) params.set('checkin', searchData.checkin);
    if (searchData.duration) params.set('nights', searchData.duration);
    if (searchData.adults) params.set('adults', String(searchData.adults));
    if (searchData.children) params.set('children', String(searchData.children));
    if (searchData.rooms) params.set('rooms', String(searchData.rooms));
    return `#search?${params.toString()}`;
  };

  const handleSearch = () => {
    try { localStorage.setItem('flightona_search', JSON.stringify(searchData)); } catch (e) {}
    window.location.hash = buildSearchHash();
  };

  const hasNonDefaultValues = () => {
    return (
      searchData.destination !== 'Anywhere' ||
      searchData.checkin !== '' ||
      searchData.checkout !== '' ||
      searchData.guests !== '2 guests, 1 room' ||
      searchData.adults !== 2 ||
      searchData.children !== 0 ||
      searchData.rooms !== 1 ||
      searchData.duration !== '' ||
      searchData.budget !== '' ||
      searchData.sort !== 'Recommended'
    );
  };

  return (
    <div className="search-card">
      <div className="search-header">
        <h2>Search packages</h2>
        <button className="filters-toggle" onClick={() => setShowFilters(!showFilters)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
          </svg>
          Filters
        </button>
      </div>

      <div className="search-fields">
        {/* Destination */}
        <div className="search-field">
          <label>Destination</label>
          <div className="field-container" ref={destinationFieldRef}>
            <div className="field-input" onClick={() => {
              setShowDestinationMenu(!showDestinationMenu);
              if (!showDestinationMenu) { setDestinationSearchMode(true); }
            }}>
              {!destinationSearchMode ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{searchData.destination}</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search destinations"
                    value={destinationSearchValue}
                    onChange={(e) => setDestinationSearchValue(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder-neutral-400 flex-1"
                    autoFocus
                  />
                </>
              )}
            </div>
            {showDestinationMenu && (
              <div className="dropdown-menu">
                <ul>
                  {cities
                    .filter(dest => dest.toLowerCase().includes(destinationSearchValue.toLowerCase()))
                    .map((dest) => (
                    <li key={dest}>
                      <button onClick={() => handleDestinationSelect(dest)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {dest}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Departure Date */}
        <div className="search-field">
          <label>Departure date</label>
          <div className="field-container" ref={calendarRef}>
            <div className="field-input" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const containerRect = e.currentTarget.closest('.field-container').getBoundingClientRect();
              setCalendarPosition({ top: rect.bottom - containerRect.top + 8, left: rect.left - containerRect.left });
              setShowCalendar(true);
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{searchData.checkin || 'Select date'}</span>
            </div>
            {showCalendar && (
              <Calendar
                isOpen={showCalendar}
                onClose={() => setShowCalendar(false)}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                position={calendarPosition}
              />
            )}
          </div>
        </div>

        {/* Nights */}
        <div className="search-field">
          <label>Nights</label>
          <div className="field-container" ref={nightsMenuRef}>
            <div className="field-input" onClick={() => setShowNightsMenu(!showNightsMenu)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span>
                {searchData.duration
                  ? nightsOptions.find(option => option.value === searchData.duration)?.label || `${searchData.duration} nights`
                  : 'Select nights'
                }
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
            {showNightsMenu && (
              <div className="dropdown-menu">
                <ul>
                  {nightsOptions.map((option) => (
                    <li key={option.value}>
                      <button onClick={() => handleNightsSelect(option.value)}>
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Guests */}
        <div className="search-field">
          <label>Guests</label>
          <div className="field-container" ref={guestsMenuRef}>
            <div className="field-input" onClick={() => setShowGuestsMenu(!showGuestsMenu)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>{searchData.guests}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
            {showGuestsMenu && (
              <div className="guests-menu">
                <div className="guests-item">
                  <div>
                    <div>Adults</div>
                    <div>Ages 13 or above</div>
                  </div>
                  <div className="guests-controls">
                    <button onClick={() => handleGuestsChange('adults', 'dec')}>-</button>
                    <span>{searchData.adults}</span>
                    <button onClick={() => handleGuestsChange('adults', 'inc')}>+</button>
                  </div>
                </div>
                <div className="guests-item">
                  <div>
                    <div>Children</div>
                    <div>Ages 2–12</div>
                  </div>
                  <div className="guests-controls">
                    <button onClick={() => handleGuestsChange('children', 'dec')}>-</button>
                    <span>{searchData.children}</span>
                    <button onClick={() => handleGuestsChange('children', 'inc')}>+</button>
                  </div>
                </div>
                <div className="guests-item">
                  <div>
                    <div>Rooms</div>
                    <div>Hotel rooms</div>
                  </div>
                  <div className="guests-controls">
                    <button onClick={() => handleGuestsChange('rooms', 'dec')}>-</button>
                    <span>{searchData.rooms}</span>
                    <button onClick={() => handleGuestsChange('rooms', 'inc')}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="search-field search-submit">
          <label>&nbsp;</label>
          <button className="search-button" onClick={handleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            Search packages
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-grid">
            <div className="filter-field">
              <label>Sort by</label>
              <div className="field-container">
                <div className="field-input" onClick={() => setShowSortMenu(!showSortMenu)}>
                  <span>{searchData.sort}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
                {showSortMenu && (
                  <div className="dropdown-menu">
                    <button onClick={() => setSearchData({...searchData, sort: 'Recommended'})}>Recommended</button>
                    <button onClick={() => setSearchData({...searchData, sort: 'Price: Low to High'})}>Price: Low to High</button>
                    <button onClick={() => setSearchData({...searchData, sort: 'Price: High to Low'})}>Price: High to Low</button>
                    <button onClick={() => setSearchData({...searchData, sort: 'Rating'})}>Rating</button>
                  </div>
                )}
              </div>
            </div>
            <div className="filter-field">
              <label>Budget (per person)</label>
              <div className="field-input">
                <span className="currency-symbol">$</span>
                <input type="number" min="100" step="50" placeholder="e.g. 1500" value={searchData.budget} onChange={(e) => setSearchData({...searchData, budget: e.target.value})} />
              </div>
            </div>
          </div>
        </div>
      )}

      {hasNonDefaultValues() && (
        <div className="search-actions">
          <button className="reset-button" onClick={() => {
            setSearchData({
              destination: 'Anywhere', checkin: '', checkout: '', guests: '2 guests, 1 room', adults: 2, children: 0, rooms: 1, duration: '', budget: '', sort: 'Recommended'
            });
            setShowDestinationMenu(false); setShowGuestsMenu(false); setShowFilters(false); setShowSortMenu(false); setDestinationSearchMode(false); setDestinationSearchValue(''); setShowCalendar(false); setSelectedDate(null); setCalendarPosition(null); setShowNightsMenu(false);
          }}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;


