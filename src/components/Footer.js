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
import Logo_light from "../assets/Logo_light.png";

function Footer() {
  return (
    <footer className="bg-gray-600 text-gray-200 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mb-4 md:mb-0">
          <img
            src={Logo_light}
            alt="NGO Logo"
            className="w-500 h-193 mx-auto"
          />
          <p className="mt-2 text-center">Empowering communities since 2024.</p>
        </div>
        <div className="text-center md:order-2">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="inline-block text-left">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#events">Events</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#donate" className="text-yellow-400">
                Donate
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:order-3">
          <h3 className="font-semibold text-lg mb-2">Contact & Connect</h3>
          <ul className="inline-block text-left">
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Charity St, City
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} /> contact@ngo.com
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <a href="#facebook" className="text-white mr-4">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a href="#twitter" className="text-white mr-4">
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
            <a href="#instagram" className="text-white mr-4">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#youtube" className="text-white mr-4">
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;