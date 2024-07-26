import React from 'react';
import { motion } from "framer-motion";
import { colors } from "../theme";

function About() {
  return (
    <motion.section
      id="about"
      className="py-20 px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-8"
          style={{ color: colors.primary }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-xl leading-relaxed text-center"
          style={{ color: colors.text }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          [Your NGO's mission statement here. Make it impactful and concise,
          highlighting your core values and objectives.]
        </motion.p>
        <motion.div
          className="mt-12 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="#learn-more"
            className="inline-block px-8 py-3 rounded-full text-white text-lg font-semibold transition-all duration-300 ease-in-out"
            style={{ backgroundColor: colors.secondary }}
            whileHover={{ scale: 1.05, backgroundColor: colors.primary }}
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;