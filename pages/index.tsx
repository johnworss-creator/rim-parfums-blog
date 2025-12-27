import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'; 
import { useRouter } from 'next/router'; 
import { translations } from '../translations'; 
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google'; 
import { 
  Droplets, ChevronLeft, ChevronRight, Check, 
  Cpu, Hexagon, Menu, Plus, X, Star, 
  Instagram, Linkedin, Youtube, Store, TrendingUp, Lightbulb, PlaySquare, Monitor, Globe
} from 'lucide-react';



// --- OPTIMISATION POLICE ---
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// --- STYLES GLOBAUX ---
const GlobalStyles = () => (
  <style jsx global>{`
    :root {
      --font-inter: ${inter.style.fontFamily};
    }
    .font-display {
      font-family: "SF Pro Display", "SF Pro", var(--font-inter), -apple-system, system-ui, sans-serif;
      letter-spacing: -0.02em; 
    }
    .font-text {
      font-family: "SF Pro Text", "SF Pro", var(--font-inter), -apple-system, system-ui, sans-serif;
      letter-spacing: 0em; 
    }
  `}</style>
);

// --- COMPOSANTS UI ---
const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a href={href} className="group relative inline-block overflow-hidden h-5 flex items-center text-sm font-medium font-text whitespace-nowrap">
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className="text-gray-600">{children}</span>
        <span className="text-black">{children}</span>
      </div>
    </a>
  );
};

const TestimonialsColumn = (props: { className?: string; testimonials: any[]; duration?: number; }) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration: props.duration || 10, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {props.testimonials.map(({ text, image, name, role }, index) => (
                <div key={index} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-1 text-black mb-4">
                        {[...Array(5)].map((_, starI) => <Star key={starI} className="w-4 h-4 fill-black"/>)}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 font-medium font-text">"{text}"</p>
                    <div className="flex items-center gap-4">
                        <img src={image} alt={name} className="h-12 w-12 rounded-full object-cover border border-gray-200" loading="lazy" />
                        <div>
                            <p className="font-medium text-black leading-tight font-display">{name}</p>
                            <p className="text-sm text-gray-500 font-text">{role}</p>
                        </div>
                    </div>
                </div>
              ))}
            </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

function AnimatedContainer({ className, delay = 0.1, children }: any) {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion) return children;
    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- PAGE PRINCIPALE ---

