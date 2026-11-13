import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { STATS } from '../data';
import Reveal from './Reveal';

interface StatsProps {
  onOpenBooking: () => void;
}

function parseStatValue(value: string): { numericValue: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) return { numericValue: parseInt(match[1], 10), suffix: match[2] };
  return { numericValue: 0, suffix: value };
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    let startTime: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

const StatItem: FC<{ stat: (typeof STATS)[number]; visible: boolean; delay: number }> = ({ stat, visible, delay }) => {
  const [go, setGo] = useState(false);
  const { numericValue, suffix } = parseStatValue(stat.value);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  const value = useCountUp(numericValue, 2000, go);

  return (
    <div className="bg-white/[0.08] hover:bg-white/[0.12] transition-colors rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-center sm:text-left border border-white/10">
      <div className="font-display font-light tracking-[-0.04em] leading-none text-white tabular-nums text-3xl sm:text-4xl md:text-5xl">
        {value}
        {suffix}
      </div>
      <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-white">{stat.label}</h3>
      <p className="mt-1 text-xs sm:text-sm text-brand-100/80 leading-relaxed">{stat.description}</p>
    </div>
  );
};

export default function Stats({ onOpenBooking }: StatsProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="stats-section" className="section-y bg-brand-800 text-white">
      <div className="frame">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
          
          <Reveal className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="font-display font-light tracking-[-0.03em] leading-[1.08] text-white text-3xl sm:text-4xl md:text-5xl">
              Mi smo najbrže <span className="accent !text-brand-200">Rastuća</span> Agencija za Čišćenje
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-brand-100/90 max-w-lg mx-auto lg:mx-0">
              Naša usluga brzo raste jer naš tim marljivo radi kako bi vaš dom ili kancelarija bili čisti, sveži i
              besprekorno uredni. Možete nam verovati. Koristimo premium netoksične, ekološke formule kako biste
              živeli u savršeno sterilnom okruženju.
            </p>
            <button id="stats-view-services-btn" onClick={onOpenBooking} className="btn btn-light mt-6 sm:mt-8 w-full sm:w-auto !py-3.5 sm:!py-4 text-sm sm:text-base shadow-sm cursor-pointer mx-auto lg:mx-0">
              Pogledajte usluge i cene
            </button>
          </Reveal>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4.5 w-full">
            {STATS.map((stat, index) => (
              <StatItem key={stat.id} stat={stat} visible={visible} delay={index * 100} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
