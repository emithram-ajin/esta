import React, { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_URL;

export default function Homepage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/services`) // Replace with your backend API endpoint
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Our Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full aspect-[4/3] bg-gray-200">
              <img
                src={`${BASE_URL}/uploads/${service.imageUrl}`} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{service.title}</h2>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{service.description}</p>
              <button className="mt-4 px-4 py-2 bg-[#008C80] text-white rounded-full hover:bg-[#007066] text-sm">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
