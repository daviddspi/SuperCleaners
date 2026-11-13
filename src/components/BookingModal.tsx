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
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
        formatted: d.toLocaleDateString('sr-RS', options)
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

  const isValidPhone = (value: string): boolean => {
    const digitsOnly = value.replace(/[\s\-()]/g, '');
    const phoneRegex = /^[+0]?\d{8,14}$/;
    return phoneRegex.test(digitsOnly);
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName || !email || !phone || !address) {
      setValidationError('Molimo popunite sva obavezna polja označena sa *');
      return;
    }

    if (!isValidPhone(phone)) {
      setValidationError('Unesite ispravan broj telefona (npr. 065 655 92 93 ili +381 65 655 92 93).');
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
    }, 1000);
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
    <div id="booking-modal-outer" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', duration: 0.35 }}
          className="relative w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-150 flex flex-col max-h-[92vh] sm:max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 md:px-8 border-b border-slate-150 bg-slate-50/70 shrink-0">
            <div className="flex items-center gap-3">
              <span className="p-2 sm:p-2.5 bg-brand-500 rounded-xl sm:rounded-2xl text-white shadow-xs">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <div className="text-left">
                <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
                  {step === 3 ? 'Rezervacija potvrđena!' : 'Zakažite Premium Čišćenje'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {step < 3 && `Korak ${step} od 2 • Brza online rezervacija`}
                </p>
              </div>
            </div>
            <button 
              id="close-booking-modal-btn"
              onClick={resetAndClose}
              className="p-2 transition text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer"
              aria-label="Zatvori"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          {step < 3 && (
            <div className="flex w-full bg-slate-100 h-1 shrink-0">
              {[1, 2].map((num) => (
                <div 
                  key={num}
                  className={`h-full flex-1 transition-all duration-300 ${
                    num <= step ? 'bg-brand-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Scrollable Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
            
            <div className="p-4 sm:p-6 md:p-8 lg:col-span-7 xl:col-span-8 border-b lg:border-b-0 lg:border-r border-slate-150 text-left">
              <AnimatePresence mode="wait">
                
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-5 sm:space-y-6"
                  >
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2.5 sm:mb-3">
                        Izaberite datum (Dostupni dani)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                        {getUpcomingDates().map((day) => {
                          const isSelected = selectedDate === day.raw;
                          const parts = day.formatted.split(', ');
                          const weekday = parts[0] || '';
                          const monthDay = parts[1] || parts[0];
                          return (
                            <button
                              key={day.raw}
                              type="button"
                              onClick={() => {
                                setSelectedDate(day.raw);
                                setValidationError('');
                              }}
                              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-brand-500 text-white shadow-sm ring-2 ring-brand-500/30'
                                  : 'bg-slate-50 border border-slate-200/70 hover:border-brand-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`text-[10px] uppercase tracking-wider font-bold ${
                                isSelected ? 'text-brand-100' : 'text-slate-400'
                              }`}>
                                {weekday}
                              </span>
                              <span className="text-sm sm:text-base font-extrabold mt-0.5">
                                {monthDay}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2.5 sm:mb-3">
                        Željeno vreme dolaska
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-brand-500 bg-brand-50/70 text-slate-900 ring-2 ring-brand-500/20'
                                  : 'border-slate-200/70 bg-slate-50 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <span className={`p-2 rounded-lg ${
                                isSelected ? 'bg-brand-500 text-white' : 'bg-white text-slate-400 border border-slate-200'
                              }`}>
                                <Clock className="w-3.5 h-3.5" />
                              </span>
                              <div>
                                <span className="block font-bold text-xs sm:text-sm">
                                  {slot.split(' (')[0]}
                                </span>
                                <span className="text-[10px] text-slate-500 block font-medium">
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
                    className="space-y-3.5 sm:space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
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
                            className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
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
                            className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
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
                          className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
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
                          className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                        Posebne napomene
                      </label>
                      <textarea
                        rows={2}
                        placeholder="npr. Potrebno obratiti pažnju na uporne fleke od kafe na dvosedu."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm placeholder:text-slate-400"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && bookingResult && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 sm:py-8 space-y-5"
                  >
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full animate-bounce">
                      <Check className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                        Rezervacija potvrđena!
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                        Vaš zahtev za dubinsko pranje je primljen (Broj: {bookingResult.id}). Kontaktiraćemo vas uskoro radi potvrde.
                      </p>
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={resetAndClose}
                        className="btn btn-primary !py-3 !px-6 text-sm"
                      >
                        Završi i vrati se na sajt
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Summary Invoice Panel */}
            <div className="lg:col-span-5 xl:col-span-4 bg-slate-50/80 p-4 sm:p-6 md:p-8 flex flex-col justify-between text-left">
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-0.5">Rezime narudžbine</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Profesionalna oprema, netoksična hemija i dolazak na adresu.
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.keys(items || {}).length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Niste izabrali usluge u kalkulatoru. Detalje dogovaramo telefonom.</p>
                  ) : (
                    <div className="space-y-2 max-h-[180px] sm:max-h-[220px] overflow-y-auto pr-1 custom-scrollbar divide-y divide-slate-200">
                      {Object.entries(items).map(([id, qty]) => {
                        const itemDef = PRICING_ITEMS.find(i => i.id === id);
                        if (!itemDef) return null;
                        return (
                          <div key={id} className="flex justify-between items-center text-xs pt-2 pb-0.5">
                            <span className="text-slate-700">{qty}x {itemDef.name}</span>
                            <span className="font-bold text-slate-900 whitespace-nowrap">{itemDef.price * qty} RSD</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Okvirno ukupno</span>
                  <span className="text-xl sm:text-2xl font-black text-brand-600 leading-none">
                    {totalPrice.toLocaleString('sr-RS')} RSD
                  </span>
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
                        className="btn btn-soft !py-3 !px-4 text-xs sm:text-sm font-semibold"
                      >
                        Nazad
                      </button>
                    )}
                    
                    <button
                      type="button"
                      onClick={step === 2 ? handleBookNow : handleNextStep}
                      disabled={submitting}
                      className="btn btn-primary flex-1 !py-3 text-xs sm:text-sm font-semibold"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
