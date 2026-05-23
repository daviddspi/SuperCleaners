import { Service, Addon, Testimonial, StatItem } from './types';

export const config = {
  brand: {
    name: "Super Cleaners",
    shortName: "Super Cleaners",
    tagline: "Premium Domestic Care",
    taglineHighlight: "Sparkling Clean • Guaranteed",
    foundedYear: 2012,
    heroTitleLine1: "Coming home to a clean space",
    heroTitleLine2: "should feel like",
    heroTitleHighlight: "a deep breath.",
    heroDescription: "Premium residential cleaning services tailored to your schedule. We handle the dust so you can focus on what truly matters.",
    aboutTitleLine1: "Few Words About",
    aboutTitleLine2: "Professional Services",
    aboutDescription: "Founded in 2012, Super Cleaners is a professional and certified cleaning company dedicated to making your home and office cleaner, fresher, more comfortable, and more beautiful. Our team of diligent and respectful professionals works to ensure your home shines like new.",
    convenienceTitleLine1: "We Make Cleaning",
    convenienceTitleHighlight: "Easier",
    convenienceTitleLine2: "and More Convenient",
    convenienceDescription1: "Super Cleaners offers convenient, professional cleaning services to help make your life easier. Our experienced, trained cleaners use top-quality products and equipment to deliver thorough, efficient cleaning. We strive to provide a hassle-free experience with cleaners who are punctual, reliable, and committed to exceptional results.",
    convenienceDescription2: "Whether you need a one-time cleaning or a regular cleaning service, our professional team is here to meet your needs. We offer flexible scheduling options and customizable cleaning plans to ensure that your home or office is cleaned to your satisfaction.",
    footerDescription: "Super Cleaners is the premier professional cleaning agency in your local area. We deliver sparkling, allergen-free conditions for domestic homes and commercial offices.",
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
    salaryRange: "£14 - £22/hour",
    location: "London",
    description: "Want to join our dynamic team and develop fantastic professional cleaning skills? We offer flexible shifts, premium gear, top-tier compensation, and a supportive team environment."
  },
  theme: {
    primaryColor: "#059669",
  },
  features: [
    "Coverage of 90% of UK cities and towns",
    "6 types of cleaning services available",
    "Over 120 professional cleaners",
    "7 days a week service",
    "UK based office for support"
  ],
  images: {
    immaculateLiving: '/src/assets/images/immaculate_living_1779523124896.png',
    heroCleaner: '/src/assets/images/hero_cleaner_1779523144770.png',
    maleCleaner: '/src/assets/images/male_cleaner_1779523165894.png'
  },
  services: [
    {
      id: 'carpet-cleaning',
      name: 'Carpet Cleaning',
      description: 'Deep fiber steam extraction to eliminate deep-seated dirt, static, and tough stains.',
      longDescription: 'Our carpet cleaning utilizes dual-stage hot water extraction that reaches deep into carpet fibers to remove allergens, grime, pet dander, and tough blemishes. We employ eco-friendly, fast-drying detergents leaving carpets soft, refreshed, and hygienic.',
      basePrice: 85,
      pricePerUnit: 15,
      category: 'Specialist',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80',
      iconName: 'Sparkles',
      durationHours: 2
    },
    {
      id: 'mattress-cleaning',
      name: 'Mattress Cleaning',
      description: 'Hygienic steam sanitizing to remove microscopic dust mites, bacteria, and embedded allergens.',
      longDescription: 'Sleep soundly with our medical-grade mattress sanitization process. Combining high-frequency vibration, UV-C light sterilization, and targeted steam-vacuuming, we fully extract moisture and skin cells to create a completely sterile sleeping surface.',
      basePrice: 65,
      pricePerUnit: 20,
      category: 'Specialist',
      image: 'https://images.unsplash.com/photo-1632829811892-61a3d2424b95?auto=format&fit=crop&w=600&q=80',
      iconName: 'BedDouble',
      durationHours: 1.5
    },
    {
      id: 'oven-cleaning',
      name: 'Oven Cleaning',
      description: 'Professional-grade carbon scraping and grease-dissolving treatment for a pristine kitchen.',
      longDescription: 'We fully dismantle, soak, and polish interior oven racks and glass panels to eliminate charred grease and baked-on carbon deposits. Our non-toxic, fumes-free polishing solutions restore range cookers and internal units to factory-equivalent shine.',
      basePrice: 75,
      pricePerUnit: 25,
      category: 'Detailing',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      iconName: 'Flame',
      durationHours: 2.5
    },
    {
      id: 'window-cleaning',
      name: 'Window Cleaning',
      description: 'Squeegee-perfect glass treatments for interior, exterior, sills, and hardware.',
      longDescription: 'Crystal-clear glass view with streak-free drying. We clean interior and exterior frames, sash channels, and lock mechanisms, using purified water feeds to leave glasses flawless and repellent to dust/water spots for longer intervals.',
      basePrice: 55,
      pricePerUnit: 10,
      category: 'Regular',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
      iconName: 'Maximize',
      durationHours: 1.5
    },
    {
      id: 'end-of-tenancy',
      name: 'End of Tenancy Cleaning',
      description: 'Thorough deposit-back guaranteed move-out cleaning aligning with landlord inspection checklists.',
      longDescription: 'Our deep end-of-tenancy service guarantees full compliance with standard rental estate lease terms. We perform exhaustive itemized cleaning across kitchen drawers, utility baseboards, deep oven scouring, scale removal, and wall spot dusting.',
      basePrice: 199,
      pricePerUnit: 40,
      category: 'Deep Cleaning',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      iconName: 'ShieldCheck',
      durationHours: 5
    },
    {
      id: 'upholstery-cleaning',
      name: 'Upholstery Cleaning',
      description: 'Delicate fabric steam polishing for custom armchairs, couches, drapes, and cushions.',
      longDescription: 'Protect premium textiles. Using dedicated fabric assessments, we steam clean and condition fabric suites, suede couches, and delicate drapery. We lift organic oils, spill stains, and odors without running color dyes or damaging thread textures.',
      basePrice: 110,
      pricePerUnit: 30,
      category: 'Specialist',
      image: 'https://images.unsplash.com/photo-1528740561666-42477c7c346c?auto=format&fit=crop&w=600&q=80',
      iconName: 'Armchair',
      durationHours: 3
    }
  ] as Service[],
  addons: [
    { id: 'interior_fridge', name: 'Deep Inside Fridge Cleaning', price: 29, iconName: 'Snowflake' },
    { id: 'inside_cabinets', name: 'Interior Cabinets Detail', price: 39, iconName: 'FolderClosed' },
    { id: 'balcony_sweep', name: 'Balcony Sweep & Wash', price: 45, iconName: 'Compass' },
    { id: 'ironing_service', name: '1 Hour Ironing Care', price: 30, iconName: 'Shirt' },
    { id: 'pet_sanitation', name: 'Pet Odor Sanitizing', price: 25, iconName: 'HeartHandshake' }
  ] as Addon[],
  testimonials: [
    {
      id: '1',
      name: 'Ralph Edwards',
      location: 'Doro, Sheffield',
      role: 'Homeowner',
      rating: 5,
      text: 'The cleaners arrived on time, and worked diligently until the job was completed. They were polite. I am very satisfied with the service and would gladly recommend them to others or use them again in the future.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=clamp&w=150&h=150&q=80'
    },
    {
      id: '2',
      name: 'Kristin Watson',
      location: 'Lisvane, Cardiff',
      role: 'Apartment Owner',
      rating: 5,
      text: 'They delivered excellent service within the time frame we had before turning the keys over to the estate agent. They listened to our specific priorities and completed them wonderfully. I will certainly use their services again.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=clamp&w=150&h=150&q=80'
    },
    {
      id: '3',
      name: 'Courtney Henry',
      location: 'Knighton, Leicester',
      role: 'Property Manager',
      rating: 5,
      text: 'We used their services five times during our busiest time of the year, annual Christmas Fair, and were very happy with them. It was a delight to have the building cleaned every evening. Excellent service as always!',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=clamp&w=150&h=150&q=80'
    }
  ] as Testimonial[],
  stats: [
    {
      id: 'stats-finished',
      label: 'Project Finished',
      value: '750+',
      description: 'Immaculate spaces delivered',
      iconName: 'Building'
    },
    {
      id: 'stats-experience',
      label: 'Years of Experience',
      value: '15+',
      description: 'Industry-leading know-how',
      iconName: 'Award'
    },
    {
      id: 'stats-satisfied',
      label: 'Satisfied Customers',
      value: '700+',
      description: 'Overwhelmingly 5-star ratings',
      iconName: 'Smile'
    },
    {
      id: 'stats-cleaners',
      label: 'Professional Cleaners',
      value: '120+',
      description: 'Insured and vetted experts',
      iconName: 'Users'
    }
  ] as StatItem[],
  whyChoose: [
    {
      id: 'wc-machines',
      title: 'Professional Machines',
      description: 'We use high-quality cleaning products and equipment to ensure that your home or office is left sparkling clean and fresh.',
      iconName: 'Wrench'
    },
    {
      id: 'wc-experience',
      title: 'Years of experience',
      description: 'With years of experience in this industry, we understand that high-quality cleaning services can truly improve your life.',
      iconName: 'History'
    },
    {
      id: 'wc-trusted',
      title: 'Trusted and Reliable',
      description: 'When choosing a cleaning service, trust and reliability are essential. That\'s why we make these qualities our top priority.',
      iconName: 'Lock'
    }
  ]
};
