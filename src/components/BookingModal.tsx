import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock, MapPin, User, Mail, Phone, Calculator, AlertCircle } from 'lucide-react';
import { PRICING_ITEMS } from '../config';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Record<string, number>;
  totalPrice: number;
}

export default function BookingModal({ isOpen, onClose, items, totalPrice }: BookingModalProps) {
  const [step, setStep] = useState(1);
  
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

  if (!isOpen) return null;

  const handleNextStep = () => {
    setValidationError('');
    if (step === 1) {
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

  const timeSlots = [
    '08:00 - 11:00 (Rano ujutru)',
    '11:00 - 14:00 (Sredina dana)',
    '14:00 - 17:00 (Popodne)',
    '17:00 - 20:00 (Kasno popodne)'
  ];

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName || !email || !phone || !address) {
      setValidationError('Molimo popunite sva obavezna polja označena sa *');
      return;
    }

    setSubmitting(true);
    
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
          items,
          totalPrice
        }
      };

      setBookingResult(finalBooking);
      setSubmitting(false);
      setStep(3);
    }, 1200);
  };

  const resetAndClose = () => {
    setStep(1);
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

  return (
    <div id="booking-modal-outer" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden glass border border-white/50"
        >
          <div className="flex items-center justify-between p-6 md:px-8 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-brand-500 rounded-2xl text-white">
                <Calculator className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {step === 3 ? 'Rezervacija potvrđena!' : 'Zakažite Premium Čišćenje'}
                </h3>
                <p className="text-xs text-slate-500">
                  {step < 3 && `Korak ${step} od 2 • Brza rezervacija`}
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

          {step < 3 && (
            <div className="flex w-full bg-slate-100 h-1.5">
              {[1, 2].map((num) => (
                <div 
                  key={num}
                  className={`h-full flex-1 transition-all duration-300 ${
                    num <= step ? 'bg-gradient-to-r from-brand-500 to-brand-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[75vh] md:max-h-[80vh] overflow-y-auto">
            
            <div className="p-6 md:p-8 lg:col-span-8 border-r border-slate-100">
              <AnimatePresence mode="wait">
                
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
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
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
                        Posebne napomene
                      </label>
                      <textarea
                        rows={3}
                        placeholder="npr. Potrebno obratiti pažnju na uporne fleke od kafe na dvosedu."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-250 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && bookingResult && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-slate-900 leading-tight">
                        Rezervacija potvrđena!
                      </h4>
                      <p className="text-sm text-slate-500 max-w-md mx-auto">
                        Vaš zahtev za dubinsko pranje je primljen. Kontaktiraćemo vas uskoro.
                      </p>
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

            {/* Right Layout: Sticky Invoice Panel */}
            <div className="lg:col-span-4 bg-slate-50/70 p-6 md:p-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-black text-slate-900 text-lg mb-1">Rezime</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Uključuje profesionalnu opremu, deterdžente i dolazak na adresu.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    {Object.keys(items || {}).length === 0 ? (
                      <p className="text-xs text-slate-500 italic">Niste izabrali usluge. Cena će biti dogovorena na licu mesta.</p>
                    ) : (
                      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                        {Object.entries(items).map(([id, qty]) => {
                          const itemDef = PRICING_ITEMS.find(i => i.id === id);
                          if (!itemDef) return null;
                          return (
                            <div key={id} className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                              <span className="text-slate-600">{qty}x {itemDef.name}</span>
                              <span className="font-bold text-slate-800">{itemDef.price * qty} RSD</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-800">Ukupno okvirno</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-brand-600 leading-none block">
                      {totalPrice} RSD
                    </span>
                  </div>
                </div>

                {validationError && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <p>{validationError}</p>
                  </div>
                )}

                {step < 3 && (
                  <div className="flex gap-2">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={submitting}
                        className="px-4 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 font-bold text-slate-600 transition shadow-sm text-sm"
                      >
                        Nazad
                      </button>
                    )}
                    
                    <button
                      type="button"
                      onClick={step === 2 ? handleBookNow : handleNextStep}
                      disabled={submitting}
                      className="flex-1 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition shadow-md shadow-brand-500/20 text-sm flex justify-center items-center gap-2"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        step === 2 ? 'Potvrdi i Zakaži' : 'Sledeći korak'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
