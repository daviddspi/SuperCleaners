import { Wrench, History, Lock, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE } from '../data';
import Reveal from './Reveal';

const getIcon = (name: string, className: string) => {
  switch (name) {
    case 'Wrench': return <Wrench className={className} />;
    case 'History': return <History className={className} />;
    case 'Lock': return <Lock className={className} />;
    default: return <ShieldCheck className={className} />;
  }
};

export default function WhyChoose() {
  return (
    <section id="why-choose-section" className="section-y bg-brand-50">
      <div className="frame">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-start">
          
          {/* Sticky Heading on Desktop */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start text-center lg:text-left">
            <h2 className="h-section">
              Zašto izabrati <span className="accent">Super Cleaners</span>
            </h2>
            <p className="lead mt-3 sm:mt-5 mx-auto lg:mx-0">
              Držimo se najviših standarda, kombinujući savremenu opremu sa proverenim profesionalcima.
            </p>
          </Reveal>

          {/* Benefit Cards List */}
          <ul className="lg:col-span-7 flex flex-col gap-4">
            {WHY_CHOOSE.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={i * 0.06}>
                  <div className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white transition-all duration-200 hover:bg-brand-500 shadow-xs border border-slate-100">
                    <span className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl sm:rounded-2xl bg-brand-50 text-brand-500 transition-colors duration-200 group-hover:bg-white/15 group-hover:text-white">
                      {getIcon(item.iconName, 'w-6 h-6')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 transition-colors duration-200 group-hover:text-brand-50">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
