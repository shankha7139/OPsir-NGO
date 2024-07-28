import React from 'react';
import { motion } from "framer-motion";
import { colors } from "../theme";

function About() {
  return (
    <motion.section
      id="about"
      className="py-24 px-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>

      {/* Decorative circles */}

      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our Mission
        </motion.h2>
        <motion.div
          className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            Our NGO, Graduate Club is dedicated to creating a world where every
            individual has access to basic necessities and the opportunity to
            lead a fulfilling life. We believe in the power of unity and strive
            to bring communities together to combat societal issues.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            Our core values are compassion, integrity, and perseverance. We are
            committed to serving with empathy, conducting our work
            transparently, and never giving up in the face of adversity.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            Our primary objective is to provide resources and support to those
            in need, whether it be through food drives, educational programs, or
            health services. We aim to not only meet immediate needs but also to
            implement sustainable solutions that address the root causes of
            these issues.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            We are also dedicated to raising awareness about these societal
            issues, advocating for policy change, and inspiring others to take
            action. We believe that everyone has a role to play in making the
            world a better place.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            Through our work, we hope to empower individuals, strengthen
            communities, and contribute to a more equitable and just society.
            Join us in our mission to make a difference.
          </p>
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="#learn-more"
            className="inline-block px-8 py-4 rounded-full text-white text-lg font-semibold transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;