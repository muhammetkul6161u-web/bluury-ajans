import React from "react";
import { Helmet } from "react-helmet-async";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import DecoratedHeading from "@/components/DecoratedHeading";

const Portfolyo = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Portfolyo — Blurry Ajans | Düğün, Moda, Ürün Çekim Galerisi</title>
        <meta name="description" content="Blurry Ajans portfolyo galerisi. Düğün, moda, ürün ve reklam çekimlerimizden seçme kareler." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bluuryajans.com/portfolyo" />
      </Helmet>

      <div className="relative z-10 bg-[#D6D6D6] overflow-hidden">
        {/* Lüks Arka Plan Tasarımı: Çekim Stüdyosu Işıkları ve Altın Arayüz Çizgileri */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* İnce Altın Eskiz / Arayüz Çizgileri */}
          <div 
            className="absolute inset-0 opacity-[0.08]" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(200, 164, 90, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(200, 164, 90, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />

          {/* Düğün ve Çekim Ajansı Temalı Romantik Altın Işık Hüzmeleri (Soft Ambient Glows) */}
          <div className="absolute top-[8%] left-[5%] w-[45vh] h-[45vh] bg-[#C8A45A]/[0.08] blur-[120px] rounded-full" />
          <div className="absolute top-[40%] right-[8%] w-[55vh] h-[55vh] bg-white/[0.15] blur-[150px] rounded-full" />
          <div className="absolute top-[75%] left-[10%] w-[50vh] h-[50vh] bg-[#C8A45A]/[0.07] blur-[130px] rounded-full" />

          {/* 🎥 Sony Alpha Kamera Sembolik Vektör Çizimleri (Watermark Background) */}
          <div className="absolute top-[18%] left-[-110px] md:left-[-70px] rotate-[-10deg] opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] text-black">
              <rect x="10" y="28" width="80" height="52" rx="6" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <path d="M 22 28 L 22 80" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="1 2" />
              <path d="M 38 28 L 42 16 L 58 16 L 62 28 Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="50" y="24" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">SONY</text>
              <rect x="18" y="23" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="68" y="21" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="81" y="24" width="7" height="4" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="46" y="13" width="8" height="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <path d="M 78 36 C 76 36, 75 38, 75 40 C 75 42, 77 44, 79 44 C 81 44, 82 42, 82 40 C 82 37, 78 34, 76 34" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="81" y="47" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">7S</text>
              <circle cx="50" cy="56" r="24" stroke="currentColor" strokeWidth="0.85" fill="none" />
              <circle cx="50" cy="56" r="18" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="12" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <text x="50" y="42" fontSize="2.2" fontFamily="monospace" textAnchor="middle" fill="currentColor">FE 2.8 / 16-35 GM</text>
            </svg>
          </div>

          <div className="absolute top-[60%] right-[-110px] md:right-[-70px] rotate-[12deg] opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] text-black">
              <rect x="10" y="28" width="80" height="52" rx="6" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <path d="M 22 28 L 22 80" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="1 2" />
              <path d="M 38 28 L 42 16 L 58 16 L 62 28 Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="50" y="24" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">SONY</text>
              <rect x="18" y="23" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="68" y="21" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="81" y="24" width="7" height="4" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="46" y="13" width="8" height="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <path d="M 78 36 C 76 36, 75 38, 75 40 C 75 42, 77 44, 79 44 C 81 44, 82 42, 82 40 C 82 37, 78 34, 76 34" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="81" y="47" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">7S</text>
              <circle cx="50" cy="56" r="24" stroke="currentColor" strokeWidth="0.85" fill="none" />
              <circle cx="50" cy="56" r="18" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="12" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <text x="50" y="42" fontSize="2.2" fontFamily="monospace" textAnchor="middle" fill="currentColor">FE 2.8 / 16-35 GM</text>
            </svg>
          </div>

          {/* Köşe Kadraj Kılavuzları (Focus Corners) */}
          <div className="absolute top-[3%] left-[3%] w-10 h-10 border-t-2 border-l-2 border-black/15 pointer-events-none" />
          <div className="absolute top-[3%] right-[3%] w-10 h-10 border-t-2 border-r-2 border-black/15 pointer-events-none" />
          <div className="absolute bottom-[3%] left-[3%] w-10 h-10 border-b-2 border-l-2 border-black/15 pointer-events-none" />
          <div className="absolute bottom-[3%] right-[3%] w-10 h-10 border-b-2 border-r-2 border-black/15 pointer-events-none" />

          {/* ✨ Romantik Altın Işık Tozları (Bokeh) */}
          <div className="absolute top-[8%] left-[20%] w-1.5 h-1.5 bg-[#C8A45A]/25 rounded-full blur-[0.5px]" />
          <div className="absolute top-[18%] right-[15%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[1px]" />
          <div className="absolute top-[38%] left-[45%] w-1 h-1 bg-[#C8A45A]/30 rounded-full" />
          <div className="absolute top-[55%] left-[12%] w-2.5 h-2.5 bg-[#C8A45A]/15 rounded-full blur-[1.5px]" />
          <div className="absolute top-[70%] right-[30%] w-1.5 h-1.5 bg-[#C8A45A]/25 rounded-full" />
          <div className="absolute top-[88%] left-[25%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[1px]" />

          {/* 📡 Vizör Teknik HUD Bilgileri */}
          <div className="absolute top-[4%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500/30 rounded-full animate-pulse" />
              <span>REC  4K 60fps</span>
            </div>
            <div><span>CH1 ━━━━ CH2 ━━━━</span></div>
          </div>
          
          <div className="absolute top-[85%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
            <div><span>HLG  M-FOCUS  AF-C</span></div>
            <div className="flex items-center gap-2">
              <span>BATT 98%</span>
              <span className="px-1 border border-black/10 rounded-[2px] text-[7px] font-bold">███</span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <section className="relative pt-36 md:pt-40 pb-4">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
              <DecoratedHeading text="Portfolyo" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-black text-base font-semibold max-w-2xl mx-auto">
              Her kategoride özenle çekilmiş, profesyonel işlerimizi keşfedin.
            </motion.p>
          </div>
        </section>

        <Portfolio />
        <Testimonials />

      </div>
    </PageTransition>
  );
};

export default Portfolyo;
