import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Campaign messages with different urgency levels
  const campaignMessages = [
    {
      text: "Winter Escapes from £299",
      cta: "See Offers",
      urgency: "low",
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    {
      text: "Flash Sale: Ends in 2 Days",
      cta: "Shop Now",
      urgency: "high",
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
    },
    {
      text: "Early Bird Special - Save 25%",
      cta: "Book Today",
      urgency: "medium",
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Rotate messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % campaignMessages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const endTime = campaignMessages[currentMessageIndex].endDate.getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [currentMessageIndex]);

  const handlePromoClick = () => {
    // Handle CTA click - could navigate to offers page or open modal
    console.log('Promo CTA clicked:', campaignMessages[currentMessageIndex].cta);
  };

  return (
    <>
      {/* Enhanced Promo Bar */}
      <div className={`top-notification promo-bar-${campaignMessages[currentMessageIndex].urgency}`}>
        <div className="notification-content">
          <svg className="notification-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <span className="promo-message">{campaignMessages[currentMessageIndex].text}</span>
          
          {/* Countdown Timer */}
          <div className="countdown-timer">
            {timeLeft.days > 0 && <span className="time-unit">{timeLeft.days}d</span>}
            <span className="time-unit">{timeLeft.hours}h</span>
            <span className="time-unit">{timeLeft.minutes}m</span>
            <span className="time-unit">{timeLeft.seconds}s</span>
          </div>
          
          <button 
            className="notification-link promo-cta" 
            onClick={handlePromoClick}
          >
            {campaignMessages[currentMessageIndex].cta}
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-container">
          <div className="header-left">
            <a href="#" className="logo">
              <div className="logo-icon">VG</div>
              <span className="logo-text">Voyago</span>
            </a>
            <nav className="desktop-nav">
              <a href="#packages" className="nav-link">Packages</a>
              <a href="#why" className="nav-link">Why us</a>
              <a href="#testimonials" className="nav-link">Reviews</a>
              <a href="#faq" className="nav-link">FAQ</a>
            </nav>
          </div>
          <div className="header-right">
            <button className="currency-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>USD</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </button>
            <button className="cart-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="signin-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10,17 15,12 10,7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              <span>Sign in</span>
            </button>
            <button className="create-account-button">Create account</button>
            <button className="mobile-menu-button" onClick={toggleMobileMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <a href="#packages" className="mobile-nav-link">Packages</a>
          <a href="#why" className="mobile-nav-link">Why us</a>
          <a href="#testimonials" className="mobile-nav-link">Reviews</a>
          <a href="#faq" className="mobile-nav-link">FAQ</a>
        </div>
      </div>
    </>
  );
};

export default Header;
