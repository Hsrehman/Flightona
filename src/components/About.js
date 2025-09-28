import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>About Flightona</h1>
          <p>Your trusted travel partner since 2020</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Flightona was founded with a simple mission: to make travel accessible, 
                affordable, and unforgettable for everyone. We believe that travel has 
                the power to transform lives, broaden perspectives, and create lasting 
                memories.
              </p>
              <p>
                With over 4 years of experience in the travel industry, we've helped 
                thousands of travelers discover their dream destinations. Our team of 
                travel experts works tirelessly to find the best deals and create 
                personalized experiences that exceed expectations.
              </p>
              <p>
                We're not just a booking platform – we're your travel companions, 
                committed to making every journey smooth, safe, and extraordinary.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span>✈️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Customer First</h3>
              <p>Every decision we make is guided by what's best for our customers. Your satisfaction is our top priority.</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>No hidden fees, no surprises. We believe in clear, honest communication about pricing and services.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously improve our platform and services using the latest technology and industry insights.</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>We're committed to responsible tourism and environmental sustainability in all our operations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>John Smith</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Sarah Johnson</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Mike Chen</h3>
              <p>Technology Director</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🎨</div>
              <h3>Emily Davis</h3>
              <p>Customer Experience Lead</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
