import React from 'react';
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { colors } from "../theme";
import ban1 from "../assets/Maharana Pratap 1.webp";
import ban2 from "../assets/Banner_2.png";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Slider {...settings}>
        {[ban1, ban2].map((banner, index) => (
          <div key={index} className="relative h-screen">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {index === 1 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-white mb-4">
                    Making a Difference
                  </h1>
                  <p className="text-xl text-white mb-8">
                    Join us in our mission to create positive change
                  </p>
                  <motion.a
                    href="#donate"
                    className="inline-block px-8 py-3 rounded-full text-white text-lg font-semibold transition-all duration-300 ease-in-out"
                    style={{ backgroundColor: colors.accent }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: colors.secondary,
                    }}
                  >
                    Donate Now
                  </motion.a>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>

      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white py-4 px-8 shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h3
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              Latest News
            </h3>
            <p className="text-gray-600">
              Check out our recent achievements and upcoming events
            </p>
          </div>
          <a
            href="#news"
            className="px-6 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: colors.secondary }}
          >
            Read More
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
