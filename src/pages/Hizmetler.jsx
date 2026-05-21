import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Services from "@/components/Services";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Headphones, Palette, Clock } from "lucide-react";
import DecoratedHeading from "@/components/DecoratedHeading";
import LightCameraBackground from "@/components/LightCameraBackground";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group cursor-pointer bg-transparent border-none">
        <span className="text-[#1A1A1A] text-[15px] font-medium group-hover:text-[#C8A45A] transition-colors pr-4">{question}</span>
        <ChevronDown size={18} className={`text-[#C8A45A] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="pb-5 text-[#555555] text-sm font-light leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hizmetler = () => {
  const advantages = [
    { icon: CheckCircle, title: "Profesyonel Ekipman", desc: "En güncel kamera, lens ve aydınlatma ekipmanlarıyla çalışıyoruz." },
    { icon: Palette, title: "Yaratıcı Yaklaşım", desc: "Her projeye özgün ve yaratıcı bir bakış açısı sunuyoruz." },
    { icon: Headphones, title: "Kişisel İlgi", desc: "Her müşterimize özel bir deneyim ve birebir iletişim sağlıyoruz." },
    { icon: Clock, title: "Zamanında Teslimat", desc: "Projelerinizi söz verilen sürede eksiksiz teslim ediyoruz." },
  ];

  const faqs = [
    { q: "Çekim için nasıl randevu alabilirim?", a: "WhatsApp üzerinden bize yazarak veya iletişim formunu doldurarak hemen randevu oluşturabilirsiniz." },
    { q: "Çekim süreleri ne kadar?", a: "Çekim süreleri projenizin kapsamına ve ihtiyaçlarınıza göre özel olarak belirlenmektedir." },
    { q: "Fotoğraflar ne zaman teslim edilir?", a: "Düzenleme süreci dahil genellikle 7-14 iş günü içinde tüm fotoğraflarınız yüksek çözünürlüklü dijital olarak teslim edilir." },
    { q: "Çekim lokasyonu konusunda yardımcı oluyor musunuz?", a: "Evet! Çekiminizin konseptine uygun olarak en zarif ve şık mekanları birlikte seçebiliriz." },
    { q: "Hizmetlerinizi nasıl şekillendiriyorsunuz?", a: "İhtiyacınıza ve bütçenize göre tamamen size özel ve benzersiz çekim konseptleri tasarlayabiliriz." },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Hizmetlerimiz — Bluury Ajans | Düğün, Moda ve Reklam Çekimleri</title>
        <meta name="description" content="Düğün, moda, ürün ve reklam çekimi hizmetlerimizi keşfedin. Profesyonel ve zarif fotoğrafçılık hizmetleri." />
        <meta property="og:title" content="Hizmetlerimiz — Bluury Ajans" />
        <meta property="og:description" content="Düğün, moda, ürün ve reklam çekimi hizmetlerimizi keşfedin. Profesyonel fotoğrafçılık." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bluuryajans.com/hizmetler" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bluuryajans.com/hizmetler" />
      </Helmet>

      <div className="relative z-10 bg-[#D6D6D6] overflow-hidden pt-20">
        {/* Lüks Arka Plan Tasarımı */}
        <LightCameraBackground />

        <Services />

        {/* Neden Bizi Tercih Etmelisiniz */}
        <section className="py-16 md:py-24 bg-[#CECECE] border-y border-[#C8A45A]/10">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <DecoratedHeading text="Neden Biz?" />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-[#FAFAF8] p-8 rounded-2xl border border-black/5 hover:border-[#C8A45A]/40 transition-all duration-500 text-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.1)]">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#E5E5E5] border border-black/5 flex items-center justify-center group-hover:bg-[#C8A45A]/10 transition-colors">
                    <a.icon className="text-[#C8A45A]" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl text-[#1A1A1A] mb-3">{a.title}</h3>
                  <p className="text-[#555555] text-sm font-light leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <DecoratedHeading text="Sıkça Sorulanlar" />
              </motion.div>
            </div>

            <div className="bg-[#FAFAF8] rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>
        
      </div>
    </PageTransition>
  );
};

export default Hizmetler;
