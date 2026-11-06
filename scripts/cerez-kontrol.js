/*
 * Çerez reddetme kontrolü — tarayıcı DevTools Console'a yapıştırıp çalıştırın.
 *
 * Kullanım:
 *  1. Siteyi gizli pencerede açın (veya DevTools > Application > Storage > "Clear site data").
 *  2. Banner'da "Tümünü Reddet"e (veya X'e) basın, sitede birkaç sayfa gezin; İletişim sayfasını mutlaka açın.
 *  3. DevTools > Console'a bu dosyanın tamamını yapıştırıp Enter'a basın.
 *
 * Beklenen sonuç: "✅ GEÇTİ". Herhangi bir "❌" satırı varsa reddetmeye rağmen bir 3. taraf isteği
 * veya zorunlu olmayan çerez oluşmuş demektir.
 */
(() => {
  const record = JSON.parse(localStorage.getItem("bluury_cerez_tercihi") || "null");
  const optionalGranted = record ? Object.entries(record.choices).filter(([, v]) => v).map(([k]) => k) : [];
  const external = performance
    .getEntriesByType("resource")
    .map((e) => e.name)
    .filter((u) => !u.startsWith(location.origin) && !u.startsWith("data:") && !u.startsWith("blob:"));
  const cookies = document.cookie ? document.cookie.split(";").map((c) => c.trim().split("=")[0]) : [];
  const iframes = [...document.querySelectorAll("iframe")].map((f) => f.src);
  const activeTrackers = [...document.querySelectorAll("script[src]")]
    .map((s) => s.src)
    .filter((src) => /googletagmanager|google-analytics|connect\.facebook|hotjar|clarity/.test(src));
  const extraStorage = Object.keys(localStorage).filter((k) => !["bluury_cerez_tercihi"].includes(k));

  const checks = [
    ["Tercih kaydı var ve tümü reddedilmiş", record && optionalGranted.length === 0, record ? `${record.method}, sürüm ${record.version}, ${record.timestamp}` : "kayıt yok"],
    ["3. taraf ağ isteği yok", external.length === 0, external.join("\n") || "-"],
    ["Çerez yok", cookies.length === 0, cookies.join(", ") || "-"],
    ["3. taraf iframe yok", iframes.length === 0, iframes.join("\n") || "-"],
    ["İzleme scripti yüklenmemiş", activeTrackers.length === 0, activeTrackers.join("\n") || "-"],
    ["Fazladan localStorage kaydı yok", extraStorage.length === 0, extraStorage.join(", ") || "-"],
  ];

  console.table(checks.map(([kontrol, ok, detay]) => ({ kontrol, sonuç: ok ? "✅" : "❌", detay })));
  console.log(checks.every(([, ok]) => ok) ? "✅ GEÇTİ: reddetme sonrası zorunlu olmayan çerez/istek yok." : "❌ KALDI: yukarıdaki ❌ satırlarını inceleyin.");
})();
