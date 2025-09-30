import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Divider from './components/Divider';
import PopularDestinations from './components/PopularDestinations';
import Packages from './components/Packages';
import ToursActivities from './components/ToursActivities';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Divider />
        <PopularDestinations />
        <Packages />
        <ToursActivities />
        <WhyUs />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
