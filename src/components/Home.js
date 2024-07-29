import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { colors } from "../theme";
import ban2 from "../assets/Banner_2.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Ensure you have this firebase config file
import { useNavigate } from "react-router-dom";

function Home() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "banners"));
        const bannerList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBanners(bannerList);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // Changed from 5000 to 2500 (2.5 seconds)
    cssEase: "ease-in-out",
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul style={{ margin: 0 }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "#ddd",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px",
        }}
      ></div>
    ),
  };

  const allBanners = [...banners, { id: "hardcoded", url: ban2 }];
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Slider {...settings}>
        {allBanners.map((banner, index) => (
          <div key={banner.id} className="relative h-screen">
            <img
              src={banner.url}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {banner.id === "hardcoded" && (
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
                    onClick={() => navigate("/comingsoon")}
                    className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold transition-all duration-300 ease-in-out"
                    style={{ backgroundColor: colors.accent }}
                    whileHover={{
                      scale: 1.05,
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
    </motion.div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

export default Home;