import { useState } from 'react';
import { Calculator, Check, Sparkles, Building, Play, ArrowRight, Star, Tag } from 'lucide-react';
import { SERVICES, ADDONS } from '../data';

interface PricingCalculatorProps {
  onOpenBookingWithPrefs: (prefs: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    frequency: 'one-time' | 'weekly' | 'biweekly' | 'monthly';
    addons: string[];
  }) => void;
}

export default function PricingCalculator({ onOpenBookingWithPrefs }: PricingCalculatorProps) {
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [squareFeet, setSquareFeet] = useState(1200);
  const [frequency, setFrequency] = useState<'one-time' | 'weekly' | 'biweekly' | 'monthly'>('one-time');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const activeService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const calculateEstimate = () => {
    let price = activeService.basePrice;

    // Add bedroom adjustment
    if (activeService.id === 'end-of-tenancy') {
      price += (bedrooms - 1) * activeService.pricePerUnit;
    } else {
      price += (bedrooms - 2 > 0 ? (bedrooms - 2) * activeService.pricePerUnit : 0);
      price += (bathrooms - 1 > 0 ? (bathrooms - 1) * activeService.pricePerUnit : 0);
    }

    // Square feet adjustment
    if (squareFeet > 1500) {
      price += Math.floor((squareFeet - 1500) / 100) * 4;
    }

    // Addons cost
    const addonsCost = selectedAddons.reduce((acc, addonId) => {
      const item = ADDONS.find(a => a.id === addonId);
      return acc + (item ? item.price : 0);
    }, 0);
    price += addonsCost;

    // Apply frequency discounts
    if (frequency === 'weekly') price *= 0.82; // 18% off
    else if (frequency === 'biweekly') price *= 0.88; // 12% off
    else if (frequency === 'monthly') price *= 0.93; // 7% off

    return Math.round(price);
  };

  const handleAddonToggle = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const estimatedTotal = calculateEstimate();

  const handleProceed = () => {
    onOpenBookingWithPrefs({
      serviceId,
      bedrooms,
      bathrooms,
      squareFeet,
      frequency,
      addons: selectedAddons
    });
  };

  return (
    <section id="estimator-section" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
            Transparentne cene
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
            Interaktivni <span className="italic font-serif text-brand-500">Kalkulator Cene</span>
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            Bez skrivenih troškova. Prilagodite specifikacije ispod i dobijte garantovanu cenu u sekundi.
          </p>
        </div>

        {/* Form and display grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Block: The sliders (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-100/80 shadow-sm text-left space-y-8 flex flex-col justify-between">
            
            {/* Service Toggle row */}
            <div className="space-y-3.5">
              <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
                1. Izaberite osnovni program čišćenja
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES.map((serv) => (
                  <button
                    key={serv.id}
                    onClick={() => setServiceId(serv.id)}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold transition-all border text-left cursor-pointer ${
                      serviceId === serv.id
                        ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                        : 'bg-slate-50 border-slate-150 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block truncate font-bold text-xs sm:text-sm">{serv.name}</span>
                    <span className={`block text-[10px] font-medium leading-none mt-1 ${
                      serviceId === serv.id ? 'text-brand-100' : 'text-slate-400'
                    }`}>
                      Pros. Cena {serv.basePrice}€
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scale dials inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Spavaće sobe</span>
                  <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    {bedrooms}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBedrooms(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl text-lg font-bold text-slate-650"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-800 text-sm">{bedrooms}</span>
                  <button
                    onClick={() => setBedrooms(prev => Math.min(6, prev + 1))}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl text-lg font-bold text-slate-650"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kupatila</span>
                  <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    {bathrooms}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBathrooms(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl text-lg font-bold text-slate-650"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-800 text-sm">{bathrooms}</span>
                  <button
                    onClick={() => setBathrooms(prev => Math.min(4, prev + 1))}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl text-lg font-bold text-slate-650"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Slider Square footage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Približna veličina</span>
                <span className="text-xs font-bold text-brand-500 bg-brand-50 px-2.5 py-1 rounded">
                  {squareFeet} kvadrata
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="4000"
                step="50"
                value={squareFeet}
                onChange={(e) => setSquareFeet(parseInt(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                <span>Stan (400)</span>
                <span>Kuća (1500)</span>
                <span>Vila (4000)</span>
              </div>
            </div>

            {/* Upgrades selecting row */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                2. Dodatni detalji (Opciono)
              </span>
              <div className="flex flex-wrap gap-2">
                {ADDONS.map(addon => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700 border-brand-500'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 font-normal'
                      }`}
                    >
                      <span>{addon.name.replace(' Cleaning', '')}</span>
                      <span className="text-[10px] opacity-75">+{addon.price}€</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Block: Instant quote review (5 cols) */}
          <div className="lg:col-span-5 relative bg-brand-800 text-white p-8 rounded-2xl overflow-hidden flex flex-col justify-between text-left shadow-xl shadow-brand-800/10">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-start gap-3">
                <Tag className="w-5 h-5 text-brand-200 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-brand-100">Popust za učestalost je aktivan!</h4>
                  <p className="text-[11px] text-brand-200">
                    Pređite na redovno održavanje i uštedite do 18%.
                  </p>
                </div>
              </div>

              {/* Frequency selection */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-brand-200 uppercase tracking-wider block">
                  Program učestalosti
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'one-time', title: 'Jednokratno', desc: 'Bez ugovora' },
                    { id: 'weekly', title: 'Nedeljno', desc: 'Ušteda 18%' },
                    { id: 'biweekly', title: 'Dvonedeljno', desc: 'Ušteda 12%' },
                    { id: 'monthly', title: 'Mesečno', desc: 'Ušteda 7%' }
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setFrequency(freq.id as any)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        frequency === freq.id
                          ? 'bg-white text-slate-900 border-white'
                          : 'bg-brand-700/60 text-brand-100 border-white/10 hover:bg-brand-700'
                      }`}
                    >
                      <span className="block font-black text-xs leading-none">{freq.title}</span>
                      <span className="text-[9px] opacity-75 mt-0.5 block">{freq.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Breakdown summary */}
              <div className="border-t border-brand-700 pt-6 space-y-3 text-xs text-brand-200/90">
                <div className="flex justify-between items-center">
                  <span>Izabrani program:</span>
                  <span className="font-bold text-white">{activeService.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Spavaće sobe ({bedrooms}) i Kupatila ({bathrooms}):</span>
                  <span className="font-bold text-white">Uključeno</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Dodaci:</span>
                    <span className="font-bold text-white">
                      +{selectedAddons.reduce((acc, aId) => acc + (ADDONS.find(a => a.id === aId)?.price || 0), 0)}€
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Učestalost usluge:</span>
                  <span className="font-bold text-white capitalize">{frequency}</span>
                </div>
              </div>
            </div>

            {/* Total display & submit button */}
            <div className="mt-8 pt-6 border-t border-brand-700 space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-brand-200 uppercase tracking-wider block">
                    Procenjena cena
                  </span>
                  <span className="text-[10px] opacity-60">Uključuje porez i osiguranje</span>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-white tracking-tight">
                    {estimatedTotal}€
                  </span>
                  {frequency !== 'one-time' && (
                    <span className="text-[9px] text-brand-200 block mt-0.5">Popust uračunat</span>
                  )}
                </div>
              </div>

              <button
                id="estimator-proceed-btn"
                onClick={handleProceed}
                className="w-full py-4 bg-white text-brand-800 hover:bg-slate-50 active:scale-[0.98] font-semibold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Zakaži odmah</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
