import React from 'react';

function TestimonialCard({ quote, author }) {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white p-6 m-2">
      <p className="text-gray-600 text-base italic">"{quote}"</p>
      <p className="text-gray-800 text-sm font-bold mt-4">- {author}</p>
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="p-8 bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Testimonials</h2>
      <div className="flex flex-wrap justify-center">
        {/* Sample testimonials */}
        <TestimonialCard quote="This NGO has changed lives, and I'm proud to support it." author="Person One"/>
        <TestimonialCard quote="A truly inspiring commitment to making a difference." author="Person Two"/>
      </div>
    </section>
  );
}

export default Testimonials;
