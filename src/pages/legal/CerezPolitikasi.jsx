import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "@/pages/legal/LegalLayout";
import { LEGAL } from "@/pages/legal/legalInfo";
import { useConsent } from "@/components/consent/ConsentProvider";
import { CONSENT_MAX_AGE_DAYS, CONSENT_STORAGE_KEY, POLICY_VERSION } from "@/lib/consent";

// Sitede kullanılan çerez ve benzeri teknolojilerin envanteri.
// Yeni bir araç eklendiğinde bu listeyi güncelleyin ve src/lib/consent.js içindeki POLICY_VERSION'ı artırın.
const COOKIES = [
  {
    name: CONSENT_STORAGE_KEY,
    provider: `${LEGAL.brand} (${LEGAL.domain})`,
    party: "1. taraf (yerel depolama)",
    category: "Zorunlu",
    purpose: "Çerez tercihinizi, tercih tarihini ve politika sürümünü saklar.",
    duration: `${CONSENT_MAX_AGE_DAYS / 30} ay`,
  },
  {
    name: "bluury_admin_oturum",
    provider: `${LEGAL.brand} (${LEGAL.domain})`,
    party: "1. taraf (çerez)",
    category: "Zorunlu",
    purpose: "Yalnızca yönetim paneline giriş yapan site yöneticileri için güvenli oturum çerezi. Ziyaretçiler için oluşturulmaz.",
    duration: "2 saat veya çıkış yapılana kadar",
  },
  {
    name: "NID, AEC, SOCS ve benzerleri",
    provider: "Google (google.com)",
    party: "3. taraf",
    category: "İşlevsel",
    purpose: "İletişim sayfasındaki Google Haritalar haritasının gösterilmesi. Yalnızca haritayı yüklemeniz halinde.",
    duration: "Google tarafından belirlenir (ör. NID ve AEC 6 ay, SOCS 13 ay)",
  },
  {
    name: "YSC, VISITOR_INFO1_LIVE, VISITOR_PRIVACY_METADATA ve yerel depolama kayıtları",
    provider: "YouTube / Google (youtube-nocookie.com, youtube.com)",
    party: "3. taraf",
    category: "İşlevsel",
    purpose:
      "Sitede gömülü video bulunması halinde videonun oynatılması. Videolar çerezsiz (youtube-nocookie.com) modda ve yalnızca yüklemeniz halinde açılır.",
    duration: "Google tarafından belirlenir (ör. YSC oturum süresince, VISITOR_INFO1_LIVE 6 ay)",
  },
];

