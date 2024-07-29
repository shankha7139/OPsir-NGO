import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Logo_wide.png";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Membership", href: "/membership" },
    { name: "Gallery", href: "/gallery" },
    { name: "Thought", href: "/founders" },
  ];

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

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

  const navigate = useNavigate();

  return (
    <nav className="py-4 px-6 shadow-lg relative overflow-hidden z-50">
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

      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 opacity-70"></div>

      <div
        className="absolute top-0 right-0 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        style={{ ...styles.blobAnimation, ...styles.blobAnimationDelay2000 }}
      ></div>
      <div
        className="absolute bottom-0 left-1/2 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        style={{ ...styles.blobAnimation, ...styles.blobAnimationDelay4000 }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center">
          <motion.img
            src={logo}
            className="h-20 w-auto"
            style={{ minWidth: "200px" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-purple-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <X size={24} className="text-purple-800" />
              ) : (
                <Menu size={24} className="text-purple-800" />
              )}
            </motion.button>
          </div>

          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.05 }}>
                <motion.a
                  href={item.href}
                  style={styles.navLink}
                  whileHover={{
                    textShadow: "none",
                    transform: "scale(1.05) translateY(-2px)",
                  }}
                >
                  {item.name}
                </motion.a>
              </motion.li>
            ))}
            <motion.li whileHover={{ scale: 1.1 }}>
              <a
                href="#donate"
                onClick={() => navigate("/comingsoon")}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Donate
              </a>
            </motion.li>
          </ul>

          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 w-64 h-full bg-gradient-to-r from-blue-100 via-pink-100 to-purple-200 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl z-50"
            style={{ zIndex: 9999 }}
          >
            <div className="flex justify-end p-4">
              <motion.button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none text-purple-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="text-purple-800" />
              </motion.button>
            </div>
            <ul className="pt-5">
              {navItems.map((item, index) => (
                <motion.li key={index} className="mb-2" whileHover="hover">
                  <motion.a
                    href={item.href}
                    style={styles.navLink}
                    whileHover={{
                      textShadow: "none",
                      transform: "scale(1.05) translateY(-2px)",
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
                  onClick={() => navigate("/comingsoon")}
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