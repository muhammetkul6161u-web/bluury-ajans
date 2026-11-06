import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useConsent } from "@/components/consent/ConsentProvider";

/**
 * 3. taraf içeriği (harita, video) yalnızca onay varsa ya da kullanıcı "Yükle" butonuna
 * tıkladıysa gösterir. Aksi halde hiçbir dış istek atılmaz; yerine `placeholder` ve açıklama çıkar.
 * "Yükle" yalnızca bu içerik için ve bu sayfa görüntülemesi için geçerlidir; kalıcı onay için
 * "Her zaman izin ver" seçeneği işlevsel kategoriye rıza kaydeder.
 */
const ConsentGate = ({
  category = "islevsel",
  provider,
  loadLabel = "İçeriği yükle",
  placeholder,
  externalUrl,
  externalLabel,
  className = "",
  children,
}) => {
  const { hasConsent, grant } = useConsent();
  const [loadedOnce, setLoadedOnce] = useState(false);

  if (hasConsent(category) || loadedOnce) return children;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {placeholder}
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/55">
        <div className="max-w-sm text-center text-white font-sans select-text" onClick={(e) => e.stopPropagation()}>
          <p className="text-xs leading-relaxed mb-3 text-white/90">
            Bu içerik <strong>{provider}</strong> tarafından sunulur. Yüklediğinizde IP adresiniz ve cihaz bilgileriniz bu
            sağlayıcıya (yurt dışına) aktarılabilir ve çerez kullanılabilir.{" "}
            <Link to="/acik-riza-metni" className="underline text-[#E8CF96] hover:text-white">Açık Rıza Metni</Link>
          </p>
          <div className="flex flex-col gap-2 items-center">
            <button
              type="button"
              onClick={() => setLoadedOnce(true)}
              className="min-h-[44px] px-5 py-2 rounded-full bg-[#C8A45A] text-[#1A1A1A] hover:bg-[#D4B76A] text-xs font-bold tracking-widest uppercase border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {loadLabel}
            </button>
            <button
              type="button"
              onClick={() => grant(category)}
              className="min-h-[36px] px-3 text-[11px] text-white/80 hover:text-white underline bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              Bu tür içeriklere her zaman izin ver
            </button>
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-white/80 hover:text-white underline"
              >
                {externalLabel || "Sağlayıcının sitesinde aç"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentGate;
