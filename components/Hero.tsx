import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080?grayscale"
          alt="Salon Interior"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-48 lg:pb-32 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-6">
           <span className="h-[1px] w-12 bg-gold-500"></span>
           <span className="text-gold-500 uppercase tracking-[0.2em] text-sm font-semibold">Premium Beauty Care</span>
           <span className="h-[1px] w-12 bg-gold-500"></span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
          Reveal Your Inner <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-700">Radiance</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Experience world-class hair, skin, and nail treatments in an atmosphere of luxury and tranquility. Your journey to perfection starts here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/booking"
            className="group px-8 py-4 bg-gold-500 text-dark-900 font-bold text-lg rounded-none hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Book Appointment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 bg-transparent border border-white text-white font-bold text-lg hover:bg-white hover:text-dark-900 transition-all duration-300"
          >
            View Services
          </Link>
        </div>
      </div>

      {/* Featured Testimonials Snippet */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center text-gold-500 mb-2">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-400 italic">"Absolutely stunning results. The staff is professional and the ambiance is unmatched."</p>
                <p className="text-gray-500 text-sm mt-2">- Verified Client</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Hero;
