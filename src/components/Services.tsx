import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'Glavno' | 'Dodatno'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  const filteredServices = SERVICES.filter(service => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  return (
    <section id="services-section" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl text-left">
            <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block mb-2">
              Naše usluge
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
              Profesionalno <span className="italic font-serif text-brand-500">Dubinsko pranje</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 font-normal">
              Izaberite neku od naših usluga kako biste održali besprekornu čistoću vašeg nameštaja, tepiha i vozila.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Sve usluge' },
              { id: 'Glavno', label: 'Glavne usluge' },
              { id: 'Dodatno', label: 'Dodatne usluge' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedServiceDetail(null);
                }}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/10'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <motion.div
              layout
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wide rounded-full text-slate-800 border border-slate-100/50 shadow-xs">
                    {service.category}
                  </span>
                </div>

                <div className="p-6 space-y-3.5 text-left">
                  <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                    {service.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-100 mt-auto">
                <button
                  type="button"
                  onClick={() => setSelectedServiceDetail(service)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Prikaži cene</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(service.id)}
                  className="inline-flex items-center gap-1 px-4 py-2 hover:bg-brand-500 hover:text-white bg-brand-50 text-brand-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Zakaži</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedServiceDetail && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setSelectedServiceDetail(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl p-6 text-left relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {selectedServiceDetail.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {selectedServiceDetail.name} Detalji
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedServiceDetail(null)}
                    className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-150">
                    <img 
                      src={selectedServiceDetail.image}
                      alt={selectedServiceDetail.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {selectedServiceDetail.longDescription}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-3">Cenovnik</h4>
                    <div className="space-y-2">
                      {selectedServiceDetail.items?.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="font-semibold text-slate-700">{item.name} {item.description && <span className="font-normal text-slate-500 text-[10px]">({item.description})</span>}</span>
                          <span className="font-bold text-brand-600">
                            {item.priceType === 'starting' && 'od '}
                            {item.price} RSD
                            {item.priceType === 'per_m2' && '/m²'}
                            {item.priceType === 'per_seat' && '/mesto'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceDetail(null)}
                    className="py-3 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition text-xs text-center cursor-pointer"
                  >
                    Zatvori
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedServiceDetail.id;
                      setSelectedServiceDetail(null);
                      onOpenBooking(id);
                    }}
                    className="py-3 rounded-full bg-brand-500 text-white font-heavy hover:bg-brand-610 transition shadow-md text-xs text-center cursor-pointer"
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