export default function LandingPage() {
  const router = useRouter();
  const { locale, asPath } = router;
  const currentLocale = (locale as keyof typeof translations) || 'en';
  const t = translations[currentLocale];

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'fr' : 'en';
    router.push(asPath, asPath, { locale: newLocale });
  };

  // États locaux
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0); 
  const [showMobileOverlay, setShowMobileOverlay] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- DONNÉES DYNAMIQUES (TRADUITES) ---
  
  const navLinksData = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.industries, href: '#industries' }, 
    { label: t.nav.catalog, href: '#catalog' }, 
    { label: t.nav.testimonials, href: '#testimonials' },
    { label: t.nav.models, href: '#b2b' },
  ];

  const features = [
    {
      id: 1,
      title: t.features.smart_diffusion,
      description: t.features.smart_diffusion_desc,
      icon: <Droplets className="w-8 h-8 text-black" />, 
      desktopPos: { top: "70%", left: "41%" },
      mobilePos: { top: "55%", left: "40%" } 
    },
    {
      id: 2,
      title: t.features.ad_tech,
      description: t.features.ad_tech_desc,
      icon: <PlaySquare className="w-8 h-8 text-black" />,
      desktopPos: { top: "45%", right: "30%" },
      mobilePos: { top: "40%", left: "75%" }
    },
    {
      id: 3,
      title: t.features.rim_os,
      description: t.features.rim_os_desc,
      icon: <Cpu className="w-8 h-8 text-black" />,
      desktopPos: { top: "70%", right: "30%" },
      mobilePos: { top: "60%", left: "70%" }
    },
    {
      id: 4,
      title: t.features.showcase,
      description: t.features.showcase_desc,
      icon: <Lightbulb className="w-8 h-8 text-black" />,
      desktopPos: { top: "38%", left: "48%" },
      mobilePos: { top: "35%", left: "45%" }
    }
  ];

  const industries = [
    {
      id: 1,
      category: t.industries.nightlife,
      title: t.industries.nightlife_title,
      points: t.industries.nightlife_points,
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1600&q=80" 
    },
    {
      id: 2,
      category: t.industries.travel,
      title: t.industries.travel_title,
      points: t.industries.travel_points,
      image: "/zayed-aeroport-international.jpg" 
    },
    {
      id: 3,
      category: t.industries.hospitality,
      title: t.industries.hospitality_title,
      points: t.industries.hospitality_points,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80" 
    }
  ];
  
  const bentoItems = [
    {
        title: t.bento.rim_os,
        desc: t.bento.rim_os_desc,
        colSpan: "lg:col-span-2",
        bg: "bg-gray-100", 
        icon: <Monitor className="w-6 h-6 mb-4" />, 
        image: "/bento photos/bento-computer.png", 
        dark: false
    },
    {
        title: t.bento.smart,
        desc: t.bento.smart_desc,
        colSpan: "lg:col-span-1",
        bg: "bg-black", 
        icon: <Droplets className="w-6 h-6 mb-4 text-white" />, 
        image: "/bento photos/bento parfum.png", 
        dark: true
    },
    {
        title: t.bento.ad,
        desc: t.bento.ad_desc,
        colSpan: "lg:col-span-1",
        bg: "bg-gray-100",
        icon: <PlaySquare className="w-6 h-6 mb-4" />,
        image: "/bento photos/bento tablette.png", 
        dark: false
    },
    {
        title: t.bento.showcase,
        desc: t.bento.showcase_desc,
        colSpan: "lg:col-span-2",
        bg: "bg-gray-100", 
        icon: <Lightbulb className="w-6 h-6 mb-4" />,
        image: "/bento photos/bento-fluid.png", 
        dark: false
    },
  ];

  const testimonials = [
    { text: t.testimonials.t1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150", name: "Marc Dupont", role: "Nightclub Owner" },
    { text: t.testimonials.t2, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150", name: "Sarah Jenkis", role: "Mall Operations" },
    { text: t.testimonials.t3, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150", name: "James Alistair", role: "Hotel Director" },
    { text: t.testimonials.t4, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150", name: "David Chen", role: "Entrepreneur" },
  ];

  const footerLinksData = [
    {
        label: t.footer.product,
        links: [
            { title: 'RIM P02-PRO', href: '#' },
            { title: 'RIM OS', href: '#' },
            { title: 'Specifications', href: '#' },
        ],
    },
    {
        label: t.footer.company,
        links: [
            { title: t.nav.contact, href: '#' },
            { title: 'Partners', href: '#' },
        ],
    },
    {
        label: t.footer.social,
        links: [
            { title: 'LinkedIn', href: '#', icon: Linkedin },
            { title: 'Instagram', href: '#', icon: Instagram },
        ],
    },
  ];

  const row1 = [
    "/parfum photos/1.png",
    "/parfum photos/2.png",
    "/parfum photos/3.png",
    "/parfum photos/4.png",
    "/parfum photos/5.png",
    "/parfum photos/6.png",
    "/parfum photos/7.png",
  ];

  const row2 = [
    "/parfum photos/8.png",
    "/parfum photos/9.png",
    "/parfum photos/10.png",
    "/parfum photos/11.png",
    "/parfum photos/12.png",
    "/parfum photos/13.png",
    "/parfum photos/14.png",
    "/parfum photos/15.png",
  ];

const duplicatedRow1 = [...row1, ...row1, ...row1];
const duplicatedRow2 = [...row2, ...row2, ...row2];



  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (isMenuOpen) {
      setHeaderShapeClass('rounded-3xl'); 
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }
    return () => { if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current); };
  }, [isMenuOpen]);

  const nextStep = () => setCurrentMobileIndex((prev) => (prev + 1) % features.length);
  const prevStep = () => setCurrentMobileIndex((prev) => (prev - 1 + features.length) % features.length);
  const nextIndustry = () => { setActiveIndustryIndex((prev) => (prev + 1) % industries.length); setShowMobileOverlay(false); };
  const prevIndustry = () => { setActiveIndustryIndex((prev) => (prev - 1 + industries.length) % industries.length); setShowMobileOverlay(false); };

  return (
    <div className={`min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden font-text ${inter.variable}`}>
      
      <Head>
        <title>{currentLocale === 'en' ? 'RIM Parfums | Smart Fragrance Vending' : 'RIM Parfums | Distributeur de Parfum Intelligent'}</title>
        <meta name="description" content={currentLocale === 'en' ? 'Discover the RIM P02-PRO.' : 'Découvrez le RIM P02-PRO.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GlobalStyles />
      
      <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center px-4 sm:px-6 py-3 backdrop-blur-md ${headerShapeClass} border border-gray-200 bg-white/80 shadow-sm w-[calc(100%-1.5rem)] sm:w-auto max-w-7xl transition-[border-radius] duration-300 ease-in-out`}>
      
        <div className="flex items-center justify-between w-full gap-x-4 sm:gap-x-10">
            <div className="flex items-center gap-2 cursor-pointer flex-nowrap">
                <Hexagon className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-black shrink-0" />
                <span className="font-medium text-base sm:text-lg tracking-tighter uppercase font-display whitespace-nowrap">RIM Parfums</span>
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
            {navLinksData.map((link) => (
                <AnimatedNavLink key={link.href} href={link.href}>
                {link.label}
                </AnimatedNavLink>
            ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2 sm:gap-3">
                <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-bold hover:bg-black hover:text-white transition-colors"
                >
                    <Globe className="w-3 h-3" />
                    <span>{(currentLocale as string).toUpperCase()}</span>
                </button>
                
                <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg transform active:scale-95 w-auto whitespace-nowrap font-text">
                    {t.hero.cta}
                </button>
            </div>

            <button className="lg:hidden flex items-center justify-center w-8 h-8 text-black focus:outline-none shrink-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        <div className={`lg:hidden flex flex-col items-center w-full transition-all ease-in-out duration-500 overflow-hidden ${isMenuOpen ? 'max-h-[500px] opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
            <nav className="flex flex-col items-center space-y-4 text-base w-full">
            {navLinksData.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-black font-medium transition-colors w-full text-center py-1 font-text">
                {link.label}
                </a>
            ))}
            </nav>
            <div className="flex flex-col items-center space-y-4 mt-6 w-full">
                <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 font-bold text-sm">
                    <Globe className="w-4 h-4" /> {(currentLocale as string).toUpperCase()}
                </button>
            </div>
        </div>
      </header>

      <main className="pt-24">
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="relative w-full aspect-[1/1] sm:aspect-[4/3] lg:aspect-[21/9] bg-neutral-900 rounded-[2rem] sm:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center text-center p-6 sm:p-12 transition-all duration-500">
            <div 
  className="absolute inset-0 bg-cover bg-center opacity-70" 
  style={{ backgroundImage: "url('/fond-noir-machine-rp01.png')" }}
></div>
                <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 text-white/80 uppercase tracking-widest text-[10px] sm:text-xs font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm font-text">
                        <Hexagon className="w-3 h-3 sm:w-4 sm:h-4" /><span>{t.hero.badge}</span>
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] font-display">
                        {t.hero.title}
                    </h2>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4 px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-text">
                        {t.hero.cta}
                    </motion.button>
                </div>
            </div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
          <div className="mb-8 sm:mb-12 text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl font-medium mb-6 font-display">{t.features.title}</h2>
            <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base font-text">{t.features.subtitle}</p>
          </div>
          <div className="w-full relative">


            <div className="lg:hidden flex flex-col gap-6">
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl sm:rounded-3xl relative border border-gray-200 overflow-hidden shadow-inner bg-cover bg-center" style={{ backgroundImage: "url('machine-rp-01-noir.png')" }}>
                 
  
                 {features.map((feature, idx) => {
                    const isActive = idx === currentMobileIndex;
                    return (
                      <motion.button key={feature.id} onClick={() => setCurrentMobileIndex(idx)} className="absolute z-20 focus:outline-none" style={{ top: feature.mobilePos.top, left: feature.mobilePos.left }} whileTap={{ scale: 0.9 }}>
                        {isActive && <div className="absolute -inset-3 rounded-full border-2 border-black animate-pulse opacity-50"></div>}
                        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg border transition-all ${isActive ? 'bg-black border-black scale-110' : 'bg-white border-gray-200'}`}><div className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? 'bg-white' : 'bg-black'}`} /></div>
                      </motion.button>
                    );
                 })}
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 min-h-[200px] flex flex-col justify-between">
                <AnimatePresence mode='wait'>
                  <motion.div key={currentMobileIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    <h2 className="text-xl font-medium mb-2 font-display">{features[currentMobileIndex].title}</h2>
                    <p className="text-gray-600 text-sm font-text">{features[currentMobileIndex].description}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                   <div className="flex gap-1">{features.map((_, i) => <div key={i} className={`h-1 w-4 rounded-full ${i===currentMobileIndex ? 'bg-black':'bg-gray-200'}`} />)}</div>
                   <div className="flex gap-2"><button onClick={prevStep} className="p-2 border rounded-full"><ChevronLeft className="w-4 h-4" /></button><button onClick={nextStep} className="p-2 bg-black text-white rounded-full"><ChevronRight className="w-4 h-4" /></button></div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative w-full aspect-[16/9] bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-200 shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center" 
     style={{ backgroundImage: "url('/machine-rp-01-noir.png')" }}>
</div>   
               {features.map((feature) => (
                <div key={feature.id} className="absolute z-10" style={{ top: feature.desktopPos.top, left: feature.desktopPos.left || 'auto', right: feature.desktopPos.right || 'auto' }} onMouseEnter={() => setHoverFeature(feature.id)} onMouseLeave={() => setHoverFeature(null)}>
                  <motion.button 
  whileHover={{ scale: 1.1 }} 
  className="relative flex items-center justify-center cursor-pointer group"
  // On retire w-8 h-8 ici pour laisser les enfants gérer la taille
>
  
  {/* 1. L'animation "Pulse" (Onde) derrière le bouton */}
  {/* L'onde grandit et disparait en boucle pour attirer l'attention */}
  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-40 animate-ping duration-[2000ms]" style={{ padding: '12px' }}></span>

  {/* 2. Le cercle blanc principal */}
  <div className="relative w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-10 transition-all duration-300 group-hover:bg-black">
    
    {/* 3. L'icône PLUS (+) */}
    {/* Elle change de couleur (Noir -> Blanc) au survol pour un effet interactif */}
    <Plus 
      strokeWidth={2.5} 
      className="w-4 h-4 text-black transition-colors duration-300 group-hover:text-white" 
    />
    
  </div>
</motion.button>
                  <AnimatePresence>
                    {hoverFeature === feature.id && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-10 left-1/2 -translate-x-1/2 w-80 bg-white p-6 rounded-2xl shadow-xl z-20">
                        <h3 className="font-medium text-lg mb-1 font-display">{feature.title}</h3><p className="text-sm text-gray-500 font-text">{feature.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bentoItems.map((item, idx) => (
              <div key={idx} className={`${item.colSpan} ${item.bg} rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all p-8 flex min-h-[240px]`}>
                <div className={`flex flex-col justify-between relative z-10 w-[55%] shrink-0 ${item.dark ? 'text-white' : 'text-black'}`}>
                    <div>
                        <div className="mb-4">{item.icon}</div>
                        <h4 className="text-2xl font-medium mb-3 font-display leading-tight">{item.title}</h4>
                        <p className={`${item.dark ? "text-gray-300" : "text-gray-600"} font-text text-sm leading-relaxed`}>{item.desc}</p>
                    </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-[45%] h-full pointer-events-none">
                    <img src={item.image} alt={item.title} className={`w-full h-full object-cover object-center ${item.dark ? '' : 'mix-blend-multiply'}`} loading="lazy" />
                
              
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="industries" className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-5xl font-medium mb-12 text-center md:text-left font-display">{t.industries.title}</h2>
            
            <div className="md:hidden relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl mx-6 my-8">
              <motion.div key={activeIndustryIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${industries[activeIndustryIndex].image})` }} />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                 <button onClick={prevIndustry} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40"><ChevronLeft className="w-5 h-5"/></button>
                 <button onClick={nextIndustry} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40"><ChevronRight className="w-5 h-5"/></button>
              </div>
              <button onClick={() => setShowMobileOverlay(true)} className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse z-10"><Plus className="w-6 h-6 text-black" /></button>
              <AnimatePresence>
                {showMobileOverlay && (
                  <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(10px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="absolute inset-0 bg-black/80 z-20 p-8 flex flex-col justify-center text-white">
                    <button onClick={() => setShowMobileOverlay(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
                    <span className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-4 font-text">{industries[activeIndustryIndex].category}</span>
                    <h3 className="text-2xl font-medium mb-6 leading-tight font-display">{industries[activeIndustryIndex].title}</h3>
                    <ul className="space-y-4">{industries[activeIndustryIndex].points.map((pt, i) => (<li key={i} className="flex gap-3 text-sm text-gray-300 font-text"><ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-white" />{pt}</li>))}</ul>
                    <button className="mt-8 py-3 px-6 border border-white rounded-full w-fit hover:bg-white hover:text-black transition font-text">{t.nav.contact}</button>
                  </motion.div>
                )}
              </AnimatePresence>
              {!showMobileOverlay && (<div className="absolute bottom-24 left-6 max-w-[70%]"><h3 className="text-white font-bold text-xl drop-shadow-md font-display">{industries[activeIndustryIndex].category}</h3></div>)}
            </div>
            
            <div className="hidden md:block">
              <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl mb-8">
                 <AnimatePresence mode='wait'>
                    <motion.div key={activeIndustryIndex} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${industries[activeIndustryIndex].image})` }} />
                 </AnimatePresence>
                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                 <div className="absolute top-0 left-0 h-full w-1/2 p-16 flex flex-col justify-center text-white">
                    <motion.div key={activeIndustryIndex} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                      <h3 className="text-4xl font-medium mb-6 leading-tight font-display">{industries[activeIndustryIndex].title}</h3>
                      <ul className="space-y-4 mb-8">{industries[activeIndustryIndex].points.map((pt, i) => (<li key={i} className="flex gap-3 text-lg text-gray-200 font-text"><ChevronRight className="w-5 h-5 shrink-0 mt-1" />{pt}</li>))}</ul>
                      <button className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition font-medium font-text">{t.nav.contact}</button>
                    </motion.div>
                 </div>
              </div>
              <div className="flex border-b border-gray-300">
                {industries.map((ind, idx) => (
                  <button key={ind.id} onClick={() => setActiveIndustryIndex(idx)} className={`flex-1 py-6 text-left px-4 transition-all duration-300 border-b-4 ${activeIndustryIndex === idx ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                    <span className="text-lg font-medium font-display">{ind.category}</span>
                    <p className="text-sm mt-1 truncate hidden lg:block font-text">{ind.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="pt-24 pb-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 text-center">
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-12 font-display">{t.catalog.title}</h2>
             <button className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition font-text">{t.catalog.cta}</button>
          </div>

        {/* --- RANGÉE 1 --- */}
<div className="flex mb-8">
  <motion.div 
    className="flex gap-6 pr-6" 
    initial={{ x: "0%" }} 
    animate={{ x: "-50%" }} // Défile vers la gauche
    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
  >
    {/* CORRECTION ICI : Utilisez duplicatedRow1 */}
    {duplicatedRow1.map((img, idx) => (
      <div key={`row1-${idx}`} className="shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
        <img src={img} alt="Perfume" className="w-full h-full object-cover" loading="lazy" />
      </div>
    ))}
  </motion.div>
</div>

{/* --- RANGÉE 2 --- */}
<div className="flex">
  <motion.div 
    className="flex gap-6 pr-6" 
    initial={{ x: "-50%" }} 
    animate={{ x: "0%" }} // Défile vers la droite (sens inverse)
    transition={{ repeat: Infinity, ease: "linear", duration: 35 }} // Vitesse légèrement différente
  >
    {/* CORRECTION ICI : Utilisez duplicatedRow2 */}
    {duplicatedRow2.map((img, idx) => (
      <div key={`row2-${idx}`} className="shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
        <img src={img} alt="Perfume" className="w-full h-full object-cover" loading="lazy" />
      </div>
    ))}
  </motion.div>
</div>
        </section>

        <section id="testimonials" className="bg-white py-24 border-t border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center">
             <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 font-text">{t.testimonials.trusted}</div>
             <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-black font-display">{t.testimonials.title}</h2>
          </div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
             <div className="relative flex justify-center gap-6 max-h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <TestimonialsColumn testimonials={testimonials.slice(0, 2)} duration={40} />
                <TestimonialsColumn testimonials={testimonials.slice(2, 4)} className="hidden md:block pt-12" duration={50} />
                <TestimonialsColumn testimonials={testimonials.slice(0, 2)} className="hidden lg:block" duration={45} />
             </div>
          </div>
        </section>

        <section id="b2b" className="bg-white py-24 border-t border-gray-100">
           <div className="max-w-5xl mx-auto px-4 sm:px-6">
             <div className="text-center mb-16">
                 <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 shadow-sm font-text">{t.b2b.badge}</div>
                 <h2 className="text-3xl sm:text-5xl font-medium tracking-tight mb-12 font-display">{t.b2b.title}</h2>
                 <p className="text-gray-600 max-w-xl mx-auto font-text">{t.b2b.subtitle}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                   className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-300"
                 >
                     <div>
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-8">
                           <Store className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-2xl font-medium uppercase mb-4 tracking-tight font-display">{t.b2b.partner_title}</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-sm font-text">
                           {t.b2b.partner_desc}
                        </p>
                        <ul className="space-y-4 mb-8">
                           {t.b2b.partner_points.map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700 font-text">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                   <Check className="w-3 h-3 text-green-600" strokeWidth={4} />
                                </div>
                                {item}
                             </li>
                           ))}
                        </ul>
                     </div>
                     <button className="w-full py-4 rounded-full border-2 border-black font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300 font-text">
                        {t.b2b.partner_cta}
                     </button>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-black text-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col justify-between h-full hover:scale-[1.02] transition-transform duration-300"
                  >
                     <div>
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8">
                           <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-medium uppercase mb-4 tracking-tight font-display">{t.b2b.investor_title}</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed text-sm font-text">
                           {t.b2b.investor_desc}
                        </p>
                        <ul className="space-y-4 mb-8">
                           {t.b2b.investor_points.map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200 font-text">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                   <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                </div>
                                {item}
                             </li>
                           ))}
                        </ul>
                     </div>
                     <button className="w-full py-4 rounded-full bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors duration-300 font-text">
                        {t.b2b.investor_cta}
                     </button>
                  </motion.div>
             </div>
           </div>
        </section>
      </main>

      <footer className="md:rounded-t-[3rem] relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-gray-100 bg-white/50 backdrop-blur-sm px-6 py-12 lg:py-16 mt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            <div className="bg-black/5 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm" />
            <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                <AnimatedContainer className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Hexagon className="size-8 text-black" />
                        <span className="font-medium text-xl tracking-tighter uppercase font-display">RIM Parfums</span>
                    </div>
                    <p className="text-gray-600 mt-8 text-sm md:mt-0 max-w-xs leading-relaxed font-text">
                        {t.footer.rights} <br/>
                        © {new Date().getFullYear()} RIM Parfums. All rights reserved.
                    </p>
                </AnimatedContainer>
                <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
                    {footerLinksData.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <div className="mb-10 md:mb-0">
                                <h3 className="text-xs font-medium uppercase tracking-wider text-black mb-4 font-display">{section.label}</h3>
                                <ul className="space-y-3 text-sm text-gray-500 font-text">
                                    {section.links.map((link: any) => (
                                        <li key={link.title}>
                                            <a
                                                href={link.href}
                                                className="hover:text-black hover:translate-x-1 inline-flex items-center transition-all duration-300"
                                            >
                                                {link.icon && <link.icon className="me-2 size-4" />}
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>

    </div>
  );
}