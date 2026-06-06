import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <section id="faq-section" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
            Pitanja i odgovori
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
            Često postavljana <span className="italic font-serif text-brand-500">Pitanja</span>
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            Pronađite brze odgovore na najčešća pitanja o našem procesu pranja, hemiji i uslovima.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3 text-left">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-brand-600 transition-colors text-sm sm:text-base cursor-pointer text-left group"
                >
                  <span className="font-semibold text-slate-900 transition-colors duration-200 group-hover:text-brand-500">
                    {item.question}
                  </span>
                  <span 
                    className={`flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-brand-50 group-hover:text-brand-500 shrink-0 ${
                      isOpen ? '!bg-brand-500 !text-white rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-4.5 h-4.5" />
                  </span>
                </button>
                
                <div 
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pt-0 text-sm text-slate-650 leading-relaxed bg-white">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
