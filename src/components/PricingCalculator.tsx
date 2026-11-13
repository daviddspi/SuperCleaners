import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Info, Minus, Plus, ShoppingBag, X, ChevronUp } from 'lucide-react';
import { PRICING_ITEMS } from '../config';
import Reveal from './Reveal';

interface PricingCalculatorProps {
  onOpenBookingWithPrefs: (prefs: {
    items: Record<string, number>;
    totalPrice: number;
  }) => void;
}

export default function PricingCalculator({ onOpenBookingWithPrefs }: PricingCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'namestaj' | 'tepisi' | 'automobili'>('namestaj');
  const [items, setItems] = useState<Record<string, number>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

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
        total += itemDef.price * Number(qty);
      }
    });
    return total;
  };

  const estimatedTotal = calculateEstimate();
  const itemCount = (Object.values(items) as number[]).reduce((sum, qty) => sum + qty, 0);

  const handleProceed = () => {
    onOpenBookingWithPrefs({
      items,
      totalPrice: estimatedTotal
    });
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  const renderCategoryItems = (category: string) => {
    const categoryItems = PRICING_ITEMS.filter(item => item.category === category);
    
    return (
      <div className="space-y-3">
        {categoryItems.map(item => {
          const qty = items[item.id] || 0;
          
          return (
            <div 
              key={item.id} 
              className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-colors duration-150 border ${
                qty > 0 
                  ? 'bg-brand-50/80 border-brand-200 shadow-xs' 
                  : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100/70'
              }`}
            >
              <div className="min-w-0 pr-2">
                <h4 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">{item.name}</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {item.priceType === 'starting' && 'Od '}
                  <span className="font-bold text-slate-800">{item.price} RSD</span>
                  {item.priceType === 'per_m2' && ' / m²'}
                  {item.priceType === 'per_seat' && ' / sedno mesto'}
                  {item.description && ` • ${item.description}`}
                </p>
              </div>
              
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleUpdateItem(item.id, -1)}
                  aria-label={`Smanji: ${item.name}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white hover:bg-brand-50 rounded-full text-slate-700 transition active:scale-95 border border-slate-200 shadow-xs cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 sm:w-7 text-center font-bold text-slate-900 text-sm sm:text-base tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => handleUpdateItem(item.id, 1)}
                  aria-label={`Dodaj: ${item.name}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-brand-500 hover:bg-brand-610 rounded-full text-white transition active:scale-95 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCartContent = () => (
    <>
      <div className="p-3.5 sm:p-4 bg-white/10 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-brand-200 mt-0.5 shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-white">Besplatno preuzimanje</h4>
          <p className="text-xs sm:text-sm text-brand-100 mt-0.5 leading-relaxed">
            Preuzimanje i vraćanje tepiha je besplatno za kvadrature veće od 5m².
          </p>
        </div>
      </div>

      <div className="pt-3 space-y-3 text-sm text-brand-100">
        <h4 className="font-display font-medium text-white mb-2 text-lg">Vaša korpa</h4>
        
        {Object.keys(items).length === 0 ? (
          <p className="text-brand-200/80 italic text-sm">Niste izabrali nijednu uslugu.</p>
        ) : (
          <div className="space-y-1.5 max-h-[220px] sm:max-h-[260px] overflow-y-auto pr-2 custom-scrollbar divide-y divide-white/10">
            {Object.entries(items).map(([id, qty]) => {
              const itemDef = PRICING_ITEMS.find(i => i.id === id);
              if (!itemDef) return null;
              return (
                <div key={id} className="flex justify-between items-center gap-3 text-xs sm:text-sm pt-2 pb-1">
                  <span className="text-brand-50">{qty}x {itemDef.name}</span>
                  <span className="font-bold text-white tabular-nums whitespace-nowrap">{itemDef.price * Number(qty)} RSD</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );

  const renderCartFooter = () => (
    <div className="pt-5 border-t border-white/15 space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-xs sm:text-sm text-brand-100 block">Ukupno (RSD)</span>
          <span className="text-[11px] text-brand-200">Okvirna procena</span>
        </div>
        <span className="text-3xl sm:text-4xl font-display font-light text-white tracking-tight tabular-nums">
          {estimatedTotal.toLocaleString('sr-RS')}
        </span>
      </div>

      <button
        id="estimator-proceed-btn"
        onClick={handleProceed}
        disabled={Object.keys(items).length === 0}
        className="btn btn-light w-full !py-3.5 text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
      >
        <span>Zakaži pranje</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <>
      <section id="estimator-section" className="section-y bg-brand-50">
        <div className="frame">
          
          <Reveal className="max-w-2xl mb-8 sm:mb-12 text-center sm:text-left mx-auto sm:mx-0">
            <h2 className="h-section">
              Zakažite Uslugu <span className="accent">Online</span>
            </h2>
            <p className="lead mt-3 sm:mt-4 mx-auto sm:mx-0">
              Dodajte komade nameštaja ili tepiha i pošaljite upit u nekoliko sekundi.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xs text-left space-y-5 pb-24 lg:pb-8">
              
              <div role="tablist" aria-label="Kategorije" className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 justify-center sm:justify-start">
                {([
                  ['namestaj', 'Nameštaj'],
                  ['tepisi', 'Tepisi i podovi'],
                  ['automobili', 'Automobili']
                ] as const).map(([id, label]) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={activeTab === id}
                    onClick={() => setActiveTab(id)}
                    className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                      activeTab === id ? 'bg-brand-500 text-white shadow-xs' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="min-h-[340px]">
                {renderCategoryItems(activeTab)}
              </div>

            </div>

            {/* Right Desktop Cart Column */}
            <div className="hidden lg:flex lg:col-span-5 h-fit lg:sticky lg:top-28 bg-brand-800 text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl flex-col justify-between text-left shadow-lg">
              <div className="space-y-4">
                {renderCartContent()}
              </div>

              <div className="mt-5">
                {renderCartFooter()}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Mobile Floating Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ease-out ${
          itemCount > 0
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-3 bg-gradient-to-t from-white via-white/90 to-transparent">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-full bg-brand-800 text-white rounded-2xl p-4 flex items-center justify-between shadow-xl border border-brand-700 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-brand-200" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-widest text-brand-300 block leading-none">Vaša korpa</span>
                <span className="text-xs text-brand-100 font-medium">
                  {itemCount} {itemCount === 1 ? 'stavka' : itemCount < 5 ? 'stavke' : 'stavki'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <span className="text-lg font-black text-white tracking-tight">
                  {estimatedTotal.toLocaleString('sr-RS')}
                </span>
                <span className="text-[10px] text-brand-300 block leading-none">RSD</span>
              </div>
              <ChevronUp className="w-5 h-5 text-brand-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Sheet Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <div
        ref={drawerRef}
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-brand-800 text-white rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
          <div className="pt-3 pb-2 px-6 flex items-center justify-between shrink-0">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto" />
          </div>

          <div className="px-5 pb-3 flex items-center justify-between shrink-0 border-b border-white/10">
            <h3 className="font-display text-lg font-semibold text-white">Vaša korpa</h3>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {renderCartContent()}
          </div>

          <div className="p-5 pt-3 shrink-0 bg-brand-850">
            {renderCartFooter()}
          </div>
        </div>
      </div>
    </>
  );
}
