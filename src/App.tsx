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
  ChevronLeft,
  Menu,
  X,
  ArrowRight,
  Info,
  Images
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
    { name: "Gallery", href: "/gallery" },
    { name: "Genetics", href: isHomePage ? "#genetics" : "/#genetics" },
    { name: "Bloodlines", href: isHomePage ? "#bloodlines" : "/#bloodlines" },
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

const VideoSection = () => {
  return (
    <section className="relative w-full bg-ink overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-8 py-24 md:py-32 flex flex-col items-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-6 mb-10"
        >
          <div className="w-12 h-[1px] bg-gold/60" />
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">AZ Equuz — Our Story</span>
          <div className="w-12 h-[1px] bg-gold/60" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl text-white font-serif text-center mb-16 leading-tight tracking-tight"
        >
          Where Heritage <span className="italic font-display font-light text-gold">Meets Excellence</span>
        </motion.h2>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl relative"
        >
          {/* Decorative corner accents */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-gold/60 z-10" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t border-r border-gold/60 z-10" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-gold/60 z-10" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-gold/60 z-10" />

          {/* Glow effect */}
          <div className="absolute inset-0 -m-1 rounded-sm bg-gold/5 blur-xl" />

          {/* iframe wrapper for 16:9 */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/OD7P3Z8aJ5o?rel=0&modestbranding=1&color=white"
              title="AZ Equuz — Our Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-white/40 text-xs uppercase tracking-[0.4em] mt-14"
        >
          San Antonio, Texas · Reign Valley Estate
        </motion.p>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
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
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });

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

              <div className="mt-12">
                <Link to="/gallery">
                  <motion.button
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3 }}
                    className="group flex items-center gap-4 text-ink"
                  >
                    <span className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-colors duration-300">
                      <Images size={16} className="text-gold group-hover:text-ink transition-colors duration-300" />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.4em] font-bold">Visit Our Gallery</span>
                    <ArrowRight size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7">
            <motion.div 
              {...fadeIn}
              style={{ y: smoothY1 }}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] image-zoom-container opulent-shadow overflow-hidden group">
                <img 
                  src="https://www.dropbox.com/scl/fi/h95r6ezcy5ozqpu555nu1/main-2-compressed.jpg?rlkey=e69bubon4fwyhpndt2ja1uhio&st=6c8yopjt&raw=1" 
                  alt="AZ Equuz Heritage" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Elegant Overlay Detail */}
                <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 z-20">
                  <span className="text-white/40 text-[8px] uppercase tracking-[1em] font-light">Est. 1994</span>
                </div>
              </div>
              
              {/* Decorative Floating Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-gold/20 -z-10 hidden lg:block"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/5 -z-10 hidden lg:block"></div>
            </motion.div>
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
  ueln?: string;
  birthDate?: string;
  coat?: string;
  igg?: string;
  offspringCount?: number;
  offspring?: string[];
  registryUrl?: string;
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
            className="relative bg-cream w-full max-w-6xl max-h-[90vh] opulent-shadow rounded-sm flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-ink text-white hover:bg-gold hover:text-ink transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left: Image */}
            <div className="lg:w-1/2 h-[55vw] max-h-[320px] lg:max-h-none lg:h-auto shrink-0">
              <img
                src={horse.image}
                alt={horse.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right: Details */}
            <div className="lg:w-1/2 p-7 md:p-10 lg:p-14 lg:overflow-y-auto flex flex-col">

              {/* Header */}
              <div className="mb-10">
                <span className="text-gold text-[9px] uppercase tracking-[0.6em] font-bold mb-3 block">{horse.breed}</span>
                <h2 className="text-5xl md:text-6xl text-ink font-serif mb-8 leading-tight">{horse.name}</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-4 bg-ink/[0.03] border border-ink/[0.07]">
                    <span className="block text-[8px] uppercase tracking-[0.35em] text-gold/70 mb-1.5">Born</span>
                    <span className="text-sm font-medium text-ink">{horse.birthDate || horse.age}</span>
                  </div>
                  <div className="p-4 bg-ink/[0.03] border border-ink/[0.07]">
                    <span className="block text-[8px] uppercase tracking-[0.35em] text-gold/70 mb-1.5">Sex</span>
                    <span className="text-sm font-medium text-ink">{horse.gender}</span>
                  </div>
                  <div className="p-4 bg-ink/[0.03] border border-ink/[0.07]">
                    <span className="block text-[8px] uppercase tracking-[0.35em] text-gold/70 mb-1.5">Coat</span>
                    <span className="text-sm font-medium text-ink">{horse.coat || horse.height}</span>
                  </div>
                  {horse.ueln && (
                    <div className="p-4 bg-ink/[0.03] border border-ink/[0.07]">
                      <span className="block text-[8px] uppercase tracking-[0.35em] text-gold/70 mb-1.5">UELN</span>
                      <span className="text-xs font-mono text-ink">{horse.ueln}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Genetic Index bar */}
              {horse.igg && (
                <div className="mb-10 bg-ink text-white p-6 flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.4em] text-gold mb-2">Global Genetic Index</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-serif">{horse.igg}</span>
                      <span className="text-white/30 text-[8px] uppercase tracking-widest">IGG · Alta Fiabilidad</span>
                    </div>
                  </div>
                  {horse.offspringCount !== undefined && (
                    <div className="text-right border-l border-white/10 pl-6">
                      <span className="block text-[8px] uppercase tracking-[0.4em] text-gold mb-2">Offspring</span>
                      <span className="text-4xl font-serif">{horse.offspringCount}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-10">
                <p className="text-ink/60 font-light leading-relaxed text-sm border-l-2 border-gold/30 pl-5 italic">
                  {horse.description}
                </p>
              </div>

              {/* Purebred Lineage */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-ink whitespace-nowrap">Purebred Lineage</span>
                  <div className="flex-1 h-px bg-ink/10"></div>
                  <span className="text-[8px] text-gold uppercase tracking-widest whitespace-nowrap">P.R.E. · Spain</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Sire (Father)", value: horse.pedigree.sire, accent: "bg-gold" },
                    { label: "Dam (Mother)", value: horse.pedigree.dam, accent: "bg-gold/50" },
                    { label: "Paternal Heritage", value: horse.pedigree.grandSire1, accent: "bg-gold/20" },
                    { label: "Maternal Heritage", value: horse.pedigree.grandSire2, accent: "bg-gold/20" },
                    { label: "Extended Lineage", value: horse.pedigree.grandDam1, accent: "bg-gold/10" },
                    { label: "Extended Lineage", value: horse.pedigree.grandDam2, accent: "bg-gold/10" },
                  ].filter(l => l.value && l.value !== "—").map((line, i) => (
                    <div key={i} className="flex">
                      <div className={`w-1 shrink-0 ${line.accent}`}></div>
                      <div className="p-3.5 bg-ink/[0.03] border border-ink/[0.06] border-l-0 flex-1 min-w-0">
                        <span className="block text-[8px] uppercase tracking-[0.3em] text-gold/50 mb-1">{line.label}</span>
                        <span className="text-xs font-serif text-ink/80 leading-snug">{line.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offspring */}
              {horse.offspring && horse.offspring.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-ink whitespace-nowrap">Notable Offspring</span>
                    <div className="flex-1 h-px bg-ink/10"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {horse.offspring.map((name, i) => (
                      <span key={i} className="text-[8px] uppercase tracking-[0.25em] text-ink/60 border border-ink/10 px-3 py-1.5 font-medium hover:border-gold/40 hover:text-ink transition-colors">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto pt-6 flex flex-col gap-3">
                <a
                  href={`mailto:concierge@azequuz.com?subject=Inquiry about ${horse.name}`}
                  className="w-full bg-ink text-white py-5 text-[9px] uppercase tracking-[0.45em] font-bold hover:bg-gold hover:text-ink transition-all duration-500 block text-center"
                >
                  Inquire About {horse.name}
                </a>
                {horse.registryUrl && (
                  <a
                    href={horse.registryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-ink/20 text-ink/60 py-4 text-[9px] uppercase tracking-[0.45em] font-bold hover:border-ink hover:text-ink transition-all duration-500 block text-center"
                  >
                    View Official ANCCE Registry
                  </a>
                )}
              </div>
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
      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-0 opacity-100 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-ink/80 to-transparent">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPedigree(horse);
          }}
          className="w-full bg-white text-ink py-3 sm:py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors"
        >
          Purebred Profile
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
          src="https://www.dropbox.com/scl/fi/ddmjzd4a6hr49lbn6bl4h/branding-compressed.jpg?rlkey=msuwq70cj6767gpf06d9ig0jt&st=b9u1nepj&raw=1" 
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
                src="https://www.dropbox.com/scl/fi/zx0e3syxcfdkg6bbdhzi8/main-3-compressed.jpg?rlkey=aykao1kmvcu2wgnieqcx7efy4&st=ukaxr0uk&raw=1" 
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
      name: "Oligarca",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "6 Years",
      gender: "Stallion",
      height: "—",
      birthDate: "16 Apr 2019",
      coat: "Torda (Grey)",
      ueln: "724015190348252",
      igg: "103.42",
      offspringCount: 0,
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1IG905XAp2deQ==",
      description: "OLIGARCA MATER — A bold P.R.E. stallion of Torda coat, bred by the prestigious Mater Christi. With a strong Genetic Index (IGG 103.42), he carries deep bloodlines from Yeguada Vilaire, Ramón Folgarolas Genero, and Rafael Ayala Muñoz — pillars of the modern Spanish breed.",
      pedigree: {
        sire: "—",
        dam: "—",
        grandSire1: "Yeguada Vilaire lineage",
        grandDam1: "Ramón Folgarolas Genero lineage",
        grandSire2: "Rafael Ayala Muñoz lineage",
        grandDam2: "Hros. Salvador Guardiola Fantoni / Francisco Míguez Pintor"
      }
    },
    {
      name: "Presencia",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://www.dropbox.com/scl/fi/ccktrizmcvvvr18qpq8f3/presencia-compressed.jpg?rlkey=nij7or4fsj5zsan5rmtrn9yef&st=wt6ynrrf&raw=1",
      age: "5 Years",
      gender: "Mare",
      height: "—",
      birthDate: "12 Feb 2020",
      coat: "Torda (Grey)",
      ueln: "724015200357033",
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?ID=2bvfgWbPlPA=",
      description: "PRESENCIA MATER — A young P.R.E. mare of exquisite Torda coat, bred by the prestigious Mater Christi. She carries bloodlines from Ferrer Rovira S.L. and Miguel Granda Losada, two pillars of modern Spanish equine breeding.",
      pedigree: {
        sire: "Sire by Sageras y Alcazarén S.A. / Ferrer Rovira S.L.",
        dam: "Dam by Miguel Granda Losada",
        grandSire1: "Hohmann & Kuppens / CMCC de Ávila",
        grandDam1: "Yeguada Vilaire / Yeguada Marín García",
        grandSire2: "Los Retamales S.C. / CMCC de Jerez",
        grandDam2: "Yeguada Ferrero S.L. / Ramón Folgarolas"
      }
    },
    {
      name: "Ordago",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://www.dropbox.com/scl/fi/70gskkg4zhlnssgx1i3sk/Ordago-compressed.jpg?rlkey=squxs6kf94znr1bce8ykrzd94&st=f5q55hu8&raw=1",
      age: "6 Years",
      gender: "Stallion",
      height: "—",
      birthDate: "25 Mar 2019",
      coat: "Torda (Grey)",
      ueln: "724015190347862",
      igg: "116.36",
      offspringCount: 22,
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1IJOknx3ZsjWQ==",
      description: "ORDAGO MATER — A supremely gifted P.R.E. stallion with one of the highest Genetic Indices (IGG 116.36) in his generation. Bred by Mater Christi, he is a Joven Reproductor Recomendado with 22 registered offspring, cementing his legacy as a premier P.R.E. sire.",
      offspring: ["Aviador Fam", "Caramelo de Mimac", "Lunaria de Gredos III", "Almanzor de Borge", "Alba de Borge", "Al Andalus de Borge", "Tamiz Mater", "Tesón Mater", "Tinga Mater", "Vendetta Mater"],
      pedigree: {
        sire: "Joven Reproductor Recomendado — Mater Christi",
        dam: "Reproductor Calificado — Ramón Folgarolas Genero",
        grandSire1: "Mater Christi lineage (paternal)",
        grandDam1: "Mater Christi lineage (paternal)",
        grandSire2: "Ramón Folgarolas Genero lineage",
        grandDam2: "Mater Christi lineage (maternal)"
      }
    },
    {
      name: "Osadia",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://www.dropbox.com/scl/fi/mrgbgc73yzlm3qzgv2rxt/main-5-compressed.jpg?rlkey=o053nu2k5t5l6ujpcwgxdbor0&st=v207uxjk&raw=1",
      age: "6 Years",
      gender: "Mare",
      height: "—",
      birthDate: "06 Mar 2019",
      coat: "Torda (Grey)",
      ueln: "724015190347868",
      igg: "103.42",
      offspringCount: 2,
      offspring: ["Taranta Mater", "Vuelo Mater"],
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1ILhXU+qrlXRg==",
      description: "OSADIA MATER — A bold and elegant P.R.E. mare sired by the celebrated JURAMENTO MATER. Bred by Mater Christi, she carries a strong Genetic Index (IGG 103.42) and is dam of TARANTA MATER (2023) and VUELO MATER (2024). Her lineage traces to Yeguada Vilaire and Rafael Ayala Muñoz.",
      pedigree: {
        sire: "Juramento Mater",
        dam: "—",
        grandSire1: "Yeguada Vilaire lineage",
        grandDam1: "Rafael Ayala Muñoz lineage",
        grandSire2: "Hros. Salvador Guardiola Fantoni lineage",
        grandDam2: "—"
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
      name: "Oligarca",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=800",
      age: "6 Years",
      gender: "Stallion",
      height: "—",
      birthDate: "16 Apr 2019",
      coat: "Torda (Grey)",
      ueln: "724015190348252",
      igg: "103.42",
      offspringCount: 0,
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1IG905XAp2deQ==",
      description: "OLIGARCA MATER — A bold P.R.E. stallion of Torda coat, bred by the prestigious Mater Christi. With a strong Genetic Index (IGG 103.42), he carries deep bloodlines from Yeguada Vilaire, Ramón Folgarolas Genero, and Rafael Ayala Muñoz — pillars of the modern Spanish breed.",
      pedigree: {
        sire: "—",
        dam: "—",
        grandSire1: "Yeguada Vilaire lineage",
        grandDam1: "Ramón Folgarolas Genero lineage",
        grandSire2: "Rafael Ayala Muñoz lineage",
        grandDam2: "Hros. Salvador Guardiola Fantoni / Francisco Míguez Pintor"
      }
    },
    {
      name: "Presencia",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://www.dropbox.com/scl/fi/ccktrizmcvvvr18qpq8f3/presencia-compressed.jpg?rlkey=nij7or4fsj5zsan5rmtrn9yef&st=wt6ynrrf&raw=1",
      age: "5 Years",
      gender: "Mare",
      height: "—",
      birthDate: "12 Feb 2020",
      coat: "Torda (Grey)",
      ueln: "724015200357033",
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?ID=2bvfgWbPlPA=",
      description: "PRESENCIA MATER — A young P.R.E. mare of exquisite Torda coat, bred by the prestigious Mater Christi. She carries bloodlines from Ferrer Rovira S.L. and Miguel Granda Losada, two pillars of modern Spanish equine breeding.",
      pedigree: {
        sire: "Sire by Sageras y Alcazarén S.A. / Ferrer Rovira S.L.",
        dam: "Dam by Miguel Granda Losada",
        grandSire1: "Hohmann & Kuppens / CMCC de Ávila",
        grandDam1: "Yeguada Vilaire / Yeguada Marín García",
        grandSire2: "Los Retamales S.C. / CMCC de Jerez",
        grandDam2: "Yeguada Ferrero S.L. / Ramón Folgarolas"
      }
    },
    {
      name: "Ordago",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://www.dropbox.com/scl/fi/70gskkg4zhlnssgx1i3sk/Ordago-compressed.jpg?rlkey=squxs6kf94znr1bce8ykrzd94&st=f5q55hu8&raw=1",
      age: "6 Years",
      gender: "Stallion",
      height: "—",
      birthDate: "25 Mar 2019",
      coat: "Torda (Grey)",
      ueln: "724015190347862",
      igg: "116.36",
      offspringCount: 22,
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1IJOknx3ZsjWQ==",
      description: "ORDAGO MATER — A supremely gifted P.R.E. stallion with one of the highest Genetic Indices (IGG 116.36) in his generation. Bred by Mater Christi, he is a Joven Reproductor Recomendado with 22 registered offspring, cementing his legacy as a premier P.R.E. sire.",
      offspring: ["Aviador Fam", "Caramelo de Mimac", "Lunaria de Gredos III", "Almanzor de Borge", "Alba de Borge", "Al Andalus de Borge", "Tamiz Mater", "Tesón Mater", "Tinga Mater", "Vendetta Mater"],
      pedigree: {
        sire: "Joven Reproductor Recomendado — Mater Christi",
        dam: "Reproductor Calificado — Ramón Folgarolas Genero",
        grandSire1: "Mater Christi lineage (paternal)",
        grandDam1: "Mater Christi lineage (paternal)",
        grandSire2: "Ramón Folgarolas Genero lineage",
        grandDam2: "Mater Christi lineage (maternal)"
      }
    },
    {
      name: "Osadia",
      breed: "Pura Raza Española (P.R.E.)",
      image: "https://www.dropbox.com/scl/fi/mrgbgc73yzlm3qzgv2rxt/main-5-compressed.jpg?rlkey=o053nu2k5t5l6ujpcwgxdbor0&st=v207uxjk&raw=1",
      age: "6 Years",
      gender: "Mare",
      height: "—",
      birthDate: "06 Mar 2019",
      coat: "Torda (Grey)",
      ueln: "724015190347868",
      igg: "103.42",
      offspringCount: 2,
      offspring: ["Taranta Mater", "Vuelo Mater"],
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1ILhXU+qrlXRg==",
      description: "OSADIA MATER — A bold and elegant P.R.E. mare sired by the celebrated JURAMENTO MATER. Bred by Mater Christi, she carries a strong Genetic Index (IGG 103.42) and is dam of TARANTA MATER (2023) and VUELO MATER (2024). Her lineage traces to Yeguada Vilaire and Rafael Ayala Muñoz.",
      pedigree: {
        sire: "Juramento Mater",
        dam: "—",
        grandSire1: "Yeguada Vilaire lineage",
        grandDam1: "Rafael Ayala Muñoz lineage",
        grandSire2: "Hros. Salvador Guardiola Fantoni lineage",
        grandDam2: "—"
      }
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
      <VideoSection />
      <About />
      <Horses />
      <Genetics />
      <Bloodlines />
    </>
  );
};

const Bloodlines = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const horses = [
    {
      name: "Oligarca", gender: "Stallion", birthDate: "16 Apr 2019", coat: "Torda (Grey)",
      ueln: "724015190348252", igg: "103.42", offspringCount: 0, offspring: [],
      image: "https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=800",
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1IG905XAp2deQ==",
      description: "A bold P.R.E. stallion of Torda coat bred by Mater Christi. Carries deep bloodlines from three of Spain's most prestigious yeguadas with a strong Genetic Index of 103.42.",
      pedigree: {
        sire: { label: "Sire", value: "—", note: "Mater Christi / Yeguada Vilaire lineage" },
        dam:  { label: "Dam", value: "—", note: "Ramón Folgarolas Genero / Mater Christi" },
        grandSire1: "Yeguada Vilaire lineage",
        grandDam1:  "Ramón Folgarolas Genero lineage",
        grandSire2: "Rafael Ayala Muñoz lineage",
        grandDam2:  "Hros. Salvador Guardiola Fantoni / Francisco Míguez Pintor",
      }
    },
    {
      name: "Presencia", gender: "Mare", birthDate: "12 Feb 2020", coat: "Torda (Grey)",
      ueln: "724015200357033", igg: null, offspringCount: 0, offspring: [],
      image: "https://www.dropbox.com/scl/fi/ccktrizmcvvvr18qpq8f3/presencia-compressed.jpg?rlkey=nij7or4fsj5zsan5rmtrn9yef&st=wt6ynrrf&raw=1",
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?ID=2bvfgWbPlPA=",
      description: "A young P.R.E. mare of exquisite Torda coat bred by Mater Christi. She carries fully documented bloodlines from Ferrer Rovira S.L. and Miguel Granda Losada — two pillars of modern Spanish breeding.",
      pedigree: {
        sire: { label: "Sire", value: "Sageras y Alcazarén S.A. / Ferrer Rovira S.L.", note: "Reproductor Calificado" },
        dam:  { label: "Dam", value: "Miguel Granda Losada", note: "ANCCE registered" },
        grandSire1: "Hohmann & Kuppens / CMCC de Ávila",
        grandDam1:  "Yeguada Vilaire / Yeguada Marín García",
        grandSire2: "Los Retamales S.C. / CMCC de Jerez",
        grandDam2:  "Yeguada Ferrero S.L. / Ramón Folgarolas",
      }
    },
    {
      name: "Ordago", gender: "Stallion", birthDate: "25 Mar 2019", coat: "Torda (Grey)",
      ueln: "724015190347862", igg: "116.36", offspringCount: 22,
      offspring: ["Aviador Fam", "Caramelo de Mimac", "Lunaria de Gredos III", "Almanzor de Borge", "Alba de Borge", "Al Andalus de Borge", "Tamiz Mater", "Tesón Mater", "Tinga Mater", "Vendetta Mater"],
      image: "https://www.dropbox.com/scl/fi/70gskkg4zhlnssgx1i3sk/Ordago-compressed.jpg?rlkey=squxs6kf94znr1bce8ykrzd94&st=f5q55hu8&raw=1",
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1IJOknx3ZsjWQ==",
      description: "The crown jewel of the collection. Joven Reproductor Recomendado with IGG 116.36 — one of the highest indices in his generation — and 22 registered offspring cementing his status as a premier P.R.E. sire.",
      pedigree: {
        sire: { label: "Sire", value: "Joven Reproductor Recomendado", note: "Mater Christi stud" },
        dam:  { label: "Dam", value: "Reproductor Calificado", note: "Ramón Folgarolas Genero" },
        grandSire1: "Mater Christi lineage (paternal)",
        grandDam1:  "Mater Christi lineage (paternal)",
        grandSire2: "Ramón Folgarolas Genero lineage",
        grandDam2:  "Mater Christi lineage (maternal)",
      }
    },
    {
      name: "Osadia", gender: "Mare", birthDate: "06 Mar 2019", coat: "Torda (Grey)",
      ueln: "724015190347868", igg: "103.42", offspringCount: 2,
      offspring: ["Taranta Mater", "Vuelo Mater"],
      image: "https://www.dropbox.com/scl/fi/mrgbgc73yzlm3qzgv2rxt/main-5-compressed.jpg?rlkey=o053nu2k5t5l6ujpcwgxdbor0&st=v207uxjk&raw=1",
      registryUrl: "https://www.lgancce.com/lgpreancce/asp-publico/arbolGenealogicoPRE/ConsultarArbolGenealogicoPRE.aspx?CEJ=VY3rRW2aO1ILhXU+qrlXRg==",
      description: "A bold and elegant mare sired by the celebrated Juramento Mater. With IGG 103.42 and two registered offspring — Taranta Mater (2023) and Vuelo Mater (2024) — she is building a legacy of her own.",
      pedigree: {
        sire: { label: "Sire", value: "Juramento Mater", note: "Champion P.R.E. sire" },
        dam:  { label: "Dam", value: "—", note: "Hros. Salvador Guardiola Fantoni lineage" },
        grandSire1: "Yeguada Vilaire lineage",
        grandDam1:  "Rafael Ayala Muñoz lineage",
        grandSire2: "Hros. Salvador Guardiola Fantoni lineage",
        grandDam2:  "—",
      }
    },
  ];

  const h = horses[activeIdx];

  const lineageRows = [
    { section: "Paternal Line", sideLabel: "Sire", sideValue: h.pedigree.sire.value, sideNote: h.pedigree.sire.note, gs: h.pedigree.grandSire1, gd: h.pedigree.grandDam1 },
    { section: "Maternal Line", sideLabel: "Dam", sideValue: h.pedigree.dam.value, sideNote: h.pedigree.dam.note, gs: h.pedigree.grandSire2, gd: h.pedigree.grandDam2 },
  ];

  return (
    <section id="bloodlines" className="py-32 md:py-48 px-8 bg-ink text-white relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 55px, rgba(255,255,255,0.5) 55px, rgba(255,255,255,0.5) 56px)" }} />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full border border-gold/[0.04] translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Section header */}
        <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Genealogy · ANCCE Registry</span>
            <h2 className="text-5xl md:text-6xl font-serif leading-[1.05]">
              The <br />
              <span className="italic font-display text-gold">Bloodlines</span>
            </h2>
          </div>
          <p className="text-white/40 font-light text-base max-w-sm leading-relaxed">
            Full registry data sourced directly from the LGANCCE official database. Each entry is verified against the Pura Raza Española studbook.
          </p>
        </motion.div>

        {/* Horse selector */}
        <motion.div {...fadeIn} className="flex gap-3 mb-14 overflow-x-auto pb-1 -mx-2 px-2">
          {horses.map((horse, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`flex items-center gap-3 pl-2 pr-6 py-2 border transition-all duration-400 shrink-0 ${
                activeIdx === i
                  ? "border-gold bg-gold/[0.08]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="w-12 h-12 overflow-hidden shrink-0">
                <img src={horse.image} alt={horse.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left">
                <span className={`block text-sm font-serif leading-tight ${activeIdx === i ? "text-white" : "text-white/60"}`}>{horse.name}</span>
                <span className="block text-[8px] uppercase tracking-widest text-gold/50 mt-0.5">{horse.gender} · {horse.birthDate?.slice(-4)}</span>
              </div>
              {activeIdx === i && <div className="w-1 h-1 rounded-full bg-gold ml-1" />}
            </button>
          ))}
        </motion.div>

        {/* Main widget */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-10"
          >

            {/* ── LEFT: Identity card ── */}
            <div className="flex flex-col gap-4">
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="block text-xs font-serif text-white">{h.name}</span>
                  <span className="block text-[8px] uppercase tracking-widest text-gold/60">{h.gender} · Mater Christi</span>
                </div>
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/30" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/30" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-white/10 p-3">
                  <span className="block text-[7px] uppercase tracking-widest text-white/30 mb-1">Born</span>
                  <span className="text-sm text-white/70 font-light">{h.birthDate}</span>
                </div>
                <div className="border border-white/10 p-3">
                  <span className="block text-[7px] uppercase tracking-widest text-white/30 mb-1">Coat</span>
                  <span className="text-sm text-white/70 font-light">{h.coat}</span>
                </div>
              </div>

              {h.ueln && (
                <div className="border border-white/10 p-3 flex items-center justify-between">
                  <span className="text-[7px] uppercase tracking-widest text-white/30">UELN</span>
                  <span className="text-[10px] font-mono text-white/50">{h.ueln}</span>
                </div>
              )}

              {h.igg && (
                <div className="border border-gold/30 bg-gold/[0.06] p-4">
                  <span className="block text-[7px] uppercase tracking-widest text-gold/70 mb-2">Global Genetic Index</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif text-gold">{h.igg}</span>
                    <span className="text-[7px] uppercase tracking-widest text-white/25">IGG · Alta Fiabilidad</span>
                  </div>
                </div>
              )}

              <p className="text-white/40 font-light text-sm leading-relaxed border-l border-gold/20 pl-4 italic">
                {h.description}
              </p>
            </div>

            {/* ── RIGHT: Pedigree tree ── */}
            <div className="flex flex-col gap-5">

              {/* Tree header */}
              <div className="flex items-center gap-4">
                <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-gold whitespace-nowrap">Purebred Lineage</span>
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[8px] uppercase tracking-widest text-white/25 whitespace-nowrap">P.R.E. · Spain</span>
              </div>

              {/* Lineage rows */}
              {lineageRows.map((row, ri) => (
                <div key={ri} className="border border-white/10 overflow-hidden">
                  {/* Parent row */}
                  <div className="flex items-stretch border-b border-white/10">
                    {/* Gold bar */}
                    <div className={`w-1 shrink-0 ${ri === 0 ? "bg-gold" : "bg-gold/40"}`} />
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="block text-[8px] uppercase tracking-[0.4em] text-gold/60 mb-1.5">{row.sideLabel}</span>
                          <span className={`block font-serif text-lg leading-snug ${row.sideValue === "—" ? "text-white/25 italic text-base" : "text-white"}`}>
                            {row.sideValue === "—" ? "Not recorded" : row.sideValue}
                          </span>
                        </div>
                        <span className="text-[8px] text-white/25 font-light text-right shrink-0 mt-1">{row.sideNote}</span>
                      </div>
                    </div>
                  </div>
                  {/* Grandparent row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
                    {[
                      { label: ri === 0 ? "Paternal Grandsire" : "Maternal Grandsire", value: row.gs },
                      { label: ri === 0 ? "Paternal Granddam"  : "Maternal Granddam",  value: row.gd },
                    ].map((gp, gi) => (
                      <div key={gi} className="p-4 bg-white/[0.02]">
                        <span className="block text-[7px] uppercase tracking-widest text-white/25 mb-2">{gp.label}</span>
                        <span className={`text-sm font-serif leading-snug ${!gp.value || gp.value === "—" ? "text-white/20 italic" : "text-white/60"}`}>
                          {!gp.value || gp.value === "—" ? "Not recorded" : gp.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Offspring */}
              {h.offspring && h.offspring.length > 0 && (
                <div className="border border-gold/20 bg-gold/[0.03] p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-gold whitespace-nowrap">Registered Offspring</span>
                    <div className="flex-1 h-px bg-gold/15" />
                    <span className="text-[8px] border border-gold/25 text-gold/50 px-2 py-0.5">{h.offspringCount} total</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {h.offspring.map((name, ni) => (
                      <span key={ni} className="text-[8px] uppercase tracking-widest text-white/50 border border-white/10 px-3 py-1.5 hover:border-gold/40 hover:text-white/80 transition-colors duration-300">
                        {name}
                      </span>
                    ))}
                    {h.offspringCount > h.offspring.length && (
                      <span className="text-[8px] uppercase tracking-widest text-white/20 px-3 py-1.5 border border-white/5">
                        +{h.offspringCount - h.offspring.length} more registered
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Registry link */}
              {h.registryUrl && (
                <a
                  href={h.registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/10 p-4 hover:border-gold/40 hover:bg-gold/5 transition-all duration-400 group"
                >
                  <div>
                    <span className="block text-[7px] uppercase tracking-widest text-white/25 mb-1">Official Source</span>
                    <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors font-light">
                      LGANCCE · ANCCE Studbook Database
                    </span>
                  </div>
                  <ArrowRight size={15} className="text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
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
  const cornerClasses = [
    "top-8 left-8 border-t border-l",
    "top-8 right-8 border-t border-r",
    "bottom-8 left-8 border-b border-l",
    "bottom-8 right-8 border-b border-r",
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.99,
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
      }}
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Horizontal rule grid — subtle texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-white/[0.025] mb-[56px]" />
        ))}
      </div>

      {/* One-shot shimmer sweep */}
      <motion.div
        initial={{ x: "-110%" }}
        animate={{ x: "210%" }}
        transition={{ duration: 1.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-gold/[0.07] to-transparent -skew-x-12 pointer-events-none z-0"
      />

      {/* Corner brackets — draw in */}
      {cornerClasses.map((cls, i) => (
        <motion.div
          key={i}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 56, height: 56, opacity: 0.45 }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${cls} border-gold`}
        />
      ))}

      {/* Side vertical accents */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-gold/20 to-transparent origin-center"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-gold/20 to-transparent origin-center"
      />

      {/* ── Center composition ── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Eyebrow with extending lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex items-center gap-5 mb-10"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-14 h-px bg-gold/35 origin-right"
          />
          <span className="text-gold/55 text-[8px] uppercase tracking-[0.8em] font-bold whitespace-nowrap">
            Mater Christi
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-14 h-px bg-gold/35 origin-left"
          />
        </motion.div>

        {/* "AZ" — curtain reveal from below */}
        <div className="overflow-hidden leading-[0.85]">
          <motion.div
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(80px,14vw,180px)] font-serif text-cream leading-none tracking-[0.04em]"
          >
            AZ
          </motion.div>
        </div>

        {/* "Equuz" — curtain reveal, slight delay, gold italic */}
        <div className="overflow-hidden leading-[0.85]">
          <motion.div
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(80px,14vw,180px)] font-serif italic text-gold leading-none tracking-[0.04em]"
          >
            Equuz
          </motion.div>
        </div>

        {/* Gold divider — extends from center */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent origin-center mt-10 mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-cream text-[9px] uppercase tracking-[0.8em] font-light"
        >
          Reign Valley Ranch · San Antonio, Texas
        </motion.p>
      </div>

      {/* Bottom progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.06]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gold origin-left"
        />
      </div>
    </motion.div>
  );
};

const galleryItems = [
  { id: 1, src: "https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Grey stallion in full gallop", caption: "Power in Motion", tag: "Stallions", cols: 2, rows: 2 },
  { id: 2, src: "https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "White Andalusian horse portrait", caption: "Andalusian Grace", tag: "Portraits", cols: 1, rows: 1 },
  { id: 3, src: "https://images.pexels.com/photos/3916379/pexels-photo-3916379.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Dapple grey horse in field", caption: "Morning at the Estate", tag: "Estate", cols: 1, rows: 2 },
  { id: 4, src: "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Horse at golden hour", caption: "Golden Hour", tag: "Portraits", cols: 1, rows: 1 },
  { id: 5, src: "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Horse galloping in arena", caption: "Arena Spirit", tag: "Stallions", cols: 1, rows: 1 },
  { id: 6, src: "https://images.pexels.com/photos/1135038/pexels-photo-1135038.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Horses in open pasture", caption: "Open Pastures", tag: "Estate", cols: 2, rows: 1 },
  { id: 7, src: "https://images.pexels.com/photos/1369493/pexels-photo-1369493.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Elegant mare portrait", caption: "Elegance Defined", tag: "Mares", cols: 1, rows: 1 },
  { id: 8, src: "https://images.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Herd in morning fog", caption: "Dawn Herd", tag: "Estate", cols: 2, rows: 1 },
  { id: 9, src: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "P.R.E. horse close up", caption: "Nobility", tag: "Portraits", cols: 1, rows: 2 },
  { id: 10, src: "https://images.pexels.com/photos/1650750/pexels-photo-1650750.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "White horse in green field", caption: "Summer at Reign Valley", tag: "Estate", cols: 1, rows: 1 },
  { id: 11, src: "https://images.pexels.com/photos/1559116/pexels-photo-1559116.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Close-up horse portrait", caption: "Soulful Gaze", tag: "Portraits", cols: 1, rows: 1 },
  { id: 12, src: "https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Two horses together", caption: "Companions", tag: "Mares", cols: 2, rows: 1 },
];

const TAGS = ["All", "Stallions", "Mares", "Portraits", "Estate"];

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? galleryItems : galleryItems.filter(i => i.tag === activeTag);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const prev = () => setSelectedIndex((i: number | null) => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const next = () => setSelectedIndex((i: number | null) => i !== null ? (i + 1) % filtered.length : null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, filtered.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-ink"
    >
      {/* Hero */}
      <div className="relative h-[55vh] flex items-end pb-20 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Gallery hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block"
          >
            Mater Christi · Reign Valley Ranch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-cream leading-none"
          >
            The <span className="italic font-display text-gold">Gallery</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-32 bg-gold origin-left"
          />
        </div>
      </div>

      {/* Filter Tags */}
      <div className="px-8 md:px-16 pt-14 pb-10 max-w-[1400px] mx-auto">
        <div className="flex flex-wrap gap-3">
          {TAGS.map((tag, i) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              onClick={() => setActiveTag(tag)}
              className={`px-6 py-2 text-[10px] uppercase tracking-[0.4em] font-bold border transition-all duration-300 ${
                activeTag === tag
                  ? "bg-gold text-ink border-gold"
                  : "bg-transparent text-cream/50 border-cream/20 hover:border-gold/60 hover:text-cream"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="px-8 md:px-16 pb-32 max-w-[1400px] mx-auto">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[240px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden cursor-pointer group ${
                  item.cols === 2 ? "col-span-2" : "col-span-1"
                } ${
                  item.rows === 2 ? "row-span-2" : "row-span-1"
                }`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-gold text-[9px] uppercase tracking-[0.5em] font-bold mb-1">{item.tag}</span>
                  <span className="text-cream text-lg font-serif">{item.caption}</span>
                </div>
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/0 group-hover:border-gold/60 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/0 group-hover:border-gold/60 transition-colors duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && filtered[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl max-h-[85vh] mx-8"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <img
                src={filtered[selectedIndex].src}
                alt={filtered[selectedIndex].alt}
                className="max-h-[80vh] max-w-full object-contain opulent-shadow"
              />
              {/* Caption */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <span className="text-gold text-[9px] uppercase tracking-[0.5em] font-bold block mb-1">{filtered[selectedIndex].tag}</span>
                  <span className="text-cream font-serif text-xl">{filtered[selectedIndex].caption}</span>
                </div>
                <span className="text-cream/30 text-[11px] uppercase tracking-widest">{selectedIndex + 1} / {filtered.length}</span>
              </div>
              {/* Border accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-gold/30 pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-gold/30 pointer-events-none" />
            </motion.div>

            {/* Controls */}
            <button
              onClick={(e: MouseEvent) => { e.stopPropagation(); prev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-gold/60 transition-colors duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e: MouseEvent) => { e.stopPropagation(); next(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-gold/60 transition-colors duration-300"
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-gold/60 transition-colors duration-300"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
