import React, { useEffect, useMemo, useState } from 'react';
import SafeImage from './SafeImage';
import { packagesData } from './mockData';
import './PackageDetails.css';

function usePackageFromHash() {
  return useMemo(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    // expected formats: #package/ID or #package?pid=ID
    if (hash.startsWith('#package/')) {
      const idStr = hash.replace('#package/', '').trim();
      const id = Number(idStr);
      return packagesData.find(p => p.id === id) || null;
    }
    if (hash.startsWith('#package')) {
      const qIndex = hash.indexOf('?');
      if (qIndex !== -1) {
        const params = new URLSearchParams(hash.slice(qIndex + 1));
        const pid = Number(params.get('pid'));
        if (pid) return packagesData.find(p => p.id === pid) || null;
      }
    }
    return null;
  }, []);
}

const PackageDetails = () => {
  const pkg = usePackageFromHash();
  const [openDays, setOpenDays] = useState(() => new Set());
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'customise'
  const [numPeople, setNumPeople] = useState(2);

  const toggleDay = (day) => {
    setOpenDays(prev => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day); else next.add(day);
      return next;
    });
  };

  const totalPrice = (pkg ? (pkg.price * Math.max(1, Number(numPeople) || 1)) : 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const saved = JSON.parse(localStorage.getItem('flightona_search') || '{}');
      if (typeof saved.adults === 'number' || typeof saved.children === 'number') {
        const total = (saved.adults || 0) + (saved.children || 0);
        if (total > 0) setNumPeople(total);
      }
    } catch (e) {}
  }, []);

  if (!pkg) {
    return (
      <section className="pd-page">
        <div className="pd-container">
          <div className="pd-empty">
            <h1>Package not found</h1>
            <p>Please go back to search and choose a package.</p>
            <button className="pd-back" onClick={() => { window.location.hash = '#search'; }}>Back to search</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pd-page">
      <div className="pd-background">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
      </div>
      <div className="pd-container">
        <div className="pd-topbar">
          <div className="pd-tabs">
            <button className={`pd-tab ${activeTab==='details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Tour details</button>
            <button className={`pd-tab ${activeTab==='customise' ? 'active' : ''}`} onClick={() => setActiveTab('customise')}>Customise tour</button>
          </div>
          <div className="pd-pricebar">
            <div className="pd-price-pp">
              <span className="label">Price per person</span>
              <span className="amount">${pkg.price.toLocaleString()}</span>
              <span className="unit">{pkg.priceUnit}</span>
            </div>
            <div className="pd-people" aria-label="Number of people">
              <button onClick={() => setNumPeople(p => Math.max(1, (Number(p) || 1) - 1))} aria-label="Decrease people">-</button>
              <input type="number" min="1" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
              <button onClick={() => setNumPeople(p => (Number(p) || 1) + 1)} aria-label="Increase people">+</button>
            </div>
            <div className="pd-total">
              <span className="label">Total</span>
              <span className="amount">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="pd-ctas">
              <button className="pd-contact ghost">Contact us</button>
              <button className="pd-book">Book now</button>
            </div>
          </div>
        </div>

        <div className="pd-title">
          <h1>{pkg.title}</h1>
          <div className="pd-loc">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{pkg.location}{pkg.distance ? ` • ${pkg.distance}` : ''}</span>
          </div>
        </div>

        <div className="pd-media-wide">
          <div className="pd-media">
            <SafeImage src={pkg.image} alt={pkg.title} className="pd-image" />
            <div className="pd-nights">{pkg.nights}</div>
          </div>
        </div>

        <div className="pd-content">
          {activeTab === 'details' ? (
            <>
            <div className="pd-card">
              <h2>Overview</h2>
              <p>{pkg.description}</p>
              <div className="pd-tags">
                {(pkg.features || []).map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="pd-card">
              <h2>Itinerary</h2>
              <div className="pd-itinerary">
                {(pkg.itinerary || []).map(step => {
                  const isOpen = openDays.has(step.day);
                  return (
                    <div key={step.day} className={`pd-it-item ${isOpen ? 'open' : ''}`}>
                      <button className="pd-it-head" onClick={() => toggleDay(step.day)} aria-expanded={isOpen} aria-controls={`it-body-${step.day}`}>
                        <div className="pd-it-day">Day {step.day}</div>
                        <div className="pd-it-headline">
                          <h3 className="pd-it-title">{step.title}</h3>
                          <svg className="pd-it-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                            <polyline points="6,9 12,15 18,9"/>
                          </svg>
                        </div>
                      </button>
                      <div id={`it-body-${step.day}`} className="pd-it-body" role="region">
                        <p className="pd-it-details">{step.details}</p>
                        <ul className="pd-it-more">
                          {(step.more || []).map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pd-card">
              <h2>What's included</h2>
              <ul className="pd-inclusions">
                {(pkg.inclusions || []).map(item => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pd-card">
              <h2>Board type</h2>
              <div className="pd-board">
                <span className="badge">{pkg.boardType}</span>
              </div>
            </div>

            <div className="pd-card">
              <h2>Important information</h2>
              <ul className="pd-info">
                {(pkg.importantInfo || []).map(item => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </>
          ) : (
            <div className="pd-card">
              <h2>Customise tour</h2>
              <p>Choose add-ons and preferences. (Placeholder section for customization UI.)</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;


