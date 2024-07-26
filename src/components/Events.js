import React from 'react';
import { motion } from "framer-motion";
import { colors } from "../theme";

function EventCard({ title, description, date }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    >
      <div className="p-6">
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: colors.primary }}
        >
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-sm font-medium" style={{ color: colors.accent }}>
          {date}
        </p>
      </div>
    </motion.div>
  );
}

function Events() {
  return (
    <section
      id="events"
      className="py-20 px-8 bg-gradient-to-tr from-gray-50 to-blue-50"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          style={{ color: colors.primary }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Upcoming Events
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <EventCard
            title="Community Cleanup"
            description="Join us for a day of environmental action!"
            date="August 15, 2024"
          />
          <EventCard
            title="Fundraising Gala"
            description="An evening of music and inspiration"
            date="September 22, 2024"
          />
          <EventCard
            title="Youth Workshop"
            description="Empowering the next generation"
            date="October 5, 2024"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Events;