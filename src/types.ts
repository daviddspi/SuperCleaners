export interface PricingItem {
  id: string;
  name: string;
  price: number;
  priceType: 'fixed' | 'per_m2' | 'per_seat' | 'starting';
  category: 'namestaj' | 'tepisi' | 'automobili';
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  iconName: string; // Lucide icon identifier
  items?: PricingItem[];
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
  items: Record<string, number>; // itemId -> quantity
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
