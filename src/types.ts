export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  basePrice: number; // base price per hour or job
  pricePerUnit: number; // e.g., price per bedroom or bathroom
  category: string;
  image: string;
  iconName: string; // Lucide icon identifier
  durationHours: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface Estimate {
  serviceId: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  frequency: 'one-time' | 'weekly' | 'biweekly' | 'monthly';
  addons: string[]; // list of addon ids
  totalPrice: number;
}

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  timeSlot: string;
  estimate: Estimate;
  specialInstructions?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  iconName: string;
}
