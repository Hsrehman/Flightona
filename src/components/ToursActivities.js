import React, { useMemo, useRef, useState } from 'react';
import SafeImage from './SafeImage';
import './ToursActivities.css';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'culture', label: 'Culture' },
  { id: 'water', label: 'Water' },
  { id: 'sightseeing', label: 'Sightseeing' }
];

const tours = [
  {
    id: 1,
    title: 'Paragliding over Interlaken',
    location: 'Interlaken, Switzerland',
    image: '/images/paragliding-interlaken.jpg',
    description: 'Soar above emerald lakes and snowy peaks with expert pilots.',
    price: 189,
    duration: '1.5 hours',
    rating: 4.9,
    reviews: 728,
    type: 'adventure',
    featured: true
  },
  {
    id: 2,
    title: 'Sunset Bosphorus Cruise',
    location: 'Istanbul, Türkiye',
    image: '/images/bosphorus-cruise.jpg',
    description: 'Glide past palaces and mosques as the city lights up.',
    price: 49,
    duration: '2 hours',
    rating: 4.7,
    reviews: 1_245,
    type: 'water',
    featured: false
  },
  {
    id: 3,
    title: 'Kyoto Cultural Walking Tour',
    location: 'Kyoto, Japan',
    image: '/images/kyoto-walk.jpg',
    description: 'Temples, tea houses, and traditions with a local guide.',
    price: 75,
    duration: '3 hours',
    rating: 4.8,
    reviews: 904,
    type: 'culture',
    featured: true
  },
  {
    id: 4,
    title: 'Great Barrier Reef Snorkel',
    location: 'Cairns, Australia',
    image: '/images/great-barrier-reef.jpg',
    description: 'Crystal waters, coral gardens, and tropical marine life.',
    price: 139,
    duration: '6 hours',
    rating: 4.6,
    reviews: 2_031,
    type: 'water',
    featured: false
  },
  {
    id: 5,
    title: 'Old Town Food & History',
    location: 'Lisbon, Portugal',
    image: '/images/lisbon-food.jpg',
    description: 'Tastings, tales, and tram views through Alfama.',
    price: 59,
    duration: '2.5 hours',
    rating: 4.7,
    reviews: 612,
    type: 'culture',
    featured: false
  },
  {
    id: 6,
    title: 'Desert Dunes Day Trip',
    location: 'Dubai, UAE',
    image: '/images/dubai-desert.jpg',
    description: 'Dune bashing, camel rides, and a campfire dinner.',
    price: 129,
    duration: '8 hours',
    rating: 4.8,
    reviews: 3_402,
    type: 'adventure',
    featured: false
  },
  {
    id: 7,
    title: 'City Highlights E‑Bike Tour',
    location: 'Amsterdam, Netherlands',
    image: '/images/amsterdam-ebike.jpg',
    description: 'Glide along canals and hidden courtyards.',
    price: 45,
    duration: '2 hours',
    rating: 4.5,
    reviews: 287,
    type: 'sightseeing',
    featured: false
  },
  {
    id: 8,
    title: 'Island Hopping Catamaran',
    location: 'Phuket, Thailand',
    image: '/images/phuket-catamaran.jpg',
    description: 'Turquoise bays, lagoons, and beach time.',
    price: 99,
    duration: '5 hours',
    rating: 4.6,
    reviews: 1_119,
    type: 'water',
    featured: false
  }
];

const Rating = ({ value }) => (
  <div className="ta-rating" aria-label={`Rating ${value} out of 5`}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
    </svg>
    <span>{value.toFixed(1)}</span>
  </div>
);

