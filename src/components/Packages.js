import React, { useState } from 'react';
import './Packages.css';

const Packages = () => {

  const packages = [
    {
      id: 1,
      title: "Maldives Escape",
      location: "South Ari Atoll",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1760&auto=format&fit=crop",
      nights: "5 nights",
      rating: 4.9,
      price: 1899,
      priceUnit: "/person"
    },
    {
      id: 2,
      title: "Tokyo Discovery",
      location: "Shinjuku • Shibuya",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1760&auto=format&fit=crop",
      nights: "7 nights",
      rating: 4.7,
      price: 1450,
      priceUnit: "/person"
    },
    {
      id: 3,
      title: "Swiss Alps Retreat",
      location: "Zermatt • Interlaken",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1760&auto=format&fit=crop",
      nights: "6 nights",
      rating: 4.8,
      price: 2350,
      priceUnit: "/person"
    },
    {
      id: 4,
      title: "Santorini Sunsets",
      location: "Oia • Fira",
      image: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80",
      nights: "4 nights",
      rating: 4.6,
      price: 1280,
      priceUnit: "/person"
    },
    {
      id: 5,
      title: "NYC City Break",
      location: "Manhattan • Brooklyn",
      image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1760&auto=format&fit=crop",
      nights: "3 nights",
      rating: 4.5,
      price: 980,
      priceUnit: "/person"
    },
    {
      id: 6,
      title: "Bali & Ubud Journey",
      location: "Seminyak • Ubud",
      image: "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=1080&q=80",
      nights: "8 nights",
      rating: 4.8,
      price: 1390,
      priceUnit: "/person"
    }
  ];

  const handleAddToCart = (packageTitle) => {
    // Show toast notification
    console.log(`Added "${packageTitle}" to cart`);
  };

  return (
    <section id="packages" className="packages-section">
      <div className="packages-container">
        <div className="packages-header">
          <div>
            <h2>Featured packages</h2>
            <p>Curated trips loved by our community.</p>
          </div>
          <div className="package-filters">
            <button className="filter-button active">All</button>
            <button className="filter-button">Beach</button>
            <button className="filter-button">City</button>
            <button className="filter-button">Nature</button>
          </div>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="package-card" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="package-image-container">
                <img src={pkg.image} alt={pkg.title} className="package-image" />
                <button className="favorite-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <div className="package-nights">{pkg.nights}</div>
              </div>
              <div className="package-content">
                <div className="package-header">
                  <div>
                    <h3>{pkg.title}</h3>
                    <div className="package-location">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {pkg.location}
                    </div>
                  </div>
                  <div className="package-rating">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
                    </svg>
                    <span>{pkg.rating}</span>
                  </div>
                </div>
                <div className="package-footer">
                  <div className="package-price">
                    <span className="price-amount">${pkg.price.toLocaleString()}</span>
                    <span className="price-unit">{pkg.priceUnit}</span>
                  </div>
                  <button 
                    className="book-button"
                    onClick={() => handleAddToCart(pkg.title)}
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-button">Previous</button>
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <button className="pagination-button">Next</button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
