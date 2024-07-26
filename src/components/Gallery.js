import React from 'react';
import { motion } from "framer-motion";
import { colors } from "../theme";
import img1 from "../assets/Gyan Pratiyogita 21:7:24/img1.jpeg";
import img2 from "../assets/Gyan Pratiyogita 21:7:24/img2.jpeg";
import img3 from "../assets/Gyan Pratiyogita 21:7:24/img3.jpeg";
import img4 from "../assets/Gyan Pratiyogita 21:7:24/img4.jpeg";
import img5 from "../assets/Gyan Pratiyogita 21:7:24/img5.jpeg";
import img6 from "../assets/Gyan Pratiyogita 21:7:24/img6.jpeg";

function Gallery() {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <section
      id="gallery"
      className="py-20 px-8 bg-gradient-to-bl from-green-50 via-blue-50 to-purple-50"
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
          Our Impact in Pictures
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">View Image</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Gallery;