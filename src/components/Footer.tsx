import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { config } from '../config';

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-52 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 text-center md:text-left mb-16">
          
          {/* Column 1: Info and brand profile (lg:col-span-5) */}
          <div className="space-y-6 lg:col-span-5 flex flex-col items-center md:items-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group cursor-pointer"
            >
              <img src="/superCleanLogo.webp" alt={config.brand.name} className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-103" />
            </a>

            <p className="text-sm text-slate-400 leading-relaxed font-normal max-w-sm mx-auto md:mx-0">
              {config.brand.footerDescription}
            </p>

            {/* Social media icons */}
            <div className="flex gap-3 pt-2">
              <a 
                href={config.contact.socials.facebook} 
                onClick={(e) => { if(config.contact.socials.facebook === '#') e.preventDefault(); }} 
                aria-label="Facebook" 
                className="w-10 h-10 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={config.contact.socials.instagram} 
                onClick={(e) => { if(config.contact.socials.instagram === '#') e.preventDefault(); }} 
                aria-label="Instagram" 
                className="w-10 h-10 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Links Grid (Services & Info) (lg:col-span-4) */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            
            {/* Sub-column 1: Services */}
            <div className="space-y-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                <span className="w-1 h-3.5 bg-brand-500 rounded-full" />
                Usluge
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 flex flex-col items-center md:items-start">
                <li>
                  <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Tepisi</span>
                  </a>
                </li>
                <li>
                  <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Nameštaj</span>
                  </a>
                </li>
                <li>
                  <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Automobili</span>
                  </a>
                </li>
                <li>
                  <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Fleke i mirisi</span>
                  </a>
                </li>
                <li>
                  <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Dušeci</span>
                  </a>
                </li>
                <li>
                  <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Poliranje</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Sub-column 2: Help & Info */}
            <div className="space-y-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                <span className="w-1 h-3.5 bg-brand-500 rounded-full" />
                Informacije
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 flex flex-col items-center md:items-start">
                <li>
                  <a href="#about-section" onClick={(e) => handleLinkClick(e, '#about-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">O nama</span>
                  </a>
                </li>
                <li>
                  <a href="#estimator-section" onClick={(e) => handleLinkClick(e, '#estimator-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Kalkulator cene</span>
                  </a>
                </li>
                <li>
                  <a href="#reviews-section" onClick={(e) => handleLinkClick(e, '#reviews-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Recenzije</span>
                  </a>
                </li>
                <li>
                  <a href="#estimator-section" onClick={(e) => handleLinkClick(e, '#estimator-section')} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Zakazivanje</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Privatnost</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Uslovi</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Column 3: Premium Contact Cards (lg:col-span-3) */}
          <div className="space-y-5 lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
              <span className="w-1 h-3.5 bg-brand-500 rounded-full" />
              Kontakt
            </h4>
            
            <div className="space-y-3 max-w-sm mx-auto md:mx-0 w-full">
              <a 
                href={`tel:${config.contact.phone.replace(/\s+/g, '')}`} 
                className="group/contact flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/40 hover:bg-slate-900/90 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center group-hover/contact:bg-brand-500 group-hover/contact:text-white transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Pozovite nas</span>
                  <span className="text-xs text-slate-300 font-semibold group-hover/contact:text-white transition-colors">{config.contact.phone}</span>
                </div>
              </a>
              
              <a 
                href={`mailto:${config.contact.email}`} 
                className="group/contact flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/40 hover:bg-slate-900/90 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center group-hover/contact:bg-brand-500 group-hover/contact:text-white transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Email adresa</span>
                  <span className="text-xs text-slate-300 font-semibold group-hover/contact:text-white transition-colors">{config.contact.email}</span>
                </div>
              </a>

              <div 
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Naša lokacija</span>
                  <span className="text-xs text-slate-350 font-semibold">{config.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Decorative full-width line */}
        <div className="h-[1px] w-full bg-slate-800/60 mb-8" />

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <span>© {currentYear} {config.brand.name}. Sva prava zadržana.</span>
          </div>
          
          <div>
            <span>Designed & Developed by </span>
            <a 
              href="https://viddaflow.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-slate-350 hover:text-brand-400 transition-colors duration-200"
            >
              Viddaflow
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
