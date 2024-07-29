import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { X, Calendar, ArrowRight } from 'lucide-react';
import { db } from '../firebase/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const ModalComponent = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const fetchEvents = async () => {
        const eventCollection = collection(db, 'gformLinks');
        const eventSnapshot = await getDocs(eventCollection);
        const eventList = eventSnapshot.docs.map(doc => doc.data());
        setEvents(eventList);
      };
      fetchEvents();
    }
  }, [isOpen]);

  const handleRegisterClick = (eventName, url) => {
    navigate('/form', { state: { formUrl: url, eventName: eventName } });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-lg p-6 w-full max-w-md relative shadow-xl"
      >
        <button
          className="absolute top-2 right-2 text-purple-800 hover:text-purple-600 transition-colors duration-300"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Live Events</h2>
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div 
              key={index} 
              className="p-4 border border-purple-200 rounded-lg bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-500" size={20} />
                <h3 className="text-xl font-semibold text-purple-800">{event.eventName}</h3>
              </div>
              <button
                onClick={() => handleRegisterClick(event.eventName, event.url)}
                className="mt-2 flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                <span>Register</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalComponent;