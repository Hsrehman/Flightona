import React, { useState, useEffect, useRef } from 'react';
import './Calendar.css';

const Calendar = ({ isOpen, onClose, onDateSelect, selectedDate, position }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  // Update currentMonth when calendar opens and there's a selected date
  useEffect(() => {
    if (isOpen && selectedDate) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
    } else if (isOpen && !selectedDate) {
      setCurrentMonth(new Date());
    }
  }, [isOpen, selectedDate]);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const isToday = (date) => {
    const today = new Date();
    return date && 
           date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  const isSelected = (date) => {
    return selectedDate && 
           date && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date && date < today;
  };
  
  const handleDateClick = (date) => {
    if (date && !isPast(date)) {
      onDateSelect(date);
      onClose();
    }
  };
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex));
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth()));
    setShowYearDropdown(false);
  };

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setShowMonthDropdown(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false);
      }
    };

    if (showMonthDropdown || showYearDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMonthDropdown, showYearDropdown]);
  
  
  if (!isOpen) return null;
  
  const days = getDaysInMonth(currentMonth);
  
  return (
    <div 
      className="calendar-dropdown" 
      style={position ? {
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000
      } : {}}
    >
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={goToPreviousMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
          </button>
          <div className="calendar-month-year-container">
            <div className="calendar-dropdown-container" ref={monthDropdownRef}>
              <button 
                className="calendar-month-year-btn"
                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              >
                {months[currentMonth.getMonth()]}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </button>
              {showMonthDropdown && (
                <div className="calendar-dropdown-menu">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      className={`calendar-dropdown-item ${index === currentMonth.getMonth() ? 'selected' : ''}`}
                      onClick={() => handleMonthSelect(index)}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="calendar-dropdown-container" ref={yearDropdownRef}>
              <button 
                className="calendar-month-year-btn"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {currentMonth.getFullYear()}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </button>
              {showYearDropdown && (
                <div className="calendar-dropdown-menu calendar-year-dropdown">
                  {getYearRange().map((year) => (
                    <button
                      key={year}
                      className={`calendar-dropdown-item ${year === currentMonth.getFullYear() ? 'selected' : ''}`}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="calendar-nav-btn" onClick={goToNextMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </button>
        </div>
        
        <div className="calendar-weekdays">
          {weekDays.map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-days">
          {days.map((date, index) => (
            <button
              key={index}
              className={`calendar-day ${
                !date ? 'calendar-day-empty' : ''
              } ${
                date && isToday(date) ? 'calendar-day-today' : ''
              } ${
                date && isSelected(date) ? 'calendar-day-selected' : ''
              } ${
                date && isPast(date) ? 'calendar-day-past' : ''
              }`}
              onClick={() => handleDateClick(date)}
              disabled={!date || isPast(date)}
            >
              {date ? date.getDate() : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
