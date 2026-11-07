// Yasal metinlerde kullanılan tüm işletme bilgileri tek yerde.
// null olan alanlar sayfalarda gösterilmez; bilgi netleşince değeri yazmanız yeterli.
// Adres, telefon ve e-posta sitede halihazırda yayımlanan iletişim bilgilerinden alınmıştır.

export const LEGAL = {
  lastUpdated: "7 Kasım 2026",
  brand: "Bluury Ajans",
  controller: "Bluury Ajans", // resmi ad soyad / unvan netleşince buraya yazın
  address: "Gazipaşa, Yavuz Selim Blv. No:50 Kat:3 No:16, 61030 Ortahisar / Trabzon",
  phone: "0536 496 56 98",
  phoneHref: "tel:+905364965698",
  email: "info@blurryajans.com",
  kvkkEmail: "info@blurryajans.com",
  kep: null,
  tax: null,
  mersis: null,
  tradeRegistry: null,
  chamber: null,
  domain: "blurryajans.com",
  hostingProvider: "Hostinger",
  hostingCountry: "Almanya (Frankfurt)",
  emailProvider: null,
  cdnProvider: null,
  messageRetention: "1 yıl (süre sonunda otomatik olarak silinir)",
  logRetention: "güvenlik amacıyla gerekli olan kısa süre boyunca",
};

export const LEGAL_PAGES = [
  { to: "/kvkk-aydinlatma-metni", label: "KVKK Aydınlatma Metni" },
  { to: "/acik-riza-metni", label: "Açık Rıza Metni" },
  { to: "/cerez-politikasi", label: "Çerez Politikası" },
  { to: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { to: "/kunye", label: "Künye" },
];
