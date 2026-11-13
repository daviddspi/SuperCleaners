import React, { useState, useRef } from 'react';
import { Eye } from 'lucide-react';
import Reveal from './Reveal';

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

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

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

  const handleTouchEnd = () => setIsDragging(false);

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
      style={{ touchAction: isDragging ? 'none' : 'pan-y' }}
      className={`relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 select-none cursor-ew-resize group/slider ${isDragging ? 'cursor-grabbing' : ''}`}
    >
      {/* After Image (Background) */}
      <img
        src={after}
        alt={`Posle - ${title}`}
        width={600}
        height={450}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow-xs">
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
          width={600}
          height={450}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <span className="absolute bottom-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow-xs">
          PRE
        </span>
      </div>

      {/* Slider Handler Line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-xl pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border-2 border-brand-500 flex items-center justify-center text-brand-600 transition-transform ${isDragging ? 'scale-110' : 'group-hover/slider:scale-105'}`}>
          <Eye className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Drag hint overlay */}
      {!isDragging && sliderPosition === 50 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <span className="px-3.5 py-1.5 bg-slate-900/70 text-white text-xs font-semibold rounded-full animate-pulse shadow-sm">
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
    <section id="portfolio-section" className="section-y bg-white">
      <div className="frame-wide">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-center md:items-end gap-6 sm:gap-8 mb-10 sm:mb-14 text-center md:text-left">
          <Reveal className="max-w-2xl text-center md:text-left">
            <h2 className="h-section">
              Naša galerija <span className="accent">Pre i Posle</span>
            </h2>
            <p className="lead mt-3 sm:mt-4 mx-auto md:mx-0">
              Prevucite slajder na bilo kojoj slici levo ili desno kako biste videli neverovatne efekte našeg dubinskog čišćenja.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div role="tablist" aria-label="Filter radova" className="flex flex-wrap gap-2 justify-center md:justify-start">
              {(['sve', 'namestaj', 'tepisi', 'automobili'] as const).map((filter) => (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
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
          </Reveal>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {filteredItems.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <figure className="group flex flex-col p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-slate-50/60 hover:bg-slate-50 transition-colors border border-slate-100 shadow-xs">
                <BeforeAfterSlider
                  before={item.beforeImage}
                  after={item.afterImage}
                  title={item.title}
                />
                <figcaption className="mt-4 sm:mt-5 flex flex-col flex-1 text-center sm:text-left">
                  <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
