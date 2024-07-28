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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<FormPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/founders" element={<FoundersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