const CerezPolitikasi = () => {
  const { openPreferences } = useConsent();

  return (
    <LegalLayout
      path="/cerez-politikasi"
      title="Çerez Politikası"
      description="Bluury Ajans web sitesinde kullanılan çerezler, türleri, sağlayıcıları, süreleri ve çerez tercihlerinizi nasıl yönetebileceğiniz."
    >
      <p>
        Bu politika, {LEGAL.controller} ("{LEGAL.brand}") tarafından işletilen {LEGAL.domain} sitesinde kullanılan
        çerezler ve benzeri teknolojiler hakkında, KVK Kurulu'nun Çerez Uygulamaları Hakkında Rehberi esas alınarak
        hazırlanmıştır. Politika sürümü: <strong>{POLICY_VERSION}</strong>.
      </p>

      <h2>1. Çerez Nedir?</h2>
      <p>
        Çerezler, ziyaret ettiğiniz siteler tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Bu politikada
        "çerez" ifadesi, tarayıcınızın yerel depolama alanı (localStorage) gibi benzer teknolojileri de kapsar.
        Sitemizin kendi alan adı tarafından oluşturulanlar <strong>1. taraf</strong>, başka bir sağlayıcının alan adı
        tarafından oluşturulanlar <strong>3. taraf</strong> çerezlerdir.
      </p>

      <h2>2. Çerez Kategorileri</h2>
      <ul>
        <li>
          <strong>Zorunlu çerezler:</strong> Sitenin çalışması ve çerez tercihinizin hatırlanması için gereklidir; onayınıza
          tabi değildir ve kapatılamaz.
        </li>
        <li>
          <strong>İşlevsel çerezler:</strong> Google Haritalar ve gömülü videolar gibi 3. taraf içeriklerin yüklenmesini
          sağlar. Yalnızca onayınızla kullanılır.
        </li>
        <li>
          <strong>Analitik çerezler:</strong> Ziyaret istatistiklerini ölçer. Sitemizde şu anda <strong>kullanılmamaktadır</strong>.
        </li>
        <li>
          <strong>Pazarlama çerezleri:</strong> Reklam ve yeniden hedefleme için kullanılır. Sitemizde şu anda{" "}
          <strong>kullanılmamaktadır</strong>.
        </li>
      </ul>
      <p>
        Onay vermediğiniz sürece zorunlu olmayan hiçbir çerez kullanılmaz ve 3. taraf içerik sağlayıcılarına istek
        gönderilmez. Sitemizde kullanılan yazı tipleri de kendi sunucumuzdan sunulur.
      </p>

      <h2>3. Kullanılan Çerezler</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ad</th>
              <th>Sağlayıcı</th>
              <th>Taraf</th>
              <th>Kategori</th>
              <th>Amaç</th>
              <th>Süre</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES.map((c) => (
              <tr key={c.name}>
                <td><code>{c.name}</code></td>
                <td>{c.provider}</td>
                <td>{c.party}</td>
                <td>{c.category}</td>
                <td>{c.purpose}</td>
                <td>{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        3. taraf çerezlerin adları ve süreleri sağlayıcı tarafından belirlenir ve değişebilir. Güncel bilgi için{" "}
        <a href="https://policies.google.com/technologies/cookies?hl=tr" target="_blank" rel="noopener noreferrer">
          Google'ın çerez açıklamalarını
        </a>{" "}
        inceleyebilirsiniz.
      </p>

      <h2>4. Tercihlerinizi Nasıl Yönetirsiniz?</h2>
      <ul>
        <li>
          İlk ziyaretinizde çıkan bildirimde "Tümünü Kabul Et", "Tümünü Reddet" veya "Tercihleri Yönet" seçeneklerinden
          birini seçebilirsiniz. Bildirimi kapatmanız (X) reddetme olarak kabul edilir.
        </li>
        <li>
          Tercihinizi istediğiniz zaman her sayfanın altındaki <strong>"Çerez Tercihleri"</strong> bağlantısından veya
          aşağıdaki butondan değiştirebilir, verdiğiniz onayı geri alabilirsiniz. Onayı geri aldığınızda ilgili 1. taraf
          çerezler silinir ve 3. taraf içerikler bir daha yüklenmez.
        </li>
        <li>
          Tercihiniz {CONSENT_MAX_AGE_DAYS / 30} ay boyunca saklanır. Bu süre dolduğunda veya bu politika değiştiğinde
          tercihiniz yeniden sorulur.
        </li>
        <li>
          3. taraf sağlayıcıların kendi alan adlarında oluşturduğu çerezleri tarayıcınızın ayarlarından (genellikle
          "Gizlilik ve güvenlik" › "Çerezler ve site verileri") silebilir veya engelleyebilirsiniz.
        </li>
      </ul>
      <p>
        <button
          type="button"
          onClick={openPreferences}
          className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#C8A45A] text-[#1A1A1A] hover:bg-[#D4B76A] font-bold text-xs tracking-widest uppercase border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
        >
          Çerez tercihlerini aç
        </button>
      </p>

      <h2>5. Kişisel Verileriniz</h2>
      <p>
        Çerezler aracılığıyla işlenen kişisel verileriniz hakkında bilgi için{" "}
        <Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>'ni; onaya dayalı işlemler için{" "}
        <Link to="/acik-riza-metni">Açık Rıza Metni</Link>'ni inceleyebilirsiniz.
      </p>
    </LegalLayout>
  );
};

export default CerezPolitikasi;
