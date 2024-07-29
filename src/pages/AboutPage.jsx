import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/Logo_wide.png";

const TabButton = ({ isActive, onClick, children }) => (
  <motion.button
    onClick={onClick}
    className={`px-6 py-2 text-lg font-semibold transition-all duration-300 rounded-full ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
        : "bg-white text-gray-600 hover:shadow-lg"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("vision");

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <Navbar />
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-l from-purple-800 via-blue-400 to-pink-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            About Us
          </motion.h1>
          
          <motion.div
            className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logo" className="w-auto h-24 sm:h-32" />
            </div>
            <p className="text-gray-700 mb-4 text-sm sm:text-base text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio.
            </p>
          </motion.div>

          {/* Vision and Mission Tabular Switch */}
          <motion.div
            className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Center-aligned tab buttons */}
            <div className="flex justify-center mb-6 space-x-4">
              <TabButton
                isActive={activeTab === "vision"}
                onClick={() => setActiveTab("vision")}
              >
                Vision
              </TabButton>
              <TabButton
                isActive={activeTab === "mission"}
                onClick={() => setActiveTab("mission")}
              >
                Mission
              </TabButton>
            </div>
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {activeTab === "vision" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h2>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio.
                  </p>
                </div>
              )}
              {activeTab === "mission" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Mission</h2>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt! Facilis necessitatibus quo minus ad. Reiciendis ullam doloremque veniam possimus doloribus id voluptatum nobis voluptatem optio.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      <Footer />
    </>
  );
}