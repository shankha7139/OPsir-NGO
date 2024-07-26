import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/Gyan Pratiyogita 21:7:24/img1.jpeg';
import image2 from '../assets/Gyan Pratiyogita 21:7:24/img2.jpeg';
import image3 from '../assets/Gyan Pratiyogita 21:7:24/img3.jpeg';
import image4 from '../assets/Gyan Pratiyogita 21:7:24/img4.jpeg';
import image5 from '../assets/Gyan Pratiyogita 21:7:24/img5.jpeg';

const colors = {
  primary: '#3b82f6',
  accent: '#f59e0b',
  background: '#f0f9ff',
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

const images = [image1, image2, image3, image4, image5];

function EventCard({ title, description, date, position, isLeft, images }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize(); // Check screen size on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isHovered && isLargeScreen) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length, isLargeScreen]);

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div
      className={`absolute ${isLeft ? 'left-0 md:pr-8' : 'right-0 md:pl-8'} px-2 md:px-0`}
      style={{ top: `${position}%`, width: '100%', maxWidth: '45%', transform: 'translateY(-50%)' }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-white rounded-lg shadow-sm overflow-hidden relative ${isLeft ? 'text-right' : 'text-left'}`}>
        <div className="flex flex-col items-center p-2 md:p-3">
          <h3 className="text-xs md:text-sm font-semibold mb-1" style={{ color: colors.primary }}>
            {title}
          </h3>
          <p className="text-xs text-gray-600 mb-1">{description}</p>
          <div className="flex items-center justify-center">
            <CalendarIcon size={12} color={colors.accent} />
            <p className="text-xs font-medium ml-1" style={{ color: colors.accent }}>
              {date}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-1/2 ${isLeft ? 'right-0' : 'left-0'} w-8 h-0.5 bg-gray-300 hidden md:block`}
      ></div>
      <div
        className={`absolute top-1/2 ${isLeft ? 'right-0' : 'left-0'} w-2 md:w-3 h-2 md:h-3 bg-blue-500 rounded-full transform translate-y-[-50%] ${isLeft ? 'translate-x-[50%]' : 'translate-x-[-50%]'}`}
      ></div>
      {isHovered && isLargeScreen && (
        <motion.div
          className="absolute z-10 p-1 md:p-2 bg-white rounded-lg shadow-lg"
          style={{ top: '-250%', left: '50%', transform: 'translateX(-50%)', width: '80%', maxWidth: '270px', height: '150px md:height-200px' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img src={images[currentImageIndex]} alt={title} className="w-full h-full object-cover rounded-md" />
          <div
            className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"
          ></div>
        </motion.div>
      )}
    </motion.div>
  );
}

function Events() {
  const events = [
    { title: "Community Cleanup", description: "Join us for a day of environmental action!", date: "Aug 15, 2024", images: [image1, image2, image3, image4, image5] },
    { title: "Fundraising Gala", description: "An evening of music and inspiration", date: "Sep 22, 2024", images: [image1, image2, image3, image4, image5] },
    { title: "Youth Workshop", description: "Empowering the next generation", date: "Oct 5, 2024", images: [image1, image2, image3, image4, image5] },
    { title: "Tech Conference", description: "Exploring the future of technology", date: "Nov 18, 2024", images: [image1, image2, image3, image4, image5] },
    { title: "Holiday Charity Drive", description: "Spreading joy to those in need", date: "Dec 10, 2024", images: [image1, image2, image3, image4, image5] }
  ];

  const startDate = new Date('2024-08-01');
  const endDate = new Date('2024-12-31');

  const getPosition = (date) => {
    const eventDate = new Date(date);
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const daysFromStart = (eventDate - startDate) / (1000 * 60 * 60 * 24);
    return (daysFromStart / totalDays) * 100;
  };

  return (
    <section id="events" className="py-12 px-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ color: colors.primary }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Upcoming Events
        </motion.h2>
        <div className="relative" style={{ height: '600px' }}>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              position={getPosition(event.date)}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
