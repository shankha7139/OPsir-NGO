import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase/Firebase";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDateHeading = (date) => {
    return dayjs(date).format("MMMM 'YY");
  };

  const groupedEvents = events.reduce((acc, event) => {
    const monthYear = formatDateHeading(event.date);
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

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

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-l from-purple-800 via-blue-400 to-pink-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            अब तक के कार्यक्रम...
          </motion.h1>
          
          <motion.div
            className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="w-12 h-12 text-gray-400 animate-spin" />
              </div>
            ) : (
              Object.keys(groupedEvents).map((monthYear) => (
                <div key={monthYear} className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    {monthYear}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {groupedEvents[monthYear].map((event) => (
                      <motion.div
                        key={event.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        {event.images && event.images.length > 0 && (
                          <img
                            src={event.images[0]}
                            alt={event.name}
                            className="w-full h-40 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{event.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="mr-2">📅</span>
                            {dayjs(event.date).format("MMM D, YYYY")}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative">
                {selectedEvent.images && selectedEvent.images.length > 0 && (
                  <img
                    src={selectedEvent.images[0]}
                    alt={selectedEvent.name}
                    className="w-full h-48 sm:h-64 object-cover rounded-t-lg"
                  />
                )}
                <button
                  className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
                  onClick={() => setSelectedEvent(null)}
                >
                  ✖️
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">{selectedEvent.name}</h2>
                <p className="text-sm text-gray-600 mb-4 flex items-center">
                  <span className="mr-2">📅</span>
                  {dayjs(selectedEvent.date).format("MMMM D, YYYY")}
                </p>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">{selectedEvent.description}</p>
                {selectedEvent.images && selectedEvent.images.length > 1 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Photos</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selectedEvent.images.slice(1).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Event photo ${index + 2}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default EventsPage;