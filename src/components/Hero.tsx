import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Heart, Star } from 'lucide-react';
import { GENERATED_IMAGES } from '../data';
import { config } from '../config';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] as const }
});

export default function Hero({ onOpenBooking, onExploreServices }: HeroProps) {
  return (
    <section id="hero-section" className="relative bg-brand-50 pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24 overflow-hidden">
      <div className="frame-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Text Content - Centered on mobile, left-aligned on tablet/desktop */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center sm:items-start text-center sm:text-left">
            <motion.div
              {...rise(0)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-700 bg-brand-100/70 px-3.5 py-1.5 rounded-full mx-auto sm:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>{config.brand.taglineHighlight}</span>
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="mt-4 sm:mt-6 font-display font-light text-slate-900 tracking-[-0.03em] leading-[1.08] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-center sm:text-left"
            >
              {config.brand.heroTitleLine1} <br />
              {config.brand.heroTitleLine2} <br />
              <span className="accent">{config.brand.heroTitleHighlight}</span>
            </motion.h1>

            <motion.p {...rise(0.16)} className="lead mt-4 sm:mt-6 text-center sm:text-left mx-auto sm:mx-0">
              {config.brand.heroDescription}
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <button id="hero-book-now-btn" onClick={onOpenBooking} className="btn btn-primary group w-full sm:w-auto !py-3.5 sm:!py-4 text-sm sm:text-base shadow-sm cursor-pointer">
                <span>Zakažite čišćenje</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button id="hero-explore-btn" onClick={onExploreServices} className="btn btn-light w-full sm:w-auto !py-3.5 sm:!py-4 text-sm sm:text-base border border-slate-200 cursor-pointer">
                Pogledajte usluge
              </button>
            </motion.div>

            {/* Hidden on mobile, visible on sm and up as requested */}
            <motion.ul
              {...rise(0.32)}
              className="mt-8 sm:mt-10 hidden sm:flex sm:flex-row sm:flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-700 justify-center sm:justify-start"
            >
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" />
                <span>Potpuno osigurani i provereni</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 fill-red-400 shrink-0" />
                <span>100% garancija zadovoljstva</span>
              </li>
            </motion.ul>
          </div>

          {/* Right Visual Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-6 xl:col-span-5 relative w-full flex justify-center"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[540px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl shadow-brand-900/5">
              <picture>
                <source media="(max-width: 640px)" srcSet="/images/immaculate_living_mobile.webp" type="image/webp" />
                <source media="(min-width: 641px)" srcSet="/images/immaculate_living_desktop.webp" type="image/webp" />
                <img
                  src="/images/immaculate_living_mobile.webp"
                  alt="Besprekorno čist luksuzni dom obasjan suncem"
                  width={600}
                  height={540}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </picture>

              {/* Specialist Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 pr-4 flex items-center gap-3 shadow-md border border-slate-100"
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-brand-500/20">
                    <img
                      src={GENERATED_IMAGES.heroCleaner}
                      alt="Jovana Nikolić"
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-slate-900 text-xs sm:text-sm leading-tight">Jovana Nikolić</span>
                  <span className="block text-[10px] sm:text-xs text-brand-700 font-semibold mt-0.5">5★ Elitni tim</span>
                  <div className="flex gap-0.5 mt-0.5 sm:mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Guarantee Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-left shadow-md border border-slate-100"
              >
                <div>
                  <span className="block text-[10px] sm:text-xs font-semibold text-slate-500 leading-tight">Garantovan kvalitet</span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-tight">
                    Premium održavanje domaćinstva
                  </span>
                </div>
                <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-brand-500 rounded-lg sm:rounded-xl text-white font-bold text-xs whitespace-nowrap shadow-xs">
                  99% ocena
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
