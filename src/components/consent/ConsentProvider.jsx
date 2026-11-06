import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ALL_ACCEPTED,
  ALL_REJECTED,
  OPTIONAL_CATEGORY_IDS,
  activateBlockedScripts,
  deleteCategoryCookies,
  readConsent,
  updateGoogleConsent,
  writeConsent,
} from "@/lib/consent";

const ConsentContext = createContext(null);

export const ConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(() => readConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Kayıtlı onay varsa (veya yeni verildiyse) yalnızca izin verilen kategorileri etkinleştir.
  useEffect(() => {
    if (!consent) return;
    updateGoogleConsent(consent.choices);
    activateBlockedScripts(consent.choices);
  }, [consent]);

  const save = useCallback(
    (choices, method) => {
      const previous = consent?.choices || ALL_REJECTED;
      const record = writeConsent(choices, method);
      const revoked = OPTIONAL_CATEGORY_IDS.filter((id) => previous[id] && !record.choices[id]);
      revoked.forEach(deleteCategoryCookies);
      setConsent(record);
      setPreferencesOpen(false);

      // Çalışmaya başlamış analitik/pazarlama scriptleri ancak sayfa yenilenerek tamamen durdurulur.
      const scriptsRunning = document.querySelector('script[data-activated="true"]');
      if (scriptsRunning && revoked.some((id) => id === "analitik" || id === "pazarlama")) {
        window.location.reload();
      }
    },
    [consent]
  );

  const value = useMemo(
    () => ({
      consent,
      choices: consent?.choices || ALL_REJECTED,
      hasConsent: (category) => Boolean(consent?.choices?.[category]),
      bannerVisible: !consent && !preferencesOpen,
      preferencesOpen,
      acceptAll: () => save(ALL_ACCEPTED, "accept_all"),
      rejectAll: (method = "reject_all") => save(ALL_REJECTED, method),
      saveChoices: (choices) => save(choices, "custom"),
      grant: (category) => save({ ...(consent?.choices || ALL_REJECTED), [category]: true }, "custom"),
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [consent, preferencesOpen, save]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

export const useConsent = () => {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent, ConsentProvider içinde kullanılmalıdır.");
  return ctx;
};
