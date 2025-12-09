import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment } from '../types';

interface AppContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'mock1',
      clientName: 'Alice Wonderland',
      clientEmail: 'alice@example.com',
      serviceId: 's1',
      specialistId: 'st1',
      date: '2023-11-25',
      time: '10:00',
      status: 'Pending'
    }
  ]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  return (
    <AppContext.Provider value={{ appointments, addAppointment, updateAppointmentStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};