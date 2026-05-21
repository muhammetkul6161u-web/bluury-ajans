import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import DecoratedHeading from "@/components/DecoratedHeading";
import InstagramModal from "@/components/InstagramModal";
import LightCameraBackground from "@/components/LightCameraBackground";
const services = [
  {
    title: "Dış Çekim",
    desc: "Doğanın büyüsüyle bütünleşen, mekan ruhunu yansıtan profesyonel dış mekan çekimleri. Mezuniyet, portre ve konsept fotoğraflarınız için.",
    image: "/ana sayfa/dışresim.webp",
  },
  {
    title: "Düğün & Nişan",
    desc: "En özel gününüzü sinematik bir dille ölümsüzleştiriyoruz. Doğal, duygu dolu ve zarif kareler.",
    image: "/ana sayfa/düğünresim.webp",
  },
  {
    title: "Reklam Çekimi",
    desc: "Markanızı öne çıkaran, satış odaklı ve yaratıcı reklam fotoğrafları. Ürün, katalog ve kampanya çekimleri.",
    image: "/ana sayfa/reklamresim.webp",
  },
];

/* ── Örnek Çekimler ── */
const portfolioItems = [
  {
    images: ["/ana sayfa/dışçk1.webp", "/ana sayfa/dışçk2.webp", "/ana sayfa/dışçk3.webp", "/ana sayfa/dışçk4.webp"],
    title: "Dış Çekim",
    subtitle: "Doğa & Portre Çekimi",
    desc: "Trabzon'un eşsiz doğasında, altın saat ışığıyla buluşan profesyonel dış mekan çekimleri. Her karede doğallık ve estetik bir arada.",
  },
  {
    images: ["/ana sayfa/düğünçk1.webp", "/ana sayfa/düğünçk2.webp", "/ana sayfa/düğünçk3.webp", "/ana sayfa/düğünçk4.webp"],
    title: "Düğün Çekimi",
    subtitle: "Düğün & Nişan Fotoğrafçılığı",
    desc: "En özel gününüzü sinematik bir bakış açısıyla ölümsüzleştiriyoruz. Duygu dolu, zarif ve unutulmaz kareler.",
  },
  {
    images: ["/ana sayfa/reklamçk1.webp", "/ana sayfa/reklamçk2.webp", "/ana sayfa/reklamçk3.webp", "/ana sayfa/reklamçk4.webp"],
    title: "Reklam Çekimi",
    subtitle: "Kurumsal & Ürün Fotoğrafçılığı",
    desc: "Markanızın hikayesini güçlü görseller ile anlatıyoruz. Ürün, katalog ve kampanya çekimlerinde profesyonel dokunuş.",
  },
];

/* ── Çalışma süreci ── */
const steps = [
  { step: "01", title: "Keşif & Planlama", desc: "Projenizi dinler, ihtiyaçlarınızı analiz eder ve size özel bir çekim planı hazırlarız." },
  { step: "02", title: "Profesyonel Çekim", desc: "Deneyimli ekibimizle, en modern ekipmanlarla unutulmaz kareler yakalarız." },
  { step: "03", title: "Düzenleme & Teslimat", desc: "Profesyonel post-prodüksiyon ile mükemmelleştirilen görseller zamanında teslim edilir." },
];

/* ── Instagram görselleri (1-6) ── */
const INSTA_IMAGES = Array.from({ length: 6 }, (_, i) => `/ana sayfa/ins${i + 1}.webp`);
// Sonsuz döngü hissi için çoğaltıyoruz
const FILM_IMAGES = [...INSTA_IMAGES, ...INSTA_IMAGES, ...INSTA_IMAGES];

