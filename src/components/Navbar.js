import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Logo_light.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Membership", href: "#membership" }, // Added Membership option here
    { name: "Gallery", href: "#gallery" },
    { name: "Contact Us", href: "#contact" },
  ];

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <nav className="bg-gray-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <img src={logo} className="h-20" />

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

          {/* Mobile menu */}
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 w-64 h-full bg-gray-700 shadow-xl z-50"
          >
            <ul className="pt-5">
              {navItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-white hover:text-yellow-300 transition-colors"
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
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
