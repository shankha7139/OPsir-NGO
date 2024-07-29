import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { colors } from "../theme";
import { Loader } from "lucide-react";

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

function truncateText(text, maxLength = 25) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function EventCard({ event, onClick, index, position }) {
  const isLeft = position === "left";
  return (
    <motion.div
      className={`bg-white/80 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 flex flex-col w-full md:w-[calc(50%-3rem)] ${
        isLeft ? "md:mr-auto" : "md:ml-auto"
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-40 bg-gradient-to-r from-gray-500 to-gray-400 relative">
        {event.images && event.images.length > 0 ? (
          <img
            src={event.images[0]}
            alt={event.name}
            className="w-full h-full object-cover mix-blend-overlay"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-lg">No Image</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <h3 className="text-white text-lg font-semibold">{event.name}</h3>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <p className="text-sm text-gray-600 mb-2">
          {truncateText(event.description)}
        </p>
        <div className="flex items-center mt-auto">
          <CalendarIcon size={14} color={colors.accent} />
          <p className="text-xs font-medium ml-2 text-blue-600">{event.date}</p>
        </div>
      </div>
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
        className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {event.name}
          </h2>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="flex items-center mb-4">
            <CalendarIcon size={18} color={colors.accent} />
            <p className="text-sm font-medium ml-2 text-blue-600">
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
            className="mt-4 px-8 py-4 rounded-full text-white text-lg font-semibold transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CurvedTimeline({ events }) {
  const width = 600;
  const height = 400;
  const curveControl = 100;

  return (
    <svg
      className="hidden md:block absolute left-0 top-24 w-full h-[calc(100%-6rem)]"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <path
        d={`M ${width / 2} 0 
           Q ${width / 2 + curveControl} ${height / 4} ${width / 2} ${
          height / 2
        }
           Q ${width / 2 - curveControl} ${(3 * height) / 4} ${
          width / 2
        } ${height}`}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="4"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const eventsCollection = collection(db, "events");
        const eventsQuery = query(
          eventsCollection,
          orderBy("date", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(eventsQuery);
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <motion.section
      id="events"
      className="py-24 px-8 relative overflow-hidden bg-gradient-to-b from-pink-500/20 via-purple-500/20 to-blue-400/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-400 opacity-20"></div>
      <div className="max-w-6xl mx-auto relative">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Latest Events
        </motion.h2>
        <CurvedTimeline events={events} />
        <div className="relative z-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
          ) : (
            events.map((event, index) => (
              <div
                key={event.id}
                className="mb-16 flex flex-col md:flex-row items-center"
              >
                <EventCard
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                  index={index}
                  position={index % 2 === 0 ? "left" : "right"}
                />
              </div>
            ))
          )}
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
    </motion.section>
  );
}

export default Events;
