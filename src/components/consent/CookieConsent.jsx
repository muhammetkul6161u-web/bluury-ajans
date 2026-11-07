import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { CATEGORIES, ALL_REJECTED } from "@/lib/consent";

// Tercih penceresindeki seçenekler aynı boyut, renk ağırlığı ve görünürlükte olmalıdır (KVKK Çerez Rehberi).
const choiceButton =
  "w-full min-h-[46px] px-3 py-3 rounded-full bg-[#C8A45A] text-[#1A1A1A] hover:bg-[#D4B76A] hover:shadow-[0_8px_20px_rgba(200,164,90,0.3)] font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase border-none cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]";

const inlineLink =
  "text-[#C8A45A] underline underline-offset-2 hover:text-[#D4B76A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45A] rounded-sm";

// İnce alt şerit: Kabul Et ve Reddet aynı görünürlükte (KVKK Çerez Rehberi); "Çerezleri Oku" politika sayfasını açar.
// Ayrıntılı kategori seçimi footer'daki "Çerez Tercihleri" bağlantısından yapılır.
const barButton =
  "min-h-[40px] py-2 rounded-full font-bold text-[11px] tracking-[0.06em] sm:tracking-[0.1em] uppercase whitespace-nowrap cursor-pointer transition-colors duration-300 inline-flex items-center justify-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]";
// Kabul Et ve Reddet birebir aynı genişlikte
const solidButton = `${barButton} sm:w-[118px] px-2 sm:px-3 bg-[#C8A45A] text-[#1A1A1A] hover:bg-[#D4B76A] border border-[#C8A45A]`;
const outlineButton = `${barButton} px-2 sm:px-5 bg-transparent text-[#E8CF96] hover:bg-[#C8A45A]/15 border border-[#C8A45A]/70`;

const CookieBanner = () => {
  const { acceptAll, rejectAll } = useConsent();

  return (
    <motion.section
      role="region"
      aria-label="Çerez bildirimi"
      aria-describedby="gizlilik-bildirimi-aciklama"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 bottom-0 z-[1000] px-3 pb-3 md:pb-4 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-[#141414]/95 backdrop-blur-xl border border-[#C8A45A]/35 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.45)] px-4 py-3 md:px-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pointer-events-auto font-sans select-text">
        <p id="gizlilik-bildirimi-aciklama" className="flex items-center gap-2.5 flex-1 min-w-0 text-xs md:text-[13px] leading-snug text-[#C9C9C9] m-0">
          <Cookie size={18} className="flex-shrink-0 text-[#C8A45A]" aria-hidden="true" />
          <span>Sitemizde çerezler kullanılmaktadır. Zorunlu olmayan çerezler yalnızca onayınızla etkinleşir.</span>
        </p>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.45fr)] sm:flex gap-2 flex-shrink-0">
          <button type="button" onClick={acceptAll} className={solidButton}>Kabul Et</button>
          <button type="button" onClick={() => rejectAll()} className={solidButton}>Reddet</button>
          <Link to="/cerez-politikasi" className={outlineButton}>Çerezleri Oku</Link>
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
        aria-labelledby="gizlilik-tercih-baslik"
        aria-describedby="gizlilik-tercih-aciklama"
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

        <h2 id="gizlilik-tercih-baslik" className="text-xl md:text-2xl font-heading text-[#C8A45A] mb-3 pr-10">
          Çerez Tercihlerini Yönet
        </h2>
        <p id="gizlilik-tercih-aciklama" className="text-sm leading-relaxed mb-6">
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
