import React from 'react';
import { Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { config } from '../config';

export default function Contact() {
  const formattedPhone = config.contact.phone.replace(/\+/g, '').replace(/\s+/g, '');
  const waViberPhone = formattedPhone.startsWith('0') 
    ? '381' + formattedPhone.slice(1) 
    : formattedPhone;

  return (
    <section id="contact-section" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
            Kontaktirajte nas
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
            Javite nam se <span className="italic font-serif text-brand-500">Odmah</span>
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            Pošaljite nam sliku nameštaja ili tepiha i dobićete besplatnu procenu cene za par minuta.
          </p>
        </div>

        {/* Two large messenger CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">

          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${waViberPhone}?text=Zdravo,%20interesuje%20me%20dubinsko%20pranje.`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/20 active:scale-[0.98]"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54]" />
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/8 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#25D366]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-10 flex flex-col items-center text-center space-y-5">
              {/* Icon container */}
              <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-black/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.594 5.945L.057 24l6.326-1.657a11.87 11.87 0 005.667 1.442h.005c6.555 0 11.89-5.335 11.894-11.893a11.83 11.83 0 00-3.435-8.381z" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">WhatsApp</h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                  Pošaljite nam sliku i dobijte procenu cene — odgovaramo za par minuta.
                </p>
              </div>

              {/* CTA pill */}
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/25 text-white text-sm font-semibold group-hover:bg-white/30 transition-colors">
                <span>Započni razgovor</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>

          {/* Viber Card */}
          <a
            href={`viber://chat?number=%2B${waViberPhone}`}
            className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-500/20 active:scale-[0.98]"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7360F2] via-[#665CAC] to-[#59267c]" />
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/8 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#7360F2]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-10 flex flex-col items-center text-center space-y-5">
              {/* Icon container */}
              <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-black/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                  <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.541v2.42s-.038.97.602 1.17c.79.25 1.24-.499 1.99-1.299l1.4-1.58c3.85.32 6.8-.419 7.14-.529.78-.25 5.181-.811 5.901-6.652.74-6.031-.36-9.831-2.34-11.551l-.01-.002c-.6-.55-3-2.3-8.37-2.32 0 0-.396-.025-1.038-.016zm.067 1.697c.545-.003.88.02.88.02 4.54.01 6.711 1.38 7.221 1.84 1.67 1.429 2.528 4.856 1.9 9.892-.6 4.88-4.17 5.19-4.83 5.4-.28.09-2.88.73-6.152.52 0 0-2.439 2.941-3.199 3.701-.12.13-.26.17-.35.15-.13-.03-.17-.19-.16-.41l.02-4.019c-4.771-1.32-4.491-6.302-4.441-8.902.06-2.6.55-4.732 2-6.172 1.957-1.77 5.475-2.01 7.11-2.02zm.36 2.6a.299.299 0 0 0-.3.299.3.3 0 0 0 .3.3 5.631 5.631 0 0 1 4.03 1.59c1.09 1.06 1.621 2.48 1.641 4.34a.3.3 0 0 0 .3.3v-.009a.3.3 0 0 0 .3-.3 6.451 6.451 0 0 0-1.81-4.76c-1.19-1.16-2.692-1.76-4.462-1.76zm-3.954.69a.955.955 0 0 0-.615.12h-.012c-.41.24-.788.54-1.148.94-.27.32-.421.639-.461.949a1.24 1.24 0 0 0 .05.541l.02.01a13.722 13.722 0 0 0 1.2 2.6 15.383 15.383 0 0 0 2.32 3.171l.03.04.04.03.03.03.03.03a15.603 15.603 0 0 0 3.18 2.33c1.32.72 2.122 1.06 2.602 1.2v.01c.14.04.268.06.398.06a1.84 1.84 0 0 0 1.102-.472c.39-.35.7-.738.93-1.148v-.01c.23-.43.15-.841-.18-1.121a13.632 13.632 0 0 0-2.15-1.54c-.51-.28-1.03-.11-1.24.17l-.45.569c-.23.28-.65.24-.65.24l-.012.01c-3.12-.8-3.95-3.959-3.95-3.959s-.04-.43.25-.65l.56-.45c.27-.22.46-.74.17-1.25a13.522 13.522 0 0 0-1.54-2.15.843.843 0 0 0-.504-.3zm4.473.89a.3.3 0 0 0 .002.6 3.78 3.78 0 0 1 2.65 1.15 3.5 3.5 0 0 1 .9 2.57.3.3 0 0 0 .3.299l.01.012a.3.3 0 0 0 .3-.301c.03-1.19-.34-2.19-1.07-2.99-.73-.8-1.75-1.25-3.05-1.34a.3.3 0 0 0-.042 0zm.49 1.619a.305.305 0 0 0-.018.611c.99.05 1.47.55 1.53 1.58a.3.3 0 0 0 .3.29h.01a.3.3 0 0 0 .29-.32c-.07-1.34-.8-2.091-2.1-2.161a.305.305 0 0 0-.012 0z" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Viber</h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                  Zakažite termin ili postavite pitanje — odgovaramo u roku od 15 minuta.
                </p>
              </div>

              {/* CTA pill */}
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/25 text-white text-sm font-semibold group-hover:bg-white/30 transition-colors">
                <span>Započni razgovor</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>
        </div>

        {/* Contact details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <a href={`tel:${formattedPhone}`} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all group">
            <span className="p-3 bg-brand-100 text-brand-600 rounded-xl shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </span>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Telefon</h4>
              <span className="text-slate-500 text-sm block mt-0.5">{config.contact.phone}</span>
            </div>
          </a>

          <a href={`mailto:${config.contact.email}`} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all group">
            <span className="p-3 bg-brand-100 text-brand-600 rounded-xl shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </span>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Email</h4>
              <span className="text-slate-500 text-sm block mt-0.5">{config.contact.email}</span>
            </div>
          </a>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="p-3 bg-brand-100 text-brand-600 rounded-xl shrink-0">
              <Clock className="w-5 h-5" />
            </span>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Radno vreme</h4>
              <span className="text-slate-500 text-sm block mt-0.5">Pon - Ned: 08 - 20h</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
