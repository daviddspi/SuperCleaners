import { Service, Addon, Testimonial, StatItem, PricingItem } from './types';

export const PRICING_ITEMS: PricingItem[] = [
  { id: 'f-fotelja', name: 'Fotelja', price: 900, priceType: 'fixed', category: 'namestaj' },
  { id: 'f-dvosed', name: 'Dvosed', price: 1700, priceType: 'fixed', category: 'namestaj' },
  { id: 'f-trosed', name: 'Trosed', price: 2500, priceType: 'fixed', category: 'namestaj' },
  { id: 'f-ugaona', name: 'Ugaona garnitura', price: 900, priceType: 'per_seat', category: 'namestaj', description: 'po sednom mestu' },
  { id: 'f-stolica', name: 'Stolica', price: 300, priceType: 'starting', category: 'namestaj', description: '300 - 600 RSD' },
  { id: 'f-jastuk', name: 'Jastuk', price: 200, priceType: 'starting', category: 'namestaj', description: '200 - 400 RSD' },
  { id: 'f-singl', name: 'Singl dušek (jedna strana)', price: 900, priceType: 'fixed', category: 'namestaj' },
  { id: 'f-singl-obe', name: 'Singl dušek (obe strane)', price: 1500, priceType: 'fixed', category: 'namestaj' },
  { id: 'f-francuski', name: 'Francuski dušek (jedna strana)', price: 1300, priceType: 'fixed', category: 'namestaj' },
  { id: 'f-francuski-obe', name: 'Francuski dušek (obe strane)', price: 1900, priceType: 'fixed', category: 'namestaj' },

  { id: 't-tepisi', name: 'Tepisi', price: 400, priceType: 'per_m2', category: 'tepisi' },
  { id: 't-itisoni', name: 'Itisoni', price: 350, priceType: 'per_m2', category: 'tepisi' },
  { id: 't-tvrdi', name: 'Tvrdi podovi', price: 350, priceType: 'per_m2', category: 'tepisi' },

  { id: 'a-dubinsko', name: 'Dubinsko pranje', price: 8000, priceType: 'starting', category: 'automobili' },
  { id: 'a-poliranje', name: 'Poliranje', price: 14000, priceType: 'starting', category: 'automobili', description: 'od 120 €' }
];

