import React from 'react';
import img1 from '../assets/Gyan Pratiyogita 21:7:24/img1.jpeg';
import img2 from '../assets/Gyan Pratiyogita 21:7:24/img2.jpeg';
import img3 from '../assets/Gyan Pratiyogita 21:7:24/img3.jpeg';
import img4 from '../assets/Gyan Pratiyogita 21:7:24/img4.jpeg';
import img5 from '../assets/Gyan Pratiyogita 21:7:24/img5.jpeg';
import img6 from '../assets/Gyan Pratiyogita 21:7:24/img6.jpeg';

function Gallery() {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <section id="gallery" className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="w-full h-48 flex items-center justify-center">
            <img src={image} alt={`Gallery Image ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
