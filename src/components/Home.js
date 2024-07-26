import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ban1 from "../assets/Banner_1.png";
import ban2 from "../assets/Banner_2.png";


function Home() {
  // Slider settings
  const settings = {
    dots: true,  // Shows dot navigation at the bottom of the slider
    infinite: true,  // Enables infinite looping
    speed: 500,  // Transition speed in milliseconds
    slidesToShow: 1,  // Number of slides to show at once
    slidesToScroll: 1,  // Number of slides to scroll on each navigation
    autoplay: true,  // Enables automatic sliding
    autoplaySpeed: 3000,  // Delay in milliseconds between automatic slides
    cssEase: "linear",  // Type of animation easing
    className: "slider variable-width",  // Custom class name for the slider
    variableWidth: true
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Slider Image Banner */}
      <div className="w-full">
        <Slider {...settings}>
          <div className="w-full">
            <img
              src={ban1}
              alt="Banner 1"
              className="object-cover w-full h-200"
            />
          </div>
          <div className="w-full">
            <img
              src={ban2}
              alt="Banner 2"
              className="object-cover w-full h-200"
            />
          </div>
        </Slider>
      </div>

      {/* Rectangular Image Banner */}
      <div className="w-full h-20 bg-gray-300 mt-4">
        <img
          src={ban2}
          alt="Rectangular Banner"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default Home;
