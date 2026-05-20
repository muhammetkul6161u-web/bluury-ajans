import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const HERO_IMAGES = [
  "/ana sayfa/photo1.webp",
  "/ana sayfa/photo3.webp",
  "/ana sayfa/photo4.webp",
  "/ana sayfa/photo6.webp",
  "/ana sayfa/photo7.webp",
  "/ana sayfa/photo9.webp",
  "/ana sayfa/photo10.webp",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images — Crossfade + Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentImage]}
              alt={`Bluury Ajans Profesyonel Çekimler - Slayt ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for dimming/contrast */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      </div>

      {/* Hero İçerik */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
      >
        <h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6 leading-[1.1] bg-gradient-to-r from-white to-[#C8A45A] bg-clip-text text-transparent drop-shadow-sm pb-2"
        >
          Anıların Işığında <br className="hidden md:block" />
          Profesyonel Çekimler
        </h1>

        <p className="text-base md:text-lg text-white mb-12 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
          Her karede duyguyu, hikâyeyi ve zamanı yakalıyoruz. Moda, etkinlik,
          ürün ve portre çekimlerinde estetik bakış açısıyla markanıza değer katarız.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Çekim Planla (Primary) */}
          <Link
            to="/iletisim"
            aria-label="Bizimle iletişime geçerek hemen çekim planlayın"
            className="group relative px-10 py-4 overflow-hidden rounded-full no-underline shadow-[0_4px_20px_rgba(200,164,90,0.2)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.4)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#C8A45A] to-[#B8943D] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity duration-500" />
            <span className="relative z-10 text-white text-[15px] font-semibold tracking-[0.15em] uppercase">
              Çekim Planla
            </span>
          </Link>

          {/* Portföyü Gör (Secondary) */}
          <Link
            to="/portfolyo"
            aria-label="Daha önce gerçekleştirdiğimiz çekim projelerini içeren portfolyomuzu inceleyin"
            className="group relative px-10 py-4 overflow-hidden rounded-full border border-[#C8A45A]/20 hover:border-[#C8A45A]/60 no-underline transition-all duration-500 bg-[#1A1A1A]/40 backdrop-blur-md shadow-sm"
          >
            <div className="absolute inset-0 bg-[#C8A45A]/0 group-hover:bg-[#C8A45A]/10 transition-colors duration-500" />
            <span className="relative z-10 text-[#E5E5E5] text-[15px] font-semibold tracking-[0.15em] uppercase group-hover:text-[#C8A45A] transition-colors duration-500">
              Portföyü Gör
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;