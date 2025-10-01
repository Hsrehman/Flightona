import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Hero.css';
import Calendar from './Calendar';
import DATA from '../data/mockData.json';
import SearchBar from './SearchBar';

const Hero = () => {
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

  const destinations = useMemo(() => {
    const cities = Array.from(new Set((DATA?.packages || []).map(p => p.city))).filter(Boolean).sort();
    return ['Anywhere', ...cities];
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

  // Handle click outside to close dropdowns
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, showDestinationMenu, showNightsMenu, showGuestsMenu]);

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
    try {
      localStorage.setItem('flightona_search', JSON.stringify(searchData));
    } catch (e) {}
    window.location.hash = '#search';
  };

  const handleReset = () => {
    setSearchData({
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
    setShowDestinationMenu(false);
    setShowGuestsMenu(false);
    setShowFilters(false);
    setShowSortMenu(false);
    setDestinationSearchMode(false);
    setDestinationSearchValue('');
    setShowCalendar(false);
    setSelectedDate(null);
    setCalendarPosition(null);
    setShowNightsMenu(false);
  };

  // Check if there are any non-default values
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
    <section className="hero-section">
      <div className="hero-background">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
      </div>

      <div className="hero-container">
        {/* Hero now uses SearchBar component; no duplicate UI here */}
        <SearchBar />
        <p className="hero-tagline">Find your next getaway with peace of mind.</p>
      </div>

    </section>
  );
};

export default Hero;
