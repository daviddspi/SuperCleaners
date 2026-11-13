import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Phone, Sparkles } from 'lucide-react';
import { config } from '../config';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

const menuItems = [
  { label: 'O nama', href: '#about-section' },
  { label: 'Usluge', href: '#services-section' },
  { label: 'Naši radovi', href: '#portfolio-section' },
  { label: 'Kalkulator', href: '#estimator-section' },
  { label: 'Recenzije', href: '#reviews-section' },
  { label: 'FAQ', href: '#faq-section' },
  { label: 'Kontakt', href: '#contact-section' }
];

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight the link of the section currently in view
  useEffect(() => {
    const targets = menuItems
      .map((m) => document.querySelector(m.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock on mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,padding,box-shadow] duration-200 ease-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]' 
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="frame flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center shrink-0 cursor-pointer"
            aria-label={config.brand.name}
          >
            <img src="/superCleanLogo.webp" alt={config.brand.name} width={180} height={60} loading="eager" decoding="async" className="h-11 sm:h-13 md:h-15 w-auto object-contain" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Glavna navigacija">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active === item.href
                    ? 'text-brand-600 bg-brand-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${config.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500" />
              <span>{config.contact.phone}</span>
            </a>
            <button id="nav-booking-btn" onClick={() => onOpenBooking()} className="btn btn-primary group !py-2.5 !px-5 text-sm cursor-pointer">
              <span>Zakažite</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary !py-2 !px-3.5 !min-h-[40px] text-xs font-bold shadow-xs cursor-pointer"
            >
              Zakaži
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-800 rounded-xl hover:bg-slate-100 transition min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Otvori meni"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Modern, Rock-Solid Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            {/* Mobile Header Bar */}
            <div className="frame flex items-center justify-between py-4 border-b border-slate-100 shrink-0">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center"
              >
                <img src="/superCleanLogo.webp" alt={config.brand.name} width={150} height={44} loading="lazy" decoding="async" className="h-11 w-auto object-contain" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer"
                aria-label="Zatvori meni"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Centered Mobile Navigation Links with Stagger */}
            <div className="frame py-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 + 0.05, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  className={`py-2 text-2xl font-display font-medium tracking-tight transition-colors ${
                    active === item.href ? 'text-brand-600 font-bold' : 'text-slate-800 hover:text-brand-500'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Bottom Actions */}
            <div className="frame pb-8 pt-4 border-t border-slate-100 flex flex-col items-center space-y-3 shrink-0 text-center">
              <a
                href={`tel:${config.contact.phone.replace(/\s+/g, '')}`}
                className="btn btn-soft w-full !py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-500" />
                <span>Pozovite: {config.contact.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn btn-primary w-full !py-4 text-base font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <span>Zakažite čišćenje</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
