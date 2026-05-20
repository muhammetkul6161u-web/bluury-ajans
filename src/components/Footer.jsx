import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, MapPin, Phone, Mail, X } from "lucide-react";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showKVKK, setShowKVKK] = useState(false);

  const navLinks = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/portfolyo", label: "Portfolyo" },
    { to: "/hizmetler", label: "Hizmetler" },
    { to: "/hakkimizda", label: "Hakkımızda" },
    { to: "/iletisim", label: "İletişim" },
  ];

  return (
    <>
      <footer className="bg-[#1A1A1A] text-[#A0A0A0] relative border-t border-[#C8A45A]/10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-8 w-[1px] h-full bg-black/[0.03]" />
          <div className="absolute top-0 right-8 w-[1px] h-full bg-black/[0.03]" />
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A45A]/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
            <div>
              <Link to="/" className="no-underline inline-block mb-4">
                <img
                  src="/ana sayfa/logo.webp"
                  alt="Blurry Ajans Logo"
                  className="h-16 w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <p className="text-[#777777] text-sm font-light leading-relaxed max-w-xs mb-6 font-sans">
                Anılarınızı estetik bir sanata dönüştüren, Trabzon merkezli premium fotoğrafçılık ve yaratıcı ajans.
              </p>
              
              <div className="flex flex-col gap-3">
                <a href="https://www.instagram.com/blurry_ajans" target="_blank" rel="noopener noreferrer"
                  aria-label="Blurry Ajans Instagram profilini yeni sekmede ziyaret edin"
                  className="inline-flex items-center gap-2 text-[#777777] hover:text-[#C8A45A] transition-colors duration-300 no-underline w-fit">
                  <Instagram size={24} />
                  <span className="text-xs font-light font-sans tracking-widest text-[#555555] hover:text-[#C8A45A] uppercase">Instagram</span>
                </a>
                
                <a href="https://wa.me/905364965698" target="_blank" rel="noopener noreferrer"
                  aria-label="Blurry Ajans ile WhatsApp üzerinden yeni sekmede anında iletişime geçin"
                  className="inline-flex items-center gap-2 text-[#777777] hover:text-[#C8A45A] transition-colors duration-300 no-underline w-fit">
                  <MessageCircle size={24} className="text-[#C8A45A]" />
                  <span className="text-xs font-light font-sans tracking-widest text-[#555555] hover:text-[#C8A45A] uppercase">WhatsApp</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-[#E5E5E5] uppercase tracking-widest mb-6 font-heading">Keşfet</h4>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}
                    className="text-[#777777] hover:text-[#C8A45A] text-sm font-light tracking-wide transition-colors duration-300 no-underline font-sans">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-lg font-medium text-[#E5E5E5] uppercase tracking-widest mb-6 font-heading">Bize Ulaşın</h4>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#C8A45A] mt-1 flex-shrink-0" />
                  <span className="text-[#777777] text-sm font-light leading-relaxed font-sans">Gazipaşa, Yavuz Selim Blv. No:50, Trabzon</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#C8A45A] flex-shrink-0" />
                  <a href="tel:05364965698" 
                    aria-label="0536 496 56 98 numarasını arayın"
                    className="text-[#777777] hover:text-[#C8A45A] text-sm font-light tracking-widest font-sans no-underline transition-colors">
                    0536 496 56 98
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#C8A45A] flex-shrink-0" />
                  <span className="text-[#777777] text-sm font-light tracking-wider font-sans">info@blurryajans.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-black/5 mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#999999] font-light tracking-widest uppercase font-sans">
              © {currentYear} Blurry Ajans. Tüm hakları saklıdır.
            </p>
            <button onClick={() => setShowKVKK(true)}
              className="text-xs text-[#999999] font-light tracking-widest uppercase hover:text-[#C8A45A] transition-colors cursor-pointer bg-transparent border-none font-sans">
              KVKK Aydınlatma Metni
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showKVKK && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowKVKK(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-[#C8A45A]/20 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowKVKK(false)}
                className="absolute top-4 right-4 text-[#999999] hover:text-[#E5E5E5] transition-colors bg-transparent border-none cursor-pointer">
                <X size={20} />
              </button>
              <h3 className="text-2xl text-[#C8A45A] mb-4 font-heading">KVKK Aydınlatma Metni</h3>
              <div className="text-[#A0A0A0] text-sm font-light leading-relaxed space-y-4 font-sans">
                <p><strong className="text-[#E5E5E5]">Veri Sorumlusu:</strong> Blurry Ajans, Gazipaşa, Yavuz Selim Blv. No:50 Kat:3 No:16, Trabzon</p>
                <p>6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verileriniz aşağıda açıklanan kapsamda işlenmektedir.</p>
                <p><strong className="text-[#E5E5E5]">İşlenen Veriler:</strong> Ad, soyad, e-posta, telefon, mesaj içerikleri.</p>
                <p><strong className="text-[#E5E5E5]">Amaçlar:</strong> İletişim taleplerinin yanıtlanması, hizmet tekliflerinin sunulması, randevu planlanması.</p>
                <p><strong className="text-[#E5E5E5]">Hukuki Dayanak:</strong> Sözleşmenin ifası, meşru menfaat ve açık rıza.</p>
                <p><strong className="text-[#E5E5E5]">Haklarınız:</strong> KVKK m.11 kapsamında erişim, düzeltme, silme ve itiraz haklarına sahipsiniz. info@blurryajans.com</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;