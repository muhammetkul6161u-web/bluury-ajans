import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/portfolyo", label: "Portfolyo" },
  { to: "/hizmetler", label: "Hizmetler" },
];

const NAV_LINKS_RIGHT = [
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/iletisim", label: "İletişim" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const allLinks = [{ to: "/", label: "Ana Sayfa" }, ...NAV_LINKS, ...NAV_LINKS_RIGHT];
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "py-4 bg-[#1A1A1A]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-[#C8A45A]/10"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* SOL MENÜ */}
          <div className="hidden md:flex space-x-12 w-1/3 justify-start">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link-styled ${isActive(link.to) ? "nav-link-active nav-shimmer" : isScrolled ? "text-[#E5E5E5]" : "text-[#1A1A1A]"}`}
                style={{ fontSize: "1.2rem", fontWeight: "600" }}
              >
                <span className={isActive(link.to) ? "" : "nav-shimmer"}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* LOGO: Bluury (logo) Ajans — Font: Playfair Display */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 w-max md:w-1/3 flex justify-center items-center">
            <Link to="/" className="flex items-center justify-center gap-1.5 md:gap-2.5 no-underline group font-heading">
              <span
                className={`text-[#C8A45A] group-hover:text-[#D4B76A] tracking-[0.08em] transition-all duration-500 ${
                  isScrolled ? "text-lg md:text-3xl" : "text-xl md:text-[2.2rem]"
                }`}
              >
                Blurry
              </span>
              <img
                src="/Navbar/Navbar.webp"
                alt="Bluury Ajans Profesyonel Fotoğrafçılık Logosu"
                width="80"
                height="80"
                className={`w-auto object-contain transition-all duration-500 ${
                  isScrolled ? "h-8 md:h-14" : "h-10 md:h-20"
                }`}
              />
              <span
                className={`${isScrolled ? "text-[#A0A0A0]" : "text-[#555555]"} group-hover:text-[#D4B76A] tracking-[0.08em] transition-all duration-500 ${
                  isScrolled ? "text-lg md:text-3xl" : "text-xl md:text-[2.2rem]"
                }`}
              >
                Ajans
              </span>
            </Link>
          </div>

          {/* SAĞ MENÜ */}
          <div className="hidden md:flex space-x-12 w-1/3 justify-end items-center">
            {NAV_LINKS_RIGHT.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link-styled ${isActive(link.to) ? "nav-link-active nav-shimmer" : isScrolled ? "text-[#E5E5E5]" : "text-[#1A1A1A]"}`}
                style={{ fontSize: "1.2rem", fontWeight: "600" }}
              >
                <span className={isActive(link.to) ? "" : "nav-shimmer"}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* HAMBURGER */}
          <div className="w-full md:hidden flex justify-end">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="relative z-[60] min-w-[44px] min-h-[44px] flex items-center justify-center text-[#C8A45A] hover:text-[#D4B76A] transition-colors"
              aria-label={isMobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBİL MENÜ */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-[#1A1A1A]/98 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            {/* Vizör Teknik HUD Detayları */}
            <div className="absolute top-[4%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-white/35 select-none pointer-events-none uppercase">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span>MENU SELECT</span>
              </div>
              <div><span>SYS OK</span></div>
            </div>
            
            <nav className="flex flex-col items-center gap-8">
              {allLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }} transition={{ delay: i * 0.06, duration: 0.4 }}>
                  <Link to={link.to}
                    className={`text-2xl tracking-widest transition-all duration-300 no-underline font-heading font-semibold ${
                      isActive(link.to) ? "text-[#C8A45A]" : "text-[#E5E5E5] hover:text-[#C8A45A]"
                    }`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;