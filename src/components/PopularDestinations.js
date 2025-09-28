import React from 'react';
import './PopularDestinations.css';

const PopularDestinations = () => {
  const trendingDestinations = [
    {
      id: 1,
      name: "Maldives",
      country: "Maldives",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      startingPrice: 1899,
      packageId: 1
    },
    {
      id: 2,
      name: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
      startingPrice: 1450,
      packageId: 2
    },
    {
      id: 3,
      name: "Swiss Alps",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop",
      startingPrice: 2350,
      packageId: 3
    },
    {
      id: 4,
      name: "Santorini",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=800&q=80",
      startingPrice: 1280,
      packageId: 4
    },
    {
      id: 5,
      name: "New York",
      country: "USA",
      image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop",
      startingPrice: 980,
      packageId: 5
    },
    {
      id: 6,
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=800&q=80",
      startingPrice: 1390,
      packageId: 6
    }
  ];

  const handleDestinationClick = (packageId) => {
    // Scroll to packages section and highlight the specific package
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
      // You could add logic here to highlight the specific package
    }
  };

  return (
    <section className="popular-destinations-section">
      <div className="popular-destinations-container">
        <div className="popular-destinations-header">
          <h2>Where's Popular?</h2>
          <p>Discover trending destinations that travelers are loving right now</p>
        </div>

        <div className="destinations-grid">
          {trendingDestinations.map((destination, index) => (
            <div 
              key={destination.id} 
              className="destination-card"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleDestinationClick(destination.packageId)}
            >
              <div className="destination-image-container">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="destination-image"
                />
                <div className="destination-overlay">
                  <div className="destination-info">
                    <h3 className="destination-name">{destination.name}</h3>
                    <p className="destination-country">{destination.country}</p>
                    <div className="destination-price">
                      <span className="price-label">From</span>
                      <span className="price-amount">${destination.startingPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
