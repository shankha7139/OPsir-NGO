import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const LatestNews = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsCollapsed(true);
    }, 500); // Matches the exit animation duration
  };

  const handleExpand = () => {
    setIsCollapsed(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to allow the collapse button to disappear
  };

  // Inline styles for animations and text effects
  const styles = {
    gradientText: {
      background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      fontWeight: "600",
    },
  };

  const navigate = useNavigate();

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 py-4 px-8 shadow-lg overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200"
            style={{ zIndex: 9999 }}
            initial={{
              y: 0,
              scale: 0,
              x: "calc(100vw - 4rem)",
              transformOrigin: "bottom right",
            }}
            animate={{ y: 0, scale: 1, x: 0 }}
            exit={{ y: 0, scale: 0, x: "calc(100vw - 4rem)" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center max-w-6xl mx-auto relative z-10">
              <div>
                <h3 className="text-2xl font-bold" style={styles.gradientText}>
                  Latest Event Alert!
                </h3>
                <p className="text-gray-600">
                  Fill the form for the upcoming event
                </p>
              </div>
              <div className="flex items-center">
                <motion.a
                  href="#news"
                  onClick={() => navigate("/test")}
                  className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  Fill Now
                </motion.a>
                <motion.button
                  onClick={handleClose}
                  className="ml-4 text-gray-600 hover:text-gray-900"
                  whileHover={{ scale: 1.1 }}
                >
                  &times;
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isCollapsed && (
        <motion.div
          className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer animate-shake"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleExpand}
        >
          Latest News
        </motion.div>
      )}
    </>
  );
};

export default LatestNews;