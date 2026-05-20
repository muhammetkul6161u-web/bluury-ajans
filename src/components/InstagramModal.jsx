import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X } from 'lucide-react';

const InstagramModal = ({ isOpen, imageSrc, onClose, instagramUrl = "https://www.instagram.com/blurry_ajans" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Arka plan blur */}
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-lg" 
            onClick={onClose}
          />
          
          {/* İçerik */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-auto max-w-5xl max-h-[85vh] bg-[#1A1A1A] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden border border-[#C8A45A]/20 p-2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapat Butonu */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/60 hover:bg-black/90 text-white/80 hover:text-white rounded-full flex items-center justify-center border border-white/10 hover:border-[#C8A45A]/40 transition-all shadow-lg cursor-pointer"
              aria-label="Kapat"
            >
              <X size={20} />
            </button>

            {/* Resim Konteyneri */}
            <div className="relative w-full max-h-[80vh] overflow-hidden rounded-lg flex items-center justify-center">
              <img 
                src={imageSrc} 
                alt="Instagram Gönderisi" 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Sağ Alt Kısım - Instagram Butonu */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-30 group flex items-center gap-2 px-5 py-2.5 bg-[#C8A45A]/90 hover:bg-[#C8A45A] text-white rounded-full font-semibold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl hover:scale-105 border border-[#C8A45A]/30 no-underline cursor-pointer"
              >
                <Instagram size={16} className="group-hover:rotate-6 transition-transform duration-300" />
                Instagram'da Gör
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstagramModal;
