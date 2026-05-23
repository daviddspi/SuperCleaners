import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star } from 'lucide-react';
import { GENERATED_IMAGES } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onOpenBooking, onExploreServices }: HeroProps) {
  return (
    <section 
      id="hero-section"
      className="relative pt-24 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-radial from-brand-50/60 via-transparent to-transparent"
    >
      {/* Absolute decorative blurred blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-100/45 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Persuasive Trust Information (5 cols) */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
              <span>Sparkling Clean • Guaranteed</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-slate-900 tracking-tight leading-[1.12]">
                Coming home to a clean space <br />
                should feel like <span className="italic font-serif text-brand-500">a deep breath.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed font-normal">
                Premium residential cleaning services tailored to your schedule. We handle the dust so you can focus on what truly matters.
              </p>
            </motion.div>

            {/* Micro-incentive list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-500" /> Fully Insured & Vetted
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400 fill-red-400" /> 100% Satisfaction Guarantee
              </span>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                id="hero-book-now-btn"
                onClick={onOpenBooking}
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-610 text-white font-medium transition shadow-xl shadow-brand-500/10 active:scale-98 cursor-pointer text-sm"
              >
                <span>Book Premium Clean</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                id="hero-explore-btn"
                onClick={onExploreServices}
                className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium transition text-sm cursor-pointer border border-slate-200"
              >
                View Services
              </button>
            </motion.div>

          </div>

          {/* Right: Beautiful Layered Hero Glassmorphism Setting (6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative w-full max-w-lg aspect-square"
            >
              
              {/* Main Pristine Living Room Frame */}
              <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-white shadow-2xl relative">
                <img 
                  src={GENERATED_IMAGES.immaculateLiving}
                  alt="Spotless Luxury Home Exterior Sunlit" 
                  className="w-full h-full object-cover select-none scale-102 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle soft gradient fade internally */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Specialist Card (Savannah Nguyen) with glassmorphism */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-3 sm:top-6 -right-5 sm:-right-8 p-4 rounded-2xl shadow-xl glass border border-white/50 flex items-center gap-3.5 max-w-[280px]"
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-500">
                    <img 
                      src={GENERATED_IMAGES.heroCleaner}
                      alt="Savannah Nguyen Headshot" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                
                <div className="text-left">
                  <span className="block font-black text-slate-900 text-xs sm:text-sm">
                    Savannah Nguyen
                  </span>
                  <span className="text-[10px] text-brand-600 block font-bold leading-normal">
                    5★ Elite Cleaning Crew
                  </span>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* High-quality confidence helper overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-5 left-6 right-6 p-4 rounded-2xl shadow-xl glass border border-white/40 flex items-center justify-between text-left"
              >
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Instant Relief guaranteed
                  </span>
                  <span className="block text-xs sm:text-sm font-black text-slate-800 uppercase mt-0.5">
                    Premium Domestic Care
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-brand-500 rounded-xl text-white font-black text-xs">
                  99% Rating
                </div>
              </motion.div>

              {/* Tiny decorative sparkles floating around */}
              <Sparkles className="absolute -left-6 bottom-1/4 w-7 h-7 text-brand-500/60 animate-bounce" />
              <div className="absolute -right-3 top-1/2 w-4 h-4 bg-sky-300 rounded-full opacity-60 animate-pulse" />

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
