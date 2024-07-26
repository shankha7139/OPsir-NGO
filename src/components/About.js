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
            "Our NGO, Graduate Club is dedicated to creating a world where every individual has access to basic necessities and the opportunity to lead a fulfilling life. We believe in the power of unity and strive to bring communities together to combat societal issues.",
            "Our core values are compassion, integrity, and perseverance. We are committed to serving with empathy, conducting our work transparently, and never giving up in the face of adversity.",
            "Our primary objective is to provide resources and support to those in need, whether it be through food drives, educational programs, or health services. We aim to not only meet immediate needs but also to implement sustainable solutions that address the root causes of these issues.",
            "We are also dedicated to raising awareness about these societal issues, advocating for policy change, and inspiring others to take action. We believe that everyone has a role to play in making the world a better place.",
            "Through our work, we hope to empower individuals, strengthen communities, and contribute to a more equitable and just society. Join us in our mission to make a difference."
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