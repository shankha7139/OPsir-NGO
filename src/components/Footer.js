import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div>
          <img src="path/to/logo.png" alt="NGO Logo" className="w-24 h-24" />
        </div>
        <div>
          <p>Address</p>
          <p>About Us</p>
          <p>Events</p>
          <p>Gallery</p>
          <p>Contact Us</p>
          <p>Donate</p>
        </div>
        <div>
          <p>Connect with us:</p>
          <div className="flex">
            <a href="#facebook"><img src="path/to/facebook-icon.png" alt="Facebook" /></a>
            <a href="#x"><img src="path/to/x-icon.png" alt="X.com" /></a>
            <a href="#instagram"><img src="path/to/instagram-icon.png" alt="Instagram" /></a>
            <a href="#youtube"><img src="path/to/youtube-icon.png" alt="YouTube" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
