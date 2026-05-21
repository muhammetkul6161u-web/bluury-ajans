import React, { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import InstagramModal from "./InstagramModal";

const IMAGES = Array.from({ length: 6 }, (_, i) => `/Instagram/ınsta${i + 1}.webp`);
const SCROLL_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES];

const InstagramFeed = () => {
  const [modalData, setModalData] = useState({ isOpen: false, imageSrc: null });

  const openModal = (src) => {
    setModalData({ isOpen: true, imageSrc: src });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, imageSrc: null });
  };

  return (
    <section id="instagram" className="relative py-24 md:py-32 bg-[#CECECE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-xl bg-[#C8A45A]/10 border border-[#C8A45A]/20 flex items-center justify-center mb-5 mx-auto"
          >
            <Instagram className="text-[#C8A45A]" size={24} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl text-[#C8A45A] mb-3"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Instagram'da Biz
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[#9A9A9A] text-sm font-light tracking-wider uppercase mb-5"
          >
            @blurry_ajans
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-[#C8A45A] mx-auto"
          />
        </div>
      </div>

      {/* Kayan Galeri */}
      <div className="relative w-full overflow-hidden mb-12 py-4">
        <div className="absolute top-0 left-0 w-24 md:w-40 h-full bg-gradient-to-r from-[#CECECE] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-40 h-full bg-gradient-to-l from-[#CECECE] to-transparent z-20 pointer-events-none" />

        <div
          className="flex w-max animate-scroll hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {SCROLL_IMAGES.map((src, index) => (
            <div
              key={index}
              onClick={() => openModal(src)}
              className="relative w-[240px] md:w-[280px] flex-shrink-0 mx-2 group/item cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden border border-[#C8A45A]/20 group-hover/item:border-[#C8A45A]/50 transition-all duration-500 shadow-[0_2px_12px_rgba(0,0,0,0.1)] group-hover/item:shadow-[0_8px_30px_rgba(200,164,90,0.15)] bg-[#1A1A1A]">
                <div className="relative h-[300px] md:h-[340px] overflow-hidden">
                  <img
                    src={src}
                    alt={`Instagram Çekimi ${index + 1} - Bluury Ajans`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-500 ease-out group-hover/item:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-5">
                    <div className="flex items-center gap-4 mb-2">
                      <Heart size={16} className="text-white" />
                      <MessageCircle size={16} className="text-white" />
                    </div>
                    <span className="text-white/90 text-xs tracking-wider uppercase font-medium">
                      Büyütmek için Tıkla
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <a
          href="https://www.instagram.com/blurry_ajans"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#C8A45A] text-[#C8A45A] hover:bg-[#C8A45A] hover:text-[#1A1A1A] transition-all duration-400 no-underline text-sm tracking-widest uppercase font-medium rounded-full shadow-[0_4px_14px_0_rgba(200,164,90,0.1)] hover:shadow-[0_6px_20px_rgba(200,164,90,0.2)]"
        >
          <Instagram size={16} className="group-hover:rotate-6 transition-transform duration-500" />
          Takip Et
        </a>
      </motion.div>
      
      {/* Modal */}
      <InstagramModal 
        isOpen={modalData.isOpen} 
        imageSrc={modalData.imageSrc} 
        onClose={closeModal} 
      />
    </section>
  );
};

export default InstagramFeed;