const SHOOT_META = [
  { filter: "GOLDEN HOUR", lens: "50MM F/1.2", location: "TRABZON" },
  { filter: "CINE-D", lens: "85MM F/1.4", location: "KTÜ KAMPÜS" },
  { filter: "MONOCHROME", lens: "35MM F/1.8", location: "STUDIO" },
  { filter: "VINTAGE COLD", lens: "24-70MM F/2.8", location: "MEYDAN" },
  { filter: "WARM MATTE", lens: "50MM F/1.8", location: "PLATEAU" },
  { filter: "SOFT LIGHT", lens: "70-200MM F/2.8", location: "BOZTEPE" },
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
        <meta name="description" content="Bluury Ajans, Trabzon merkezli modern ve lüks fotoğrafçılık ajansıdır. Düğün, moda ve reklam çekimlerinde profesyonel hizmet." />
        <meta property="og:title" content="Bluury Ajans — Trabzon'da Profesyonel Fotoğrafçılık" />
        <meta property="og:description" content="Trabzon merkezli modern ve lüks fotoğrafçılık ajansı. Düğün, dış çekim ve moda fotoğrafçılığı." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bluuryajans.com/" />
        <link rel="canonical" href="https://bluuryajans.com/" />
      </Helmet>

      {/* Hero section + Overlapping Image Wrapper */}
      <div className="relative">
        <Hero />

        {/* Gözde Çekim Kapağı — Videonun alt kenarında, yarısı videonun içinde */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[45] px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="w-44 sm:w-56 md:w-68 lg:w-80 h-64 sm:h-80 md:h-[390px] lg:h-[460px] rounded-[1.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden bg-[#FAFAF8] cursor-pointer ring-2 ring-white/10"
          >
            <img
              src="/ana sayfa/gözdeçk.webp"
              alt="Öne Çıkan Gözde Dış Çekim Fotoğrafı - Bluury Ajans"
              fetchpriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          İÇERİK ALANI
      ═══════════════════════════════════════ */}
      <div className="relative z-40 w-full bg-[#D6D6D6] pt-36 sm:pt-44 md:pt-52 lg:pt-60">

        {/* Lüks Arka Plan Tasarımı */}
        <LightCameraBackground />

        {/* ── HİZMETLERİMİZ ── */}
        <section className="relative py-16 md:py-28">
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
                    alt={`${s.title} Fotoğraf Çekimi Hizmeti - Bluury Ajans`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-heading text-2xl md:text-3xl text-[#C8A45A] group-hover:text-[#E5E5E5] transition-colors duration-500">
                      {s.title}
                    </h3>
                    <p className="text-[#E5E5E5] text-sm font-medium leading-relaxed opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÖRNEK ÇEKİMLERİMİZ ── */}
        <section className="relative py-16 md:py-32 border-t border-[#C8A45A]/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <DecoratedHeading text="Örnek Çekimlerimiz" />
            </motion.h2>

            <div className="space-y-28">
              {portfolioItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="flex flex-col md:flex-row gap-12 md:gap-16 items-center"
                >
                  {/* Bilgi Paneli (Sol Tarafta) */}
                  <div className="w-full md:w-2/5 space-y-6 bg-[#FAFAF8] p-8 md:p-12 rounded-3xl border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:border-[#C8A45A]/40 transition-all duration-500 flex flex-col justify-center">
                    <div className="space-y-2">
                      <p className="text-[#C8A45A] text-xs font-semibold tracking-[0.25em] uppercase">
                        {item.subtitle}
                      </p>
                      <h3 className="font-heading text-3xl md:text-4xl text-[#1A1A1A] tracking-wide leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[#555555] text-base font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/portfolyo"
                        className="inline-block px-8 py-3.5 min-h-[48px] flex items-center justify-center border border-[#C8A45A]/40 rounded-full text-[#C8A45A] text-xs font-semibold tracking-widest uppercase hover:bg-[#C8A45A]/10 hover:border-[#C8A45A]/70 transition-all duration-500 no-underline active:scale-95"
                      >
                        Detayları Gör
                      </Link>
                    </div>
                  </div>

                  {/* Lüks Albüm Kolajı (Sağ Tarafta) */}
                  <div className="w-full md:w-3/5 relative h-[450px] sm:h-[520px] md:h-[560px] lg:h-[600px] select-none">
                    
                    {/* 1. Ana Büyük Fotoğraf (Hafif Sol-Ortada, Sol Yatık) */}
                    <div className="absolute top-[10%] left-[8%] w-[52%] h-[75%] z-20 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden transform -rotate-2 hover:rotate-0 hover:scale-105 hover:z-40 hover:border-[#C8A45A] hover:shadow-[0_20px_40px_rgba(200,164,90,0.3)] transition-all duration-500 bg-[#222]">
                      <img
                        src={item.images[0]}
                        alt={`${item.title} Portfolyo Ana Görseli - Bluury Ajans`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* 2. Sağ Üst Detay Fotoğrafı (Sağ Yatık) */}
                    <div className="absolute top-[5%] right-[5%] w-[36%] h-[38%] z-10 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-white/10 overflow-hidden transform rotate-3 hover:rotate-0 hover:scale-105 hover:z-40 hover:border-[#C8A45A] hover:shadow-[0_20px_40px_rgba(200,164,90,0.3)] transition-all duration-500 bg-[#222]">
                      <img
                        src={item.images[1]}
                        alt={`${item.title} Detay Görseli 1 - Bluury Ajans`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* 3. Sağ Alt Detay Fotoğrafı (Sol Yatık) */}
                    <div className="absolute bottom-[8%] right-[8%] w-[34%] h-[38%] z-30 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden transform -rotate-3 hover:rotate-0 hover:scale-105 hover:z-40 hover:border-[#C8A45A] hover:shadow-[0_20px_40px_rgba(200,164,90,0.3)] transition-all duration-500 bg-[#222]">
                      <img
                        src={item.images[2]}
                        alt={`${item.title} Detay Görseli 2 - Bluury Ajans`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* 4. Sol Alt Detay Fotoğrafı - Overlapping / Siyah-Beyaz Başlayan (Sağ Yatık) */}
                    <div className="absolute bottom-[5%] left-[2%] w-[30%] h-[35%] z-30 rounded-2xl shadow-[0_20px_35px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden transform rotate-2 hover:rotate-0 hover:scale-105 hover:z-40 hover:border-[#C8A45A] hover:shadow-[0_20px_40px_rgba(200,164,90,0.3)] transition-all duration-500 bg-[#222] md:grayscale md:hover:grayscale-0">
                      <img
                        src={item.images[3]}
                        alt={`${item.title} Detay Görseli 3 - Bluury Ajans`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÇALIŞMA SÜRECİMİZ ── */}
        <section className="relative py-16 md:py-32">
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
                  className="text-center relative group p-6 rounded-2xl bg-[#FAFAF8] border border-black/5 hover:border-[#C8A45A]/40 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.1)]"
                >
                  {i !== steps.length - 1 && (
                    <div className="hidden md:block absolute top-14 left-[75%] w-full h-[1px] bg-gradient-to-r from-[#C8A45A]/20 to-transparent z-0 pointer-events-none" />
                  )}
                  <div className="relative z-10 w-20 h-20 mx-auto border border-[#C8A45A]/40 rounded-full flex items-center justify-center text-2xl text-[#C8A45A] mb-6 group-hover:border-[#C8A45A] group-hover:bg-[#FAFAF8] group-hover:shadow-[0_4px_15px_rgba(200,164,90,0.15)] transition-all duration-500 font-heading">
                    {s.step}
                  </div>
                  <h3 className="font-heading text-xl text-[#1A1A1A] mb-3">{s.title}</h3>
                  <p className="text-[#555555] text-sm font-light leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM — SİNAMATİK FOCUS AKIŞI ── */}
        <section className="relative py-16 md:py-32 overflow-hidden bg-[#CECECE] border-t border-[#C8A45A]/10">
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
                    className="insta-focus-card relative w-[260px] md:w-[420px] h-[340px] md:h-[500px] flex-shrink-0 bg-[#FAFAF8] rounded-[2rem] border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)] group/item p-4 md:p-5 flex flex-col cursor-pointer transition-all duration-500 will-change-transform"
                    // Hover states defined cleanly to override JS inline styles
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.filter = 'blur(0px) brightness(1.1)';
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.borderColor = 'rgba(200, 164, 90, 0.4)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(200, 164, 90, 0.15)';
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
                    <div className="flex justify-between items-center mb-3 md:mb-4 border border-black/5 bg-white/60 rounded-full px-3 py-1.5 md:px-4 md:py-2 transition-opacity duration-500 opacity-60 group-hover/item:opacity-100">
                      <span className="text-[#C8A45A] text-[9px] md:text-[10px] tracking-[0.2em] font-mono uppercase font-bold">{meta.filter}</span>
                      <span className="text-[#555555] text-[9px] md:text-[10px] tracking-[0.2em] font-mono">{meta.lens}</span>
                    </div>
                    
                    {/* Fotoğraf Alanı */}
                    <div className="relative flex-grow rounded-2xl overflow-hidden bg-black">
                      <img
                        src={src}
                        alt={`Instagram Çekim Portfolyosu ${index + 1} - Bluury Ajans`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110"
                      />
                      {/* Konum overlay detayı — Mobilde her zaman görünür, masastünde hover ile */}
                      <div className="absolute bottom-4 left-4 border border-white/10 bg-[#1A1A1A]/95 backdrop-blur-md rounded-full px-3 py-1 text-[10px] text-[#E5E5E5] tracking-widest font-mono uppercase z-10 transition-opacity duration-500 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 shadow-sm">
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
              className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 min-h-[52px] bg-[#C8A45A] border-2 border-white rounded-full text-black text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-[#D4B76A] hover:scale-105 active:scale-95 transition-all duration-500 no-underline shadow-lg hover:shadow-xl cursor-pointer"
            >
              <Instagram size={18} className="text-black group-hover:rotate-6 transition-transform duration-500" />
              Takip Et
            </a>
          </div>
        </section>

        {/* ── ÇEKİMİ BAŞLAT CTA ── */}
        <section className="py-16 md:py-28 text-center relative z-10 bg-[#CECECE] border-t border-[#C8A45A]/10">
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
              className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 min-h-[52px] bg-[#C8A45A] border-2 border-white rounded-full text-black text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-[#D4B76A] hover:scale-105 active:scale-95 transition-all duration-500 no-underline shadow-lg hover:shadow-xl cursor-pointer"
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
