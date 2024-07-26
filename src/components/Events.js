import React from 'react';

function EventCard({ title, description, date }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 text-base">{description}</p>
      <p className="text-gray-600 text-sm">{date}</p>
    </div>
  );
}

function Events() {
  return (
    <section id="events" className="p-8 bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sample event data */}
        <EventCard title="Event 1" description="Description of Event 1" date="Date of Event 1"/>
        <EventCard title="Event 2" description="Description of Event 2" date="Date of Event 2"/>
        <EventCard title="Event 3" description="Description of Event 3" date="Date of Event 3"/>
      </div>
    </section>
  );
}

export default Events;