const ToursActivities = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const scrollerRef = useRef(null);

  const filtered = useMemo(() => {
    return tours.filter(t => (
      (activeCategory === 'all' || t.type === activeCategory) &&
      (t.title.toLowerCase().includes(query.toLowerCase()) ||
       t.location.toLowerCase().includes(query.toLowerCase()) ||
       t.description.toLowerCase().includes(query.toLowerCase()))
    ));
  }, [activeCategory, query]);

  const featured = useMemo(() => filtered.filter(t => t.featured), [filtered]);
  const supporting = useMemo(() => filtered.filter(t => !t.featured), [filtered]);

  const scrollByAmount = (delta) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section id="tours" className="ta-section">
      <div className="ta-container">
        <div className="ta-header">
          <div>
            <h2>Tours & Activities</h2>
            <p>Excursions and local experiences for travelers at the destination.</p>
          </div>
          <div className="ta-controls" role="search">
            <div className="ta-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <circle cx="11" cy="11" r="7"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="search"
                placeholder="Search tours, e.g. paragliding"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tours"
              />
            </div>
            <div className="ta-filters" role="tablist" aria-label="Tour categories">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`ta-filter ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ta-grid">
          <div className="ta-featured">
            {featured.slice(0, 2).map((item, idx) => (
              <article key={item.id} className={`ta-card ta-card-featured idx-${idx}`} style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="ta-media">
                  <SafeImage src={item.image} alt={item.title} loading="eager" fetchPriority="high" />
                  <div className="ta-badge">{item.duration}</div>
                </div>
                <div className="ta-content">
                  <div className="ta-top">
                    <div>
                      <h3>{item.title}</h3>
                      <div className="ta-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {item.location}
                      </div>
                    </div>
                    <Rating value={item.rating} />
                  </div>
                  <p className="ta-desc">{item.description}</p>
                  <div className="ta-bottom">
                    <div className="ta-price">
                      <span className="amount">${item.price.toLocaleString()}</span>
                      <span className="unit">per person</span>
                    </div>
                    <div className="ta-actions">
                      <button className="ta-btn ghost" onClick={() => { window.location.hash = '#package/1'; }}>View details</button>
                      <button className="ta-btn primary">Book now</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="ta-supporting">
            {supporting.slice(0, 6).map((item, sidx) => (
              <article key={item.id} className="ta-card" style={{ animationDelay: `${(sidx + 2) * 80}ms` }}>
                <div className="ta-media">
                  <SafeImage src={item.image} alt={item.title} loading="eager" fetchPriority="high" />
                  <div className="ta-badge">{item.duration}</div>
                </div>
                <div className="ta-content">
                  <div className="ta-top">
                    <div>
                      <h3>{item.title}</h3>
                      <div className="ta-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {item.location}
                      </div>
                    </div>
                    <Rating value={item.rating} />
                  </div>
                  <p className="ta-desc">{item.description}</p>
                  <div className="ta-bottom">
                    <div className="ta-price">
                      <span className="amount">${item.price.toLocaleString()}</span>
                      <span className="unit">per person</span>
                    </div>
                    <div className="ta-actions">
                      <button className="ta-btn ghost" onClick={() => { window.location.hash = '#package/2'; }}>View</button>
                      <button className="ta-btn">Book</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="ta-scroller-wrap">
          <h3 className="ta-subheading">More experiences</h3>
          <div className="ta-scroller" ref={scrollerRef}>
            {filtered.map(item => (
              <article key={item.id} className="ta-chip-card">
                <div className="chip-media">
                  <SafeImage src={item.image} alt="" />
                </div>
                <div className="chip-info">
                  <div className="line-1">
                    <span className="title">{item.title}</span>
                    <Rating value={item.rating} />
                  </div>
                  <div className="line-2">
                    <span className="loc">{item.location}</span>
                    <span className="dot">•</span>
                    <span className="dur">{item.duration}</span>
                  </div>
                </div>
                <button className="chip-cta">From ${item.price}</button>
              </article>
            ))}
          </div>
          <div className="ta-scroll-buttons">
            <button onClick={() => scrollByAmount(-280)} aria-label="Scroll left" className="scroll-btn">‹</button>
            <button onClick={() => scrollByAmount(280)} aria-label="Scroll right" className="scroll-btn">›</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToursActivities;


