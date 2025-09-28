import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <div>
              <h3>Ready to lock in your next trip?</h3>
              <p>Create a free account to save favorites and get instant alerts.</p>
            </div>
            <div className="cta-actions">
              <button className="cta-button-secondary">Browse deals</button>
              <button className="cta-button-primary">Get started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">VG</div>
                <span className="logo-text">Voyago</span>
              </div>
              <p>Smart, simple travel planning with transparent pricing.</p>
            </div>
            <div className="footer-section">
              <div className="footer-title">Company</div>
              <ul className="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/press">Press</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <div className="footer-title">Support</div>
              <ul className="footer-links">
                <li><a href="/help">Help center</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/cancellations">Cancellations</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <div className="footer-title">Legal</div>
              <ul className="footer-links">
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
                <li><a href="/cookies">Cookie policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© {currentYear} Voyago, Inc. All rights reserved.</div>
            <div className="footer-bottom-links">
              <a href="/sitemap">Sitemap</a>
              <a href="/accessibility">Accessibility</a>
              <a href="/status">Status</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div className="toast" id="toast">
        <div className="toast-content">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          <span id="toast-message">Added to cart</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
