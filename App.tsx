import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Admin from './components/Admin';
import AIConsultant from './components/AIConsultant';
import VideoShowcase from './components/VideoShowcase';
import { AppProvider } from './context/AppContext';

const Footer: React.FC = () => (
  <footer className="bg-dark-900 border-t border-white/10 py-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-serif font-bold text-white mb-4">ANEELA'S <span className="text-gold-500">MAKEOVER</span></h2>
      <p className="text-gray-500 mb-6">Where beauty meets elegance.</p>
      <div className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Aneela's Makeover. All rights reserved.
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-dark-900 text-white font-sans selection:bg-gold-500 selection:text-black">
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <VideoShowcase />
                </>
              } />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <AIConsultant />
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;