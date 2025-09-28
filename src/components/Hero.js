import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import Calendar from './Calendar';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    from: 'Select origin',
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

  const [showFromMenu, setShowFromMenu] = useState(false);
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [showGuestsMenu, setShowGuestsMenu] = useState(false);
  const [showDatePanel, setShowDatePanel] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [fromSearchMode, setFromSearchMode] = useState(false);
  const [destinationSearchMode, setDestinationSearchMode] = useState(false);
  const [fromSearchValue, setFromSearchValue] = useState('');
  const [destinationSearchValue, setDestinationSearchValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarPosition, setCalendarPosition] = useState(null);
  const [showNightsMenu, setShowNightsMenu] = useState(false);
  const calendarRef = useRef(null);
  const fromFieldRef = useRef(null);
  const destinationFieldRef = useRef(null);
  const nightsMenuRef = useRef(null);
  const guestsMenuRef = useRef(null);

  const destinations = [
    'Anywhere',
    'Bali, Indonesia',
    'Bangkok, Thailand',
    'Barcelona, Spain',
    'Dubai, UAE',
    'Istanbul, Türkiye',
    'Kyoto, Japan',
    'Lisbon, Portugal',
    'London, UK',
    'Maldives',
    'New York, USA',
    'Paris, France',
    'Reykjavík, Iceland',
    'Santorini, Greece',
    'Zurich, Switzerland'
  ];

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

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (fromFieldRef.current && !fromFieldRef.current.contains(event.target)) {
        setShowFromMenu(false);
        setFromSearchMode(false);
        setFromSearchValue('');
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

    if (showCalendar || showFromMenu || showDestinationMenu || showNightsMenu || showGuestsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, showFromMenu, showDestinationMenu, showNightsMenu, showGuestsMenu]);

  const handleFromSelect = (destination) => {
    setSearchData({ ...searchData, from: destination });
    setShowFromMenu(false);
    setFromSearchMode(false);
    setFromSearchValue('');
  };

  const handleDestinationSelect = (destination) => {
    setSearchData({ ...searchData, destination });
    setShowDestinationMenu(false);
    setDestinationSearchMode(false);
    setDestinationSearchValue('');
  };

  const handleGuestsChange = (type, direction) => {
    const newData = { ...searchData };
    if (direction === 'inc') {
      newData[type]++;
    } else {
      if (type === 'adults') {
        newData[type] = Math.max(1, newData[type] - 1);
      } else {
        newData[type] = Math.max(0, newData[type] - 1);
      }
    }
    
    const total = newData.adults + newData.children;
    newData.guests = `${total} ${total === 1 ? 'guest' : 'guests'}, ${newData.rooms} ${newData.rooms === 1 ? 'room' : 'rooms'}`;
    setSearchData(newData);
  };


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    setSearchData({ ...searchData, checkin: formattedDate });
  };

  const handleNightsSelect = (nights) => {
    setSearchData({ ...searchData, duration: nights });
    setShowNightsMenu(false);
  };

  const handleSearch = () => {
    console.log('Searching with:', searchData);
    // Handle search logic here
  };

  const handleReset = () => {
    setSearchData({
      from: 'Select origin',
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
    setShowFromMenu(false);
    setShowDestinationMenu(false);
    setShowGuestsMenu(false);
    setShowFilters(false);
    setShowSortMenu(false);
    setFromSearchMode(false);
    setDestinationSearchMode(false);
    setFromSearchValue('');
    setDestinationSearchValue('');
    setShowCalendar(false);
    setSelectedDate(null);
    setCalendarPosition(null);
    setShowNightsMenu(false);
  };

  // Check if there are any non-default values
  const hasNonDefaultValues = () => {
    return (
      searchData.from !== 'Select origin' ||
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
    <section className="hero-section">
      <div className="hero-background">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
      </div>

      <div className="hero-container">
        {/* Search Card */}
        <div className="search-card">
          
          <div className="search-header">
            <h2>Search packages</h2>
            <button 
              className="filters-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
              </svg>
              Filters
            </button>
          </div>

          {/* Search Fields */}
          <div className="search-fields">
            {/* From */}
            <div className="search-field">
              <label>From</label>
              <div className="field-container" ref={fromFieldRef}>
                <div 
                  className="field-input"
                  onClick={() => {
                    setShowFromMenu(!showFromMenu);
                    if (!showFromMenu) {
                      setFromSearchMode(true);
                    }
                  }}
                >
                  {!fromSearchMode ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{searchData.from}</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Search origin"
                        value={fromSearchValue}
                        onChange={(e) => setFromSearchValue(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none placeholder-neutral-400 flex-1"
                        autoFocus
                      />
                    </>
                  )}
                </div>
                {showFromMenu && (
                  <div className="dropdown-menu">
                    <ul>
                      {destinations
                        .filter(dest => dest.toLowerCase().includes(fromSearchValue.toLowerCase()))
                        .map((dest) => (
                        <li key={dest}>
                          <button onClick={() => handleFromSelect(dest)}>
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

            {/* Destination */}
            <div className="search-field">
              <label>Destination</label>
              <div className="field-container" ref={destinationFieldRef}>
                <div 
                  className="field-input"
                  onClick={() => {
                    setShowDestinationMenu(!showDestinationMenu);
                    if (!showDestinationMenu) {
                      setDestinationSearchMode(true);
                    }
                  }}
                >
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
                      {destinations
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
                <div 
                  className="field-input" 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const containerRect = e.currentTarget.closest('.field-container').getBoundingClientRect();
                    setCalendarPosition({
                      top: rect.bottom - containerRect.top + 8,
                      left: rect.left - containerRect.left
                    });
                    setShowCalendar(true);
                  }}
                >
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
                <div 
                  className="field-input"
                  onClick={() => setShowNightsMenu(!showNightsMenu)}
                >
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
                <div 
                  className="field-input"
                  onClick={() => setShowGuestsMenu(!showGuestsMenu)}
                >
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

          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-grid">
                <div className="filter-field">
                  <label>Sort by</label>
                  <div className="field-container">
                    <div 
                      className="field-input"
                      onClick={() => setShowSortMenu(!showSortMenu)}
                    >
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
                    <input 
                      type="number" 
                      min="100" 
                      step="50" 
                      placeholder="e.g. 1500"
                      value={searchData.budget}
                      onChange={(e) => setSearchData({...searchData, budget: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="search-actions">
            <button className="search-button" onClick={handleSearch}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Search packages
            </button>
            {hasNonDefaultValues() && (
              <button className="reset-button" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline">Find your next getaway with peace of mind.</p>
      </div>

    </section>
  );
};

export default Hero;
