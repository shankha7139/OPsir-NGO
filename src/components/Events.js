import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Ensure this path is correct

const colors = {
  primary: "#3b82f6",
  accent: "#f59e0b",
  background: "#f0f9ff",
};

const CalendarIcon = ({ size = 14, color = colors.accent }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

function EventCard({ event, position, isLeft, onClick }) {
  const truncateDescription = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <motion.div
      className={`absolute ${
        isLeft ? "left-0 md:pr-4" : "right-0 md:pl-4"
      } px-2 md:px-0`}
      style={{
        top: `${position}px`,
        width: "100%",
        maxWidth: "48%",
      }}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="bg-white rounded-full shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 flex"
        onClick={onClick}
      >
        <div className="w-1/3 p-2 flex items-center justify-center">
          {event.images && event.images.length > 0 ? (
            <img
              src={event.images[0]}
              alt={event.name}
              className="w-16 h-16 object-cover rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>
        <div className="w-2/3 p-2">
          <h3
            className="text-sm font-semibold mb-1"
            style={{ color: colors.primary }}
          >
            {event.name}
          </h3>
          <p className="text-xs text-gray-600 mb-1">
            {truncateDescription(event.description)}
          </p>
          <div className="flex items-center">
            <CalendarIcon size={12} color={colors.accent} />
            <p
              className="text-xs font-medium ml-1"
              style={{ color: colors.accent }}
            >
              {event.date}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-1/2 ${
          isLeft ? "right-0" : "left-0"
        } w-4 h-0.5 bg-gray-300 hidden md:block`}
      ></div>
      <div
        className={`absolute top-1/2 ${
          isLeft ? "right-0" : "left-0"
        } w-2 h-2 bg-blue-500 rounded-full transform translate-y-[-50%] ${
          isLeft ? "translate-x-[50%]" : "translate-x-[-50%]"
        }`}
      ></div>
    </motion.div>
  );
}

function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {event.name}
          </h2>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center mb-4">
            <CalendarIcon size={18} color={colors.accent} />
            <p
              className="text-sm font-medium ml-2"
              style={{ color: colors.accent }}
            >
              {event.date}
            </p>
          </div>
          {event.images && event.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {event.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Event ${index + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventsQuery = query(
        eventsCollection,
        orderBy("date", "asc"),
        limit(7)
      );
      const querySnapshot = await getDocs(eventsQuery);
      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  const getPosition = (index) => {
    return index * 120; // Reduced spacing between cards
  };

  return (
    <section
      id="events"
      className="py-12 px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: colors.primary }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Upcoming Events
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              position={getPosition(index)}
              isLeft={index % 2 === 0}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
          {/* Add extra padding at the bottom */}
          <div
            style={{ paddingBottom: `${getPosition(events.length)}px` }}
          ></div>
        </div>
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Events;