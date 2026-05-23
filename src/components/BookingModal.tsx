import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Calendar as CalendarIcon, Clock, MapPin, User, Mail, 
  Phone, Sparkles, BedDouble, Flame, Maximize, ShieldCheck, 
  Armchair, Snowflake, FolderClosed, Compass, Shirt, 
  HeartHandshake, ChevronLeft, ChevronRight, Calculator, AlertCircle
} from 'lucide-react';
import { SERVICES, ADDONS } from '../data';
import { Service, Addon, Estimate, Booking } from '../types';

// Dynamic icon resolver
function ServiceIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'Sparkles': return <Sparkles className={className} />;
    case 'BedDouble': return <BedDouble className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Maximize': return <Maximize className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Armchair': return <Armchair className={className} />;
    case 'Snowflake': return <Snowflake className={className} />;
    case 'FolderClosed': return <FolderClosed className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Shirt': return <Shirt className={className} />;
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    default: return <Sparkles className={className} />;
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedServiceId }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  
  // Form State
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [squareFeet, setSquareFeet] = useState(1200);
  const [frequency, setFrequency] = useState<'one-time' | 'weekly' | 'biweekly' | 'monthly'>('one-time');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Scheduling State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 AM - 12:00 PM');
  
  // Personal Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Submission result
  const [bookingResult, setBookingResult] = useState<Booking | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Handle outside click/esc keys to close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Sync preselected service
  useEffect(() => {
    if (preselectedServiceId) {
      const match = SERVICES.find(s => s.id === preselectedServiceId);
      if (match) {
        setSelectedService(match);
      }
    }
  }, [preselectedServiceId, isOpen]);

  if (!isOpen) return null;

  // Real-time pricing calculations
  const calculateTotal = (): number => {
    let price = selectedService.basePrice;
    
    // Add bed/bath scaling
    if (selectedService.id === 'end-of-tenancy') {
      price += (bedrooms - 1) * selectedService.pricePerUnit;
    } else {
      price += (bedrooms - 2 > 0 ? (bedrooms - 2) * selectedService.pricePerUnit : 0);
      price += (bathrooms - 1 > 0 ? (bathrooms - 1) * selectedService.pricePerUnit : 0);
    }
    
    // Square feet adjustment
    if (squareFeet > 1500) {
      price += Math.floor((squareFeet - 1500) / 100) * 4;
    }

    // Add selected addons
    const addonsCost = selectedAddons.reduce((acc, addonId) => {
      const addon = ADDONS.find(a => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);
    
    price += addonsCost;

    // Apply frequency discounts
    if (frequency === 'weekly') price *= 0.82; // 18% off
    else if (frequency === 'biweekly') price *= 0.88; // 12% off
    else if (frequency === 'monthly') price *= 0.93; // 7% off

    return Math.round(price);
  };

  const totalPrice = calculateTotal();

  const handleAddonToggle = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleNextStep = () => {
    setValidationError('');
    if (step === 3) {
      if (!selectedDate) {
        setValidationError('Molimo izaberite željeni datum čišćenja.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  // Build a custom date list for selection (next 12 days)
  const getUpcomingDates = () => {
    const dates = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    for (let i = 1; i <= 10; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        raw: d.toISOString().split('T')[0],
        formatted: d.toLocaleDateString('en-US', options)
      });
    }
    return dates;
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName || !email || !phone || !address) {
      setValidationError('Molimo popunite sva obavezna polja označena sa *');
      return;
    }

    setSubmitting(true);
    
    // Simulate API call saving data
    setTimeout(() => {
      const finalBooking: Booking = {
        id: `SC-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName,
        email,
        phone,
        address,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        specialInstructions,
        status: 'confirmed',
        estimate: {
          serviceId: selectedService.id,
          bedrooms,
          bathrooms,
          squareFeet,
          frequency,
          addons: selectedAddons,
          totalPrice
        }
      };

      // Store in simple local state/storage list if we wanted to
      try {
        const stored = localStorage.getItem('super_cleaners_bookings');
        const list = stored ? JSON.parse(stored) : [];
        list.push(finalBooking);
        localStorage.setItem('super_cleaners_bookings', JSON.stringify(list));
      } catch (err) {
        console.error("Local storage booking save failed: ", err);
      }

      setBookingResult(finalBooking);
      setSubmitting(false);
      setStep(5);
    }, 1200);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedService(SERVICES[0]);
    setBedrooms(2);
    setBathrooms(1);
    setSquareFeet(1200);
    setFrequency('one-time');
    setSelectedAddons([]);
    setSelectedDate('');
    setSelectedTimeSlot('09:00 AM - 12:00 PM');
    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setSpecialInstructions('');
    setBookingResult(null);
    onClose();
  };

  // Available Time slots
  const timeSlots = [
    '08:00 - 11:00 (Rano ujutru)',
    '11:00 - 14:00 (Sredina dana)',
    '14:00 - 17:00 (Popodne)',
    '17:00 - 20:00 (Kasno popodne)'
  ];

  return (
    <div id="booking-modal-outer" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      {/* Outer wrapper to prevent content jump */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden glass border border-white/50"
        >
          {/* Main header bar */}
          <div className="flex items-center justify-between p-6 md:px-8 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-brand-500 rounded-2xl text-white">
                <Calculator className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {step === 5 ? 'Rezervacija potvrđena!' : 'Zakažite Premium Čišćenje'}
                </h3>
                <p className="text-xs text-slate-500">
                  {step < 5 && `Korak ${step} od 4 • Brza procena`}
                </p>
              </div>
            </div>
            <button 
              id="close-booking-modal-btn"
              onClick={resetAndClose}
              className="p-2 transition text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicators */}
          {step < 5 && (
            <div className="flex w-full bg-slate-100 h-1.5">
              {[1, 2, 3, 4].map((num) => (
                <div 
                  key={num}
                  className={`h-full flex-1 transition-all duration-300 ${
                    num <= step ? 'bg-gradient-to-r from-brand-500 to-brand-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Core Body Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[75vh] md:max-h-[80vh] overflow-y-auto">
            
            {/* Left Layout: Dynamic forms (8 cols) */}
            <div className="p-6 md:p-8 lg:col-span-8 border-r border-slate-100">
              
              <AnimatePresence mode="wait">
                
                {/* Step 1: Core Service details */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Izaberite vrstu usluge
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {SERVICES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedService(s)}
                            className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                              selectedService.id === s.id
                                ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className={`p-1.5 rounded-lg mb-2.5 inline-block ${
                              selectedService.id === s.id ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <ServiceIcon name={s.iconName} className="w-4 h-4" />
                            </span>
                            <span className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">
                              {s.name}
                            </span>
                            <span className="text-[10px] text-slate-500 mt-0.5">
                              Od {s.basePrice}€
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-600">
                        <strong className="text-slate-800">Izabrana usluga:</strong> {selectedService.longDescription}
                      </p>
                    </div>

                    {/* Numerical sliders / dials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-semibold text-slate-700">
                            Broj spavaćih soba
                          </label>
                          <span className="px-2 py-0.5 bg-slate-200 rounded-lg text-xs font-bold text-slate-800">
                            {bedrooms} soba
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => setBedrooms(prev => Math.max(1, prev - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 transition"
                          >
                            -
                          </button>
                          <input 
                            type="range" 
                            min="1" 
                            max="8" 
                            value={bedrooms} 
                            onChange={(e) => setBedrooms(parseInt(e.target.value))}
                            className="flex-1 accent-brand-500 cursor-pointer"
                          />
                          <button 
                            type="button"
                            onClick={() => setBedrooms(prev => Math.min(8, prev + 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-semibold text-slate-700">
                            Broj kupatila
                          </label>
                          <span className="px-2 py-0.5 bg-slate-200 rounded-lg text-xs font-bold text-slate-800">
                            {bathrooms} kupatila
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => setBathrooms(prev => Math.max(1, prev - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 transition"
                          >
                            -
                          </button>
                          <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            value={bathrooms} 
                            onChange={(e) => setBathrooms(parseInt(e.target.value))}
                            className="flex-1 accent-brand-500 cursor-pointer"
                          />
                          <button 
                            type="button"
                            onClick={() => setBathrooms(prev => Math.min(5, prev + 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-slate-700">
                          Približna veličina prostora
                        </label>
                        <span className="text-xs font-bold text-brand-600">
                          {squareFeet} kvadrata
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="400" 
                        max="4500" 
                        step="100" 
                        value={squareFeet}
                        onChange={(e) => setSquareFeet(parseInt(e.target.value))}
                        className="w-full accent-brand-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Studio (400)</span>
                        <span>Srednja kuća (1500)</span>
                        <span>Velika kuća (4500+)</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Addon select & frequency */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Koliko često želite čišćenje?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { id: 'one-time', title: 'Jednokratno', desc: 'Bez ugovora' },
                          { id: 'weekly', title: 'Nedeljno', desc: 'Ušteda 18%' },
                          { id: 'biweekly', title: 'Dvonedeljno', desc: 'Ušteda 12%' },
                          { id: 'monthly', title: 'Mesečno', desc: 'Ušteda 7%' }
                        ].map((freq) => (
                          <button
                            key={freq.id}
                            type="button"
                            onClick={() => setFrequency(freq.id as any)}
                            className={`p-3 rounded-2xl text-center border transition-all ${
                              frequency === freq.id
                                ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/10'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className="block font-bold text-slate-800 text-sm">
                              {freq.title}
                            </span>
                            <span className="text-[10px] text-brand-600 font-semibold mt-0.5 inline-block">
                              {freq.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <label className="text-sm font-semibold text-slate-700">
                          Dodajte opcione usluge
                        </label>
                        <span className="text-xs text-slate-400">Za još više detalja</span>
                      </div>
                      <div className="space-y-3">
                        {ADDONS.map((addon) => {
                          const isSelected = selectedAddons.includes(addon.id);
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              onClick={() => handleAddonToggle(addon.id)}
                              className={`flex items-center justify-between w-full p-4 rounded-2xl border text-left transition-all ${
                                isSelected
                                  ? 'border-brand-500 bg-brand-50/30'
                                  : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`p-2 rounded-xl ${
                                  isSelected ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 shadow-sm'
                                }`}>
                                  <ServiceIcon name={addon.iconName} className="w-4 h-4" />
                                </span>
                                <div>
                                  <span className="block font-semibold text-slate-850 text-xs sm:text-sm">
                                    {addon.name}
                                  </span>
                                  <span className="text-[11px] text-slate-400 block sm:hidden">
                                    +{addon.price}€
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-755 text-sm hidden sm:inline">
                                  +{addon.price}€
                                </span>
                                <span className={`w-5 h-5 flex items-center justify-center rounded-full ${
                                  isSelected ? 'bg-brand-500 text-white' : 'border border-slate-350 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-3.5 h-3.5" />}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Date, Time scheduler */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Izaberite datum (Dostupni dani)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {getUpcomingDates().map((day) => {
                          const isSelected = selectedDate === day.raw;
                          const [weekday, monthDay] = day.formatted.split(', ');
                          return (
                            <button
                              key={day.raw}
                              type="button"
                              onClick={() => {
                                setSelectedDate(day.raw);
                                setValidationError('');
                              }}
                              className={`p-3.5 rounded-2xl text-center flex flex-col items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-brand-500 text-white ring-4 ring-brand-500/20 shadow-lg shadow-brand-500/10'
                                  : 'bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`text-[10px] uppercase tracking-wider font-bold ${
                                isSelected ? 'text-brand-50' : 'text-slate-400'
                              }`}>
                                {weekday}
                              </span>
                              <span className="text-lg font-extrabold mt-1">
                                {monthDay}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Željeno vreme dolaska
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                                isSelected
                                  ? 'border-brand-500 bg-brand-50/50 text-slate-900 ring-2 ring-brand-500/10'
                                  : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <span className={`p-2.5 rounded-xl ${
                                isSelected ? 'bg-brand-500 text-white' : 'bg-white text-slate-400 border border-slate-100'
                              }`}>
                                <Clock className="w-4 h-4" />
                              </span>
                              <div>
                                <span className="block font-bold text-xs sm:text-sm">
                                  {slot.split(' (')[0]}
                                </span>
                                <span className="text-[10px] text-slate-450 block font-medium">
                                  {slot.includes('(') ? slot.substring(slot.indexOf('(')) : ''}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 mt-0.5 text-amber-500 shrink-0" />
                      <div className="text-xs">
                        <strong className="font-bold">Procenjeno vreme trajanja:</strong> Ova vrsta usluge obično traje oko <strong className="font-bold">{selectedService.durationHours} sati</strong> kako bismo dostigli optimalne rezultate.
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact validation and submission */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Ime i prezime *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="Petar Petrović"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-250 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Email adresa *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            required
                            placeholder="petar@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-250 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Broj telefona *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="+381 60 1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-250 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Adresa za čišćenje *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="npr. Knez Mihailova 1, Beograd"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-250 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Posebne napomene / Šifre za ulaz (Opciono)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="npr. Ključ se nalazi ispod saksije. Molimo obratite posebnu pažnju na tepih u hodniku."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-250 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed text-center mt-3">
                      Slanjem ovog zahteva slažete se da Super Cleaners pristupi vašem posedu u izabranom terminu. Otkazivanje je 100% besplatno do 24 sata ranije.
                    </p>
                  </motion.div>
                )}

                {/* Step 5: Success state */}
                {step === 5 && bookingResult && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-slate-900 leading-tight">
                        Blistava čistoća vas čeka!
                      </h4>
                      <p className="text-sm text-slate-500 max-w-md mx-auto">
                        Vaš zahtev za čišćenje je primljen. Naš profesionalni, provereni tim će stići u dogovoreno vreme.
                      </p>
                    </div>

                    {/* Receipt breakdown */}
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left divide-y divide-slate-200/60 text-slate-700 max-w-md mx-auto space-y-3.5">
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-xs font-bold text-slate-450 uppercase tracking-wide">Referenca rezervacije</span>
                        <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
                          {bookingResult.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 text-sm">
                        <span>Izabrana usluga</span>
                        <strong className="text-slate-940 font-bold">{selectedService.name}</strong>
                      </div>
                      <div className="flex justify-between items-center py-2 text-sm">
                        <span>Datum i vreme</span>
                        <strong className="text-slate-940 font-bold">
                          {new Date(bookingResult.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} @ {bookingResult.timeSlot.split(' (')[0]}
                        </strong>
                      </div>
                      <div className="flex justify-between items-center py-2 text-sm">
                        <span>Klijent</span>
                        <strong className="text-slate-940 font-bold">{bookingResult.fullName}</strong>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-slate-800">Garantovana cena</span>
                        <strong className="text-lg font-black text-brand-600">
                          {bookingResult.estimate.totalPrice}€
                        </strong>
                      </div>
                    </div>

                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={resetAndClose}
                        className="px-6 py-3 rounded-full bg-slate-850 text-white hover:bg-slate-750 font-bold transition-all shadow-md"
                      >
                        Završi i vrati se na početnu
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Layout: Sticky Invoice Panel (4 cols) */}
            <div className="lg:col-span-4 bg-slate-50/70 p-6 md:p-8 flex flex-col justify-between">
              
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Pregled računa
                </h4>

                {/* Micro details panel */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Izabrana usluga</span>
                    <strong className="text-sm font-bold text-slate-800 block">
                      {selectedService.name}
                    </strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Raspored</span>
                      <strong className="font-semibold">{bedrooms} Sp.soba • {bathrooms} Kup.</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Učestalost</span>
                      <strong className="font-semibold capitalize">{frequency}</strong>
                    </div>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1.5">Izabrani dodaci</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedAddons.map(addonId => {
                          const item = ADDONS.find(a => a.id === addonId);
                          return (
                            <span key={addonId} className="text-[10px] font-bold bg-white text-brand-700 px-2 py-1 rounded-lg border border-slate-100 shadow-xs">
                              {item?.name.replace(' Cleaning', '').replace(' Detail', '')}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-slate-200/60 pt-4 space-y-1.5 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Osnovna cena:</span>
                      <span>{selectedService.basePrice}€</span>
                    </div>
                    
                    {selectedService.id === 'end-of-tenancy' ? (
                      bedrooms > 1 && (
                        <div className="flex justify-between">
                          <span>Dodatne spavaće sobe ({bedrooms - 1}):</span>
                          <span>+{(bedrooms - 1) * selectedService.pricePerUnit}€</span>
                        </div>
                      )
                    ) : (
                      <>
                        {bedrooms > 2 && (
                          <div className="flex justify-between">
                            <span>Spavaće sobe (+{bedrooms - 2}):</span>
                            <span>+{(bedrooms - 2) * selectedService.pricePerUnit}€</span>
                          </div>
                        )}
                        {bathrooms > 1 && (
                          <div className="flex justify-between">
                            <span>Kupatila (+{bathrooms - 1}):</span>
                            <span>+{(bathrooms - 1) * selectedService.pricePerUnit}€</span>
                          </div>
                        )}
                      </>
                    )}

                    {squareFeet > 1500 && (
                      <div className="flex justify-between">
                        <span>Površina prostora:</span>
                        <span>+{Math.floor((squareFeet - 1500) / 100) * 4}€</span>
                      </div>
                    )}

                    {selectedAddons.length > 0 && (
                      <div className="flex justify-between">
                        <span>Dodaci:</span>
                        <span>+{selectedAddons.reduce((acc, aId) => acc + (ADDONS.find(a => a.id === aId)?.price || 0), 0)}€</span>
                      </div>
                    )}

                    {frequency !== 'one-time' && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Popust za učestalost:</span>
                        <span>
                          {frequency === 'weekly' ? '-18%' : frequency === 'biweekly' ? '-12%' : '-7%'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Total display & navigation button */}
              <div className="pt-6 border-t border-slate-200 mt-6 md:mt-10 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-800 text-sm">Ukupno (procena):</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {totalPrice}€
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">PDV i osiguranje uključeni</span>
                  </div>
                </div>

                {validationError && (
                  <div className="p-3 bg-red-55 text-red-700 rounded-xl text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3.5 rounded-full bg-brand-500 hover:bg-brand-610 active:scale-[0.98] text-white font-heavy transition shadow-md shadow-brand-500/10 text-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Nastavi sa rezervacijom</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : step === 4 ? (
                  <button
                    type="button"
                    onClick={handleBookNow}
                    disabled={submitting}
                    className="w-full py-3.5 rounded-full bg-brand-500 hover:bg-brand-610 active:scale-[0.98] text-white font-heavy transition shadow-md disabled:bg-slate-350 text-sm flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Potvrda termina...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Zakaži Super Cleaners odmah</span>
                      </>
                    )}
                  </button>
                ) : null}

                {step > 1 && step < 5 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full py-2.5 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold transition text-xs flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Nazad na korak {step - 1}</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
