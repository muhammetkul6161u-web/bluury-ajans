import React from "react";
import { Helmet } from "react-helmet-async";
import About from "@/components/About";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Eye, Heart, Shield, Zap } from "lucide-react";
import DecoratedHeading from "@/components/DecoratedHeading";

const Hakkimizda = () => {
  const values = [
    { icon: Eye, title: "Yaratıcı Vizyon", desc: "Her projede benzersiz bir bakış açısı sunarak, markanızın hikâyesini en etkileyici şekilde anlatıyoruz." },
    { icon: Heart, title: "Tutku & Özen", desc: "İşimize olan tutkumuz her karede kendini gösterir. Detaylara gösterdiğimiz özen, farkımızı ortaya koyar." },
    { icon: Shield, title: "Güvenilirlik", desc: "Zamanında teslimat, profesyonel iletişim ve müşteri memnuniyeti en öncelikli değerlerimizdir." },
    { icon: Zap, title: "Modern Teknoloji", desc: "En güncel ekipman ve yazılımlarla çalışarak, endüstri standardının ötesinde sonuçlar üretiyoruz." },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Hakkımızda — Bluury Ajans | Trabzon Fotoğrafçılık Ajansı</title>
        <meta name="description" content="Bluury Ajans'ın hikâyesini keşfedin. Trabzon'da fotoğrafçılık tutkusu ile kurulan modern ve lüks fotoğraf ajansımız." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bluuryajans.com/hakkimizda" />
      </Helmet>

      <div className="relative z-10 bg-[#D6D6D6] overflow-hidden pt-20">
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
          <div className="absolute top-[5%] left-[8%] w-[45vh] h-[45vh] bg-[#C8A45A]/[0.08] blur-[120px] rounded-full" />
          <div className="absolute top-[35%] right-[10%] w-[55vh] h-[55vh] bg-white/[0.15] blur-[150px] rounded-full" />
          <div className="absolute top-[65%] left-[5%] w-[50vh] h-[50vh] bg-[#C8A45A]/[0.07] blur-[130px] rounded-full" />

          {/* 🎥 Sony Alpha Kamera Sembolik Vektör Çizimleri (Watermark Background) */}
          <div className="absolute top-[15%] left-[-110px] md:left-[-70px] rotate-[-10deg] opacity-[0.04]">
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

          <div className="absolute top-[50%] right-[-110px] md:right-[-70px] rotate-[12deg] opacity-[0.04]">
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

        {/* About componenti kendi içinde fotoğraf barındırıyor */}
        <div className="relative z-10 pt-8 md:pt-12">
          <About />
        </div>

        {/* Tüm sayfayı saran açık tema */}
        <div className="relative z-10 bg-transparent">
          {/* Hikâyemiz */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
              <div className="mb-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <DecoratedHeading text="Hikâyemiz" />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.3 }} className="space-y-6 bg-[#FAFAF8] backdrop-blur-md p-8 md:p-12 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <p className="text-[#1A1A1A] text-base md:text-lg font-light leading-relaxed">
                  Bluury Ajans, Trabzon'un kalbinde doğan bir fotoğrafçılık tutkusunun hikâyesidir. Bir kamera ve sonsuz bir hayal gücüyle başlayan yolculuğumuz, bugün profesyonel ekibimiz ve modern stüdyomuzla devam ediyor.
                </p>
                <p className="text-[#1A1A1A] text-base md:text-lg font-light leading-relaxed">
                  Her projemizde müşterilerimizin vizyonunu anlıyor, onların hikâyelerini en etkileyici şekilde karelere yansıtıyoruz. Düğün çekimlerinden moda projelerine, ürün fotoğraflarından kurumsal çalışmalara kadar geniş bir yelpazede hizmet veriyoruz.
                </p>
                <p className="text-[#1A1A1A] text-base md:text-lg font-light leading-relaxed">
                  Amacımız sadece fotoğraf çekmek değil — anıları ölümsüzleştirmek, duyguları yakalamak ve markaların görsel kimliğini güçlendirmek. Çünkü biz inanıyoruz ki, her kare bir hikâye anlatır.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Değerlerimiz */}
          <section className="py-16 md:py-24 bg-[#CECECE] border-t border-black/5">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <div className="text-center mb-14">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <DecoratedHeading text="Değerlerimiz" />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-[#FAFAF8] p-8 rounded-2xl border border-black/5 hover:border-[#C8A45A]/30 transition-all duration-500 text-center flex flex-col items-center hover:shadow-[0_10px_30px_rgba(200,164,90,0.08)]">
                    <div className="w-14 h-14 mb-6 rounded-full bg-[#E5E5E5] border border-black/5 flex items-center justify-center">
                      <v.icon className="text-[#C8A45A]" size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-xl text-[#1A1A1A] mb-3">{v.title}</h3>
                    <p className="text-[#8A8C8E] text-sm font-light leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Hakkimizda;
