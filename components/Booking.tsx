import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICES, SPECIALISTS } from '../constants';
import { useAppContext } from '../context/AppContext';
import { Calendar, Clock, User, CheckCircle, ArrowLeft, ClipboardList } from 'lucide-react';

const Booking: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { addAppointment } = useAppContext();
  
  const queryParams = new URLSearchParams(search);
  const preSelectedServiceId = queryParams.get('service');

  // Step 1: Input, Step 2: Review, Step 3: Success
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceId: preSelectedServiceId || '',
    specialistId: '',
    date: '',
    time: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preSelectedServiceId) {
      setFormData(prev => ({ ...prev, serviceId: preSelectedServiceId }));
    }
  }, [preSelectedServiceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Move to Review Step
  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  // Final Submission
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addAppointment({
      id: Math.random().toString(36).substr(2, 9),
      clientName: formData.name,
      clientEmail: formData.email,
      serviceId: formData.serviceId,
      specialistId: formData.specialistId,
      date: formData.date,
      time: formData.time,
      status: 'Pending'
    });
    
    setIsSubmitting(false);
    setStep(3); // Success step
    window.scrollTo(0, 0);
  };

  // Helpers for display
  const getServiceDetails = (id: string) => SERVICES.find(s => s.id === id);
  const getSpecialistName = (id: string) => SPECIALISTS.find(s => s.id === id)?.name || 'Any Specialist';

  // --- Step 3: Success View ---
  if (step === 3) {
    return (
      <div className="min-h-screen bg-dark-900 py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-dark-800 p-8 border border-gold-500/30 text-center rounded-lg shadow-2xl animate-fade-in-up">
          <div className="mx-auto w-16 h-16 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Request Received!</h2>
          <p className="text-gray-400 mb-8">
            Thank you, {formData.name}. Your appointment request is <strong>Pending</strong>. Aneela's team will review and confirm it shortly via email ({formData.email}).
          </p>
          <div className="space-y-4">
             <button onClick={() => navigate('/')} className="w-full py-3 px-4 bg-transparent border border-white text-white hover:bg-white hover:text-black font-semibold transition-colors">
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Step 2: Review View ---
  if (step === 2) {
    const service = getServiceDetails(formData.serviceId);
    
    return (
      <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-white">Review Your Booking</h2>
            <p className="mt-2 text-gray-400">Please confirm your details below.</p>
          </div>

          <div className="bg-dark-800 shadow-xl border border-gold-500/30 rounded-lg overflow-hidden animate-fade-in-up">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6 text-gold-500 border-b border-white/10 pb-4">
                <ClipboardList size={24} />
                <h3 className="text-xl font-bold font-serif">Appointment Summary</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-1">Service</h4>
                  <p className="text-white text-lg font-medium">{service?.name || 'Unknown Service'}</p>
                  <p className="text-gold-500 font-bold mt-1">Rs {service?.price}</p>
                </div>
                
                <div>
                  <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-1">Specialist</h4>
                  <p className="text-white text-lg font-medium">{getSpecialistName(formData.specialistId)}</p>
                </div>

                <div>
                  <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-1">Date & Time</h4>
                  <div className="flex items-center gap-2 text-white text-lg font-medium">
                    <Calendar size={18} className="text-gray-400" />
                    {formData.date}
                    <span className="text-gray-600">|</span>
                    <Clock size={18} className="text-gray-400" />
                    {formData.time}
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-1">Client Details</h4>
                  <p className="text-white font-medium">{formData.name}</p>
                  <p className="text-gray-400 text-sm">{formData.email}</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-dark-900/50 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-transparent border border-gray-600 text-gray-300 rounded hover:bg-white/5 transition-colors"
              >
                <ArrowLeft size={18} />
                Edit Details
              </button>
              
              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-8 bg-gold-500 text-dark-900 font-bold rounded hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>Confirm & Book Appointment</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Step 1: Input View ---
  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-white">Book Your Appointment</h2>
          <p className="mt-2 text-gray-400">Select your preferred service and specialist.</p>
        </div>

        <form onSubmit={handleReview} className="bg-dark-800 shadow-xl border border-white/5 rounded-lg overflow-hidden animate-fade-in-up">
          <div className="p-8 space-y-8">
            
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gold-500 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-dark-900 border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gold-500 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-dark-900 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            {/* Service & Specialist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gold-500 mb-2">Service</label>
                <div className="relative">
                  <select
                    name="serviceId"
                    required
                    className="w-full bg-dark-900 border border-gray-700 rounded-md px-4 py-3 text-white appearance-none focus:outline-none focus:border-gold-500"
                    value={formData.serviceId}
                    onChange={handleChange}
                  >
                    <option value="">Select a Service</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (Rs {s.price})</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <span className="text-gray-500">▼</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gold-500 mb-2">Specialist</label>
                <div className="relative">
                  <select
                    name="specialistId"
                    required
                    className="w-full bg-dark-900 border border-gray-700 rounded-md px-4 py-3 text-white appearance-none focus:outline-none focus:border-gold-500"
                    value={formData.specialistId}
                    onChange={handleChange}
                  >
                    <option value="">Any Specialist</option>
                    {SPECIALISTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                    ))}
                  </select>
                   <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <span className="text-gray-500">▼</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gold-500 mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-dark-900 border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gold-500 mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input
                    type="time"
                    name="time"
                    required
                    min="09:00"
                    max="19:00"
                    className="w-full bg-dark-900 border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 bg-dark-900/50 border-t border-white/5 flex justify-end">
             <button
              type="submit"
              className="bg-gold-500 text-dark-900 font-bold py-3 px-8 rounded hover:bg-gold-400 transition-colors flex items-center gap-2"
            >
              Review Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;