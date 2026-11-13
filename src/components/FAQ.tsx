import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Reveal from './Reveal';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Koliko dugo se suši nameštaj nakon dubinskog pranja?',
    answer: 'Prosečno vreme sušenja je između 4 i 8 sati. Ono zavisi od temperature i vlažnosti vazduha u prostoriji, kao i od vrste materijala. Tokom letnjih meseci sušenje može trajati i kraće, dok zimi preporučujemo provetravanje ili grejanje prostorije.'
  },
  {
    question: 'Da li su sredstva koja koristite bezbedna za decu i kućne ljubimce?',
    answer: 'Da, apsolutno! Koristimo isključivo profesionalna, ekološki sertifikovana i biorazgradiva sredstva vodećih svetskih proizvođača (poput Karcher-a). Ova sredstva su potpuno ne-toksična, hipoalergijska i bezbedna za sve članove vaše porodice, uključujući i kućne ljubimce.'
  },
  {
    question: 'Da li je dolazak na adresu besplatan?',
    answer: 'Dolazak na kućnu adresu na široj teritoriji Beograda je potpuno besplatan za sve usluge dubinskog pranja nameštaja i automobila. Nema skrivenih troškova.'
  },
  {
    question: 'Kako preuzimate i vraćate tepihe?',
    answer: 'Za tepihe ukupne površine veće od 5m², preuzimanje na vašoj adresi, pranje u našem servisu i vraćanje su potpuno besplatni. Tepisi se peru profesionalnim mašinama, centrifugiraju i suše u komori, pa vam ih vraćamo potpuno suve i čiste u roku od 3 do 5 radnih dana.'
  },
  {
    question: 'Šta se dešava ako neka tvrdokorna fleka ne može da se skine?',
    answer: 'Naš tim uspešno uklanja preko 95% fleka (uključujući kafu, vino, krv, urin, markere i sl.). Međutim, ako je tkanina trajno oštećena hemikalijama iz kućne radinosti ili je prošlo previše vremena, pigment može ostati trajno promenjen. Uvek ćemo vas iskreno posavetovati pre početka rada.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq-section" className="section-y bg-brand-50">
      <div className="frame">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-start">
          
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start text-center lg:text-left">
            <h2 className="h-section">
              Često postavljana <span className="accent">Pitanja</span>
            </h2>
            <p className="lead mt-3 sm:mt-5 mx-auto lg:mx-0">
              Pronađite brze odgovore na najčešća pitanja o našem procesu pranja, hemiji i uslovima.
            </p>
          </Reveal>

          <ul className="lg:col-span-7 flex flex-col gap-3 text-left w-full">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={index}>
                  <Reveal delay={index * 0.05} y={12}>
                    <div className={`rounded-2xl sm:rounded-3xl transition-all duration-200 border ${
                      isOpen 
                        ? 'bg-white border-brand-200 shadow-xs' 
                        : 'bg-white/80 border-slate-100 hover:bg-white hover:border-slate-200'
                    }`}>
                      <h3>
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${index}`}
                          className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                        >
                          <span className="font-display text-base sm:text-lg font-semibold tracking-tight text-slate-900 leading-snug">
                            {item.question}
                          </span>
                          <span
                            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 transition-transform duration-200 ${
                              isOpen ? 'bg-brand-500 text-white rotate-45 shadow-xs' : 'bg-brand-50 text-brand-600'
                            }`}
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </button>
                      </h3>

                      <div
                        id={`faq-panel-${index}`}
                        role="region"
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 sm:px-7 pb-5 sm:pb-6 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    </section>
  );
}
