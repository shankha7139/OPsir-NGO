import React from 'react';
import { motion } from "framer-motion";
import { colors } from "../theme";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/path/to/logo.png" alt="NGO Logo" className="w-32 mb-4" />
            <p className="text-gray-400">
              Empowering communities, changing lives.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["About", "Events", "Gallery", "Contact", "Donate"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "youtube"].map(
                (platform, index) => (
                  <a
                    key={index}
                    href={`#${platform}`}
                    className="text-2xl hover:text-gray-300 transition-colors"
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                )
              )}
            </div>
          </motion.div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Your NGO Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;