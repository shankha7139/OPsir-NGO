import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { Loader } from "lucide-react";
import { db } from "../firebase/Firebase";

function Gallery() {
  const [images, setImages] = useState([]);
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const incrementCount = 8;

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const imageList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
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
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-blue-400/20 via-purple-500/20 to-pink-500/20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          हमारे प्रभाव की तस्वीरें
        </motion.h2>

        {/* Elevated background for images */}
        <motion.div
          className="bg-white/80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.slice(0, displayCount).map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative overflow-hidden rounded-2xl shadow-md"
                  style={{ paddingBottom: "100%" }} // This ensures a 1:1 aspect ratio
                  whileHover={{ scale: 1.03, zIndex: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={image.url}
                    alt={image.description || `Gallery Image ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-70 transition-opacity duration-300"></div>
                  <p className="absolute bottom-4 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.description || `Image ${index + 1}`}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {!isLoading && displayCount < images.length && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              onClick={loadMore}
            >
              और दिखाएँ
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Gallery;