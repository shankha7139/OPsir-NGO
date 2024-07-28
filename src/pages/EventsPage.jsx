import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white p-4 rounded shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedEvent(event)}
            >
              {event.images && event.images.length > 0 && (
                <img
                  src={event.images[0]}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p>{event.date}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.name}</h2>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            {selectedEvent.images && selectedEvent.images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Photos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEvent.images.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Event photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default EventsPage;
