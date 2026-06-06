import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, ArrowRight, Star, Clock, Heart, ShieldCheck, Mail, Send, X } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Services from './components/Services';
import OurWork from './components/OurWork';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import PricingCalculator from './components/PricingCalculator';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { GENERATED_IMAGES } from './data';
import { config } from './config';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedItems, setPreselectedItems] = useState<Record<string, number>>({});
  const [preselectedTotalPrice, setPreselectedTotalPrice] = useState<number>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleOpenBooking = (serviceId?: string) => {
    handleScrollToSection('#estimator-section');
  };

  const handleOpenBookingWithPrefs = (prefs: {
    items: Record<string, number>;
    totalPrice: number;
  }) => {
    setPreselectedItems(prefs.items);
    setPreselectedTotalPrice(prefs.totalPrice);
    setIsBookingOpen(true);
  };


  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-800 bg-slate-50">
      
      {/* Sticky Top-level navigation structure */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero presentation layout */}
      <Hero 
        onOpenBooking={() => handleOpenBooking()} 
        onExploreServices={() => handleScrollToSection('#services-section')} 
      />

      {/* Few Words About Super Cleaners Block (About Segment) */}
      <section id="about-section" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left picture block wrapped with sparkle backdrop per layout */}
            <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-sm aspect-square">
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-brand-500 rounded-full scale-95 opacity-5 blur-xl -z-10" />
                
                {/* Visual cloud border frame matching Super Cleaners illustration styles */}
                <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-slate-50 shadow-xl relative">
                  <img 
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                    alt="Cheer lady polishing modern cupboard"
                    className="w-full h-full object-cover select-none scale-102 hover:scale-[1.04] transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating trust shield badge */}
                <div className="absolute -bottom-4 -left-4 p-4.5 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center gap-3">
                  <span className="p-2.5 bg-brand-100 text-brand-600 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <div className="text-left font-bold text-xs">
                    <span className="block text-slate-900 leading-none">Provereni stručnjaci</span>
                    <span className="text-slate-400 font-semibold block mt-1">100% obezbeđeno poslovanje</span>
                  </div>
                </div>

                <Sparkles className="absolute -right-5 top-1/4 w-8 h-8 text-brand-500/55 animate-bounce" />
              </div>
            </div>

            {/* Right details content checklist */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left flex flex-col items-center lg:items-start order-1 lg:order-2">
              <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
                Premium Dubinsko Pranje
              </span>
              
              <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
                {config.brand.aboutTitleLine1} <span className="italic font-serif text-brand-500">{config.brand.name}</span> <br />
                {config.brand.aboutTitleLine2}
              </h2>
              
              <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                {config.brand.aboutDescription}
              </p>

              {/* Checklist details matching reference mockup */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-650 font-medium w-full">
                {config.features.map((item) => (
                  <li key={item} className="flex items-start justify-center lg:justify-start gap-2.5 text-left">
                    <span className="p-1 bg-brand-50 text-brand-550 rounded-lg shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  id="about-view-services-btn"
                  onClick={() => handleScrollToSection('#services-section')}
                  className="px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-610 text-white font-medium text-xs uppercase tracking-wider transition shadow-lg shadow-brand-500/10 cursor-pointer"
                >
                  Naše Usluge
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Super Cleaners list */}
      <WhyChoose />

      {/* Core Cleaning Services List (6 main cards with hover properties) */}
      <Services onOpenBooking={handleOpenBooking} />

      {/* Before/After gallery of works */}
      <OurWork />

      {/* Dynamic Statistics Block with dark blue theme overlay */}
      <Stats onOpenBooking={() => handleOpenBooking()} />

      {/* Lower Banner: We Make Cleaning Easier and More Convenient with male portrait */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
                Izuzetna Pogodnost
              </span>
              
              <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
                {config.brand.convenienceTitleLine1} <span className="italic font-serif text-brand-500">{config.brand.convenienceTitleHighlight}</span> <br />
                {config.brand.convenienceTitleLine2}
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-555 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0">
                <p>{config.brand.convenienceDescription1}</p>
                <p>{config.brand.convenienceDescription2}</p>
              </div>

              <div className="pt-2">
                <button
                  id="convenience-view-services-btn"
                  onClick={() => handleScrollToSection('#services-section')}
                  className="px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-610 text-white font-medium text-xs uppercase tracking-widest transition shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 active:scale-98 cursor-pointer scroll-smooth"
                >
                  Naše Usluge
                </button>
              </div>
            </div>

            {/* Right illustration of male cleaner surrounded by stars/clouds */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                {/* Circular soft blue blur */}
                <div className="absolute inset-0 bg-brand-500/10 rounded-full scale-105 blur-2xl -z-10" />
                
                <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-slate-50 shadow-xl relative">
                  <img 
                    src={GENERATED_IMAGES.maleCleaner}
                    alt="Cheerful male cleaner with tools David" 
                    className="w-full h-full object-cover scale-102 hover:scale-[1.04] transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-610/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating experience shield */}
                <div className="absolute -top-3 -right-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                  <div className="text-left">
                    <span className="block font-black text-slate-900 text-xs">Sertifikovan kvalitet</span>
                    <span className="text-[10px] text-slate-400 font-semibold block leading-none mt-1">Odobreni SGS proizvodi</span>
                  </div>
                </div>

                {/* Decorative background stars */}
                <Sparkles className="absolute -left-6 bottom-1/4 w-8 h-8 text-brand-500/50 animate-bounce" />
                <div className="absolute right-10 -bottom-3 w-4 h-4 bg-brand-200 rounded-full opacity-60 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Estimator Panel segment */}
      <PricingCalculator onOpenBookingWithPrefs={handleOpenBookingWithPrefs} />

      {/* What Our Customers Say (Testimonial carousel) */}
      <Testimonials />

      {/* FAQ accordion section */}
      <FAQ />

      {/* Contact info and form section */}
      <Contact />

      {/* Dynamic continuous running infinite categories strip, matching graphic */}
      <div className="w-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 text-white py-5 overflow-hidden relative font-display font-semibold text-xs sm:text-sm uppercase tracking-widest select-none shadow-md border-y border-white/5">
        {/* Left and Right Fade Overlays matching marquee gradient */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-600 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-600 to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex gap-16 shrink-0 items-center justify-around">
              <span className="flex items-center gap-2">
                <span>Pranje nameštaja</span>
                <span className="text-brand-300 font-bold">✦</span>
              </span>
              <span className="flex items-center gap-2">
                <span>Dubinsko pranje automobila</span>
                <span className="text-brand-300 font-bold">✦</span>
              </span>
              <span className="flex items-center gap-2">
                <span>Pranje tepiha</span>
                <span className="text-brand-300 font-bold">✦</span>
              </span>
              <span className="flex items-center gap-2">
                <span>Poliranje vozila</span>
                <span className="text-brand-300 font-bold">✦</span>
              </span>
              <span className="flex items-center gap-2">
                <span>Čišćenje dušeka</span>
                <span className="text-brand-300 font-bold">✦</span>
              </span>
              <span className="flex items-center gap-2">
                <span>Uklanjanje fleka</span>
                <span className="text-brand-300 font-bold">✦</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
      />

      {/* Accessible Interactive Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        items={preselectedItems}
        totalPrice={preselectedTotalPrice}
      />

    </div>
  );
}
