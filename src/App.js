import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Events />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
}


export default App;
