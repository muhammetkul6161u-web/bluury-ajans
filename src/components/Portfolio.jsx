import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { key: "Dugun", label: "Düğün" },
  { key: "Moda", label: "Moda" },
  { key: "urun", label: "Ürün" },
  { key: "video", label: "Video" },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Dugun");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

  // Native, ultra-smooth touch swiping states (Zero lag on mobile)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const images = useMemo(() => {
    const ext = (activeCategory === "urun" || activeCategory === "video") ? "jpg" : "webp";
    const count = activeCategory === "video" ? 6 : 5;
    return Array.from({ length: count }, (_, i) => ({
      id: `${activeCategory}-${i + 1}`,
      src: `/Portfoy/${activeCategory}/${activeCategory.toLowerCase()}${i + 1}.${ext}`,
      index: i
    }));
  }, [activeCategory]);

  // Handle keyboard arrow navigation for premium desktop experience
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImg) {
        if (e.key === "Escape") setSelectedImg(null);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, currentIndex, selectedImg]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Lightbox navigation
  const handleLightboxNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    setSelectedImg(images[nextIdx]);
  };

  const handleLightboxPrev = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIdx);
    setSelectedImg(images[prevIdx]);
  };

  // Native Touch Swipe Handlers (Extremely fast, physics-free, zero stutter)
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <section 
      id="portfolio" 
      className="relative min-h-[75vh] md:min-h-[85vh] py-16 md:py-24 bg-transparent overflow-hidden flex flex-col items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Kategori Seçici */}
      <div className="relative z-30 mb-12 md:mb-16 flex flex-wrap justify-center gap-6 md:gap-10 px-4" role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            aria-selected={activeCategory === cat.key}
            aria-label={`${cat.label} galerisi`}
            onClick={() => {
              setActiveCategory(cat.key);
              setCurrentIndex(0);
            }}
            className={`text-sm md:text-base tracking-[0.2em] uppercase font-semibold transition-all duration-500 relative pb-2 bg-transparent border-none cursor-pointer font-heading ${
              activeCategory === cat.key
                ? "text-[#C8A45A] scale-105"
                : "text-black/60 hover:text-black"
            }`}
          >
            {cat.label}
            {activeCategory === cat.key && (
              <motion.div
                layoutId="portfolio-underline-gold"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A45A]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* 3D Kaydırılabilir Galeri Wrapper */}
      <div className="relative w-full max-w-6xl h-[360px] md:h-[520px] flex items-center justify-center perspective-[1800px] px-6">
        
        {/* Sol Ok Butonu */}
        <button 
          onClick={handlePrev}
          aria-label="Önceki fotoğraf"
          className="absolute left-2 md:left-8 z-40 w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-[#C8A45A]/25 bg-black/45 text-[#C8A45A] hover:bg-[#C8A45A] hover:text-black hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Galeri Alanı */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {images.map((img, index) => {
              let position = index - currentIndex;

              // Loop boundary index corrections
              if (position < -Math.floor(images.length / 2)) position += images.length;
              if (position > Math.floor(images.length / 2)) position -= images.length;

              const isVisible = Math.abs(position) <= 1;
              if (!isVisible) return null;

              const isActive = position === 0;

              return (
                <motion.div
                  key={img.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedImg(img);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.6, x: position * 350, rotateY: position * -30 }}
                  animate={{
                    opacity: isActive ? 1 : 0.45,
                    scale: isActive ? 1 : 0.76,
                    x: position * (window.innerWidth < 768 ? 200 : 330),
                    rotateY: position * -20,
                    z: isActive ? 0 : -200,
                    filter: isActive 
                      ? "grayscale(0%) brightness(1) blur(0px)" 
                      : "grayscale(30%) brightness(0.6) blur(1px)",
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className={`absolute w-[240px] md:w-[350px] h-[320px] md:h-[480px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "border-2 border-[#C8A45A] shadow-[0_25px_60px_-15px_rgba(200,164,90,0.35)]"
                      : "border border-black/10 hover:border-black/20"
                  }`}
                  style={{ zIndex: isActive ? 10 : 5 }}
                >
                  {/* Görsel */}
                  <img
                    src={img.src}
                    alt={img.id}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    loading="eager"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />

                  {/* Üstüne Gelindiğinde Çıkan Zarif Overlay */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase">
                        <svg className="w-3.5 h-3.5 animate-pulse text-[#C8A45A]" fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="10" />
                        </svg>
                        Tam Boyut Gör
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Sağ Ok Butonu */}
        <button 
          onClick={handleNext}
          aria-label="Sonraki fotoğraf"
          className="absolute right-2 md:right-8 z-40 w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-[#C8A45A]/25 bg-black/45 text-[#C8A45A] hover:bg-[#C8A45A] hover:text-black hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>

      {/* İpucu Göstergesi */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-black/60 font-semibold tracking-[0.2em] text-xs uppercase"
        >
          Sürükleyin veya Okları Kullanın
        </motion.p>
        {/* Navigasyon Noktaları */}
        <div className="flex items-center gap-2 mt-2 z-30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? "w-6 bg-[#C8A45A]" 
                  : "bg-black/20 hover:bg-black/45"
              }`}
              aria-label={`Fotoğraf ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 🖼️ Premium Full Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImg(null)}
          >
            {/* Kapat Butonu */}
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 z-[1000] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              aria-label="Kapat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Sol Ok (Lightbox) */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleLightboxPrev(); }}
              className="absolute left-4 md:left-8 z-[1000] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
              aria-label="Önceki"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Görsel Kutusu */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.src}
                alt="Büyütülmüş Portfolyo Görseli"
                className="w-auto h-auto max-h-[80vh] max-w-full object-contain mx-auto"
              />

              {/* Instagram Yönlendirme & Çekim Butonu */}
              <div className="absolute bottom-4 right-4 flex gap-3">
                <a
                  href="https://www.instagram.com/blurry_ajans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C8A45A] hover:bg-[#D4B76A] text-black font-bold text-xs uppercase tracking-wider rounded-full border border-white/20 transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </motion.div>

            {/* Sağ Ok (Lightbox) */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
              className="absolute right-4 md:right-8 z-[1000] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
              aria-label="Sonraki"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;