import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import founder1 from "../assets/founder1.webp";
import founder2 from "../assets/founder2.webp";
import founder3 from "../assets/founder3.webp";

const FounderCard = ({ image, name, title, thoughts }) => (
  <motion.div
    className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center flex-1 mx-4 mb-8 sm:mb-0"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img src={image} alt={name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4" />
    <h2 className="text-lg sm:text-xl font-bold mb-2 text-blue-600">{name}</h2>
    <h3 className="text-sm sm:text-md font-semibold mb-4 text-purple-600">{title}</h3>
    <p className="text-gray-700 text-sm sm:text-base">{thoughts}</p>
  </motion.div>
);

export default function FoundersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.section
        className="flex-grow py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            हमारे संस्थापक
          </motion.h1>

          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8">
            <FounderCard
              image={founder1}
              name="डॉ. ओम पाल सिंह"
              title="संस्थापक"
              thoughts="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!"
            />
            <FounderCard
              image={founder2}
              name="Founder Two"
              title="CTO"
              thoughts="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!"
            />
            <FounderCard
              image={founder3}
              name="Founder Three"
              title="CFO"
              thoughts="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum nam qui dolor officiis optio incidunt neque deserunt!"
            />
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}