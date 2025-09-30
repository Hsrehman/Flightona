import React from 'react';
import SafeImage from './SafeImage';
import './PopularDestinations.css';

const PopularDestinations = () => {
  const trendingDestinations = [
    {
      id: 1,
      name: "Istanbul",
      country: "Türkiye",
      image: "/images/bosphorus-cruise.jpg",
      startingPrice: 799,
      packageId: 101
    },
    {
      id: 2,
      name: "Cappadocia",
      country: "Türkiye",
      image: "/images/dubai-desert.jpg",
      startingPrice: 650,
      packageId: 102
    },
    {
      id: 3,
      name: "Antalya",
      country: "Türkiye",
      image: "/images/phuket-catamaran.jpg",
      startingPrice: 720,
      packageId: 103
    },
    {
      id: 4,
      name: "Izmir",
      country: "Türkiye",
      image: "/images/santorini.jpg",
      startingPrice: 690,
      packageId: 104
    },
    {
      id: 5,
      name: "Ankara",
      country: "Türkiye",
      image: "/images/swiss-alps.jpg",
      startingPrice: 610,
      packageId: 105
    },
    {
      id: 6,
      name: "Fethiye",
      country: "Türkiye",
      image: "/images/phuket-catamaran.jpg",
      startingPrice: 740,
      packageId: 106
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
          <h2>Popular in Türkiye</h2>
          <p>Top cities and regions across Türkiye right now</p>
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
