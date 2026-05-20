import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import DecoratedHeading from "@/components/DecoratedHeading";
import InstagramModal from "@/components/InstagramModal";
const services = [
  {
    title: "Dış Çekim",
    desc: "Doğanın büyüsüyle bütünleşen, mekan ruhunu yansıtan profesyonel dış mekan çekimleri. Mezuniyet, portre ve konsept fotoğraflarınız için.",
    image: "/ana sayfa/dışçk.png",
  },
  {
    title: "Düğün & Nişan",
    desc: "En özel gününüzü sinematik bir dille ölümsüzleştiriyoruz. Doğal, duygu dolu ve zarif kareler.",
    image: "/ana sayfa/düğünçk.png",
  },
  {
    title: "Reklam Çekimi",
    desc: "Markanızı öne çıkaran, satış odaklı ve yaratıcı reklam fotoğrafları. Ürün, katalog ve kampanya çekimleri.",
    image: "/ana sayfa/reklamçk.png",
  },
];

/* ── Örnek Çekimler ── */
const portfolioItems = [
  {
    image: "/ana sayfa/anaport1.png",
    title: "Elif Korkmaz",
    subtitle: "Portre & Dış Çekim",
    desc: "Doğal ışıkta, Trabzon'un en güzel köşelerinde gerçekleştirdiğimiz profesyonel portre çekimi.",
  },
  {
    image: "/ana sayfa/anaport2.png",
    title: "KTÜ Mezuniyet Çekimi",
    subtitle: "Üniversite Dış Çekim",
    desc: "Karadeniz Teknik Üniversitesi kampüsünde, öğrencilerimiz için hazırladığımız konsept mezuniyet çekimi.",
  },
  {
    image: "/ana sayfa/anaport3.png",
    title: "Horizon Mobilya",
    subtitle: "Kurumsal Reklam Çekimi",
    desc: "Horizon Mobilya markası için hazırladığımız ürün ve katalog çekimi projesi.",
  },
];

/* ── Çalışma süreci ── */
const steps = [
  { step: "01", title: "Keşif & Planlama", desc: "Projenizi dinler, ihtiyaçlarınızı analiz eder ve size özel bir çekim planı hazırlarız." },
  { step: "02", title: "Profesyonel Çekim", desc: "Deneyimli ekibimizle, en modern ekipmanlarla unutulmaz kareler yakalarız." },
  { step: "03", title: "Düzenleme & Teslimat", desc: "Profesyonel post-prodüksiyon ile mükemmelleştirilen görseller zamanında teslim edilir." },
];

/* ── Instagram görselleri (1-5) ── */
const INSTA_IMAGES = Array.from({ length: 5 }, (_, i) => `/Instagram/ınsta${i + 1}.webp`);
// Sonsuz döngü hissi için çoğaltıyoruz
const FILM_IMAGES = [...INSTA_IMAGES, ...INSTA_IMAGES, ...INSTA_IMAGES];

const SHOOT_META = [
  { filter: "GOLDEN HOUR", lens: "50MM F/1.2", location: "TRABZON" },
  { filter: "CINE-D", lens: "85MM F/1.4", location: "KTÜ KAMPÜS" },
  { filter: "MONOCHROME", lens: "35MM F/1.8", location: "STUDIO" },
  { filter: "VINTAGE COLD", lens: "24-70MM F/2.8", location: "MEYDAN" },
  { filter: "WARM MATTE", lens: "50MM F/1.8", location: "PLATEAU" }
];

