import { useState } from 'react';
import { ArrowRight, Info, Minus, Plus } from 'lucide-react';
import { PRICING_ITEMS } from '../config';

interface PricingCalculatorProps {
  onOpenBookingWithPrefs: (prefs: {
    items: Record<string, number>;
    totalPrice: number;
  }) => void;
}

export default function PricingCalculator({ onOpenBookingWithPrefs }: PricingCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'namestaj' | 'tepisi' | 'automobili'>('namestaj');
  const [items, setItems] = useState<Record<string, number>>({});

  const handleUpdateItem = (id: string, amount: number) => {
    setItems(prev => {
      const newItems = { ...prev };
      const current = newItems[id] || 0;
      const next = Math.max(0, current + amount);
      if (next === 0) {
        delete newItems[id];
      } else {
        newItems[id] = next;
      }
      return newItems;
    });
  };

  const calculateEstimate = () => {
    let total = 0;
    Object.entries(items).forEach(([id, qty]) => {
      const itemDef = PRICING_ITEMS.find(i => i.id === id);
      if (itemDef) {
        total += itemDef.price * qty;
      }
    });
    return total;
  };

  const estimatedTotal = calculateEstimate();

  const handleProceed = () => {
    onOpenBookingWithPrefs({
      items,
      totalPrice: estimatedTotal
    });
  };

  const renderCategoryItems = (category: string) => {
    const categoryItems = PRICING_ITEMS.filter(item => item.category === category);
    
    return (
      <div className="space-y-4">
        {categoryItems.map(item => {
          const qty = items[item.id] || 0;
          
          return (
            <div key={item.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-brand-500 transition-colors">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.priceType === 'starting' && 'Od '}
                  {item.price} RSD
                  {item.priceType === 'per_m2' && ' / m²'}
                  {item.priceType === 'per_seat' && ' / sedno mesto'}
                  {item.description && ` (${item.description})`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpdateItem(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-slate-800">{qty}</span>
                <button
                  onClick={() => handleUpdateItem(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="estimator-section" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
            Transparentne cene
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
            Interaktivni <span className="italic font-serif text-brand-500">Kalkulator Cene</span>
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            Dodajte stavke ispod i odmah pogledajte procenjenu cenu vašeg čišćenja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-100/80 shadow-sm text-left space-y-8 flex flex-col justify-between">
            
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setActiveTab('namestaj')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'namestaj' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Nameštaj
              </button>
              <button 
                onClick={() => setActiveTab('tepisi')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'tepisi' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Tepisi i podovi
              </button>
              <button 
                onClick={() => setActiveTab('automobili')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'automobili' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Automobili
              </button>
            </div>

            <div className="min-h-[400px]">
              {renderCategoryItems(activeTab)}
            </div>

          </div>

          <div className="lg:col-span-5 relative bg-brand-800 text-white p-8 rounded-2xl overflow-hidden flex flex-col justify-between text-left shadow-xl shadow-brand-800/10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-start gap-3">
                <Info className="w-5 h-5 text-brand-200 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-brand-100">Besplatno preuzimanje</h4>
                  <p className="text-[11px] text-brand-200">
                    Preuzimanje i vraćanje tepiha je besplatno za kvadrature veće od 5m².
                  </p>
                </div>
              </div>

              <div className="border-t border-brand-700 pt-6 space-y-3 text-xs text-brand-200/90">
                <h4 className="font-bold text-brand-100 mb-4 uppercase tracking-wider text-[10px]">Vaša korpa</h4>
                
                {Object.keys(items).length === 0 ? (
                  <p className="text-white/50 italic">Niste izabrali nijednu uslugu.</p>
                ) : (
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.entries(items).map(([id, qty]) => {
                      const itemDef = PRICING_ITEMS.find(i => i.id === id);
                      if (!itemDef) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-sm border-b border-brand-700/50 pb-2">
                          <span>{qty}x {itemDef.name}</span>
                          <span className="font-bold text-white">{itemDef.price * qty} RSD</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-700 space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-brand-200 uppercase tracking-wider block">
                    Ukupno (RSD)
                  </span>
                  <span className="text-[10px] opacity-60">Okvirna cena</span>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-white tracking-tight">
                    {estimatedTotal.toLocaleString('sr-RS')}
                  </span>
                </div>
              </div>

              <button
                id="estimator-proceed-btn"
                onClick={handleProceed}
                disabled={Object.keys(items).length === 0}
                className="w-full py-4 bg-white text-brand-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-[0.98] font-semibold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Zakaži pranje</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
