import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Events from "../components/Events";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import LatestNews from "../components/LatestNews";
import Home from "../components/Home";

export default function HomePage() {
  const colors = {
    primary: "#3498db", // replace with your primary color
    secondary: "#e74c3c", // replace with your secondary color
  };
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
