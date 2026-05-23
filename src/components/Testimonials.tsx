import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews-section" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
            Poverenje klijenata
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
            Šta kažu naši <span className="italic font-serif text-brand-500">Klijenti</span>
          </h2>
          <p className="text-sm text-slate-500">
            Pravi utisci vlasnika domova, menadžera nekretnina i stanara iz celog regiona.
          </p>
        </div>

        {/* Desktop Presentation Grid (3 testimonials side-by-side) */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-brand-500/25 hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Star Ratings Row */}
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star key={num} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal min-h-[100px]">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details Row with Quote Mark */}
              <div className="flex items-center justify-between border-t border-slate-50 pt-5 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-150">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">
                      {review.location}
                    </span>
                  </div>
                </div>

                <span className="p-2.5 bg-brand-50 text-brand-500 rounded-xl">
                  <Quote className="w-4 h-4 scale-x-[-1]" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Friendly Slider Layout */}
        <div className="lg:hidden relative max-w-md mx-auto">
          <div className="p-8 rounded-2xl bg-white border border-slate-100 text-left flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star key={num} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                "{TESTIMONIALS[currentIndex].text}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-50 pt-5 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-150">
                  <img
                    src={TESTIMONIALS[currentIndex].avatar}
                    alt={TESTIMONIALS[currentIndex].name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-950">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">
                    {TESTIMONIALS[currentIndex].location}
                  </span>
                </div>
              </div>

              <span className="p-2 bg-brand-50 text-brand-500 rounded-xl">
                <Quote className="w-3.5 h-3.5 scale-x-[-1]" />
              </span>
            </div>
          </div>

          {/* Dots Indicator Line */}
          <div className="flex justify-center gap-1.5 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'bg-brand-500 w-5' : 'bg-slate-250'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slider Navigation Buttons */}
        <div className="flex justify-center gap-3.5 mt-8 lg:mt-12">
          <button
            onClick={prevSlide}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 active:scale-95 transition"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-610 active:scale-95 transition shadow-lg shadow-brand-500/10"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
