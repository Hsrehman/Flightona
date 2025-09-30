import React from 'react';
import './WhyUs.css';

const WhyUs = () => {
  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: "Flexible protection",
      description: "Clear cancellation options and travel support whenever you need it."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: "Transparent pricing",
      description: "No hidden fees. What you see is what you pay."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
        </svg>
      ),
      title: "Curated quality",
      description: "We handpick hotels and activities for comfort and experience."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 14s1 1 3 1 3-1 3-1 1 1 3 1 3-1 3-1"/>
          <path d="M3 10s1 1 3 1 3-1 3-1 1 1 3 1 3-1 3-1"/>
          <path d="M3 6s1 1 3 1 3-1 3-1 1 1 3 1 3-1 3-1"/>
          <path d="M3 18s1 1 3 1 3-1 3-1 1 1 3 1 3-1 3-1"/>
        </svg>
      ),
      title: "24/7 support",
      description: "Real humans ready to help before, during, and after your trip."
    }
  ];

  return (
    <section id="why" className="why-us-section">
      <div className="why-us-container">
        <h2>Why book with Voyago</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ animationDelay: `${index * 40}ms` }}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

