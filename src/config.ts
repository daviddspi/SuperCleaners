import { Service, Addon, Testimonial, StatItem } from './types';

export const config = {
  brand: {
    name: "Super Cleaners",
    shortName: "Super Cleaners",
    tagline: "Premium održavanje domaćinstva",
    taglineHighlight: "Blistavo čisto • Garantovano",
    foundedYear: 2012,
    heroTitleLine1: "Povratak u čist dom",
    heroTitleLine2: "treba da bude kao",
    heroTitleHighlight: "dubok uzdah olakšanja.",
    heroDescription: "Premium usluge čišćenja prilagođene vašem rasporedu. Mi brinemo o prašini kako biste vi mogli da se fokusirate na ono što je zaista važno.",
    aboutTitleLine1: "Nekoliko reči o",
    aboutTitleLine2: "profesionalnim uslugama",
    aboutDescription: "Osnovani 2012. godine, mi smo profesionalna i sertifikovana agencija za čišćenje posvećena tome da vaš dom i kancelarija budu čistiji, svežiji, udobniji i lepši. Naš tim marljivih i ljubaznih profesionalaca radi na tome da vaš dom zablista kao nov.",
    convenienceTitleLine1: "Činimo čišćenje",
    convenienceTitleHighlight: "Lakšim",
    convenienceTitleLine2: "i praktičnijim",
    convenienceDescription1: "Nudimo praktične i profesionalne usluge čišćenja koje će vam olakšati život. Naši iskusni i obučeni radnici koriste najkvalitetnija sredstva i opremu kako bi obezbedili temeljno i efikasno čišćenje. Trudimo se da vam pružimo iskustvo bez stresa, sa radnicima koji su tačni, pouzdani i posvećeni vrhunskim rezultatima.",
    convenienceDescription2: "Bilo da vam je potrebno jednokratno čišćenje ili redovno održavanje, naš profesionalni tim je tu da ispuni vaše zahteve. Nudimo fleksibilne opcije zakazivanja i prilagođene planove čišćenja kako bismo osigurali da vaš dom ili kancelarija budu očišćeni na vaše potpuno zadovoljstvo.",
    footerDescription: "Super Cleaners je vodeća profesionalna agencija za čišćenje u vašem kraju. Obezbeđujemo blistave prostore bez alergena za vaše domove i poslovne prostore.",
  },
  contact: {
    phone: "+44 20 7003 7880",
    email: "supercleaners@gmail.com",
    address: "24 Admirals Way, London E14 9UJ, United Kingdom",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  recruitment: {
    salaryRange: "1500€ - 2000€/mesečno",
    location: "Beogradu",
    description: "Želite da se pridružite našem dinamičnom timu i razvijete fantastične veštine profesionalnog čišćenja? Nudimo fleksibilno radno vreme, vrhunsku opremu, odličnu zaradu i podržavajuće radno okruženje."
  },
  theme: {
    primaryColor: "#059669",
  },
  features: [
    "Pokrivamo 90% opština",
    "6 vrsta usluga čišćenja",
    "Preko 120 profesionalnih radnika",
    "Dostupni 7 dana u nedelji",
    "Lokalna korisnička podrška"
  ],
  images: {
    immaculateLiving: '/src/assets/images/immaculate_living_1779523124896.png',
    heroCleaner: '/src/assets/images/hero_cleaner_1779523144770.png',
    maleCleaner: '/src/assets/images/male_cleaner_1779523165894.png'
  },
  services: [
    {
      id: 'carpet-cleaning',
      name: 'Dubinsko pranje tepiha',
      description: 'Ekstrakcija vodenom parom za uklanjanje dubinske prljavštine, statike i tvrdokornih fleka.',
      longDescription: 'Naše dubinsko pranje tepiha koristi dvostepenu ekstrakciju toplom vodom koja prodire duboko u vlakna tepiha kako bi uklonila alergene, prljavštinu, perut kućnih ljubimaca i teške fleke. Koristimo ekološke deterdžente koji se brzo suše i ostavljaju tepihe mekim, osveženim i higijenski čistim.',
      basePrice: 85,
      pricePerUnit: 15,
      category: 'Specijalizovano',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80',
      iconName: 'Sparkles',
      durationHours: 2
    },
    {
      id: 'mattress-cleaning',
      name: 'Dubinsko pranje dušeka',
      description: 'Higijenska dezinfekcija parom za uklanjanje grinja, bakterija i alergena.',
      longDescription: 'Spavajte mirno uz naš proces medicinske dezinfekcije dušeka. Kombinacijom visoke frekvencije vibracija, UV-C svetlosti za sterilizaciju i ciljanog usisavanja parom, u potpunosti izvlačimo vlagu i odumrle ćelije kože kako bismo stvorili potpuno sterilnu površinu za spavanje.',
      basePrice: 65,
      pricePerUnit: 20,
      category: 'Specijalizovano',
      image: 'https://images.unsplash.com/photo-1632829811892-61a3d2424b95?auto=format&fit=crop&w=600&q=80',
      iconName: 'BedDouble',
      durationHours: 1.5
    },
    {
      id: 'oven-cleaning',
      name: 'Čišćenje rerne',
      description: 'Profesionalni tretman uklanjanja masnoće i naslaga ugljenika za besprekornu kuhinju.',
      longDescription: 'U potpunosti rastavljamo, natapamo i poliramo unutrašnje rešetke i staklene panele kako bismo eliminisali zagorelu masnoću i naslage ugljenika. Naša netoksična rešenja vraćaju rernama fabrički sjaj bez neprijatnih mirisa.',
      basePrice: 75,
      pricePerUnit: 25,
      category: 'Detaljno',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      iconName: 'Flame',
      durationHours: 2.5
    },
    {
      id: 'window-cleaning',
      name: 'Pranje prozora',
      description: 'Besprekoran tretman stakla, okvira, pragova i okova bez tragova brisanja.',
      longDescription: 'Kristalno čist pogled sa sušenjem bez tragova. Čistimo unutrašnje i spoljašnje okvire, kanale i mehanizme za zaključavanje koristeći prečišćenu vodu kako bi stakla ostala besprekorna i otpornija na prašinu i kapljice vode.',
      basePrice: 55,
      pricePerUnit: 10,
      category: 'Redovno',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
      iconName: 'Maximize',
      durationHours: 1.5
    },
    {
      id: 'end-of-tenancy',
      name: 'Čišćenje pre iseljenja',
      description: 'Detaljno čišćenje koje garantuje povrat depozita, usklađeno sa zahtevima stanodavca.',
      longDescription: 'Naše dubinsko čišćenje na kraju najma garantuje potpunu usklađenost sa standardnim uslovima ugovora o zakupu nekretnina. Obavljamo iscrpno čišćenje svih elemenata, od fioka u kuhinji, ribanja rerne, uklanjanja kamenca do brisanja prašine sa zidova.',
      basePrice: 199,
      pricePerUnit: 40,
      category: 'Dubinsko čišćenje',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      iconName: 'ShieldCheck',
      durationHours: 5
    },
    {
      id: 'upholstery-cleaning',
      name: 'Dubinsko pranje nameštaja',
      description: 'Pažljivo poliranje parom za fotelje, ugaone garniture, zavese i jastuke.',
      longDescription: 'Zaštitite premium tkanine. Uz pažljivu procenu materijala, vršimo dubinsko pranje i kondicioniranje garnitura od tkanine, prevrnute kože i osetljivih zavesa. Uklanjamo fleke i neprijatne mirise bez oštećenja boje ili strukture niti.',
      basePrice: 110,
      pricePerUnit: 30,
      category: 'Specijalizovano',
      image: 'https://images.unsplash.com/photo-1528740561666-42477c7c346c?auto=format&fit=crop&w=600&q=80',
      iconName: 'Armchair',
      durationHours: 3
    }
  ] as Service[],
  addons: [
    { id: 'interior_fridge', name: 'Čišćenje unutrašnjosti frižidera', price: 29, iconName: 'Snowflake' },
    { id: 'inside_cabinets', name: 'Detaljno čišćenje unutrašnjosti ormara', price: 39, iconName: 'FolderClosed' },
    { id: 'balcony_sweep', name: 'Pranje i čišćenje terase', price: 45, iconName: 'Compass' },
    { id: 'ironing_service', name: 'Peglanje odeće (1 sat)', price: 30, iconName: 'Shirt' },
    { id: 'pet_sanitation', name: 'Sanitizacija mirisa kućnih ljubimaca', price: 25, iconName: 'HeartHandshake' }
  ] as Addon[],
  testimonials: [
    {
      id: '1',
      name: 'Marko Kostić',
      location: 'Novi Beograd',
      role: 'Vlasnik kuće',
      rating: 5,
      text: 'Radnici su stigli na vreme i vredno radili dok posao nije bio gotov. Bili su veoma pristojni. Veoma sam zadovoljan uslugom i rado bih ih preporučio drugima ili ponovo koristio njihove usluge.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=clamp&w=150&h=150&q=80'
    },
    {
      id: '2',
      name: 'Jelena Nikolić',
      location: 'Vračar, Beograd',
      role: 'Vlasnik stana',
      rating: 5,
      text: 'Pružili su odličnu uslugu u vremenskom okviru koji smo imali pre predaje ključeva agenciji za nekretnine. Saslušali su naše specifične prioritete i divno ih ispunili. Sigurno ću ponovo koristiti njihove usluge.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=clamp&w=150&h=150&q=80'
    },
    {
      id: '3',
      name: 'Milica Jovanović',
      location: 'Zemun',
      role: 'Menadžer objekta',
      rating: 5,
      text: 'Koristili smo njihove usluge pet puta tokom naše najprometnije sezone i bili smo veoma zadovoljni. Bilo je zadovoljstvo imati zgradu očišćenu svako veče. Odlična usluga kao i uvek!',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=clamp&w=150&h=150&q=80'
    }
  ] as Testimonial[],
  stats: [
    {
      id: 'stats-finished',
      label: 'Završenih projekata',
      value: '750+',
      description: 'Isporučeni besprekorni prostori',
      iconName: 'Building'
    },
    {
      id: 'stats-experience',
      label: 'Godina iskustva',
      value: '15+',
      description: 'Vodeće znanje u industriji',
      iconName: 'Award'
    },
    {
      id: 'stats-satisfied',
      label: 'Zadovoljnih klijenata',
      value: '700+',
      description: 'Pretežno recenzije sa 5 zvezdica',
      iconName: 'Smile'
    },
    {
      id: 'stats-cleaners',
      label: 'Profesionalnih radnika',
      value: '120+',
      description: 'Osigurani i provereni stručnjaci',
      iconName: 'Users'
    }
  ] as StatItem[],
  whyChoose: [
    {
      id: 'wc-machines',
      title: 'Profesionalne mašine',
      description: 'Koristimo visokokvalitetna sredstva i opremu za čišćenje kako bismo osigurali da vaš dom ili kancelarija ostanu blistavo čisti i sveži.',
      iconName: 'Wrench'
    },
    {
      id: 'wc-experience',
      title: 'Dugogodišnje iskustvo',
      description: 'Sa dugogodišnjim iskustvom u ovoj industriji, razumemo da visokokvalitetne usluge čišćenja mogu zaista poboljšati vaš život.',
      iconName: 'History'
    },
    {
      id: 'wc-trusted',
      title: 'Pouzdani i od poverenja',
      description: 'Kada birate agenciju za čišćenje, poverenje i pouzdanost su od suštinskog značaja. Zato su nam ovi kvaliteti na prvom mestu.',
      iconName: 'Lock'
    }
  ]
};
