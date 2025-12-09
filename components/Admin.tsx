import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { SERVICES, SPECIALISTS } from '../constants';
import { Check, X, Lock } from 'lucide-react';

const Admin: React.FC = () => {
  const { appointments, updateAppointmentStatus } = useAppContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const getServiceName = (id: string) => SERVICES.find(s => s.id === id)?.name || 'Unknown Service';
  const getSpecialistName = (id: string) => SPECIALISTS.find(s => s.id === id)?.name || 'Any Specialist';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleStatusChange = (id: string, status: 'Confirmed' | 'Cancelled') => {
    updateAppointmentStatus(id, status);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="bg-dark-800 p-8 rounded-lg border border-white/10 shadow-2xl max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-dark-900 rounded-full border border-gold-500/30">
               <Lock className="text-gold-500 h-8 w-8" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white text-center mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-dark-900 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gold-500 text-dark-900 font-bold py-3 rounded hover:bg-gold-400 transition-colors"
            >
              Login
            </button>
            <p className="text-center text-gray-600 text-xs">Hint: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-white border-l-4 border-gold-500 pl-4">Admin Dashboard</h2>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-400 hover:text-white text-sm underline"
            >
              Logout
            </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-dark-800 p-6 rounded border border-white/5">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Total Bookings</h3>
            <p className="text-4xl font-bold text-white mt-2">{appointments.length}</p>
          </div>
          <div className="bg-dark-800 p-6 rounded border border-white/5">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Confirmed Revenue</h3>
            <p className="text-4xl font-bold text-gold-500 mt-2">Rs {confirmedCount * 8500}</p>
            <p className="text-xs text-gray-500 mt-1">Est. based on avg price</p>
          </div>
          <div className="bg-dark-800 p-6 rounded border border-white/5">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Pending Requests</h3>
            <p className="text-4xl font-bold text-yellow-500 mt-2">{pendingCount}</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-dark-800 rounded-lg shadow overflow-hidden border border-white/5">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-medium text-white">Manage Appointments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-dark-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Specialist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-dark-800 divide-y divide-white/5">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No appointments found.</td>
                  </tr>
                ) : (
                  appointments.slice().reverse().map((apt) => (
                    <tr key={apt.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{apt.clientName}</div>
                        <div className="text-sm text-gray-500">{apt.clientEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{getServiceName(apt.serviceId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{apt.date}</div>
                        <div className="text-sm text-gray-500">{apt.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white mr-2">
                                {getSpecialistName(apt.specialistId).charAt(0)}
                            </div>
                            <div className="text-sm text-gray-300">{getSpecialistName(apt.specialistId)}</div>
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                          apt.status === 'Confirmed' ? 'bg-green-900 text-green-200 border-green-700' :
                          apt.status === 'Cancelled' ? 'bg-red-900 text-red-200 border-red-700' :
                          'bg-yellow-900 text-yellow-200 border-yellow-700'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {apt.status === 'Pending' && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                              className="p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white transition-colors"
                              title="Confirm"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                              className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;