import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { API_BASE_URL, getMediaUrl } from "@/config/api";

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Anıların Işığında <br /> Profesyonel Çekimler",
    subtitle: "Her karede duyguyu, hikâyeyi ve zamanı yakalıyoruz. Moda, etkinlik, ürün ve portre çekimlerinde estetik bakış açısıyla markanıza değer katarız.",
    mediaUrl: "/ana sayfa/gözdevideo.mp4",
    mediaType: "video",
    isEmbed: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hero`)
      .then(res => res.json())
      .then(data => {
        if(data && !data.error) {
          setHeroData({
            title: data.title || heroData.title,
            subtitle: data.subtitle || heroData.subtitle,
            mediaUrl: data.mediaUrl || heroData.mediaUrl,
            mediaType: data.mediaType || heroData.mediaType,
            isEmbed: data.isEmbed || false
          });
        }
      })
      .catch(err => console.error("Hero API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black z-0">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {heroData.isEmbed ? (
          <iframe
            src={heroData.mediaUrl}
            className="w-full h-full object-cover pointer-events-none opacity-80"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Hero Video"
          />
        ) : heroData.mediaType === 'image' ? (
          <img src={getMediaUrl(heroData.mediaUrl)} alt="Hero" className="w-full h-full object-cover opacity-80" />
        ) : (
          <video
            src={getMediaUrl(heroData.mediaUrl)}
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
        )}
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
          className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-5 leading-[1.15] bg-gradient-to-r from-white to-[#C8A45A] bg-clip-text text-transparent drop-shadow-sm pb-2 px-2 md:px-0"
          dangerouslySetInnerHTML={{ __html: heroData.title }}
        />

        <p 
          className="text-xs sm:text-sm md:text-base text-white mb-6 md:mb-10 font-light max-w-xl mx-auto tracking-wide leading-relaxed"
          dangerouslySetInnerHTML={{ __html: heroData.subtitle }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Çekim Planla (Primary) */}
          <Link
            to="/iletisim"
            aria-label="Bizimle iletişime geçerek hemen çekim planlayın"
            className="group relative px-8 py-3 min-h-[44px] flex items-center justify-center overflow-hidden rounded-full no-underline shadow-[0_4px_20px_rgba(200,164,90,0.2)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.4)] transition-all duration-500 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#C8A45A] to-[#B8943D] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity duration-500" />
            <span className="relative z-10 text-white text-[13px] font-semibold tracking-[0.15em] uppercase">
              Çekim Planla
            </span>
          </Link>

          {/* Portföyü Gör (Secondary) */}
          <Link
            to="/portfolyo"
            aria-label="Daha önce gerçekleştirdiğimiz çekim projelerini içeren portfolyomuzu inceleyin"
            className="group relative px-8 py-3 min-h-[44px] flex items-center justify-center overflow-hidden rounded-full border border-[#C8A45A]/20 hover:border-[#C8A45A]/60 no-underline transition-all duration-500 bg-[#1A1A1A]/40 backdrop-blur-md shadow-sm active:scale-95"
          >
            <div className="absolute inset-0 bg-[#C8A45A]/0 group-hover:bg-[#C8A45A]/10 transition-colors duration-500" />
            <span className="relative z-10 text-[#E5E5E5] text-[13px] font-semibold tracking-[0.15em] uppercase group-hover:text-[#C8A45A] transition-colors duration-500">
              Portföyü Gör
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;