export const config = {
  brand: {
    name: "Super Clean",
    shortName: "Super Clean",
    tagline: "Profesionalno dubinsko pranje",
    taglineHighlight: "Besprijekorno čisto",
    foundedYear: 2012,
    heroTitleLine1: "Vratite sjaj vašem",
    heroTitleLine2: "nameštaju uz naše",
    heroTitleHighlight: "dubinsko pranje.",
    heroDescription: "Vrhunske usluge dubinskog pranja nameštaja, tepiha i automobila u Beogradu. Obezbeđujemo svežinu i čistoću koja traje.",
    aboutTitleLine1: "Nekoliko reči o",
    aboutTitleLine2: "našim uslugama",
    aboutDescription: "Mi smo profesionalni tim posvećen dubinskom pranju i čišćenju. Koristimo najmoderniju opremu i ekološka sredstva kako bismo vašem nameštaju, tepisima i vozilima vratili prvobitni sjaj.",
    convenienceTitleLine1: "Vaš dom zaslužuje",
    convenienceTitleHighlight: "Najbolje",
    convenienceTitleLine2: "održavanje",
    convenienceDescription1: "Dubinsko pranje nije samo estetika, već i zdravlje. Uklanjamo grinje, bakterije i tvrdokorne fleke iz vaših kreveta i garnitura.",
    convenienceDescription2: "Sa preko decenijom iskustva, naš tim garantuje profesionalan pristup, dolazak na kućnu adresu i rezultate koji će vas oduševiti.",
    footerDescription: "Super Clean je vaša pouzdana agencija za dubinsko pranje nameštaja, tepiha i vozila u Beogradu. Kvalitet bez kompromisa.",
  },
  contact: {
    phone: "+381 60 123 4567",
    email: "info@superclean.rs",
    address: "Beograd, Srbija",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "https://www.instagram.com/dubinsko_pranje_namestaja_bg/"
    }
  },
  recruitment: {
    salaryRange: "Zaposlenje",
    location: "Beograd",
    description: "Uvek smo u potrazi za vrednim i odgovornim radnicima. Pridružite se našem timu."
  },
  theme: {
    primaryColor: "#567AC4",
  },
  features: [
    "Besplatan dolazak na adresu",
    "Uklanjanje i najtvrdokornijih fleka",
    "Ekološka sredstva bezbedna za decu i ljubimce",
    "Preuzimanje tepiha > 5m2 besplatno",
    "Profesionalne Karcher mašine"
  ],
  images: {
    immaculateLiving: '/src/assets/images/immaculate_living_1779523124896.png',
    heroCleaner: '/src/assets/images/hero_cleaner_1779523144770.png',
    maleCleaner: '/src/assets/images/male_cleaner_1779523165894.png'
  },
  services: [
    {
      id: 'namestaj',
      name: 'Dubinsko pranje nameštaja',
      description: 'Temeljno čišćenje garnitura, fotelja, stolica i dušeka.',
      longDescription: 'Naše dubinsko pranje uklanja grinje, alergene, prljavštinu i fleke iz dubine materijala. Vaš nameštaj će biti čist, osvežen i suv za par sati.',
      category: 'Glavno',
      image: 'https://images.unsplash.com/photo-1528740561666-42477c7c346c?auto=format&fit=crop&w=600&q=80',
      iconName: 'Armchair',
      items: PRICING_ITEMS.filter(item => item.category === 'namestaj')
    },
    {
      id: 'tepisi',
      name: 'Pranje tepiha i podova',
      description: 'Dubinsko pranje tepiha i itisona.',
      longDescription: 'Nudimo preuzimanje i vraćanje tepiha (besplatno za preko 5m2). Koristimo specijalne četke i ekstrakciju kako bismo uklonili svu nečistoću.',
      category: 'Glavno',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80',
      iconName: 'LayoutGrid',
      items: PRICING_ITEMS.filter(item => item.category === 'tepisi')
    },
    {
      id: 'automobili',
      name: 'Automobili',
      description: 'Dubinsko pranje enterijera i poliranje.',
      longDescription: 'Vratite sjaj vašem vozilu. Dubinsko pranje sedišta, poda, neba i gepeka, kao i profesionalno spoljašnje poliranje karoserije.',
      category: 'Dodatno',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80',
      iconName: 'Car',
      items: PRICING_ITEMS.filter(item => item.category === 'automobili')
    }
  ] as Service[],
  addons: [] as Addon[],
  testimonials: [
    {
      id: '1',
      name: 'Marko Kostić',
      location: 'Novi Beograd',
      role: 'Klijent',
      rating: 5,
      text: 'Garnitura je kao nova! Fleke od kafe koje su bile tu mesecima su potpuno nestale. Momci su veoma profesionalni i brzi.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=clamp&w=150&h=150&q=80'
    },
    {
      id: '2',
      name: 'Jelena Nikolić',
      location: 'Vračar',
      role: 'Klijent',
      rating: 5,
      text: 'Dubinsko pranje kreveta me je spasilo od alergija. Sve preporuke za Super Clean tim, stigli su tačno na vreme.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=clamp&w=150&h=150&q=80'
    },
    {
      id: '3',
      name: 'Milica Jovanović',
      location: 'Zemun',
      role: 'Klijent',
      rating: 5,
      text: 'Radili su mi dubinsko pranje automobila i prezadovoljna sam. Auto miriše fenomenalno i sedišta su savršeno čista.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=clamp&w=150&h=150&q=80'
    }
  ] as Testimonial[],
  stats: [
    {
      id: 'stats-finished',
      label: 'Završenih pranja',
      value: '2000+',
      description: 'Očišćenog nameštaja i automobila',
      iconName: 'Sparkles'
    },
    {
      id: 'stats-experience',
      label: 'Godina iskustva',
      value: '10+',
      description: 'Znanja i usavršavanja',
      iconName: 'Award'
    },
    {
      id: 'stats-satisfied',
      label: 'Zadovoljnih klijenata',
      value: '1500+',
      description: 'Pretežno recenzije sa 5 zvezdica',
      iconName: 'Smile'
    },
    {
      id: 'stats-cleaners',
      label: 'Pokrivenost',
      value: '100%',
      description: 'Celog Beograda',
      iconName: 'MapPin'
    }
  ] as StatItem[],
  whyChoose: [
    {
      id: 'wc-machines',
      title: 'Profesionalne mašine',
      description: 'Koristimo Karcher Puzzi i druge profesionalne mašine za ekstrakciju za maksimalne rezultate.',
      iconName: 'Wrench'
    },
    {
      id: 'wc-experience',
      title: 'Vrhunska hemija',
      description: 'Koristimo specijalizovana, ne-toksična sredstva koja razbijaju prljavštinu a čuvaju tkaninu.',
      iconName: 'FlaskConical'
    },
    {
      id: 'wc-trusted',
      title: 'Brzo sušenje',
      description: 'Zahvaljujući jakim usisnim motorima, nameštaj ostaje minimalno vlažan i brzo se suši.',
      iconName: 'Wind'
    }
  ]
};
