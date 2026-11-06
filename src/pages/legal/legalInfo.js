// Yasal metinlerde kullanılan tüm işletme bilgileri tek yerde.
// [KÖŞELİ_PARANTEZ] içindeki her değeri gerçek bilgiyle değiştirin; bilgi yoksa ilgili satırı metinden kaldırın.
// Adres, telefon ve e-posta sitede halihazırda yayımlanan iletişim bilgilerinden alınmıştır; doğruluğunu teyit edin.

export const LEGAL = {
  lastUpdated: "[TARİH]",
  brand: "Bluury Ajans",
  controller: "[AD SOYAD / UNVAN]",
  address: "Gazipaşa, Yavuz Selim Blv. No:50 Kat:3 No:16, 61030 Ortahisar / Trabzon",
  phone: "0536 496 56 98",
  phoneHref: "tel:+905364965698",
  email: "info@blurryajans.com",
  kvkkEmail: "[KVKK_BAŞVURU_E-POSTASI]",
  kep: "[KEP ADRESİ – varsa]",
  tax: "[VERGİ DAİRESİ / VERGİ NUMARASI]",
  mersis: "[MERSİS NO – şirketse]",
  tradeRegistry: "[TİCARET SİCİL NO – şirketse]",
  chamber: "[BAĞLI OLUNAN MESLEK ODASI / BİRLİK – varsa]",
  domain: "blurryajans.com",
  hostingProvider: "Hostinger ([HOSTINGER_SÖZLEŞME_TARAFI_ŞİRKET_UNVANI])",
  hostingCountry: "Almanya (Frankfurt)",
  emailProvider: "[E-POSTA_HİZMET_SAĞLAYICISI ve ÜLKESİ]",
  cdnProvider: "[CLOUDFLARE KULLANILIYORSA: Cloudflare, Inc. (ABD) – kullanılmıyorsa bu satırı kaldırın]",
  messageRetention: "[SÜRE, ör. talebin sonuçlanmasından itibaren 1 yıl]",
  logRetention: "[SÜRE, ör. 6 ay]",
};

export const LEGAL_PAGES = [
  { to: "/kvkk-aydinlatma-metni", label: "KVKK Aydınlatma Metni" },
  { to: "/acik-riza-metni", label: "Açık Rıza Metni" },
  { to: "/cerez-politikasi", label: "Çerez Politikası" },
  { to: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { to: "/kunye", label: "Künye" },
];
