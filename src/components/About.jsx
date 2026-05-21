import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([null, null, null]);

  const slides = [
    {
      id: 1,
      video: "/about/doğa.mp4",
      title: "Doğanın Büyülü Ruhu",
      description:
        "Trabzon'un eşsiz doğasında, yeşilin her tonunu ve ışığın büyüsünü yakalıyoruz. Doğa çekimlerimizle anılarınızı zamansız karelere dönüştürüyoruz.",
    },
    {
      id: 2,
      video: "/about/reklamvideo.mp4",
      title: "Markanızın Görsel Gücü",
      description:
        "Profesyonel reklam çekimleriyle markanızı öne çıkarıyoruz. Yaratıcı konseptler ve sinematik prodüksiyon ile satışlarınıza değer katıyoruz.",
    },
    {
      id: 3,
      video: "/about/eğlence.mp4",
      title: "Enerjinin Ritmi",
      description:
        "Klüp, festival ve eğlence mekanlarınızın atmosferini dinamik video çekimleriyle ölümsüzleştiriyoruz. Enerjinizi hissettiren görseller üretiyoruz.",
    },
  ];

  // Tüm videoları başlat ama sadece aktif olanı göster
  // Böylece her video kaldığı yerden devam eder
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === currentIndex) {
          video.play().catch(() => {});
        } else {
          // Arka plandaki videoları oynatmaya devam et (kaldığı yerden devam etmesi için)
          // Ama performans için durdur, currentTime'ı koru
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  // 5 saniyede bir geçiş
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const setVideoRef = useCallback((el, index) => {
    videoRefs.current[index] = el;
  }, []);

  return (
    <section id="about" className="relative w-full pb-20 md:pb-24 bg-transparent">
      <div className="relative w-full h-screen overflow-hidden -mt-20 md:-mt-24 pointer-events-none">
        {/* Tüm videolar her zaman DOM'da — sadece opacity ile geçiş */}
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{
              opacity: i === currentIndex ? 1 : 0,
              scale: i === currentIndex ? [1, 1.03] : 1,
            }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 5, ease: "linear" },
            }}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: i === currentIndex ? 2 : 1 }}
          >
            <video
              ref={(el) => setVideoRef(el, i)}
              src={slide.video}
              muted
              loop
              playsInline
              webkit-playsinline="true"
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              preload="auto"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </motion.div>
        ))}

        {/* Karartma overlay */}
        <div className="absolute inset-0 bg-black/20 z-[3] pointer-events-none" />
      </div>

      {/* 📚 Fotoğrafın Sağ Alt Kenarına Giren Lüks Editöryal Kutu */}
      <div className="absolute bottom-6 md:bottom-[5%] left-4 right-4 sm:max-w-md sm:mx-auto md:left-auto md:right-[8%] md:max-w-none md:w-[620px] z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#FAFAF8]/95 backdrop-blur-xl border border-[#C8A45A]/35 p-5 md:p-12 rounded-[1.5rem] md:rounded-[2.8rem] shadow-[0_20px_40px_rgba(200,164,90,0.15)] text-center relative"
          >
            {/* Vizör Kılavuz Köşeleri */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6 w-4 md:w-5 h-4 md:h-5 border-t border-l border-[#C8A45A]/50" />
            <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-4 md:w-5 h-4 md:h-5 border-b border-r border-[#C8A45A]/50" />

            <h3 className="font-heading text-xl md:text-[2.4rem] mb-2 md:mb-5 text-[#C8A45A] tracking-wide text-center">
              {slides[currentIndex].title}
            </h3>

            <p className="text-[#333333] text-[13px] md:text-[19px] font-medium md:font-semibold leading-relaxed text-center mb-5 md:mb-8 max-w-xl mx-auto px-2">
              {slides[currentIndex].description}
            </p>

            {/* 💫 İlerleme Noktaları */}
            <div className="flex justify-center items-center gap-3 pt-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 border-none cursor-pointer ${
                    index === currentIndex
                      ? "w-10 bg-[#C8A45A]"
                      : "w-2.5 bg-[#C8A45A]/25 hover:bg-[#C8A45A]/50"
                  } p-2 md:p-0 bg-clip-content`}
                  style={{ boxSizing: 'content-box' }}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;