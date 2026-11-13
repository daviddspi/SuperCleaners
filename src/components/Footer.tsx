import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { config } from '../config';

interface FooterProps {
  onOpenBooking: () => void;
}

const SERVICE_LINKS = [
  { label: 'Tepisi', href: '#services-section' },
  { label: 'Nameštaj', href: '#services-section' },
  { label: 'Automobili', href: '#services-section' },
  { label: 'Fleke i mirisi', href: '#services-section' },
  { label: 'Dušeci', href: '#services-section' },
  { label: 'Poliranje', href: '#services-section' }
];

const INFO_LINKS = [
  { label: 'O nama', href: '#about-section' },
  { label: 'Kalkulator cene', href: '#estimator-section' },
  { label: 'Recenzije', href: '#reviews-section' },
  { label: 'Naši radovi', href: '#portfolio-section' },
  { label: 'Česta pitanja', href: '#faq-section' },
  { label: 'Kontakt', href: '#contact-section' }
];

export default function Footer({ onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 sm:pt-20 md:pt-24 pb-12">
      <div className="frame">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-10 items-start">
          
          {/* Brand Info (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block"
              aria-label={config.brand.name}
            >
              <img src="/images/superCleanLogo_opt.webp" alt={config.brand.name} width={180} height={64} loading="lazy" decoding="async" className="h-14 sm:h-16 w-auto object-contain" />
            </a>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-sm">
              {config.brand.footerDescription}
            </p>

            <div className="flex items-center gap-3 pt-1">
              {[
                { href: config.contact.socials.facebook, label: 'Facebook', Icon: Facebook },
                { href: config.contact.socials.instagram, label: 'Instagram', Icon: Instagram }
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    if (href === '#') e.preventDefault();
                  }}
                  aria-label={label}
                  className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-brand-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Col 6-9) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8 text-center sm:text-left">
            <div>
              <h3 className="font-display text-base font-semibold text-white tracking-wide mb-4">
                Usluge
              </h3>
              <ul className="space-y-1">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-slate-300 hover:text-white transition-colors duration-150 inline-block py-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-base font-semibold text-white tracking-wide mb-4">
                Informacije
              </h3>
              <ul className="space-y-1">
                {INFO_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-slate-300 hover:text-white transition-colors duration-150 inline-block py-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details (Col 10-12) */}
          <div className="lg:col-span-3 text-center sm:text-left">
            <h3 className="font-display text-base font-semibold text-white tracking-wide mb-4 text-center sm:text-left">
              Kontakt
            </h3>
            <div className="space-y-3 max-w-md mx-auto sm:mx-0">
              <a
                href={`tel:${config.contact.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-left"
              >
                <span className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs text-slate-300 font-medium">Pozovite nas</span>
                  <span className="block text-sm font-semibold text-white mt-0.5 truncate">{config.contact.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${config.contact.email}`}
                className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-left"
              >
                <span className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs text-slate-300 font-medium">Email adresa</span>
                  <span className="block text-sm font-semibold text-white mt-0.5 truncate">{config.contact.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] text-left">
                <span className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs text-slate-300 font-medium">Lokacija</span>
                  <span className="block text-sm font-semibold text-white mt-0.5 truncate">{config.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-300 text-center sm:text-left">
          <p>© {currentYear} {config.brand.name}. Sva prava zadržana.</p>
          <p className="flex items-center gap-1.5">
            <span>Dizajn &amp; Izrada:</span>{' '}
            <a
              href="https://viddaflow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-100 hover:text-brand-300 transition-colors py-2 px-1.5 inline-block"
            >
              Viddaflow
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
