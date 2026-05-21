import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center bg-black z-0">
      {/* Background Video — Loop + Faded (Soluk) Style */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/ana sayfa/gözdevideo.mov"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
        />
        {/* Dark overlay for dimming/contrast */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
      </div>

      {/* Hero İçerik */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto mb-20 md:mb-16 pb-16 md:pb-0 pt-16 md:pt-0"
      >
        <h1
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 md:mb-6 leading-[1.1] bg-gradient-to-r from-white to-[#C8A45A] bg-clip-text text-transparent drop-shadow-sm pb-2 px-2 md:px-0"
        >
          Anıların Işığında <br className="hidden md:block" />
          Profesyonel Çekimler
        </h1>

        <p className="text-xs sm:text-sm md:text-lg text-white mb-8 md:mb-12 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
          Her karede duyguyu, hikâyeyi ve zamanı yakalıyoruz. Moda, etkinlik,
          ürün ve portre çekimlerinde estetik bakış açısıyla markanıza değer katarız.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Çekim Planla (Primary) */}
          <Link
            to="/iletisim"
            aria-label="Bizimle iletişime geçerek hemen çekim planlayın"
            className="group relative px-10 py-4 min-h-[48px] flex items-center justify-center overflow-hidden rounded-full no-underline shadow-[0_4px_20px_rgba(200,164,90,0.2)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.4)] transition-all duration-500 active:scale-95"
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
            className="group relative px-10 py-4 min-h-[48px] flex items-center justify-center overflow-hidden rounded-full border border-[#C8A45A]/20 hover:border-[#C8A45A]/60 no-underline transition-all duration-500 bg-[#1A1A1A]/40 backdrop-blur-md shadow-sm active:scale-95"
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