const AnaSayfa = () => {
  const scrollRef = useRef(null);
  const [modalData, setModalData] = useState({ isOpen: false, imageSrc: null });

  const openModal = (src) => {
    setModalData({ isOpen: true, imageSrc: src });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, imageSrc: null });
  };

  // Focus / Blur effect based on center position
  useEffect(() => {
    let animationFrameId;
    const cards = document.querySelectorAll('.insta-focus-card');
    
    const updateFocus = () => {
      if (!scrollRef.current) return;
      
      const containerRect = scrollRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      // Etki alanı: Ekranın yarısına kadar
      const maxDist = containerRect.width / 2;

      cards.forEach(card => {
        // Eğer karta hover olunduysa JS müdahalesini bırak, CSS devreye girsin
        if (card.matches(':hover')) {
          card.style.transform = '';
          card.style.filter = '';
          card.style.opacity = '';
          return;
        }

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        
        let factor = 1 - (distance / maxDist);
        factor = Math.max(0, Math.min(1, factor)); 
        // Eğriyi yumuşat (ortada daha uzun süre net kalır)
        const easeFactor = Math.pow(factor, 1.5); 

        const scale = 0.85 + (0.15 * easeFactor);
        const blurAmount = 6 * (1 - easeFactor);
        const opacity = 0.3 + (0.7 * easeFactor);
        const brightness = 0.4 + (0.6 * easeFactor);

        card.style.transform = `scale(${scale})`;
        card.style.filter = `blur(${blurAmount}px) brightness(${brightness})`;
        card.style.opacity = opacity;
      });

      animationFrameId = requestAnimationFrame(updateFocus);
    };

    updateFocus();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Bluury Ajans — Trabzon'da Profesyonel Fotoğrafçılık ve Tasarım Hizmetleri</title>
        <meta name="description" content="Bluury Ajans, Trabzon merkezli modern ve lüks fotoğrafçılık ajansıdır." />
        <link rel="canonical" href="https://bluuryajans.com/" />
      </Helmet>

      {/* Hero section */}
      <Hero />

      {/* ═══════════════════════════════════════
          İÇERİK ALANI
      ═══════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-[#D6D6D6] overflow-hidden">
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
          <div className="absolute top-[35%] right-[8%] w-[55vh] h-[55vh] bg-white/[0.15] blur-[150px] rounded-full" />
          <div className="absolute top-[65%] left-[10%] w-[50vh] h-[50vh] bg-[#C8A45A]/[0.07] blur-[130px] rounded-full" />

          {/* 🎥 Sony Alpha Profesyonel Fotoğraf Makinesi Sembolik Vektör Çizimleri (Watermark Background) */}
          {/* 1. Sol Üst Kenara Birleşik Sony Alpha Kamera */}
          <div className="absolute top-[15%] left-[-110px] md:left-[-70px] rotate-[-10deg] transition-all duration-[1.2s] hover:rotate-[-5deg] hover:scale-105 hover:opacity-[0.08] opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] text-black">
              {/* Camera Body Outer Shape */}
              <rect x="10" y="28" width="80" height="52" rx="6" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Left Grip Texture */}
              <path d="M 22 28 L 22 80" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="1 2" />
              {/* Viewfinder Prism */}
              <path d="M 38 28 L 42 16 L 58 16 L 62 28 Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="50" y="24" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">SONY</text>
              {/* Top Dials */}
              <rect x="18" y="23" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="68" y="21" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="81" y="24" width="7" height="4" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Hot Shoe */}
              <rect x="46" y="13" width="8" height="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Distinctive Sony Alpha (α) Logo */}
              <path d="M 78 36 C 76 36, 75 38, 75 40 C 75 42, 77 44, 79 44 C 81 44, 82 42, 82 40 C 82 37, 78 34, 76 34" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="81" y="47" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">7S</text>
              {/* Strap Eyelets */}
              <rect x="7" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="90" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Circular Lens Assembly */}
              <circle cx="50" cy="56" r="24" stroke="currentColor" strokeWidth="0.85" fill="none" />
              <circle cx="50" cy="56" r="22.5" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
              <circle cx="50" cy="56" r="18" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="12" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
              {/* Lens Text */}
              <text x="50" y="42" fontSize="2.2" fontFamily="monospace" textAnchor="middle" fill="currentColor">FE 2.8 / 16-35 GM</text>
              <text x="50" y="72" fontSize="2" fontFamily="monospace" textAnchor="middle" fill="currentColor">Ø 82</text>
              {/* Reflection */}
              <path d="M 45 51 A 6 6 0 0 1 55 51" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* 1.5. Sağ Üst Kenara Birleşik Sony Alpha Kamera (Çekim Hizmetlerinin Sağ Kenarına Dengeleme) */}
          <div className="absolute top-[20%] right-[-110px] md:right-[-70px] rotate-[10deg] transition-all duration-[1.2s] hover:rotate-[5deg] hover:scale-105 hover:opacity-[0.08] opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] text-black">
              {/* Camera Body Outer Shape */}
              <rect x="10" y="28" width="80" height="52" rx="6" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Left Grip Texture */}
              <path d="M 22 28 L 22 80" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="1 2" />
              {/* Viewfinder Prism */}
              <path d="M 38 28 L 42 16 L 58 16 L 62 28 Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="50" y="24" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">SONY</text>
              {/* Top Dials */}
              <rect x="18" y="23" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="68" y="21" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="81" y="24" width="7" height="4" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Hot Shoe */}
              <rect x="46" y="13" width="8" height="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Distinctive Sony Alpha (α) Logo */}
              <path d="M 78 36 C 76 36, 75 38, 75 40 C 75 42, 77 44, 79 44 C 81 44, 82 42, 82 40 C 82 37, 78 34, 76 34" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="81" y="47" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">7S</text>
              {/* Strap Eyelets */}
              <rect x="7" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="90" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Circular Lens Assembly */}
              <circle cx="50" cy="56" r="24" stroke="currentColor" strokeWidth="0.85" fill="none" />
              <circle cx="50" cy="56" r="22.5" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
              <circle cx="50" cy="56" r="18" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="12" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
              {/* Lens Text */}
              <text x="50" y="42" fontSize="2.2" fontFamily="monospace" textAnchor="middle" fill="currentColor">FE 2.8 / 16-35 GM</text>
              <text x="50" y="72" fontSize="2" fontFamily="monospace" textAnchor="middle" fill="currentColor">Ø 82</text>
              {/* Reflection */}
              <path d="M 45 51 A 6 6 0 0 1 55 51" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* 2. Sağ Orta Kenara Birleşik Sony Alpha Kamera */}
          <div className="absolute top-[48%] right-[-110px] md:right-[-70px] rotate-[12deg] transition-all duration-[1.2s] hover:rotate-[6deg] hover:scale-105 hover:opacity-[0.08] opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] text-black">
              {/* Camera Body Outer Shape */}
              <rect x="10" y="28" width="80" height="52" rx="6" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Left Grip Texture */}
              <path d="M 22 28 L 22 80" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="1 2" />
              {/* Viewfinder Prism */}
              <path d="M 38 28 L 42 16 L 58 16 L 62 28 Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="50" y="24" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">SONY</text>
              {/* Top Dials */}
              <rect x="18" y="23" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="68" y="21" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="81" y="24" width="7" height="4" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Hot Shoe */}
              <rect x="46" y="13" width="8" height="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Distinctive Sony Alpha (α) Logo */}
              <path d="M 78 36 C 76 36, 75 38, 75 40 C 75 42, 77 44, 79 44 C 81 44, 82 42, 82 40 C 82 37, 78 34, 76 34" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="81" y="47" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">7S</text>
              {/* Strap Eyelets */}
              <rect x="7" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="90" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Circular Lens Assembly */}
              <circle cx="50" cy="56" r="24" stroke="currentColor" strokeWidth="0.85" fill="none" />
              <circle cx="50" cy="56" r="22.5" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
              <circle cx="50" cy="56" r="18" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="12" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
              {/* Lens Text */}
              <text x="50" y="42" fontSize="2.2" fontFamily="monospace" textAnchor="middle" fill="currentColor">FE 2.8 / 16-35 GM</text>
              <text x="50" y="72" fontSize="2" fontFamily="monospace" textAnchor="middle" fill="currentColor">Ø 82</text>
              {/* Reflection */}
              <path d="M 45 51 A 6 6 0 0 1 55 51" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* 3. Sol Alt Kenara Birleşik Sony Alpha Kamera */}
          <div className="absolute top-[78%] left-[-110px] md:left-[-70px] rotate-[8deg] transition-all duration-[1.2s] hover:rotate-[3deg] hover:scale-105 hover:opacity-[0.08] opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] text-black">
              {/* Camera Body Outer Shape */}
              <rect x="10" y="28" width="80" height="52" rx="6" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Left Grip Texture */}
              <path d="M 22 28 L 22 80" stroke="currentColor" strokeWidth="0.75" fill="none" strokeDasharray="1 2" />
              {/* Viewfinder Prism */}
              <path d="M 38 28 L 42 16 L 58 16 L 62 28 Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="50" y="24" fontSize="5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">SONY</text>
              {/* Top Dials */}
              <rect x="18" y="23" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="68" y="21" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="81" y="24" width="7" height="4" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Hot Shoe */}
              <rect x="46" y="13" width="8" height="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Distinctive Sony Alpha (α) Logo */}
              <path d="M 78 36 C 76 36, 75 38, 75 40 C 75 42, 77 44, 79 44 C 81 44, 82 42, 82 40 C 82 37, 78 34, 76 34" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <text x="81" y="47" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">7S</text>
              {/* Strap Eyelets */}
              <rect x="7" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <rect x="90" y="38" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
              {/* Circular Lens Assembly */}
              <circle cx="50" cy="56" r="24" stroke="currentColor" strokeWidth="0.85" fill="none" />
              <circle cx="50" cy="56" r="22.5" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
              <circle cx="50" cy="56" r="18" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="12" stroke="currentColor" strokeWidth="0.75" fill="none" />
              <circle cx="50" cy="56" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
              {/* Lens Text */}
              <text x="50" y="42" fontSize="2.2" fontFamily="monospace" textAnchor="middle" fill="currentColor">FE 2.8 / 16-35 GM</text>
              <text x="50" y="72" fontSize="2" fontFamily="monospace" textAnchor="middle" fill="currentColor">Ø 82</text>
              {/* Reflection */}
              <path d="M 45 51 A 6 6 0 0 1 55 51" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* 📸 Kamera Kadrajı Vizör Detayları (Camera Viewfinder Overlay Watermarks) */}
          {/* Köşe Kadraj Kılavuzları (Focus Corners) */}
          <div className="absolute top-[3%] left-[3%] w-10 h-10 border-t-2 border-l-2 border-black/15 pointer-events-none" />
          <div className="absolute top-[3%] right-[3%] w-10 h-10 border-t-2 border-r-2 border-black/15 pointer-events-none" />
          <div className="absolute bottom-[3%] left-[3%] w-10 h-10 border-b-2 border-l-2 border-black/15 pointer-events-none" />
          <div className="absolute bottom-[3%] right-[3%] w-10 h-10 border-b-2 border-r-2 border-black/15 pointer-events-none" />

          {/* Autofocus Netleme Noktaları ve Artı İşaretleri */}
          <div className="absolute top-[28%] left-[25%] text-black/15 font-light select-none pointer-events-none text-2xl select-none">+</div>
          <div className="absolute top-[62%] right-[25%] text-black/15 font-light select-none pointer-events-none text-2xl select-none">+</div>
          <div className="absolute top-[85%] left-[35%] text-black/15 font-light select-none pointer-events-none text-2xl select-none">+</div>
          
          {/* Merkez Vizör AF Çerçevesi */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-dashed border-black/10 rounded-full flex items-center justify-center pointer-events-none select-none">
            <span className="text-black/15 text-sm select-none">+</span>
          </div>

          {/* ✨ Romantik Altın Işık Tozları (Floating Gold Sparkles / Bokeh) */}
          <div className="absolute top-[6%] left-[18%] w-1.5 h-1.5 bg-[#C8A45A]/25 rounded-full blur-[0.5px]" />
          <div className="absolute top-[12%] right-[22%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[1px]" />
          <div className="absolute top-[24%] left-[45%] w-1 h-1 bg-[#C8A45A]/30 rounded-full" />
          <div className="absolute top-[35%] left-[12%] w-2.5 h-2.5 bg-[#C8A45A]/15 rounded-full blur-[1.5px]" />
          <div className="absolute top-[42%] right-[35%] w-1.5 h-1.5 bg-[#C8A45A]/25 rounded-full" />
          <div className="absolute top-[52%] left-[28%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[0.5px]" />
          <div className="absolute top-[60%] right-[15%] w-1 h-1 bg-[#C8A45A]/35 rounded-full" />
          <div className="absolute top-[68%] left-[40%] w-2 h-2 bg-[#C8A45A]/15 rounded-full blur-[1px]" />
          <div className="absolute top-[75%] right-[45%] w-1.5 h-1.5 bg-[#C8A45A]/30 rounded-full" />
          <div className="absolute top-[84%] left-[18%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[1px]" />
          <div className="absolute top-[92%] right-[28%] w-1 h-1 bg-[#C8A45A]/30 rounded-full" />

          {/* 📡 Vizör Teknik HUD Bilgileri (Soft Viewfinder Camera HUD Status Panels) */}
          {/* Panel 1 - Üst Kısım */}
          <div className="absolute top-[4%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500/30 rounded-full animate-pulse" />
              <span>REC  4K 60fps</span>
            </div>
            <div><span>CH1 ━━━━ CH2 ━━━━</span></div>
          </div>

          {/* Panel 2 - Orta Kısım */}
          <div className="absolute top-[45%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
            <div><span>F/2.8  1/125s  0.0ev</span></div>
            <div><span>ISO 100  RAW 16bit</span></div>
          </div>

          {/* Panel 3 - Alt Kısım */}
          <div className="absolute top-[85%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
            <div><span>HLG  M-FOCUS  AF-C</span></div>
            <div className="flex items-center gap-2">
              <span>BATT 98%</span>
              <span className="px-1 border border-black/10 rounded-[2px] text-[7px] font-bold">███</span>
            </div>
          </div>
        </div>

        {/* ── HİZMETLERİMİZ ── */}
        <section className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <DecoratedHeading text="Çekim Hizmetlerimiz" />
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="group relative rounded-2xl overflow-hidden h-[500px] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#C8A45A]/20 hover:border-[#C8A45A]/50 transition-all duration-500"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-heading text-2xl md:text-3xl text-[#C8A45A] group-hover:text-[#E5E5E5] transition-colors duration-500">
                      {s.title}
                    </h3>
                    <p className="text-[#E5E5E5] text-sm font-medium leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÖRNEK ÇEKİMLERİMİZ ── */}
        <section className="relative py-24 md:py-32 border-t border-[#C8A45A]/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <DecoratedHeading text="Örnek Çekimlerimiz" />
            </motion.h2>

            <div className="space-y-16">
              {portfolioItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 md:gap-12 items-center`}
                >
                  <div className="w-full md:w-1/2 relative group">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-black/5 shadow-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 space-y-4 bg-[#1A1A1A] p-6 md:p-10 rounded-2xl border border-[#C8A45A]/20 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.15)] transition-all">
                    <p className="text-[#C8A45A] text-xs font-semibold tracking-[0.2em] uppercase">
                      {item.subtitle}
                    </p>
                    <h3 className="font-heading text-3xl md:text-4xl text-[#E5E5E5]">
                      {item.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-base font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <Link
                      to="/portfolyo"
                      className="inline-block mt-4 px-8 py-3 border border-[#C8A45A]/40 rounded-full text-[#C8A45A] text-xs font-semibold tracking-widest uppercase hover:bg-[#C8A45A]/10 hover:border-[#C8A45A]/70 transition-all duration-500 no-underline"
                    >
                      Detayları Gör
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÇALIŞMA SÜRECİMİZ ── */}
        <section className="relative py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <DecoratedHeading text="Çalışma Sürecimiz" />
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center relative group p-6 rounded-2xl bg-[#1A1A1A] border border-[#C8A45A]/20 hover:border-[#C8A45A]/50 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.15)]"
                >
                  {i !== steps.length - 1 && (
                    <div className="hidden md:block absolute top-14 left-[75%] w-full h-[1px] bg-gradient-to-r from-[#C8A45A]/20 to-transparent z-0 pointer-events-none" />
                  )}
                  <div className="relative z-10 w-20 h-20 mx-auto border border-[#C8A45A]/40 rounded-full flex items-center justify-center text-2xl text-[#C8A45A] mb-6 group-hover:border-[#C8A45A] group-hover:bg-[#2A2A2A] group-hover:shadow-[0_4px_15px_rgba(200,164,90,0.15)] transition-all duration-500 font-heading">
                    {s.step}
                  </div>
                  <h3 className="font-heading text-xl text-[#E5E5E5] mb-3">{s.title}</h3>
                  <p className="text-[#A0A0A0] text-sm font-light leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM — SİNAMATİK FOCUS AKIŞI ── */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#CECECE] border-t border-[#C8A45A]/10">
          {/* Arka Planda Çok Düşük Opaklıklı Altın Işıklar */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-[20%] w-[40%] h-[60%] bg-[#C8A45A]/[0.05] blur-[150px] rounded-full -translate-y-1/2" />
            <div className="absolute top-1/2 right-[20%] w-[40%] h-[60%] bg-[#8A8C8E]/[0.05] blur-[150px] rounded-full -translate-y-1/2" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-4"
            >
              <DecoratedHeading text="Instagram'da Biz" />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-black text-base font-semibold mb-12"
            >
              Odak noktamızdan yansıyan anlar. Akışa katılmak için fotoğraflara dokunun.
            </motion.p>
          </div>

          {/* Animasyonlu Kartlar Alanı */}
          <div className="relative w-full overflow-hidden flex items-center py-10 z-10 group/strip" ref={scrollRef}>
            
            {/* Edge Soft Light Fade Masks */}
            <div className="absolute top-0 left-0 w-[15%] md:w-[25%] h-full bg-gradient-to-r from-[#CECECE] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[15%] md:w-[25%] h-full bg-gradient-to-l from-[#CECECE] to-transparent z-20 pointer-events-none" />

            {/* Animasyonlu Kaydırma Alanı */}
            <div 
              className="film-strip-scroll flex w-max gap-8 px-[30vw] group-hover/strip:[animation-play-state:paused]" 
              style={{ width: "max-content", animationDuration: "80s" }}
            >
              {FILM_IMAGES.map((src, index) => {
                const meta = SHOOT_META[index % SHOOT_META.length];
                return (
                  <div
                    key={index}
                    onClick={() => openModal(src)}
                    className="insta-focus-card relative w-[300px] md:w-[420px] h-[380px] md:h-[500px] flex-shrink-0 bg-[#1A1A1A] rounded-[2rem] border border-[#C8A45A]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] group/item p-5 flex flex-col cursor-pointer transition-all duration-500 will-change-transform"
                    // Hover states defined cleanly to override JS inline styles
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.filter = 'blur(0px) brightness(1.1)';
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.borderColor = 'rgba(200, 164, 90, 0.6)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(200, 164, 90, 0.25)';
                      e.currentTarget.style.zIndex = '30';
                    }}
                    onMouseLeave={(e) => {
                      // Kısa bir süre transition bırakıp sonra kaldırıyoruz ki JS akıcı devam etsin
                      setTimeout(() => {
                        if (e.currentTarget) {
                          e.currentTarget.style.transition = '';
                          e.currentTarget.style.borderColor = '';
                          e.currentTarget.style.boxShadow = '';
                          e.currentTarget.style.zIndex = '';
                        }
                      }, 500);
                    }}
                  >
                    <div className="flex justify-between items-center mb-4 border border-white/5 bg-[#2A2A2A] rounded-full px-4 py-2 transition-opacity duration-500 opacity-50 group-hover/item:opacity-100">
                      <span className="text-[#C8A45A] text-[10px] tracking-[0.2em] font-mono uppercase font-bold">{meta.filter}</span>
                      <span className="text-[#A0A0A0] text-[10px] tracking-[0.2em] font-mono">{meta.lens}</span>
                    </div>
                    
                    {/* Fotoğraf Alanı */}
                    <div className="relative flex-grow rounded-2xl overflow-hidden bg-black">
                      <img
                        src={src}
                        alt="Instagram Shoot"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110"
                      />
                      {/* Konum overlay detayı */}
                      <div className="absolute bottom-4 left-4 border border-white/10 bg-[#1A1A1A]/95 backdrop-blur-md rounded-full px-3 py-1 text-[10px] text-[#E5E5E5] tracking-widest font-mono uppercase z-10 transition-opacity duration-500 opacity-0 group-hover/item:opacity-100 shadow-sm">
                        {meta.location}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 pb-10 relative z-10">
            <a
              href="https://www.instagram.com/blurry_ajans"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram hesabımızı takip edin"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#C8A45A] border-2 border-white rounded-full text-black text-sm font-bold tracking-widest uppercase hover:bg-[#D4B76A] hover:scale-105 transition-all duration-500 no-underline shadow-lg hover:shadow-xl cursor-pointer"
            >
              <Instagram size={18} className="text-black group-hover:rotate-6 transition-transform duration-500" />
              Takip Et
            </a>
          </div>
        </section>

        {/* ── ÇEKİMİ BAŞLAT CTA ── */}
        <section className="py-20 md:py-28 text-center relative z-10 bg-[#CECECE] border-t border-[#C8A45A]/10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="max-w-2xl mx-auto px-6"
          >
            <div className="mb-8">
              <h2 className="relative inline-block text-center px-4 mb-2">
                <span className="relative z-10 font-heading text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-black to-[#C8A45A] bg-clip-text text-transparent tracking-wide leading-relaxed py-2 block">
                  Çekimi Başlat
                </span>
              </h2>
            </div>
            <p className="text-black text-base font-semibold mb-10 max-w-lg mx-auto">
              Hayallerinizdeki fotoğraf veya video çekimini bugün planlayın. Bizimle iletişime geçerek hemen randevu oluşturun.
            </p>
            <button 
              onClick={() => window.open("https://wa.me/905364965698", "_blank", "noopener,noreferrer")}
              aria-label="WhatsApp üzerinden çekimi planlamak için iletişime geçin"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#C8A45A] border-2 border-white rounded-full text-black text-sm font-bold tracking-widest uppercase hover:bg-[#D4B76A] hover:scale-105 transition-all duration-500 no-underline shadow-lg hover:shadow-xl cursor-pointer"
            >
              WhatsApp ile İletişime Geç
            </button>
          </motion.div>
        </section>

      </div>

      <InstagramModal
        isOpen={modalData.isOpen}
        imageSrc={modalData.imageSrc}
        onClose={closeModal}
      />
    </PageTransition>
  );
};

export default AnaSayfa;
