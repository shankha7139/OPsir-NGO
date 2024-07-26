import React from 'react';

function Gallery() {
  return (
    <section id="gallery" className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Sample images - replace with real images */}
        {[1, 2, 3, 4, 5, 6].map(num => (
          <div key={num} className="w-full h-48 bg-gray-400 flex items-center justify-center">
            Image {num}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
