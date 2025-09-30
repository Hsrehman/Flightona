import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services">
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive travel solutions tailored to your needs</p>
        </div>
      </section>

      <section className="services-content">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3>Flight Booking</h3>
              <p>Find and book the best flight deals from hundreds of airlines worldwide. Compare prices, schedules, and amenities to get the perfect flight for your journey.</p>
              <ul>
                <li>Domestic & International flights</li>
                <li>Round-trip & One-way tickets</li>
                <li>Multi-city itineraries</li>
                <li>Business & Economy class</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🏨</div>
              <h3>Hotel Reservations</h3>
              <p>Discover and book accommodations that match your style and budget. From luxury resorts to budget-friendly hostels, we have options for every traveler.</p>
              <ul>
                <li>Luxury hotels & resorts</li>
                <li>Budget accommodations</li>
                <li>Boutique hotels</li>
                <li>Vacation rentals</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3>Car Rentals</h3>
              <p>Get the freedom to explore at your own pace with our car rental services. Choose from a wide selection of vehicles to suit your travel needs.</p>
              <ul>
                <li>Economy to luxury vehicles</li>
                <li>Airport pickup & drop-off</li>
                <li>International driving permits</li>
                <li>GPS navigation systems</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3>Travel Packages</h3>
              <p>Save time and money with our carefully curated travel packages that combine flights, hotels, and activities for a complete travel experience.</p>
              <ul>
                <li>All-inclusive packages</li>
                <li>Honeymoon specials</li>
                <li>Family vacation deals</li>
                <li>Adventure travel packages</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>Travel Insurance</h3>
              <p>Protect your investment and travel with peace of mind. Our comprehensive travel insurance covers medical emergencies, trip cancellations, and more.</p>
              <ul>
                <li>Medical coverage</li>
                <li>Trip cancellation protection</li>
                <li>Baggage protection</li>
                <li>24/7 emergency assistance</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Custom Itineraries</h3>
              <p>Let our travel experts create a personalized itinerary just for you. We'll plan every detail of your trip based on your interests and preferences.</p>
              <ul>
                <li>Personalized trip planning</li>
                <li>Local expert recommendations</li>
                <li>Cultural experiences</li>
                <li>Off-the-beaten-path destinations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container">
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Tell Us Your Plans</h3>
              <p>Share your travel preferences, destination, and budget with our travel experts.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Customized Options</h3>
              <p>We'll research and present you with the best travel options tailored to your needs.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Book & Travel</h3>
              <p>Confirm your booking and enjoy your trip with our 24/7 support throughout your journey.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

