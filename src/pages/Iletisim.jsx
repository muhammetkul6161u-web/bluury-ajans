import React from "react";
import { Helmet } from "react-helmet-async";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import LightCameraBackground from "@/components/LightCameraBackground";

const Iletisim = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/905364965698", "_blank", "noopener,noreferrer");
  };

  return (
    <PageTransition>
      <Helmet>
        <title>İletişim — Bluury Ajans | Trabzon'da Fotoğraf Çekimi Randevusu</title>
        <meta name="description" content="Bluury Ajans ile iletişime geçin. Trabzon'da düğün, moda ve ürün çekimi için profesyonel randevu alın." />
        <meta property="og:title" content="İletişim — Bluury Ajans" />
        <meta property="og:description" content="Bluury Ajans ile iletişime geçin. Trabzon'da profesyonel fotoğraf çekimi randevusu alın." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bluuryajans.com/iletisim" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bluuryajans.com/iletisim" />
      </Helmet>

      <div className="relative z-10 bg-[#D6D6D6] overflow-hidden pt-20">
        {/* Lüks Arka Plan Tasarımı */}
        <LightCameraBackground />

        <Contact />

        {/* Ek Bilgi Bölümü */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center border-t border-black/10 pt-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-heading text-3xl md:text-4xl bg-gradient-to-r from-black via-black/85 to-[#C8A45A] bg-clip-text text-transparent mb-5 font-bold">
                Hızlı Dönüş Garantisi
              </h3>
              <p className="text-black text-sm md:text-base font-semibold leading-relaxed max-w-2xl mx-auto mb-8">
                Mesajınız bize ulaştıktan sonra en geç 24 saat içinde sizinle iletişime geçiyoruz. 
                Acil talepleriniz için bizi doğrudan WhatsApp üzerinden arayabilir veya mesaj atabilirsiniz.
              </p>
              <button onClick={openWhatsApp}
                aria-label="WhatsApp ile bizimle hemen iletişime geçin"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-white bg-[#C8A45A] hover:bg-[#D4B76A] hover:scale-105 transition-all duration-500 shadow-[0_10px_20px_rgba(200,164,90,0.3)] uppercase tracking-widest font-semibold border-none cursor-pointer">
                <MessageCircle size={18} /> WhatsApp ile İletişime Geçin
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Iletisim;
