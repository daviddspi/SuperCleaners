import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import Reveal from './Reveal';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % count), 7000);
    return () => clearInterval(timer);
  }, [auto, count]);

  const go = (index: number) => {
    setAuto(false);
    setCurrentIndex((index + count) % count);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        go(currentIndex + 1);
      } else {
        // Swiped right -> prev
        go(currentIndex - 1);
      }
    }
    touchStartX.current = null;
  };

  const review = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews-section" className="section-y bg-white">
      <div className="frame">
        {/* Section Header - Centered on mobile, split on desktop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-center md:items-end gap-6 sm:gap-8 mb-10 sm:mb-14 text-center md:text-left">
          <Reveal className="max-w-2xl">
            <h2 className="h-section">
              Šta kažu naši <span className="accent">Klijenti</span>
            </h2>
            <p className="lead mt-3 sm:mt-4 mx-auto md:mx-0">
              Pravi utisci vlasnika domova, menadžera nekretnina i stanara iz celog regiona.
            </p>
          </Reveal>

          {/* Desktop Arrow Controls */}
          <Reveal delay={0.1} className="hidden md:flex gap-2.5 sm:gap-3">
            <button
              onClick={() => go(currentIndex - 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-500 hover:text-white transition-colors active:scale-95 cursor-pointer"
              aria-label="Prethodna recenzija"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(currentIndex + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-610 transition-colors active:scale-95 shadow-xs cursor-pointer"
              aria-label="Sledeća recenzija"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </Reveal>
        </div>

        {/* ── Mobile View: Premium Centered Touch-Swipe Carousel ── */}
        <div 
          className="md:hidden flex flex-col items-center text-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full bg-brand-50/70 border border-brand-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[22rem] shadow-xs relative overflow-hidden">
            <Quote className="w-12 h-12 text-brand-200/50 absolute top-4 right-4 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center text-center justify-between h-full space-y-6 w-full"
              >
                {/* Centered Stars */}
                <div className="flex justify-center gap-1.5 text-amber-400 pt-2" aria-label="5 od 5 zvezdica">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Centered Quote */}
                <blockquote className="font-display font-light text-slate-900 tracking-tight leading-snug text-lg sm:text-xl">
                  „{review.text}“
                </blockquote>

                {/* Centered Author */}
                <div className="flex flex-col items-center text-center pt-3 border-t border-brand-100/80 w-full">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-300 shadow-xs mb-2"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-bold text-slate-900 text-base">{review.name}</span>
                  <span className="text-xs text-slate-600 mt-0.5">{review.location}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centered Mobile Carousel Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => go(currentIndex - 1)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-500 hover:text-white transition-colors active:scale-95 cursor-pointer border border-brand-100"
              aria-label="Prethodna recenzija"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => go(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-brand-500' : 'w-2 bg-slate-200'
                  }`}
                  aria-label={`Idi na recenziju ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(currentIndex + 1)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-610 transition-colors active:scale-95 shadow-xs cursor-pointer"
              aria-label="Sledeća recenzija"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Desktop View (md and up) ── */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Featured review card */}
          <Reveal className="md:col-span-7 lg:col-span-8 flex flex-col">
            <div className="bg-brand-50/70 border border-brand-100 rounded-3xl p-8 lg:p-10 flex flex-col justify-between text-left h-full min-h-[20rem] lg:min-h-[22rem]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={review.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col justify-between gap-6 h-full"
                >
                  <div className="space-y-4">
                    <div className="flex gap-1 text-amber-400" aria-label="5 od 5 zvezdica">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="font-display font-light text-slate-900 tracking-tight leading-snug text-xl lg:text-3xl">
                      „{review.text}“
                    </blockquote>
                  </div>

                  <figcaption className="flex items-center gap-4 pt-4 border-t border-brand-100">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      width={52}
                      height={52}
                      loading="lazy"
                      decoding="async"
                      className="w-13 h-13 rounded-full object-cover ring-2 ring-brand-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="block font-semibold text-slate-900 text-base">{review.name}</span>
                      <span className="block text-sm text-slate-600 mt-0.5">{review.location}</span>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Reviewer selector list */}
          <Reveal delay={0.1} className="md:col-span-5 lg:col-span-4 flex flex-col">
            <ul className="flex flex-col gap-3 h-full">
              {TESTIMONIALS.map((t, idx) => (
                <li key={t.id} className="flex-1">
                  <button
                    onClick={() => go(idx)}
                    aria-current={currentIndex === idx}
                    className={`w-full h-full flex items-center gap-3.5 text-left rounded-2xl p-3.5 transition-all duration-150 cursor-pointer ${
                      currentIndex === idx 
                        ? 'bg-brand-500 text-white shadow-xs' 
                        : 'bg-slate-50 hover:bg-brand-50/60 text-slate-900 border border-slate-100'
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt=""
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-white/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <span className="block font-semibold text-sm leading-tight truncate">{t.name}</span>
                      <span className={`block text-xs mt-0.5 truncate ${currentIndex === idx ? 'text-brand-100' : 'text-slate-500'}`}>
                        {t.location}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
