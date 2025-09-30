import React from 'react';
import SafeImage from './SafeImage';
import './PopularDestinations.css';

const PopularDestinations = () => {
  const trendingDestinations = [
    {
      id: 1,
      name: "Maldives",
      country: "Maldives",
      image: "/images/maldives.jpg",
      startingPrice: 1899,
      packageId: 1
    },
    {
      id: 2,
      name: "Tokyo",
      country: "Japan",
      image: "/images/tokyo.jpg",
      startingPrice: 1450,
      packageId: 2
    },
    {
      id: 3,
      name: "Swiss Alps",
      country: "Switzerland",
      image: "/images/swiss-alps.jpg",
      startingPrice: 2350,
      packageId: 3
    },
    {
      id: 4,
      name: "Santorini",
      country: "Greece",
      image: "/images/santorini.jpg",
      startingPrice: 1280,
      packageId: 4
    },
    {
      id: 5,
      name: "New York",
      country: "USA",
      image: "/images/new-york.jpg",
      startingPrice: 980,
      packageId: 5
    },
    {
      id: 6,
      name: "Bali",
      country: "Indonesia",
      image: "/images/bali.jpg",
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
                <SafeImage 
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
