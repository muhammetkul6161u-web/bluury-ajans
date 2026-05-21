import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const location = useLocation();

  // WhatsApp Numarası ve Varsayılan Mesajı
  const whatsappNumber = "905364965698";
  const defaultMessage = "Merhaba Blurry Ajans, hizmetleriniz hakkında bilgi alabilir miyim?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[99] md:bottom-8 md:right-8 pointer-events-auto select-none">
      <AnimatePresence mode="wait">
        <motion.a
          key={location.pathname} // Sayfa geçişlerinde tetiklenmesi için key olarak pathname kullanıyoruz
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.3, y: 35 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 280,
              damping: 18,
              delay: 0.45, // Sayfa geçiş animasyonuna uyum sağlaması için hafif gecikme
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.3,
            y: 35,
            transition: {
              duration: 0.25,
              ease: "easeInOut",
            },
          }}
          whileHover={{ 
            scale: 1.06,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.94 }}
          className="group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] bg-gradient-to-b from-[#45E167] to-[#01C633] text-white shadow-[0_6px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_0_32px_rgba(37,211,102,0.75)] hover:scale-[1.08] transition-all duration-300 relative cursor-pointer border-none"
          aria-label="WhatsApp İletişim Hattı"
        >
          {/* Sürekli Dışa Doğru Yayılan Yeşil Halkası (Pulse) */}
          <span className="absolute inset-0 rounded-[1.2rem] bg-[#01C633]/40 animate-ping opacity-75 group-hover:opacity-100 duration-1000" />

          {/* Şık Beyaz WhatsApp Logosu */}
          <svg
            viewBox="0 0 16 16"
            className="w-7 h-7 md:w-8 md:h-8 fill-white group-hover:scale-105 transition-transform duration-300 relative z-10"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
          </svg>
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;
