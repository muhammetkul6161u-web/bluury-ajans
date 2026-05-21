import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import DecoratedHeading from "@/components/DecoratedHeading";

const REVIEWS = [
  {
    id: 1,
    name: "sayinsumeyyes",
    comment: "Film gibi olmuş, harika bir çekim deneyimi yaşadık!",
    video: "/Referans/referans1.mov",
  },
  {
    id: 2,
    name: "seyma.eeroll",
    comment: "Çok güzel, beklentilerimizin çok ötesinde bir sonuç oldu.",
    video: "/Referans/referans2.mp4",
  },
  {
    id: 3,
    name: "_sevvalaktass",
    comment: "Hayallerimden daha güzel bir çekim oldu, çok teşekkürler!",
    video: "/Referans/referans3.mp4",
  },
];

const Testimonials = () => {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <section id="testimonials" className="relative py-20 md:py-28 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <DecoratedHeading text="Referanslar" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-black text-sm font-semibold"
          >
            Müşterilerimizin çekim deneyimleri
          </motion.p>
        </div>

        {/* 🎬 3'lü Premium Vizör Tasarımlı Video Kart Grubu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              onClick={() => setSelectedReview(review)}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer group shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(200,164,90,0.25)] border border-[#C8A45A]/25 hover:border-[#C8A45A]/80 transition-all duration-500 bg-[#1A1A1A]"
            >
              {/* Arka Plan Video Döngüsü */}
              <video
                src={review.video}
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload nofullscreen noremoteplayback"
                controls={false}
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s] ease-out pointer-events-none opacity-80 group-hover:opacity-100"
              />

              {/* Lüks Gölge ve Karartma Katmanları */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/15 group-hover:from-black/90 transition-all duration-500" />

              {/* Vizör Köşe Kılavuzları (Sony Alpha Konseptiyle Bütünleşik) */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#C8A45A]/60 md:border-white/30 pointer-events-none md:group-hover:border-[#C8A45A]/60 transition-colors duration-500" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#C8A45A]/60 md:border-white/30 pointer-events-none md:group-hover:border-[#C8A45A]/60 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#C8A45A]/60 md:border-white/30 pointer-events-none md:group-hover:border-[#C8A45A]/60 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#C8A45A]/60 md:border-white/30 pointer-events-none md:group-hover:border-[#C8A45A]/60 transition-colors duration-500" />

              {/* Sol Üst Canlı Kayıt Efekti */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-mono tracking-widest text-white uppercase">LIVE</span>
              </div>

              {/* Ortadaki Şık Oynat Butonu */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#1A1A1A]/85 backdrop-blur-md border border-[#C8A45A]/35 flex items-center justify-center group-hover:bg-[#C8A45A] group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-[0_0_20px_rgba(200,164,90,0.4)]">
                  <Play size={20} className="text-[#C8A45A] fill-[#C8A45A] group-hover:text-black group-hover:fill-black ml-0.5 transition-colors" />
                </div>
              </div>

              {/* Alttaki Yorum ve Kullanıcı Paneli */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-center flex flex-col justify-end min-h-[140px] bg-gradient-to-t from-black via-black/85 to-transparent">
                <p className="text-sm md:text-base text-white/90 font-light leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🖼️ Premium Full Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedReview(null)}
          >
            {/* Kapat Butonu */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-6 right-6 z-[1000] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              aria-label="Kapat"
            >
              <X size={24} />
            </button>

            {/* Video Kutusu */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md aspect-[9/16] md:max-h-[85vh] overflow-hidden rounded-3xl border border-[#C8A45A]/30 bg-black shadow-2xl"
            >
              <video
                src={selectedReview.video}
                autoPlay
                controls
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;