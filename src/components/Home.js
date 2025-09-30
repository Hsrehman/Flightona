import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Flightona</h1>
          <p>Your gateway to amazing travel experiences around the world</p>
          <button className="cta-button">Explore Destinations</button>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Flightona?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✈️</div>
              <h3>Best Flight Deals</h3>
              <p>Find the most competitive prices on flights worldwide with our advanced search technology.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏨</div>
              <h3>Premium Hotels</h3>
              <p>Stay in the finest accommodations with our curated selection of luxury hotels.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Service</h3>
              <p>Get tailored travel recommendations based on your preferences and budget.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support to assist you throughout your journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="destinations">
        <div className="container">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            <div className="destination-card">
              <div className="destination-image paris"></div>
              <h3>Paris, France</h3>
              <p>The City of Light awaits your visit</p>
            </div>
            <div className="destination-card">
              <div className="destination-image tokyo"></div>
              <h3>Tokyo, Japan</h3>
              <p>Experience the perfect blend of tradition and modernity</p>
            </div>
            <div className="destination-card">
              <div className="destination-image newyork"></div>
              <h3>New York, USA</h3>
              <p>The city that never sleeps</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

