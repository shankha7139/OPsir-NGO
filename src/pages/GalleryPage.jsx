import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { Download, Expand, X, Loader } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase/Firebase";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullSizeImage, setFullSizeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const galleryCollection = collection(db, "gallery");
        const gallerySnapshot = await getDocs(galleryCollection);
        const imagesList = gallerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imagesList);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <>
      <Navbar />
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-l from-purple-800 via-blue-400 to-pink-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Gallery
          </motion.h1>
          
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="w-12 h-12 text-gray-400 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.description}
                      className="w-full h-48 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4"
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
                <img
                  src={selectedImage.url}
                  alt={selectedImage.description}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    className="p-2 bg-white bg-opacity-70 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
                    onClick={() => handleDownload(selectedImage.url, selectedImage.description)}
                  >
                    <Download size={20} />
                  </button>
                  <button
                    className="p-2 bg-white bg-opacity-70 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
                    onClick={() => setFullSizeImage(selectedImage)}
                  >
                    <Expand size={20} />
                  </button>
                  <button
                    className="p-2 bg-white bg-opacity-70 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-base">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullSizeImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img
                src={fullSizeImage.url}
                alt={fullSizeImage.description}
                className="max-w-full max-h-full object-contain"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-70 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
                onClick={() => setFullSizeImage(null)}
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default GalleryPage;