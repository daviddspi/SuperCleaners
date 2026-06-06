import React, { useState, useRef } from 'react';
import { Sparkles, Eye, Check } from 'lucide-react';

interface WorkItem {
  id: string;
  title: string;
  category: 'namestaj' | 'tepisi' | 'automobili';
  beforeImage: string;
  afterImage: string;
  description: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: 'work-1',
    title: 'Dubinsko pranje ugaone garniture',
    category: 'namestaj',
    beforeImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
    description: 'Uklanjanje dugogodišnjih fleka od hrane i osvežavanje boje tkanine.'
  },
  {
    id: 'work-2',
    title: 'Dubinsko pranje tepiha',
    category: 'tepisi',
    beforeImage: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
    description: 'Ispravljanje vlakana i vađenje dubinske prljavštine iz gustog tepiha.'
  },
  {
    id: 'work-3',
    title: 'Dubinsko pranje auto sedišta',
    category: 'automobili',
    beforeImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    description: 'Detaljno čišćenje enterijera i uklanjanje neprijatnih mirisa.'
  },
  {
    id: 'work-4',
    title: 'Čišćenje dušeka sa dezinfekcijom',
    category: 'namestaj',
    beforeImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80',
    description: 'Uklanjanje grinja, alergena i žutih fleka sa obe strane dušeka.'
  },
  {
    id: 'work-5',
    title: 'Pranje salonskog tepiha',
    category: 'tepisi',
    beforeImage: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    description: 'Vraćanje svežine i mekoće osetljivim vlaknima vunenog tepiha.'
  },
  {
    id: 'work-6',
    title: 'Poliranje i pranje vozila',
    category: 'automobili',
    beforeImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80',
    description: 'Uklanjanje mikro-ogrebotina i pranje enterijera do fabričkog stanja.'
  }
];

const BeforeAfterSlider = ({ before, after, title }: { before: string; after: string; title: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-100 select-none cursor-ew-resize group/slider ${isDragging ? 'cursor-grabbing' : ''}`}
    >
      {/* After Image (Background) */}
      <img
        src={after}
        alt={`Posle - ${title}`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute bottom-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm z-10">
        POSLE
      </span>

      {/* Before Image (Overlay clipped) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={before}
          alt={`Pre - ${title}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <span className="absolute bottom-3 left-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm z-10">
          PRE
        </span>
      </div>

      {/* Slider Handler Line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-xl pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg border-2 border-brand-500 flex items-center justify-center text-brand-600 transition-transform ${isDragging ? 'scale-125' : 'group-hover/slider:scale-110'}`}>
          <Eye className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Drag hint overlay — fades out after first interaction */}
      {!isDragging && sliderPosition === 50 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold rounded-full animate-pulse">
            ← Prevucite →
          </span>
        </div>
      )}
    </div>
  );
};

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState<'sve' | 'namestaj' | 'tepisi' | 'automobili'>('sve');

  const filteredItems = WORK_ITEMS.filter(
    (item) => activeFilter === 'sve' || item.category === activeFilter
  );

  return (
    <section id="portfolio-section" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
            Rezultati rada
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
            Naša galerija <span className="italic font-serif text-brand-500">Pre i Posle</span>
          </h2>
          <p className="text-sm text-slate-550 font-normal">
            Prevucite slajder na bilo kojoj slici levo ili desno kako biste videli neverovatne efekte našeg dubinskog čišćenja.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12 max-w-lg mx-auto p-1 bg-slate-100 rounded-xl overflow-x-auto hide-scrollbar">
          {(['sve', 'namestaj', 'tepisi', 'automobili'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeFilter === filter
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {filter === 'sve'
                ? 'Sve'
                : filter === 'namestaj'
                ? 'Nameštaj'
                : filter === 'tepisi'
                ? 'Tepisi'
                : 'Automobili'}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-lg transition duration-300"
            >
              <BeforeAfterSlider
                before={item.beforeImage}
                after={item.afterImage}
                title={item.title}
              />
              <div className="mt-4 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
