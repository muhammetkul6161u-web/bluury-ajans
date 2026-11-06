import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { CATEGORIES, ALL_REJECTED } from "@/lib/consent";

// Üç seçenek de aynı boyut, renk ağırlığı ve görünürlükte olmalıdır (KVKK Çerez Rehberi).
const choiceButton =
  "flex-1 min-h-[48px] px-5 py-3 rounded-full bg-[#C8A45A] text-[#1A1A1A] hover:bg-[#D4B76A] font-bold text-xs md:text-sm tracking-widest uppercase border-none cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]";

const inlineLink =
  "text-[#C8A45A] underline underline-offset-2 hover:text-[#D4B76A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45A] rounded-sm";

const CookieBanner = () => {
  const { acceptAll, rejectAll, openPreferences } = useConsent();

  return (
    <motion.section
      role="region"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-x-0 bottom-0 z-[150] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none"
    >
      <div className="relative max-w-5xl mx-auto bg-[#1A1A1A] text-[#D0D0D0] border border-[#C8A45A]/35 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-5 pr-12 md:p-7 md:pr-14 pointer-events-auto font-sans select-text">
        <button
          type="button"
          onClick={() => rejectAll("close")}
          aria-label="Kapat (zorunlu olmayan çerezleri reddeder)"
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full text-[#A0A0A0] hover:text-white bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45A]"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2 id="cookie-banner-title" className="flex items-center gap-2 text-base md:text-lg font-bold text-[#E5E5E5] mb-2">
          <Cookie size={18} className="text-[#C8A45A]" aria-hidden="true" />
          Çerez Tercihleriniz
        </h2>
        <p id="cookie-banner-desc" className="text-sm leading-relaxed mb-5">
          Sitemizin çalışması için yalnızca zorunlu çerezleri kullanıyoruz. Harita ve video gibi 3. taraf içerikler ile
          analitik/pazarlama çerezleri ancak onay vermeniz halinde etkinleşir. Tercihinizi istediğiniz zaman sayfanın
          altındaki "Çerez Tercihleri" bağlantısından değiştirebilirsiniz. Ayrıntılar için{" "}
          <Link to="/cerez-politikasi" className={inlineLink}>Çerez Politikası</Link> ve{" "}
          <Link to="/kvkk-aydinlatma-metni" className={inlineLink}>KVKK Aydınlatma Metni</Link>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={acceptAll} className={choiceButton}>Tümünü Kabul Et</button>
          <button type="button" onClick={() => rejectAll()} className={choiceButton}>Tümünü Reddet</button>
          <button type="button" onClick={openPreferences} className={choiceButton}>Tercihleri Yönet</button>
        </div>
      </div>
    </motion.section>
  );
};

const Toggle = ({ id, checked, disabled, onChange, labelledBy, describedBy }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={labelledBy}
    aria-describedby={describedBy}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex flex-shrink-0 w-12 h-7 rounded-full border-none transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] ${
      checked ? "bg-[#C8A45A]" : "bg-[#4A4A4A]"
    } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <span
      aria-hidden="true"
      className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const CookiePreferencesModal = () => {
  const { choices, consent, saveChoices, acceptAll, rejectAll, closePreferences } = useConsent();
  // Önceden işaretli kutu yok: kayıt yoksa tüm isteğe bağlı kategoriler kapalı başlar.
  const [draft, setDraft] = useState(() => ({ ...ALL_REJECTED, ...(consent ? choices : {}) }));
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, true, closePreferences);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10050] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={closePreferences}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        aria-describedby="cookie-prefs-desc"
        tabIndex={-1}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-[#1A1A1A] text-[#D0D0D0] border border-[#C8A45A]/35 rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 md:p-8 font-sans select-text focus:outline-none"
      >
        <button
          type="button"
          onClick={closePreferences}
          aria-label="Tercih penceresini kapat"
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full text-[#A0A0A0] hover:text-white bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45A]"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2 id="cookie-prefs-title" className="text-xl md:text-2xl font-heading text-[#C8A45A] mb-3 pr-10">
          Çerez Tercihlerini Yönet
        </h2>
        <p id="cookie-prefs-desc" className="text-sm leading-relaxed mb-6">
          Zorunlu çerezler dışındaki tüm kategoriler varsayılan olarak kapalıdır. Onay verdiğiniz kategorileri dilediğiniz
          zaman kapatarak rızanızı geri alabilirsiniz. Ayrıntılı çerez listesi için{" "}
          <Link to="/cerez-politikasi" onClick={closePreferences} className={inlineLink}>Çerez Politikası</Link>.
        </p>

        <ul className="space-y-4 mb-7 list-none p-0">
          {CATEGORIES.map((cat) => {
            const checked = cat.locked ? true : Boolean(draft[cat.id]);
            return (
              <li key={cat.id} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div>
                  <h3 id={`cat-${cat.id}-title`} className="text-sm font-bold text-[#E5E5E5] mb-1">
                    {cat.title}
                    {cat.locked && <span className="ml-2 text-[11px] font-semibold text-[#C8A45A]">Her zaman aktif</span>}
                  </h3>
                  <p id={`cat-${cat.id}-desc`} className="text-xs leading-relaxed text-[#A8A8A8]">{cat.description}</p>
                </div>
                <Toggle
                  id={`cat-${cat.id}`}
                  checked={checked}
                  disabled={cat.locked}
                  labelledBy={`cat-${cat.id}-title`}
                  describedBy={`cat-${cat.id}-desc`}
                  onChange={(value) => setDraft((d) => ({ ...d, [cat.id]: value }))}
                />
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={() => rejectAll()} className={choiceButton}>Tümünü Reddet</button>
          <button type="button" onClick={() => saveChoices(draft)} className={choiceButton}>Seçimlerimi Kaydet</button>
          <button type="button" onClick={acceptAll} className={choiceButton}>Tümünü Kabul Et</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CookieConsent = () => {
  const { bannerVisible, preferencesOpen } = useConsent();
  return (
    <>
      <AnimatePresence>{bannerVisible && <CookieBanner key="banner" />}</AnimatePresence>
      <AnimatePresence>{preferencesOpen && <CookiePreferencesModal key="prefs" />}</AnimatePresence>
    </>
  );
};

export default CookieConsent;
