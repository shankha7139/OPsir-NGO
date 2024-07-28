import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LatestNews = ({ colors }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 z-10 left-0 right-0 bg-white py-4 px-8 shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <div>
              <h3
                className="text-2xl font-bold"
                style={{ color: colors.primary }}
              >
                Latest News
              </h3>
              <p className="text-gray-600">
                Check out our recent achievements and upcoming events
              </p>
            </div>
            <div className="flex items-center">
              <a
                href="#news"
                className="px-6 py-2 rounded-full text-white font-semibold"
                style={{ backgroundColor: colors.secondary }}
              >
                Read More
              </a>
              <button
                onClick={() => setIsVisible(false)}
                className="ml-4 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LatestNews;
