import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import FoundersPage from "./pages/FoundersPage";
import Membership from "./pages/Membership";
import GalleryPage from "./pages/GalleryPage";
import AdmitPage from "./pages/AdmitPage";
import ComingSoon from "./pages/CommingSoon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<FormPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/admit" element={<AdmitPage />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
