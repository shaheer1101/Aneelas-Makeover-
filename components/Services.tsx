import React from 'react';
import { SERVICES } from '../constants';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="py-16 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Our Exclusive Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Indulge in our curated selection of treatments designed to rejuvenate your body and spirit.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.id} className="group bg-dark-800 border border-white/5 hover:border-gold-500/50 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gold-500 text-dark-900 font-bold px-3 py-1 rounded-sm">
                  Rs {service.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors">
                    {service.name}
                  </h3>
                </div>
                
                <p className="text-gray-400 mb-4 text-sm h-10 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    {service.duration} mins
                  </div>
                  <Link 
                    to={`/booking?service=${service.id}`}
                    className="text-gold-500 hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;