import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Divider from './components/Divider';
import PopularDestinations from './components/PopularDestinations';
import Packages from './components/Packages';
import ToursActivities from './components/ToursActivities';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import PackageDetails from './components/PackageDetails';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const isSearch = hash === '#search';
  const isPackage = hash.startsWith('#package');

  return (
    <div className="App">
      <Header />
      <main>
        {/* Global SearchBar (compact on search/detail, hero contains its own layout) */}
        {isSearch || isPackage ? (
          <div className="hero-container" style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem' }}>
            <SearchBar variant="compact" />
          </div>
        ) : null}

        {isPackage ? (
          <PackageDetails />
        ) : isSearch ? (
          <SearchResults />
        ) : (
          <>
            <Hero />
            <Divider />
            <PopularDestinations />
            <Packages />
            <ToursActivities />
            <WhyUs />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
