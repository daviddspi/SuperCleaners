import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';
import Reveal from './Reveal';

interface ServicesProps {
  onOpenBooking: (serviceId?: string) => void;
}

const TABS = [
  { id: 'all', label: 'Sve usluge' },
  { id: 'Glavno', label: 'Glavne usluge' },
  { id: 'Dodatno', label: 'Dodatne usluge' }
] as const;

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'Glavno' | 'Dodatno'>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  const filteredServices = SERVICES.filter((service) => activeTab === 'all' || service.category === activeTab);

  useEffect(() => {
    if (!selectedServiceDetail) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedServiceDetail(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedServiceDetail]);

  return (
    <section id="services-section" className="section-y bg-white">
      <div className="frame-wide">
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-center md:items-end gap-6 sm:gap-8 mb-10 sm:mb-14 text-center md:text-left">
          <Reveal className="max-w-2xl text-center md:text-left">
            <h2 className="h-section">
              Profesionalno <span className="accent">Dubinsko pranje</span>
            </h2>
            <p className="lead mt-3 sm:mt-4 mx-auto md:mx-0">
              Izaberite neku od naših usluga kako biste održali besprekornu čistoću vašeg nameštaja, tepiha i vozila.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div role="tablist" aria-label="Kategorije usluga" className="inline-flex flex-wrap gap-2 justify-center md:justify-start">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedServiceDetail(null);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.article
                layout
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-slate-50/60 hover:bg-slate-50 transition-colors p-3.5 sm:p-4 text-left border border-slate-100 shadow-xs"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedServiceDetail(service)}
                    className="relative block w-full aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 text-left cursor-pointer"
                    aria-label={`Prikaži cene: ${service.name}`}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      width={400}
                      height={250}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[11px] font-bold text-slate-800 shadow-xs">
                      {service.category}
                    </span>
                  </button>

                  <div className="pt-4 sm:pt-5 space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceDetail(service)}
                    className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-800 underline underline-offset-4 decoration-brand-200 hover:decoration-brand-500 transition-colors cursor-pointer"
                  >
                    Prikaži cene
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-brand-500 hover:bg-brand-610 transition-colors rounded-full px-4 py-2 sm:py-2.5 shadow-xs cursor-pointer"
                  >
                    <span>Zakaži</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Pricing Modal */}
        <AnimatePresence>
          {selectedServiceDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setSelectedServiceDetail(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedServiceDetail.name} cenovnik`}
            >
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 text-left max-h-[88vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[11px] font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
                      {selectedServiceDetail.category}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-2 leading-tight">
                      {selectedServiceDetail.name} Cenovnik
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedServiceDetail(null)}
                    className="p-2 -mr-1 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                    aria-label="Zatvori"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedServiceDetail.longDescription}</p>

                <div className="mt-5 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                  <h4 className="px-4 pt-4 pb-2 text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-500" />
                    Pojedinačne usluge i cene
                  </h4>
                  <ul className="p-2 divide-y divide-slate-100">
                    {selectedServiceDetail.items?.map((item) => (
                      <li key={item.id} className="flex justify-between items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white transition-colors">
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs sm:text-sm text-slate-900">{item.name}</span>
                          {item.description && <span className="text-[11px] text-slate-500 mt-0.5">{item.description}</span>}
                        </div>
                        <span className="font-bold text-brand-700 text-xs sm:text-sm whitespace-nowrap tabular-nums">
                          {item.priceType === 'starting' && 'od '}
                          {item.price.toLocaleString('sr-RS')} RSD
                          {item.priceType === 'per_m2' && ' / m²'}
                          {item.priceType === 'per_seat' && ' / mesto'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button type="button" onClick={() => setSelectedServiceDetail(null)} className="btn btn-soft text-xs sm:text-sm">
                    Zatvori
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedServiceDetail.id;
                      setSelectedServiceDetail(null);
                      onOpenBooking(id);
                    }}
                    className="btn btn-primary text-xs sm:text-sm"
                  >
                    Izračunaj cenu
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
