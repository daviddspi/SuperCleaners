import { Building, Award, Smile, Users, HeartHandshake } from 'lucide-react';
import { STATS } from '../data';

interface StatsProps {
  onOpenBooking: () => void;
}

export default function Stats({ onOpenBooking }: StatsProps) {
  // Map dynamic icon helper
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'Building': return <Building className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Smile': return <Smile className={className} />;
      case 'Users': return <Users className={className} />;
      default: return <HeartHandshake className={className} />;
    }
  };

  return (
    <section id="stats-section" className="py-16 md:py-24 bg-brand-800 text-white relative overflow-hidden rounded-2xl max-w-7xl mx-auto my-12 px-6 md:px-12">
      {/* Visual background decorations */}
      <div className="absolute inset-0 bg-radial-to-br from-brand-600/30 to-brand-800 pointer-events-none -z-10" />
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-500 rounded-full blur-3xl opacity-20" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Stats numbers (7 cols) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6 order-2 lg:order-1">
          {STATS.map((stat) => (
            <div 
              key={stat.id} 
              className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5 mb-3.5">
                <span className="p-2 bg-brand-500 text-white rounded-lg inline-block shadow-sm">
                  {renderIcon(stat.iconName, "w-5 h-5")}
                </span>
                <span className="font-mono text-xs text-brand-200 uppercase tracking-widest font-black leading-none">
                  {stat.label}
                </span>
              </div>
              <h4 className="text-3xl sm:text-4xl font-display font-light tracking-tight text-white mb-1.5">
                {stat.value}
              </h4>
              <span className="block text-xs sm:text-sm font-semibold text-brand-100">
                {stat.label}
              </span>
              <span className="hidden sm:block text-[10px] text-brand-200/70 mt-0.5">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side: Copy and call-to-action (5 cols) */}
        <div className="lg:col-span-6 text-left space-y-6 order-1 lg:order-2">
          <span className="text-xs uppercase tracking-widest text-brand-500 bg-brand-50 px-3.5 py-1.5 rounded-full font-bold inline-block text-[11px]">
            Brz rast na tržištu
          </span>
          
          <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight leading-tight text-white">
            Mi smo najbrže <br />
            <span className="italic font-serif text-brand-200">Rastuća</span> Agencija za Čišćenje
          </h2>
          
          <p className="text-sm md:text-base text-brand-100/95 leading-relaxed font-normal">
            Naša usluga brzo raste jer naš tim marljivo radi kako bi vaš dom ili kancelarija bili čisti, sveži i besprekorno uredni. Možete nam verovati. Koristimo premium netoksične, ekološke formule kako biste živeli u savršeno sterilnom okruženju.
          </p>

          <div className="pt-2">
            <button
              id="stats-view-services-btn"
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-610 text-white font-medium text-sm transition shadow-lg shadow-brand-500/20 active:scale-95 cursor-pointer"
            >
              Pogledajte usluge i cene
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
