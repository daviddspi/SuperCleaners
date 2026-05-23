import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, CheckCircle } from 'lucide-react';
import { config } from '../config';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About', href: '#about-section' },
    { label: 'Services', href: '#services-section' },
    { label: 'Why Choose Us', href: '#why-choose-section' },
    { label: 'Reviews', href: '#reviews-section' },
    { label: 'Estimator', href: '#estimator-section' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
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
    <header 
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-150 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all shadow-sm shadow-brand-500/15">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <div>
            <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-slate-900 flex items-center gap-1.5 select-none animate-fade-in">
              {config.brand.name}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-booking-btn"
            onClick={() => onOpenBooking()}
            className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-650 hover:bg-slate-100 rounded-xl transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-205">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-base font-semibold text-slate-800 py-2 hover:text-brand-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-center text-sm shadow-md"
          >
            Book Now
          </button>
        </div>
      )}
    </header>
  );
}
