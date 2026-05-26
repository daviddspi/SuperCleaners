import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { config } from '../config';

interface FooterProps {
  onOpenBooking: () => void;
  onJoinStaff: () => void;
}

export default function Footer({ onOpenBooking, onJoinStaff }: FooterProps) {
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
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left mb-16">
        
        {/* Column 1: Info and contact */}
        <div className="space-y-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm shadow-brand-500/15">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className="font-display font-semibold text-xl text-white tracking-tight">
              {config.brand.name}
            </span>
          </a>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            {config.brand.footerDescription}
          </p>

          <div className="space-y-3.5 text-xs">
            <a href={`tel:${config.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3.5 text-slate-400 hover:text-white transition">
              <Phone className="w-4 h-4 text-brand-500 shrink-0" />
              <span>{config.contact.phone}</span>
            </a>
            <a href={`mailto:${config.contact.email}`} className="flex items-center gap-3.5 text-slate-400 hover:text-white transition">
              <Mail className="w-4 h-4 text-brand-500 shrink-0" />
              <span>{config.contact.email}</span>
            </a>
            <div className="flex items-start gap-3.5 text-slate-400">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>{config.contact.address}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Lists of Services */}
        <div className="space-y-5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Naše usluge čišćenja
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="hover:text-white transition">
                Dubinsko pranje tepiha
              </a>
            </li>
            <li>
              <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="hover:text-white transition">
                Dubinsko pranje nameštaja
              </a>
            </li>
            <li>
              <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="hover:text-white transition">
                Dubinsko pranje automobila
              </a>
            </li>
            <li>
              <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="hover:text-white transition">
                Uklanjanje fleka i mirisa
              </a>
            </li>
            <li>
              <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="hover:text-white transition">
                Čišćenje dušeka i kreveta
              </a>
            </li>
            <li>
              <a href="#services-section" onClick={(e) => handleLinkClick(e, '#services-section')} className="hover:text-white transition">
                Poliranje i pranje vozila
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Help & Details */}
        <div className="space-y-5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Pomoć i informacije
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <a href="#about-section" onClick={(e) => handleLinkClick(e, '#about-section')} className="hover:text-white transition">
                O našoj kompaniji
              </a>
            </li>
            <li>
              <a href="#estimator-section" onClick={(e) => handleLinkClick(e, '#estimator-section')} className="hover:text-white transition">
                Interaktivni kalkulator cene
              </a>
            </li>
            <li>
              <a href="#reviews-section" onClick={(e) => handleLinkClick(e, '#reviews-section')} className="hover:text-white transition">
                Recenzije klijenata
              </a>
            </li>
            <li>
              <a href="#estimator-section" onClick={(e) => handleLinkClick(e, '#estimator-section')} className="hover:text-white transition">
                Zakazivanje
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
                Politika privatnosti
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
                Uslovi korišćenja
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Become a Cleaner */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Postani član {config.brand.shortName} tima!
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            {config.recruitment.description}
          </p>
          <div className="pt-2">
            <button
              id="footer-join-us-btn"
              onClick={onJoinStaff}
              className="px-6 py-2.5 w-full rounded-xl bg-brand-500 hover:bg-brand-610 text-white text-xs font-semibold transition shadow-md shadow-brand-500/10 cursor-pointer text-center"
            >
              Prijavi se za posao
            </button>
          </div>
        </div>

      </div>

      {/* Decorative full-width strip */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8" />

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          <span>© {currentYear} {config.brand.name}. Sva prava zadržana.</span>
        </div>
        
        {/* Socials Icons */}
        <div className="flex gap-4.5">
          <a href={config.contact.socials.facebook} onClick={(e) => { if(config.contact.socials.facebook === '#') e.preventDefault(); }} aria-label="Facebook handle" className="hover:text-brand-500 transition">
            <Facebook className="w-4 h-4" />
          </a>
          <a href={config.contact.socials.twitter} onClick={(e) => { if(config.contact.socials.twitter === '#') e.preventDefault(); }} aria-label="Twitter handle" className="hover:text-brand-500 transition">
            <Twitter className="w-4 h-4" />
          </a>
          <a href={config.contact.socials.instagram} onClick={(e) => { if(config.contact.socials.instagram === '#') e.preventDefault(); }} aria-label="Instagram handle" className="hover:text-brand-500 transition">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
