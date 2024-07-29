import React from "react";
import { motion } from "framer-motion";
import About from "./About";
import Events from "./Events";
import Gallery from "./Gallery";

const SharedBackground = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>
);

const TransitionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <div className="relative overflow-hidden">
      <SharedBackground />
      <TransitionWrapper>
        <About />
      </TransitionWrapper>
      <TransitionWrapper>
        <Events />
      </TransitionWrapper>
      <TransitionWrapper>
        <Gallery />
      </TransitionWrapper>
    </div>
  );
}

export default App;
