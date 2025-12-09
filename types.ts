export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'Hair' | 'Skin' | 'Nails' | 'Spa';
  image: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceId: string;
  specialistId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export type Theme = 'dark' | 'light'; // Keeping it extensible, though we focus on dark/gold
