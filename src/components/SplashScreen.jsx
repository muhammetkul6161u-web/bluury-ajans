import React from "react";
import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[999] bg-[#D6D6D6] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 📸 Lüks Arka Plan: Eskiz Arayüzü, Yumuşak Glowlar ve Altın Tozları */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40">
        {/* İnce Altın Eskiz Çizgileri */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(200, 164, 90, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(200, 164, 90, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Yumuşak Altın Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-[#C8A45A]/[0.06] blur-[100px] rounded-full" />

        {/* Altın Bokeh Tozları */}
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 bg-[#C8A45A]/30 rounded-full blur-[0.5px]" />
        <div className="absolute top-[40%] right-[20%] w-2 h-2 bg-[#C8A45A]/25 rounded-full blur-[1px]" />
        <div className="absolute bottom-[25%] left-[30%] w-1 h-1 bg-[#C8A45A]/40 rounded-full" />
        <div className="absolute bottom-[15%] right-[10%] w-2.5 h-2.5 bg-[#C8A45A]/20 rounded-full blur-[1px]" />

        {/* Kadraj Köşeleri */}
        <div className="absolute top-[5%] left-[5%] w-8 h-8 border-t border-l border-black/10" />
        <div className="absolute top-[5%] right-[5%] w-8 h-8 border-t border-r border-black/10" />
        <div className="absolute bottom-[5%] left-[5%] w-8 h-8 border-b border-l border-black/10" />
        <div className="absolute bottom-[5%] right-[5%] w-8 h-8 border-b border-r border-black/10" />

        {/* Mini HUD Değerleri */}
        <div className="absolute top-[6%] left-[6%] right-[6%] flex justify-between font-mono text-[8px] tracking-wider text-black/20">
          <span>● REC  RAW 16bit</span>
          <span>F/2.8  1/125s  ISO 400</span>
        </div>
      </div>

      {/* 🚀 Logo ve Yüklenme İçeriği */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Görseli (WebP formatına uyarlandı) */}
        <motion.img
          src="/splash/splash.webp"
          alt="Bluury Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-36 h-auto object-contain mb-6 filter drop-shadow-md"
        />

        {/* Blurry Ajans Yazısı (Navbar fontu ve stiliyle birebir uyumlu) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-2.5 mb-8 font-heading text-3xl md:text-5xl select-none"
        >
          <span className="text-[#C8A45A] tracking-[0.08em] font-bold">
            Blurry
          </span>
          <span className="text-[#333333] tracking-[0.08em] font-bold">
            Ajans
          </span>
        </motion.div>

        {/* Premium Yüklenme Çubuğu */}
        <div className="w-52 h-[2px] bg-black/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-[#C8A45A] rounded-full shadow-[0_0_8px_rgba(200,164,90,0.6)]"
          />
        </div>

        {/* Teknik Uyarım Metni */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-black/45 text-[10px] tracking-[0.35em] uppercase font-bold font-mono"
        >
          Kadraj Hazır
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;