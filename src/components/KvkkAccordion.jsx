import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import KvkkAydinlatmaIcerik from "@/pages/legal/KvkkAydinlatmaIcerik";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * KVKK Aydınlatma Metni — native <details>/<summary> akordeon (varsayılan kapalı).
 * Kapalıyken de içerik DOM'da durur (arama motorları ve ekran okuyucular erişebilir); JS olmadan da açılıp kapanır.
 * JS yalnızca yükseklik + opacity animasyonu ve #kvkk / #kunye ile gelindiğinde otomatik açma için kullanılır.
 */
const KvkkAccordion = () => {
  const detailsRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { hash } = useLocation();

  const animateTo = useCallback((opening) => {
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content) return;

    setOpen(opening);
    if (prefersReducedMotion() || typeof content.animate !== "function") {
      details.open = opening;
      return;
    }

    const startHeight = animationRef.current ? content.getBoundingClientRect().height : null;
    animationRef.current?.cancel();
    if (opening) details.open = true;

    const fullHeight = content.scrollHeight;
    const from = startHeight ?? (opening ? 0 : fullHeight);
    content.style.overflow = "hidden";
    const animation = content.animate(
      [
        { height: `${from}px`, opacity: opening ? 0 : 1 },
        { height: `${opening ? fullHeight : 0}px`, opacity: opening ? 1 : 0 },
      ],
      { duration: 320, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      if (!opening) details.open = false;
      content.style.overflow = "";
      animationRef.current = null;
    };
  }, []);

  const handleSummaryClick = (e) => {
    e.preventDefault();
    animateTo(!open);
  };

  // Tarayıcının kendisi açarsa (ör. sayfa içi arama) durumu eşitle
  const handleToggle = () => {
    if (!animationRef.current) setOpen(detailsRef.current.open);
  };

  // /iletisim#kvkk (veya eski #kunye) ile gelindiğinde aç ve kaydır (sayfa geçişi ve ScrollToTop bittikten sonra)
  useEffect(() => {
    if (hash !== "#kvkk" && hash !== "#kunye") return;
    const timer = setTimeout(() => {
      animateTo(true);
      detailsRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }, 450);
    return () => clearTimeout(timer);
  }, [hash, animateTo]);

  return (
    <details
      id="kvkk"
      ref={detailsRef}
      onToggle={handleToggle}
      className="kvkk-accordion group/kvkk max-w-4xl mx-4 sm:mx-auto bg-[#FAFAF8]/95 border border-[#C8A45A]/30 hover:border-[#C8A45A]/60 open:border-[#C8A45A]/45 rounded-2xl shadow-[0_10px_30px_rgba(200,164,90,0.06)] transition-colors duration-300 scroll-mt-28"
    >
      <summary
        onClick={handleSummaryClick}
        className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 min-h-[56px] cursor-pointer select-none rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#D6D6D6]"
      >
        <h2 className="font-heading text-base sm:text-lg font-bold text-[#1A1A1A] group-hover/kvkk:text-[#8A6D2E] transition-colors duration-300 m-0">
          KVKK Aydınlatma Metni
        </h2>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`flex-shrink-0 text-[#C8A45A] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </summary>

      <div ref={contentRef}>
        <div className="legal-prose px-5 sm:px-8 pb-7 pt-5 border-t border-[#C8A45A]/20 select-text">
          <KvkkAydinlatmaIcerik />
          <p style={{ marginBottom: 0 }}>
            <Link to="/kvkk-aydinlatma-metni">Metni ayrı sayfada aç</Link>
          </p>
        </div>
      </div>
    </details>
  );
};

export default KvkkAccordion;
