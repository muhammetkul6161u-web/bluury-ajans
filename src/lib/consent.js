// Çerez onay yönetimi (KVKK Çerez Uygulamaları Hakkında Rehber'e göre).
// Onay kaydı yalnızca bu cihazın localStorage alanında tutulur; sunucuya gönderilmez.

// Çerez Politikası'nda kategori veya çerez listesi değiştiğinde bu sürümü artırın:
// kayıtlı onaylar geçersiz olur ve banner tekrar gösterilir.
export const POLICY_VERSION = "1.0";
export const CONSENT_STORAGE_KEY = "bluury_cerez_tercihi";
export const CONSENT_MAX_AGE_DAYS = 180; // 6 ay sonra tercih yeniden sorulur

export const CATEGORIES = [
  {
    id: "zorunlu",
    title: "Zorunlu",
    locked: true,
    description:
      "Sitenin çalışması ve çerez tercihinizin hatırlanması için gereklidir. Kapatılamaz.",
  },
  {
    id: "islevsel",
    title: "İşlevsel (3. taraf içerikler)",
    description:
      "Google Haritalar ve gömülü videolar (ör. YouTube) gibi dış içeriklerin yüklenmesini sağlar. Bu sağlayıcılar kendi çerezlerini kullanabilir ve verileriniz yurt dışına aktarılabilir.",
  },
  {
    id: "analitik",
    title: "Analitik",
    description:
      "Ziyaret istatistiklerini ölçmeye yarar. Sitede şu anda analitik araç kullanılmamaktadır.",
  },
  {
    id: "pazarlama",
    title: "Pazarlama",
    description:
      "Reklam ve yeniden hedefleme amacıyla kullanılır. Sitede şu anda pazarlama çerezi kullanılmamaktadır.",
  },
];

export const OPTIONAL_CATEGORY_IDS = CATEGORIES.filter((c) => !c.locked).map((c) => c.id);

// Rıza geri alındığında silinecek 1. taraf çerez adı önekleri (ileride eklenecek araçlar için).
const CATEGORY_COOKIE_PREFIXES = {
  analitik: ["_ga", "_gid", "_gat", "_hj", "_clck", "_clsk", "_pk_"],
  pazarlama: ["_gcl", "_fbp", "_fbc", "fr", "IDE", "_uet", "_ttp"],
};

const safeStorage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* gizli mod / engelli depolama: tercih yalnızca bu oturumda geçerli olur */
    }
  },
};

const newId = () => {
  try {
    return window.crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
};

const allChoices = (value) =>
  Object.fromEntries(OPTIONAL_CATEGORY_IDS.map((id) => [id, value]));

export const ALL_ACCEPTED = allChoices(true);
export const ALL_REJECTED = allChoices(false);

/** Geçerli onay kaydını döndürür; yoksa, sürümü eskiyse veya süresi dolmuşsa null. */
export function readConsent() {
  const raw = safeStorage.get(CONSENT_STORAGE_KEY);
  if (!raw) return null;
  try {
    const record = JSON.parse(raw);
    if (record.version !== POLICY_VERSION) return null;
    if (!record.expiresAt || new Date(record.expiresAt) <= new Date()) return null;
    return { ...record, choices: { ...ALL_REJECTED, ...record.choices } };
  } catch {
    return null;
  }
}

/** Tercihi tarih-saat ve politika sürümüyle birlikte kaydeder. */
export function writeConsent(choices, method) {
  const now = new Date();
  const expires = new Date(now.getTime() + CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
  const record = {
    id: newId(),
    version: POLICY_VERSION,
    timestamp: now.toISOString(),
    expiresAt: expires.toISOString(),
    method, // "accept_all" | "reject_all" | "custom" | "close"
    choices: { ...ALL_REJECTED, ...choices },
  };
  safeStorage.set(CONSENT_STORAGE_KEY, JSON.stringify(record));
  return record;
}

/** Bir kategoriye ait 1. taraf çerezleri bu alan adı ve üst alan adı için siler. */
export function deleteCategoryCookies(category) {
  const prefixes = CATEGORY_COOKIE_PREFIXES[category] || [];
  if (!prefixes.length || typeof document === "undefined") return;
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host, `.${host}`];
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);

  document.cookie.split(";").forEach((pair) => {
    const name = pair.split("=")[0].trim();
    if (!prefixes.some((p) => name === p || name.startsWith(p))) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    });
  });
}

/** Google Consent Mode v2 güncellemesi (varsayılan "denied" index.html'de ayarlanır). */
export function updateGoogleConsent(choices) {
  if (typeof window.gtag !== "function") return;
  const v = (granted) => (granted ? "granted" : "denied");
  window.gtag("consent", "update", {
    analytics_storage: v(choices.analitik),
    ad_storage: v(choices.pazarlama),
    ad_user_data: v(choices.pazarlama),
    ad_personalization: v(choices.pazarlama),
    functionality_storage: v(choices.islevsel),
  });
}

/**
 * index.html'de `<script type="text/plain" data-category="analitik" data-src="...">` şeklinde
 * engellenmiş scriptleri, ilgili kategoriye onay verildiyse çalıştırır. Rıza alınmadan
 * bu scriptler hiçbir ağ isteği yapmaz.
 */
export function activateBlockedScripts(choices) {
  document
    .querySelectorAll('script[type="text/plain"][data-category]')
    .forEach((blocked) => {
      if (!choices[blocked.dataset.category] || blocked.dataset.activated) return;
      const script = document.createElement("script");
      [...blocked.attributes].forEach(({ name, value }) => {
        if (name !== "type" && name !== "data-src") script.setAttribute(name, value);
      });
      if (blocked.dataset.src) script.src = blocked.dataset.src;
      else script.text = blocked.text;
      blocked.dataset.activated = "true";
      blocked.after(script);
    });
}

/** YouTube embed adreslerini çerezsiz alan adına (youtube-nocookie.com) çevirir. */
export function toPrivacyEmbedUrl(url) {
  if (!url) return url;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.pathname.startsWith("/embed/")
        ? u.pathname.slice(7)
        : u.searchParams.get("v");
      if (id) {
        u.searchParams.delete("v");
        return `https://www.youtube-nocookie.com/embed/${id}${u.search}`;
      }
    }
    if (host === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed${u.pathname}${u.search}`;
    }
    return url;
  } catch {
    return url;
  }
}

/** Embed adresinden kullanıcıya gösterilecek sağlayıcı adını çıkarır. */
export function embedProviderName(url) {
  try {
    const host = new URL(url).hostname;
    if (/youtube|youtu\.be/.test(host)) return "YouTube (Google)";
    if (/vimeo/.test(host)) return "Vimeo";
    if (/instagram/.test(host)) return "Instagram (Meta)";
    if (/google/.test(host)) return "Google";
    return host.replace(/^www\./, "");
  } catch {
    return "3. taraf sağlayıcı";
  }
}
