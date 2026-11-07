import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { LEGAL_PAGES } from "@/pages/legal/legalInfo";
import KvkkModal from "@/components/KvkkModal";

const legalLinkClass =
  "text-xs text-[#999999] font-light tracking-wider hover:text-[#C8A45A] transition-colors no-underline font-sans min-h-[44px] inline-flex items-center";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openPreferences } = useConsent();
  const [showKvkk, setShowKvkk] = useState(false);

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
                  alt="Bluury Ajans Profesyonel Fotoğrafçılık Logosu"
                  width="160"
                  height="64"
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <p className="text-[#777777] text-sm font-light leading-relaxed max-w-xs mb-6 font-sans">
                Anılarınızı estetik bir sanata dönüştüren, Trabzon merkezli premium fotoğrafçılık ve yaratıcı ajans.
              </p>
              
              <div className="flex flex-col gap-3">
                <a href="https://www.instagram.com/blurry_ajans" target="_blank" rel="noopener noreferrer"
                  aria-label="Bluury Ajans Instagram profilini yeni sekmede ziyaret edin"
                  className="inline-flex items-center gap-2 min-h-[44px] text-[#777777] hover:text-[#C8A45A] transition-colors duration-300 no-underline w-fit">
                  <Instagram size={24} />
                  <span className="text-xs font-light font-sans tracking-widest text-[#555555] hover:text-[#C8A45A] uppercase">Instagram</span>
                </a>
                
                <a href="https://wa.me/905364965698" target="_blank" rel="noopener noreferrer"
                  aria-label="Bluury Ajans ile WhatsApp üzerinden iletişime geçin"
                  className="inline-flex items-center gap-2 min-h-[44px] text-[#777777] hover:text-[#C8A45A] transition-colors duration-300 no-underline w-fit">
                  <MessageCircle size={24} className="text-[#C8A45A]" />
                  <span className="text-xs font-light font-sans tracking-widest text-[#555555] hover:text-[#C8A45A] uppercase">WhatsApp</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-[#E5E5E5] uppercase tracking-widest mb-6 font-heading">Keşfet</h4>
              <nav aria-label="Footer navigasyon menüsü" className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}
                    className="text-[#777777] hover:text-[#C8A45A] text-sm font-light tracking-wide transition-colors duration-300 no-underline font-sans min-h-[44px] flex items-center">
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

          <nav aria-label="Yasal metinler" className="mb-6">
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-1 list-none p-0 m-0">
              {LEGAL_PAGES.map((page) => (
                <li key={page.to}>
                  {page.to === "/kvkk-aydinlatma-metni" ? (
                    // KVKK metni sayfadan ayrılmadan, tıklanınca açılan pencerede gösterilir
                    <button type="button" onClick={() => setShowKvkk(true)} aria-haspopup="dialog"
                      className={`${legalLinkClass} cursor-pointer bg-transparent border-none p-0`}>
                      {page.label}
                    </button>
                  ) : (
                    <Link to={page.to} className={legalLinkClass}>
                      {page.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button type="button" onClick={openPreferences}
                  className="text-xs text-[#999999] font-light tracking-wider hover:text-[#C8A45A] transition-colors cursor-pointer bg-transparent border-none p-0 font-sans min-h-[44px] inline-flex items-center">
                  Çerez Tercihleri
                </button>
              </li>
            </ul>
          </nav>

          <p className="text-xs text-[#999999] font-light tracking-widest uppercase font-sans text-center md:text-left">
            © {currentYear} Bluury Ajans. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showKvkk && <KvkkModal key="kvkk" onClose={() => setShowKvkk(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Footer;