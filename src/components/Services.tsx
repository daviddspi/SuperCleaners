import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Sparkles, ArrowRight, ShieldCheck, Check, Clock } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'specialist' | 'deep' | 'regular'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  const filteredServices = SERVICES.filter(service => {
    if (activeTab === 'all') return true;
    if (activeTab === 'specialist') return service.category === 'Specialist';
    if (activeTab === 'deep') return service.category === 'Deep Cleaning';
    if (activeTab === 'regular') return service.category === 'Regular' || service.category === 'Detailing';
    return true;
  });

  return (
    <section id="services-section" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl text-left">
            <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block mb-2">
              Our Expertise Areas
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
              Our Professional <span className="italic font-serif text-brand-500">Cleaning Programs</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 font-normal">
              Select any of our custom-tailored cleaning solutions to maintain pristine hygiene conditions. Fully equipped, prompt, and insured.
            </p>
          </div>

          {/* Filtering Categories Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'specialist', label: 'Specialist Care' },
              { id: 'deep', label: 'Deep Cleaning' },
              { id: 'regular', label: 'Maintenance Care' }
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

        {/* 6 Services Presentation Grid */}
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
                {/* Custom Aspect Ratio Image Box per attached layout */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wide rounded-full text-slate-800 border border-slate-100/50 shadow-xs">
                    {service.category}
                  </span>
                  
                  {/* Quick price helper bubble */}
                  <div className="absolute bottom-4 right-4 bg-brand-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                    from £{service.basePrice}
                  </div>
                </div>

                {/* Info and action board */}
                <div className="p-6 space-y-3.5 text-left">
                  <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                    {service.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Interaction Drawer footer line */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-100 mt-auto">
                <button
                  type="button"
                  onClick={() => setSelectedServiceDetail(service)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Know More</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(service.id)}
                  className="inline-flex items-center gap-1 px-4 py-2 hover:bg-brand-500 hover:text-white bg-brand-50 text-brand-600 rounded-lg text-xs font-bold transition-all"
                >
                  <span>Quick Book</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Detail Dialog Overlay (if user clicks "Know More") */}
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
                className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl p-6 text-left relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {selectedServiceDetail.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {selectedServiceDetail.name} Details
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

                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Base Cost</span>
                      <strong className="text-lg font-black text-slate-800">£{selectedServiceDetail.basePrice}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Est. Duration</span>
                      <strong className="text-lg font-black text-slate-800 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-brand-500 inline-block" />
                        {selectedServiceDetail.durationHours} hrs
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceDetail(null)}
                    className="py-3 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition text-xs text-center"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedServiceDetail.id;
                      setSelectedServiceDetail(null);
                      onOpenBooking(id);
                    }}
                    className="py-3 rounded-full bg-brand-500 text-white font-heavy hover:bg-brand-610 transition shadow-md text-xs text-center"
                  >
                    Book Now
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

// Simple internal icon to prevent missing imports
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
