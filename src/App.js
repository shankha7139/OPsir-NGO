import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LatestNews from './components/LatestNews';

const colors = {
  primary: '#3498db', // replace with your primary color
  secondary: '#e74c3c', // replace with your secondary color
};

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Home />
      <About />
      <Events />
      <Gallery />
      <Testimonials />
      <Footer />
      <LatestNews colors={colors} />
    </div>
  );
}

export default App;
