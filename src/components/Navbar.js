import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Logo_wide.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Events", href: "/events" },
    { name: "Membership", href: "#membership" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact Us", href: "#contact" },
  ];

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  // Inline styles for animations and text effects
  const styles = {
    blobAnimation: {
      animation: 'blob 7s infinite',
    },
    blobAnimationDelay2000: {
      animationDelay: '2s',
    },
    blobAnimationDelay4000: {
      animationDelay: '4s',
    },
    navLink: {
      background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <nav className="py-4 px-6 shadow-lg relative overflow-hidden">
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}
      </style>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 opacity-70"></div>

      {/* Decorative circles */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        style={{...styles.blobAnimation, ...styles.blobAnimationDelay2000}}
      ></div>
      <div 
        className="absolute bottom-0 left-1/2 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        style={{...styles.blobAnimation, ...styles.blobAnimationDelay4000}}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center">
          <motion.img 
            src={logo} 
            className="h-20 w-auto" 
            style={{ minWidth: '200px' }} // Stretch the logo wider
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </motion.button>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.05 }}>
                <motion.a
                  href={item.href}
                  style={styles.navLink}
                  whileHover={{
                    ...styles.navLinkHover,
                    textShadow: 'none',
                    transform: 'scale(1.05) translateY(-2px)', // Bounce effect
                  }}
                >
                  {item.name}
                </motion.a>
              </motion.li>
            ))}
            <motion.li whileHover={{ scale: 1.1 }}>
              <a
                href="#donate"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
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
            className="fixed top-0 right-0 w-64 h-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-xl z-50"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none text-gray-800"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                </svg>
              </button>
            </div>
            <ul className="pt-5">
              {navItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="mb-2"
                  whileHover="hover"
                >
                  <motion.a
                    href={item.href}
                    style={styles.navLink}
                    whileHover={{
                      ...styles.navLinkHover,
                      textShadow: 'none',
                      transform: 'scale(1.05) translateY(-2px)', // Bounce effect
                    }}
                    className="block px-4 py-2"
                  >
                    {item.name}
                  </motion.a>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.05 }}>
                <a
                  href="#donate"
                  className="inline-block mx-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Donate
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
