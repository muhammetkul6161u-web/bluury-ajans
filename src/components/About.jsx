import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, X } from "lucide-react";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slides = [
    {
      id: 1,
      image: "/about/photo9.webp",
      title: "Sonsuz Aşk Hikayeleri",
      description: "En özel gününüzü, duyguların en saf halini ve aşkınızın hikayesini sinematik bir dille ölümsüzleştiriyoruz.",
    },
    {
      id: 2,
      image: "/about/photo7.webp",
      title: "Doğanın Büyülü Ruhu",
      description: "Doğanın eşsiz renklerini, ışığın dansını ve atmosferin ruhunu yakalayarak mekanlara derinlik katıyoruz.",
    },
    {
      id: 3,
      image: "/about/photo4.webp",
      title: "Mekan ve Estetik",
      description: "Mimari detayların zarafetini ve mekanın karakterini ön plana çıkaran estetik çekimler yapıyoruz.",
    },
  ];

  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isModalOpen]);

  return (
    <>
      <section id="about" className="relative w-full pb-20 md:pb-24 bg-transparent">
        {/* 🖼️ Fotoğraf Alanı (Altı ovalleştirilmiş galeri tuvali görünümü) */}
        <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden rounded-b-[2rem] md:rounded-b-[3.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.03] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" },
              }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* Alt geçiş — Açık temaya uyumlu yumuşak geçiş */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#D6D6D6] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#D6D6D6]/30 via-transparent to-transparent z-[5] pointer-events-none" />
        </div>

        {/* 📚 Fotoğrafın Sağ Alt Kenarına Giren Lüks Editöryal Kutu (Daha çok fotoğrafın içine girecek şekilde konumlandırıldı) */}
        <div className="relative md:absolute bottom-[-20px] md:bottom-[20px] left-6 right-6 md:left-auto md:right-[8%] md:w-[620px] z-20 -mt-12 md:-mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAFAF8]/95 backdrop-blur-xl border border-[#C8A45A]/35 p-10 md:p-12 rounded-[2.8rem] shadow-[0_25px_55px_rgba(200,164,90,0.15)] text-center relative"
            >
              {/* Vizör Kılavuz Köşeleri (Çekim vizörü temasını pekiştirir) */}
              <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#C8A45A]/50" />
              <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#C8A45A]/50" />

              <h3 className="font-heading text-3xl md:text-[2.4rem] mb-5 text-[#C8A45A] tracking-wide text-center">
                {slides[currentIndex].title}
              </h3>

              <p className="text-[#333333] text-[16px] md:text-[19px] font-semibold leading-relaxed text-center mb-8 max-w-xl mx-auto">
                {slides[currentIndex].description}
              </p>

              {/* 💫 İlerleme Noktaları (Sayfa göstergesi - Kutunun içinde metnin altında) */}
              <div className="flex justify-center items-center gap-3 pt-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-500 border-none cursor-pointer ${
                      index === currentIndex
                        ? "w-10 bg-[#C8A45A]"
                        : "w-2.5 bg-[#C8A45A]/25 hover:bg-[#C8A45A]/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 🖼️ INSTAGRAM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-[#E5E5E5] hover:text-[#C8A45A] transition-colors bg-[#2A2A2A]/80 rounded-full p-2 border-none cursor-pointer"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[90vw] max-h-[85vh] md:max-w-[70vw] md:max-h-[90vh] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={slides[currentIndex].image}
                alt="Instagram Zoom"
                className="w-full h-full object-contain bg-[#1A1A1A] rounded-2xl"
              />
              
              <a
                href="https://www.instagram.com/blurry_ajans"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 inline-flex items-center gap-3 px-6 py-3 bg-[#C8A45A] text-white rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#D4B76A] hover:scale-105 transition-all shadow-[0_10px_20px_rgba(200,164,90,0.3)] no-underline"
              >
                <Instagram size={20} />
                Instagram'a Git
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;