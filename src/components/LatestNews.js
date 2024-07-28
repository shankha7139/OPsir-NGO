import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LatestNews = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Inline styles for animations and text effects
  const styles = {
    gradientText: {
      background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      fontWeight: '600',
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 py-4 px-8 shadow-lg overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200"
          style={{ zIndex: 9999 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
                className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
              >
                Fill Now
              </motion.a>
              <motion.button
                onClick={() => setIsVisible(false)}
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
  );
};

export default LatestNews;