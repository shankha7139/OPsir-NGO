// Navbar.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { colors } from "../theme";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Your NGO
          </motion.a>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }}>
                <a
                  href={item.href}
                  className="hover:text-yellow-300 transition-colors"
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
            <motion.li whileHover={{ scale: 1.1 }}>
              <a
                href="#donate"
                className="px-4 py-2 rounded-full bg-yellow-500 text-blue-900 font-semibold hover:bg-yellow-400 transition-colors"
              >
                Donate
              </a>
            </motion.li>
          </ul>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.ul
            className="mt-4 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href={item.href}
                  className="block hover:text-yellow-300 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#donate"
                className="inline-block px-4 py-2 rounded-full bg-yellow-500 text-blue-900 font-semibold hover:bg-yellow-400 transition-colors"
              >
                Donate
              </a>
            </li>
          </motion.ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
