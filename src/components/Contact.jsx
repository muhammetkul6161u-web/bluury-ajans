import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Mail, Phone, MapPin, Clock, X, Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import DecoratedHeading from "@/components/DecoratedHeading";

const Contact = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Mesajınız Alındı",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
      duration: 3000,
    });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/905364965698", "_blank", "noopener,noreferrer");
  };

  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.668705334237!2d39.719600!3d41.005300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40643c34e0000001%3A0x0!2sGazipa%C5%9Fa%2C%20Yavuz%20Selim%20Blv.%20No%3A50%2C%2061030%20Ortahisar%2FTrabzon!5e0!3m2!1str!2str!4v1650000000000!5m2!1str!2str";

  return (
    <section id="contact" ref={ref} className="relative py-16 md:py-24 bg-transparent z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Başlık */}
        <div className="text-center mb-12">
           <div className="mb-4">
              <DecoratedHeading text="Bizimle İletişime Geçin" />
           </div>
           <p className="text-black text-sm md:text-base font-semibold">
             Sorularınız, randevu talepleriniz veya projeleriniz için buradayız.
           </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-stretch">
          {/* Sol: İletişim Bilgileri & Harita */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 flex flex-col justify-between"
          >
            {/* İletişim Bilgileri (Açık tema lüks cam panel tasarımı) */}
            <div className="bg-[#FAFAF8]/95 backdrop-blur-xl p-8 rounded-3xl border border-[#C8A45A]/35 shadow-[0_20px_50px_rgba(200,164,90,0.08)] space-y-6 relative">
              {/* Vizör Odak Köşeleri */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-[#C8A45A]/40" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-[#C8A45A]/40" />

              {[
                { icon: MapPin, title: "Adres", info: "Gazipaşa, Yavuz Selim Blv. No:50\nKat:3 No:16, Trabzon" },
                { icon: Phone, title: "Telefon", info: "0536 496 56 98", link: "tel:05364965698" },
                { icon: Mail, title: "E-Posta", info: "info@bluuryajans.com" },
                { icon: Clock, title: "Çalışma Saatleri", info: "Pazartesi - Cumartesi: 10:00 - 19:00" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/70 rounded-xl border border-black/5 group-hover:border-[#C8A45A]/30 transition-all duration-300 shadow-sm">
                    <item.icon className="text-[#C8A45A]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-1">{item.title}</h4>
                    {item.link ? (
                      <a href={item.link} aria-label={`${item.title}: ${item.info}`} className="text-[#555555] hover:text-[#C8A45A] text-sm font-semibold leading-relaxed whitespace-pre-line no-underline transition-colors min-h-[44px] flex items-center">{item.info}</a>
                    ) : (
                      <p className="text-[#555555] text-sm font-semibold leading-relaxed whitespace-pre-line">{item.info}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* WhatsApp Butonu — Ana Sayfayla Uyumlu Altın Buton */}
              <button onClick={openWhatsApp}
                className="w-full mt-4 py-3.5 min-h-[48px] rounded-full text-white bg-[#C8A45A] hover:bg-[#D4B76A] hover:scale-[1.02] active:scale-95 transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer border-none font-bold text-sm tracking-widest uppercase shadow-[0_10px_20px_rgba(200,164,90,0.25)]">
                <MessageCircle size={18} /> WhatsApp ile İletişime Geçin
              </button>
            </div>

            {/* Harita */}
            <div className="relative rounded-3xl overflow-hidden h-56 border border-black/5 hover:border-[#C8A45A]/30 shadow-[0_15px_30px_rgba(0,0,0,0.05)] cursor-pointer group transition-all duration-500 flex-grow"
              onClick={() => setIsMapOpen(true)}>
              <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" className="transition-all duration-500 pointer-events-none group-hover:scale-105"
                title="Trabzon Ofis Haritası" />
              <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute bottom-4 left-4 bg-[#FAFAF8]/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] text-black font-bold border border-[#C8A45A]/25 shadow-md">
                Haritayı büyütmek için tıklayın
              </div>
            </div>
          </motion.div>

          {/* Sağ: İletişim Formu (Açık tema lüks cam panel tasarımı) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#FAFAF8]/95 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-[#C8A45A]/35 shadow-[0_20px_50px_rgba(200,164,90,0.08)] h-full flex flex-col relative"
          >
            {/* Vizör Odak Köşeleri */}
            <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-[#C8A45A]/40" />
            <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-[#C8A45A]/40" />

            <h3 className="font-heading text-3xl text-[#C8A45A] mb-8 font-bold text-center md:text-left">
              Size Ulaşalım
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
              <div>
                <label className="block text-xs font-bold text-black mb-2 tracking-wider uppercase">Adınız Soyadınız</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-black/15 text-black placeholder-black/35 focus:outline-none focus:border-[#C8A45A] focus:ring-1 focus:ring-[#C8A45A] transition-all text-base md:text-sm font-semibold shadow-sm"
                  placeholder="Örn: Ahmet Yılmaz" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black mb-2 tracking-wider uppercase">E-Posta Adresiniz</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-black/15 text-black placeholder-black/35 focus:outline-none focus:border-[#C8A45A] focus:ring-1 focus:ring-[#C8A45A] transition-all text-base md:text-sm font-semibold shadow-sm"
                  placeholder="Örn: ahmet@example.com" />
              </div>
              <div className="flex-grow">
                <label className="block text-xs font-bold text-black mb-2 tracking-wider uppercase">Mesajınız</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required
                  className="w-full h-[150px] px-4 py-3.5 rounded-xl bg-white/70 border border-black/15 text-black placeholder-black/35 focus:outline-none focus:border-[#C8A45A] focus:ring-1 focus:ring-[#C8A45A] transition-all resize-none text-base md:text-sm font-semibold shadow-sm"
                  placeholder="Projeniz hakkında bize bilgi verin..." />
              </div>
              
              {/* Gönder Butonu — Ana Sayfayla Uyumlu Altın Buton */}
              <button type="submit"
                className="w-full py-4 min-h-[48px] rounded-full text-white bg-[#C8A45A] hover:bg-[#D4B76A] hover:scale-[1.02] active:scale-95 transition-all duration-500 flex items-center justify-center gap-2 mt-auto cursor-pointer border-none font-bold text-sm tracking-widest uppercase shadow-[0_10px_20px_rgba(200,164,90,0.25)]">
                <Send size={16} /> Gönder
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Harita Lightbox */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsMapOpen(false)}>
            <button onClick={() => setIsMapOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-all z-50 bg-transparent border-none cursor-pointer">
              <X size={28} />
            </button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full max-w-6xl rounded-2xl overflow-hidden bg-white shadow-[0_10px_50px_rgba(0,0,0,0.3)] border border-[#C8A45A]/35" onClick={(e) => e.stopPropagation()}>
              <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                title="Tam Ekran Harita" className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;