import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';

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
import Reveal from './components/Reveal';
import { GENERATED_IMAGES } from './data';
import { config } from './config';

const MARQUEE_ITEMS = [
  'Pranje nameštaja',
  'Dubinsko pranje automobila',
  'Pranje tepiha',
  'Poliranje vozila',
  'Čišćenje dušeka',
  'Uklanjanje fleka'
];

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedItems, setPreselectedItems] = useState<Record<string, number>>({});
  const [preselectedTotalPrice, setPreselectedTotalPrice] = useState<number>(0);

  const handleOpenBooking = (_serviceId?: string) => {
    handleScrollToSection('#estimator-section');
  };

  const handleOpenBookingWithPrefs = (prefs: { items: Record<string, number>; totalPrice: number }) => {
    setPreselectedItems(prefs.items);
    setPreselectedTotalPrice(prefs.totalPrice);
    setIsBookingOpen(true);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen font-sans antialiased text-slate-800 bg-white selection:bg-brand-100 selection:text-brand-900">
        <Navbar onOpenBooking={handleOpenBooking} />

        <main>
          <Hero onOpenBooking={() => handleOpenBooking()} onExploreServices={() => handleScrollToSection('#services-section')} />

          <Services onOpenBooking={handleOpenBooking} />

          {/* About Section */}
          <section id="about-section" className="section-y bg-brand-50">
            <div className="frame">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
                
                {/* Left picture */}
                <Reveal className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[500px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                      alt="Vesela čistačica glanca moderan orman"
                      width={600}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-auto bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-3.5 pr-5 flex items-center gap-3 shadow-md border border-slate-100">
                      <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </span>
                      <div className="text-left">
                        <span className="block font-bold text-slate-900 text-xs sm:text-sm leading-tight">Provereni stručnjaci</span>
                        <span className="block text-xs text-slate-600 mt-0.5">100% obezbeđeno poslovanje</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Right details */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start order-1 lg:order-2 text-center lg:text-left">
                  <Reveal className="w-full flex flex-col items-center lg:items-start">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-700 bg-brand-100/70 px-3.5 py-1.5 rounded-full mb-3 sm:mb-4">
                      <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                      <span>Premium Dubinsko Pranje</span>
                    </div>
                    <h2 className="h-section">
                      {config.brand.aboutTitleLine1} <span className="accent">{config.brand.name}</span> <br className="hidden sm:inline" />
                      {config.brand.aboutTitleLine2}
                    </h2>
                    <p className="lead mt-3 sm:mt-5 mx-auto lg:mx-0">{config.brand.aboutDescription}</p>
                  </Reveal>

                  <Reveal delay={0.1} className="w-full flex flex-col items-center lg:items-start">
                    <ul className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-3.5 text-sm sm:text-base text-slate-800 font-medium max-w-md sm:max-w-none">
                      {config.features.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 sm:gap-3 text-left">
                          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[3]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      id="about-view-services-btn"
                      onClick={() => handleScrollToSection('#services-section')}
                      className="btn btn-primary mt-8 sm:mt-10 w-full sm:w-auto !py-3.5 sm:!py-4 text-sm sm:text-base shadow-xs cursor-pointer mx-auto lg:mx-0"
                    >
                      Naše Usluge
                    </button>
                  </Reveal>
                </div>

              </div>
            </div>
          </section>

          <WhyChoose />

          <OurWork />

          <PricingCalculator onOpenBookingWithPrefs={handleOpenBookingWithPrefs} />

          <Testimonials />

          <Stats onOpenBooking={() => handleOpenBooking()} />

          {/* Convenience Section */}
          <section className="section-y bg-white">
            <div className="frame">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
                
                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start order-2 lg:order-1 text-center lg:text-left">
                  <Reveal className="w-full flex flex-col items-center lg:items-start">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-700 bg-brand-100/70 px-3.5 py-1.5 rounded-full mb-3 sm:mb-4">
                      <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                      <span>Izuzetna Pogodnost</span>
                    </div>
                    <h2 className="h-section">
                      {config.brand.convenienceTitleLine1}{' '}
                      <span className="accent">{config.brand.convenienceTitleHighlight}</span> <br className="hidden sm:inline" />
                      {config.brand.convenienceTitleLine2}
                    </h2>
                    <div className="mt-3 sm:mt-5 space-y-3 lead mx-auto lg:mx-0">
                      <p>{config.brand.convenienceDescription1}</p>
                      <p>{config.brand.convenienceDescription2}</p>
                    </div>
                    <button
                      id="convenience-view-services-btn"
                      onClick={() => handleScrollToSection('#services-section')}
                      className="btn btn-primary mt-8 sm:mt-10 w-full sm:w-auto !py-3.5 sm:!py-4 text-sm sm:text-base shadow-xs cursor-pointer mx-auto lg:mx-0"
                    >
                      Naše Usluge
                    </button>
                  </Reveal>
                </div>

                {/* Right Image */}
                <Reveal className="lg:col-span-5 order-1 lg:order-2 w-full flex justify-center">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[500px] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-brand-50 shadow-md">
                    <img
                      src={GENERATED_IMAGES.maleCleaner}
                      alt="Nasmejani čistač David sa opremom"
                      width={600}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-3.5 pr-5 flex items-center gap-3 shadow-md border border-slate-100">
                      <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                      </span>
                      <div className="text-left">
                        <span className="block font-bold text-slate-900 text-xs sm:text-sm leading-tight">Sertifikovan kvalitet</span>
                        <span className="block text-[11px] sm:text-xs text-slate-600 mt-0.5">Odobreni SGS proizvodi</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

              </div>
            </div>
          </section>

          <FAQ />

          <Contact />
        </main>

        {/* Services strip marquee */}
        <aside aria-label="Istaknute usluge" className="relative w-full bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 border-y border-brand-500/20 py-4 sm:py-5 overflow-hidden select-none group shadow-inner">
          {/* Edge fade gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-brand-900 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-brand-900 to-transparent z-10" />

          <div className="animate-marquee whitespace-nowrap font-display text-sm sm:text-base md:text-lg font-medium tracking-wide">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0 items-center">
                {MARQUEE_ITEMS.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 backdrop-blur-xs text-white transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 fill-current drop-shadow-[0_0_8px_rgba(103,232,249,0.7)] shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
                    </svg>
                    <span className="font-display font-medium text-xs sm:text-sm md:text-base text-slate-100 tracking-wide">
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <Footer onOpenBooking={() => handleOpenBooking()} />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          items={preselectedItems}
          totalPrice={preselectedTotalPrice}
        />
      </div>
    </MotionConfig>
  );
}
