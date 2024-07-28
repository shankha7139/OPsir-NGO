import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { colors } from "../theme";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Ensure you have this firebase config file

function Gallery() {
  const [images, setImages] = useState([]);
  const [displayCount, setDisplayCount] = useState(12); // Initial number of images to display
  const incrementCount = 8; // Number of additional images to load each time

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const imageList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imageList);
    };

    fetchImages();
  }, []);

  const loadMore = () => {
    setDisplayCount((prevCount) =>
      Math.min(prevCount + incrementCount, images.length)
    );
  };

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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {images.slice(0, displayCount).map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden rounded-lg shadow-lg ${
                index % 5 === 0
                  ? "col-span-2 row-span-2"
                  : index % 7 === 0
                  ? "col-span-2"
                  : index % 3 === 0
                  ? "row-span-2"
                  : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={image.url}
                alt={image.description || `Gallery Image ${index + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
        {displayCount < images.length && (
          <div className="text-center mt-8">
            <motion.button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
