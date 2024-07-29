import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Logo_light from "../assets/Logo_wide.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const gradientText = {
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  };

  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 text-gray-800 p-6  shadow-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mb-4 md:mb-0">
          <img
            src={Logo_light}
            alt="NGO Logo"
            className="w-500 h-193 mx-auto"
          />
          <p className="mt-2 text-center font-medium">
            Empowering communities since 2024.
          </p>
        </div>
        <div className="text-center md:order-2">
          <h3 className="font-bold text-xl mb-2" style={gradientText}>
            Quick Links
          </h3>
          <ul className="inline-block text-left">
            <li className="mb-2">
              <a
                href="#about"
                onClick={() => navigate("/about")}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#events"
                onClick={() => navigate("/events")}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Events
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#gallery"
                onClick={() => navigate("/gallery")}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Gallery
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#contact"
                onClick={() => navigate("/comingsoon")}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#donate"
                onClick={() => navigate("/comingsoon")}
                className="text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-200"
              >
                Donate
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:order-3">
          <h3 className="font-bold text-xl mb-2" style={gradientText}>
            Contact & Connect
          </h3>
          <ul className="inline-block text-left">
            <li className="mb-2">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-blue-600 mr-2"
              />{" "}
              123 Charity St, City
            </li>
            <li className="mb-2">
              <FontAwesomeIcon icon={faPhone} className="text-blue-600 mr-2" />{" "}
              +1 (555) 123-4567
            </li>
            <li className="mb-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-blue-600 mr-2"
              />{" "}
              contact@ngo.com
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <a
              href="#facebook"
              onClick={() => navigate("/comingsoon")}
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200 mr-4"
            >
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a
              href="#twitter"
              onClick={() => navigate("/comingsoon")}
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200 mr-4"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
            <a
              href="#instagram"
              onClick={() => navigate("/comingsoon")}
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200 mr-4"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="#youtube"
              onClick={() => navigate("/comingsoon")}
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;