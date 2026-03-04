/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Info
} from "lucide-react";
import { useState, useEffect, MouseEvent, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e: MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "/", onClick: handleHomeClick },
    { name: "The Estate", href: isHomePage ? "#estate" : "/#estate" },
    { name: "Our Horses", href: isHomePage ? "#horses" : "/#horses" },
    { name: "Genetics", href: isHomePage ? "#genetics" : "/#genetics" },
    { name: "Shows", href: isHomePage ? "#shows" : "/#shows" },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled || !isHomePage ? "bg-cream/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link 
            to="/" 
            onClick={handleHomeClick}
            className={`text-2xl font-serif tracking-[0.3em] uppercase ${isScrolled || !isHomePage ? "text-ink" : "text-white"}`}
          >
            AZ Equuz
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              onClick={link.onClick}
              className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-all hover:text-gold relative group ${
                isScrolled || !isHomePage ? "text-ink" : "text-white"
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button className={`text-[10px] uppercase tracking-[0.3em] font-bold border px-6 py-2.5 transition-all ${
            isScrolled || !isHomePage ? "border-ink text-ink hover:bg-ink hover:text-white" : "border-white text-white hover:bg-white hover:text-ink"
          }`}>
            Book a Tour
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className={isScrolled || !isHomePage ? "text-ink" : "text-white"} /> : <Menu className={isScrolled || !isHomePage ? "text-ink" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-cream border-t border-ink/5 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="text-xs uppercase tracking-[0.3em] font-medium text-ink py-2 border-b border-ink/5"
                  onClick={(e) => {
                    if (link.onClick) link.onClick(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Hero Background with Parallax Effect */}
      <motion.div 
        style={{ y: smoothY, scale: smoothScale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://www.dropbox.com/scl/fi/vl3ees3pb74yew3e8nprd/main-1-compressed.jpg?rlkey=he8d7hsy9lgy9dycfelr3x0cj&st=dopte6wa&raw=1" 
          alt="AZ Equuz Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/50"></div>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">San Antonio, Texas</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl text-white font-serif mb-8 leading-[0.9] tracking-tight text-balance"
        >
          Rustic Soul.<br />
          <span className="italic font-display font-light">Opulent Spirit.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-white/70 text-sm md:text-base font-light tracking-[0.4em] uppercase mb-12 max-w-2xl mx-auto"
        >
          Elite Sales & Genetics at Reign Valley Estate
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => document.getElementById('estate')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gold text-ink px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500 opulent-shadow"
          >
            Explore The Estate
          </button>
          <button 
            onClick={() => navigate("/horses")}
            className="text-white text-[10px] uppercase tracking-[0.4em] font-bold flex items-center group"
          >
            View Our Horses
            <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/30 text-[8px] uppercase tracking-[0.5em] mb-4">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  return (
    <section id="estate" ref={containerRef} className="py-32 md:py-48 px-8 bg-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ink/[0.02] -skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <motion.div {...fadeIn}>
              <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">The Legacy</span>
              <h2 className="text-5xl md:text-6xl text-ink mb-10 leading-[1.1] font-serif">
                Where the West <br />
                <span className="italic font-display">Meets Luxury</span>
              </h2>
              <div className="space-y-8 text-ink/70 leading-relaxed font-light text-lg">
                <p>
                  AZ Equuz at Reign Valley Ranch is the pinnacle of equine excellence. We specialize in the acquisition, maintenance, and elite breeding of the world's finest Spanish and Arabian bloodlines.
                </p>
                <p>
                  Our mission is to preserve the majesty of these noble breeds while advancing the future of the sport through our world-class genetics program and state-of-the-art stallion station.
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-2 gap-8">
                <div>
                  <span className="block text-3xl font-serif text-ink mb-1">500+</span>
                  <span className="block text-[10px] uppercase tracking-widest text-gold font-bold">Pristine Acres</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif text-ink mb-1">24/7</span>
                  <span className="block text-[10px] uppercase tracking-widest text-gold font-bold">Elite Care</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-10">
              <motion.div 
                {...fadeIn}
                style={{ y: smoothY1 }}
                transition={{ ...fadeIn.transition, delay: 0.2 }}
                className="col-span-7 image-zoom-container aspect-[4/5] opulent-shadow"
              >
                <img 
                  src="https://www.dropbox.com/scl/fi/h95r6ezcy5ozqpu555nu1/main-2-compressed.jpg?rlkey=e69bubon4fwyhpndt2ja1uhio&st=6c8yopjt&raw=1" 
                  alt="AZ Equuz Heritage" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div 
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.4 }}
                className="col-span-5"
              >
                <motion.div style={{ y: smoothY2 }} className="aspect-[2/3] image-zoom-container opulent-shadow">
                  <img 
                    src="https://www.dropbox.com/scl/fi/zx0e3syxcfdkg6bbdhzi8/main-3-compressed.jpg?rlkey=aykao1kmvcu2wgnieqcx7efy4&st=lsrah1cl&raw=1" 
                    alt="Elite Horse Detail" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type Horse = {
  name: string;
  breed: string;
  image: string;
  age: string;
  gender: string;
  height: string;
  description: string;
  pedigree: {
    sire: string;
    dam: string;
    grandSire1: string;
    grandDam1: string;
    grandSire2: string;
    grandDam2: string;
  };
};

const HorseModal = ({ horse, onClose }: { horse: Horse | null, onClose: () => void }) => {
  if (!horse) return null;

  return (
    <AnimatePresence>
      {horse && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" onClick={onClose}></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-cream w-full max-w-6xl max-h-[90vh] overflow-y-auto opulent-shadow rounded-sm flex flex-col lg:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-ink text-white hover:bg-gold hover:text-ink transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left: Image */}
            <div className="lg:w-1/2 h-[400px] lg:h-auto">
              <img 
                src={horse.image} 
                alt={horse.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right: Details */}
            <div className="lg:w-1/2 p-8 md:p-16">
              <div className="mb-12">
                <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">{horse.breed}</span>
                <h2 className="text-5xl md:text-6xl text-ink font-serif mb-6">{horse.name}</h2>
                <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-widest font-bold text-ink/40">
                  <div className="flex flex-col gap-1">
                    <span className="text-gold/60">Age</span>
                    <span className="text-ink">{horse.age}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gold/60">Gender</span>
                    <span className="text-ink">{horse.gender}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gold/60">Height</span>
                    <span className="text-ink">{horse.height}</span>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-ink mb-4 border-b border-ink/10 pb-2">Description</h3>
                <p className="text-ink/70 font-light leading-relaxed italic">
                  "{horse.description}"
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-ink mb-6 border-b border-ink/10 pb-2">Pedigree Tree</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-ink/5 border-l-2 border-gold">
                      <span className="block text-[8px] uppercase tracking-widest text-gold mb-1">Sire</span>
                      <span className="text-sm font-serif text-ink">{horse.pedigree.sire}</span>
                    </div>
                    <div className="p-4 bg-ink/5 border-l-2 border-gold/30 ml-4">
                      <span className="block text-[8px] uppercase tracking-widest text-gold/60 mb-1">Grand-Sire</span>
                      <span className="text-xs font-serif text-ink/60">{horse.pedigree.grandSire1}</span>
                    </div>
                    <div className="p-4 bg-ink/5 border-l-2 border-gold/30 ml-4">
                      <span className="block text-[8px] uppercase tracking-widest text-gold/60 mb-1">Grand-Dam</span>
                      <span className="text-xs font-serif text-ink/60">{horse.pedigree.grandDam1}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-ink/5 border-l-2 border-gold">
                      <span className="block text-[8px] uppercase tracking-widest text-gold mb-1">Dam</span>
                      <span className="text-sm font-serif text-ink">{horse.pedigree.dam}</span>
                    </div>
                    <div className="p-4 bg-ink/5 border-l-2 border-gold/30 ml-4">
                      <span className="block text-[8px] uppercase tracking-widest text-gold/60 mb-1">Grand-Sire</span>
                      <span className="text-xs font-serif text-ink/60">{horse.pedigree.grandSire2}</span>
                    </div>
                    <div className="p-4 bg-ink/5 border-l-2 border-gold/30 ml-4">
                      <span className="block text-[8px] uppercase tracking-widest text-gold/60 mb-1">Grand-Dam</span>
                      <span className="text-xs font-serif text-ink/60">{horse.pedigree.grandDam2}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a 
                href={`mailto:concierge@azequuz.com?subject=Inquiry about ${horse.name}`}
                className="mt-16 w-full bg-ink text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all duration-500 block text-center"
              >
                Inquire About {horse.name}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HorseCard = ({ horse, index, onOpenPedigree }: { horse: Horse, index: number, onOpenPedigree: (horse: Horse) => void, key?: any }) => (
  <motion.div 
    variants={fadeIn}
    className="group cursor-pointer"
  >
    <div className="image-zoom-container aspect-[3/4] mb-8 opulent-shadow">
      <img 
        src={horse.image} 
        alt={horse.name} 
        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-leather/0 group-hover:bg-leather/10 transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-ink/80 to-transparent">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenPedigree(horse);
          }}
          className="w-full bg-white text-ink py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors"
        >
          View Pedigree
        </button>
      </div>
    </div>
    <div className="px-2">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-3xl text-ink font-serif">{horse.name}</h3>
        <span className="text-gold text-[10px] font-bold uppercase tracking-widest">#{index + 1}</span>
      </div>
      <p className="text-ink/40 text-[10px] uppercase tracking-[0.3em] font-medium">{horse.breed}</p>
    </div>
  </motion.div>
);

const Genetics = () => {
  return (
    <section id="genetics" className="py-32 md:py-48 px-8 bg-ink text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <img 
          src="https://images.pexels.com/photos/2123383/pexels-photo-2123383.jpeg?auto=compress&cs=tinysrgb&w=1920&grayscale=1" 
          alt="Genetics Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeIn}>
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Equine Genetics</span>
            <h2 className="text-5xl md:text-6xl mb-10 leading-[1.1] font-serif">
              The Future of <br />
              <span className="italic font-display text-gold">The Bloodline</span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
              AZ Equuz offers exclusive access to the most coveted Spanish and Arabian genetics. Our stallion station provides premium frozen and chilled semen from champions, ensuring the legacy of excellence continues in your stable.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold transition-all duration-500">
                  <ArrowRight className="w-4 h-4 text-gold group-hover:text-ink" />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2">Stallion Services</h4>
                  <p className="text-white/40 text-sm font-light">Comprehensive breeding management and semen collection.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold transition-all duration-500">
                  <ArrowRight className="w-4 h-4 text-gold group-hover:text-ink" />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2">Genetic Consultation</h4>
                  <p className="text-white/40 text-sm font-light">Expert analysis to optimize your breeding program's potential.</p>
                </div>
              </div>
            </div>
            
            <button className="mt-16 bg-gold text-ink px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500">
              Download Genetics Catalog
            </button>
          </motion.div>
          
          <motion.div 
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[4/5] image-zoom-container opulent-shadow border border-white/10">
              <img 
                src="https://images.pexels.com/photos/2123382/pexels-photo-2123382.jpeg?auto=compress&cs=tinysrgb&w=1000" 
                alt="Elite Stallion" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-gold p-12 hidden md:block">
              <span className="block text-4xl font-serif text-ink mb-1">99%</span>
              <span className="block text-[10px] uppercase tracking-widest text-ink/60 font-bold">Fertility Success</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Horses = () => {
  const navigate = useNavigate();
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  const horses: Horse[] = [
    { 
      name: "Midnight King", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/161511/pexels-photo-161511.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "6 Years",
      gender: "Stallion",
      height: "15.1 HH",
      description: "A majestic stallion with a fiery spirit and impeccable Arabian conformation. Midnight King is a proven champion in endurance and halter.",
      pedigree: {
        sire: "Desert Storm",
        dam: "Moonlit Rose",
        grandSire1: "Sand Chaser",
        grandDam1: "Oasis Queen",
        grandSire2: "Star Gazer",
        grandDam2: "Night Lily"
      }
    },
    { 
      name: "Texas Star", 
      breed: "Spanish P.R.E.", 
      image: "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "8 Years",
      gender: "Gelding",
      height: "16.2 HH",
      description: "The epitome of Spanish elegance. Texas Star possesses the classic P.R.E. movement and a gentle, willing temperament perfect for dressage.",
      pedigree: {
        sire: "Andaluz Pride",
        dam: "Sevilla Belle",
        grandSire1: "Iberian King",
        grandDam1: "Castilian Rose",
        grandSire2: "Noble Spirit",
        grandDam2: "Spanish Dancer"
      }
    },
    { 
      name: "Reign Maker", 
      breed: "Spanish P.R.E.", 
      image: "https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "5 Years",
      gender: "Stallion",
      height: "16.0 HH",
      description: "A young stallion with immense potential. Reign Maker shows incredible promise in high-school dressage and possesses a striking presence.",
      pedigree: {
        sire: "Royal Guard",
        dam: "Legacy Queen",
        grandSire1: "Emperor's Choice",
        grandDam1: "Golden Mane",
        grandSire2: "Silver Shadow",
        grandDam2: "Velvet Touch"
      }
    },
    { 
      name: "Valley Ghost", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "4 Years",
      gender: "Mare",
      height: "14.3 HH",
      description: "An ethereal beauty with exceptional movement. Valley Ghost is a descendant of legendary Arabian bloodlines and shows great athletic ability.",
      pedigree: {
        sire: "Wind Walker",
        dam: "Desert Pearl",
        grandSire1: "Sky Dancer",
        grandDam1: "Cloud Nine",
        grandSire2: "Dune Runner",
        grandDam2: "Sand Jewel"
      }
    }
  ];

  return (
    <section id="horses" className="py-32 md:py-48 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div {...fadeIn}>
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Elite Bloodlines</span>
            <h2 className="text-5xl md:text-6xl text-ink font-serif">The Reigning <br /><span className="italic font-display">Collection</span></h2>
          </motion.div>
          <motion.div {...fadeIn} className="max-w-md">
            <p className="text-ink/60 font-light leading-relaxed mb-12">
              Our horses are hand-selected for their temperament, athleticism, and impeccable lineage. Discover the next champion for your stable.
            </p>
            <button 
              onClick={() => navigate("/horses")}
              className="bg-gold text-ink px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-ink hover:text-white transition-all duration-500 opulent-shadow"
            >
              View Available Horses
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {horses.map((horse, idx) => (
            <HorseCard key={idx} index={idx} horse={horse} onOpenPedigree={setSelectedHorse} />
          ))}
        </motion.div>
      </div>
      <HorseModal horse={selectedHorse} onClose={() => setSelectedHorse(null)} />
    </section>
  );
};

const HorsesPage = () => {
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const horses: Horse[] = [
    { 
      name: "Midnight King", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/161511/pexels-photo-161511.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "6 Years",
      gender: "Stallion",
      height: "15.1 HH",
      description: "A majestic stallion with a fiery spirit and impeccable Arabian conformation.",
      pedigree: { sire: "Desert Storm", dam: "Moonlit Rose", grandSire1: "Sand Chaser", grandDam1: "Oasis Queen", grandSire2: "Star Gazer", grandDam2: "Night Lily" }
    },
    { 
      name: "Desert Rose", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/1524620/pexels-photo-1524620.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "5 Years",
      gender: "Mare",
      height: "14.2 HH",
      description: "A graceful mare with a gentle soul and exceptional endurance capabilities.",
      pedigree: { sire: "Sun King", dam: "Desert Flower", grandSire1: "Solar Flare", grandDam1: "Morning Dew", grandSire2: "Dune King", grandDam2: "Sand Rose" }
    },
    { 
      name: "Texas Star", 
      breed: "Spanish P.R.E.", 
      image: "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "8 Years",
      gender: "Gelding",
      height: "16.2 HH",
      description: "The epitome of Spanish elegance with powerful movement and a willing heart.",
      pedigree: { sire: "Andaluz Pride", dam: "Sevilla Belle", grandSire1: "Iberian King", grandDam1: "Castilian Rose", grandSire2: "Noble Spirit", grandDam2: "Spanish Dancer" }
    },
    { 
      name: "Reign Maker", 
      breed: "Spanish P.R.E.", 
      image: "https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "5 Years",
      gender: "Stallion",
      height: "16.0 HH",
      description: "A young stallion showing immense promise in high-school dressage.",
      pedigree: { sire: "Royal Guard", dam: "Legacy Queen", grandSire1: "Emperor's Choice", grandDam1: "Golden Mane", grandSire2: "Silver Shadow", grandDam2: "Velvet Touch" }
    },
    { 
      name: "Valley Ghost", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "4 Years",
      gender: "Mare",
      height: "14.3 HH",
      description: "An ethereal beauty with exceptional movement and a descendant of legends.",
      pedigree: { sire: "Wind Walker", dam: "Desert Pearl", grandSire1: "Sky Dancer", grandDam1: "Cloud Nine", grandSire2: "Dune Runner", grandDam2: "Sand Jewel" }
    },
    { 
      name: "Sands of Time", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/2123382/pexels-photo-2123382.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "7 Years",
      gender: "Stallion",
      height: "15.0 HH",
      description: "A powerful Arabian stallion with a history of success in the show ring.",
      pedigree: { sire: "Time Keeper", dam: "Golden Sand", grandSire1: "Chronos", grandDam1: "Hour Glass", grandSire2: "Desert King", grandDam2: "Sun Jewel" }
    },
    { 
      name: "Oasis Dream", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "6 Years",
      gender: "Mare",
      height: "14.1 HH",
      description: "A dream to ride and a beauty to behold, perfect for the discerning owner.",
      pedigree: { sire: "Mirage", dam: "Oasis Queen", grandSire1: "Illusion", grandDam1: "Fata Morgana", grandSire2: "Water Lord", grandDam2: "Palm Lily" }
    },
    { 
      name: "Dune Walker", 
      breed: "Purebred Arabian", 
      image: "https://images.pexels.com/photos/52500/pexels-photo-52500.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "5 Years",
      gender: "Gelding",
      height: "15.2 HH",
      description: "An athletic gelding with a great work ethic and smooth, ground-covering gaits.",
      pedigree: { sire: "Sand Walker", dam: "Dune Rose", grandSire1: "Desert Fox", grandDam1: "Cactus Flower", grandSire2: "Wind Rider", grandDam2: "Dusty Road" }
    }
  ];

  return (
    <div className="pt-32 pb-48 px-8 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeIn} className="text-center mb-32">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">The Full Collection</span>
          <h1 className="text-6xl md:text-8xl text-ink font-serif mb-8">Available <span className="italic font-display">Horses</span></h1>
          <p className="text-ink/60 font-light max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of elite Spanish and Arabian horses. Each individual represents the pinnacle of their breed's standards and our commitment to excellence.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="whileInView"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24"
        >
          {horses.map((horse, idx) => (
            <HorseCard key={idx} index={idx} horse={horse} onOpenPedigree={setSelectedHorse} />
          ))}
        </motion.div>
      </div>
      <HorseModal horse={selectedHorse} onClose={() => setSelectedHorse(null)} />
    </div>
  );
};

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Horses />
      <Genetics />
      <Shows />
    </>
  );
};

const Shows = () => {
  const events = [
    { date: "MAR 15", time: "10:00 AM", name: "Spring Arabian Showcase", location: "Main Arena" },
    { date: "APR 02", time: "02:00 PM", name: "Texas Heritage Exhibition", location: "West Paddock" },
    { date: "MAY 12", time: "11:30 AM", name: "Reign Valley Invitational", location: "Grand Stadium" },
    { date: "JUN 20", time: "06:00 PM", name: "Sunset Equine Gala", location: "Riverside Arena" }
  ];

  return (
    <section id="shows" className="py-32 md:py-48 px-8 bg-cream border-y border-ink/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.div {...fadeIn}>
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Events Calendar</span>
            <h2 className="text-5xl md:text-6xl text-ink font-serif mb-8">Upcoming Showcases</h2>
            <div className="w-24 h-[1px] bg-gold mx-auto"></div>
          </motion.div>
        </div>

        <div className="space-y-0">
          {events.map((event, idx) => (
            <motion.div 
              key={idx}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row items-center justify-between py-12 border-b border-ink/10 last:border-0 hover:bg-white/40 px-8 transition-all duration-500 rounded-lg"
            >
              <div className="flex flex-col md:flex-row items-center md:space-x-16 mb-8 md:mb-0 text-center md:text-left">
                <div className="mb-4 md:mb-0">
                  <span className="block text-4xl font-serif text-ink mb-1">{event.date.split(' ')[1]}</span>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-gold font-bold">{event.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl text-ink group-hover:text-gold transition-colors font-serif mb-2">{event.name}</h4>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-[10px] text-ink/40 uppercase tracking-[0.2em] font-medium">
                    <span>{event.time}</span>
                    <span className="w-1 h-1 bg-gold rounded-full"></span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto bg-ink text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-ink transition-all duration-500 opulent-shadow">
                RSVP / VIP Booking
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-ink text-white pt-32 pb-16 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-4">
            <span className="text-4xl font-serif tracking-[0.3em] uppercase mb-10 block">AZ Equuz</span>
            <p className="text-white/40 font-light leading-relaxed mb-12 text-lg">
              Elite sales, maintenance, and genetics at Reign Valley Ranch. Preserving the legacy of Spanish and Arabian excellence.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-white/30 hover:text-gold transition-all transform hover:-translate-y-1"><Instagram size={24} /></a>
              <a href="#" className="text-white/30 hover:text-gold transition-all transform hover:-translate-y-1"><Facebook size={24} /></a>
              <a href="#" className="text-white/30 hover:text-gold transition-all transform hover:-translate-y-1"><Twitter size={24} /></a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-gold">The Ranch</h5>
            <ul className="space-y-6 text-white/50 font-light">
              <li className="flex items-start">
                <MapPin size={20} className="mr-4 text-gold shrink-0" />
                <span className="text-sm leading-relaxed">San Antonio, TX<br />Reign Valley Ranch Estate</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-4 text-gold shrink-0" />
                <span className="text-sm">+1 (210) 555-EQUUZ</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-4 text-gold shrink-0" />
                <span className="text-sm">concierge@azequuz.com</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-gold">Navigation</h5>
            <ul className="space-y-6 text-white/50 font-light text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">The Ranch</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Our Horses</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Shows & Events</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Private Viewing</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-gold">Exclusive Access</h5>
            <p className="text-white/40 font-light text-sm mb-8">
              Join our inner circle for first access to new acquisitions and private events.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border-b border-white/10 py-4 px-0 text-sm focus:outline-none focus:border-gold transition-all"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-all">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">
            © 2026 AZ Equuz at Reign Valley Ranch. All Rights Reserved.
          </p>
          <div className="flex space-x-12 text-[9px] uppercase tracking-[0.4em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-[100] bg-emerald-950 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif tracking-[0.4em] uppercase text-gold">
            AZ Equuz
          </h1>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto mt-6"></div>
        </motion.div>

        <div className="flex justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-gold"
            />
          ))}
        </div>
      </motion.div>
      
      {/* Decorative corners */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute top-12 left-12 w-24 h-24 border-t border-l border-gold"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-gold"
      />
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <div className={`min-h-screen selection:bg-gold selection:text-ink transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/horses" element={<HorsesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
