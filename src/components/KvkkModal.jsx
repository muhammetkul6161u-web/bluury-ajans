import React, { Suspense, lazy, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

// Metin yalnızca pencere açıldığında yüklenir (ana paketi büyütmemek için)
const KvkkAydinlatmaIcerik = lazy(() => import("@/pages/legal/KvkkAydinlatmaIcerik"));

/** Footer'daki "KVKK Aydınlatma Metni" bağlantısıyla açılan pencere. */
const KvkkModal = ({ onClose }) => {
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, true, onClose);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Metin içindeki bir bağlantıya tıklanınca pencereyi kapat (sayfa değişecek)
  const handleContentClick = (e) => {
    if (e.target.closest("a[href^='/']")) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10040] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kvkk-modal-title"
        tabIndex={-1}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-3xl max-h-[92vh] flex flex-col bg-[#FAFAF8] border border-[#C8A45A]/35 rounded-t-2xl sm:rounded-2xl shadow-2xl focus:outline-none"
      >
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-[#C8A45A]/20">
          <h2 id="kvkk-modal-title" className="font-heading text-lg sm:text-xl font-bold text-[#1A1A1A] m-0">
            KVKK Aydınlatma Metni
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Pencereyi kapat"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-[#555555] hover:text-[#1A1A1A] hover:bg-black/5 bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45A]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="legal-prose overflow-y-auto px-5 sm:px-8 py-6 select-text" onClick={handleContentClick}>
          <Suspense fallback={<p>Yükleniyor…</p>}>
            <KvkkAydinlatmaIcerik />
          </Suspense>
          <p style={{ marginBottom: 0 }}>
            <Link to="/kvkk-aydinlatma-metni">Metni ayrı sayfada aç</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KvkkModal;
