import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "@/pages/legal/LegalLayout";
import { LEGAL } from "@/pages/legal/legalInfo";

const GizlilikPolitikasi = () => (
  <LegalLayout
    path="/gizlilik-politikasi"
    title="Gizlilik Politikası"
    description="Bluury Ajans web sitesinin kişisel verilerin gizliliği ve güvenliğine ilişkin genel yaklaşımı."
  >
    <p>
      {LEGAL.brand} olarak gizliliğinize önem veriyoruz. Bu sayfa, {LEGAL.domain} sitesinde kişisel verilerinizi nasıl
      koruduğumuzu kısaca özetler. Hangi verilerin hangi amaç ve hukuki sebeple işlendiği, kimlere aktarıldığı, ne
      kadar saklandığı ve haklarınız hakkında ayrıntılı bilgi için{" "}
      <Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>'ni inceleyiniz.
    </p>

    <h2>1. Temel İlkelerimiz</h2>
    <ul>
      <li>Kişisel verileri hukuka ve dürüstlük kurallarına uygun, belirli ve meşru amaçlarla işleriz.</li>
      <li>
        Yalnızca gerekli olan asgari veriyi isteriz: iletişim formumuzda yalnızca ad soyad, e-posta ve mesajınız
        istenir.
      </li>
      <li>Verileri amaç için gerekli süre kadar saklar, süre sonunda siler veya anonim hale getiririz.</li>
      <li>Kişisel verilerinizi satmaz, kiralamaz ve reklam amacıyla üçüncü kişilerle paylaşmayız.</li>
    </ul>

    <h2>2. Güvenlik Önlemlerimiz</h2>
    <ul>
      <li>Sitemize tüm bağlantılar şifreli (HTTPS/TLS) olarak yapılır; şifresiz bağlantılar HTTPS'e yönlendirilir.</li>
      <li>Form mesajlarına yalnızca yetkili kişiler, parola korumalı yönetim paneli üzerinden erişebilir.</li>
      <li>Yönetici parolaları geri döndürülemez şekilde (hash) saklanır.</li>
      <li>Otomatik spam ve kötüye kullanım girişimlerine karşı istek sınırlama ve bot koruması uygulanır.</li>
      <li>
        Yazı tipleri kendi sunucumuzdan sunulur; harita ve video gibi 3. taraf içerikler yalnızca onayınızla yüklenir.
      </li>
    </ul>

    <h2>3. Çerezler</h2>
    <p>
      Sitemizde yalnızca zorunlu çerezler varsayılan olarak kullanılır. Diğer tüm çerezler onayınıza bağlıdır ve
      onayınızı her zaman geri alabilirsiniz. Ayrıntılar için <Link to="/cerez-politikasi">Çerez Politikası</Link>.
    </p>

    <h2>4. Dış Bağlantılar</h2>
    <p>
      Sitemizde Instagram ve WhatsApp gibi dış hizmetlere bağlantılar bulunur. Bu bağlantılara tıkladığınızda ilgili
      hizmetin kendi gizlilik politikası geçerli olur.
    </p>

    <h2>5. Değişiklikler</h2>
    <p>
      Bu politikayı gerektiğinde güncelleyebiliriz. Güncel sürüm her zaman bu sayfada, son güncelleme tarihiyle
      birlikte yayımlanır.
    </p>

    <h2>6. İletişim</h2>
    <p>
      Gizlilikle ilgili sorularınız ve KVKK kapsamındaki başvurularınız için:{" "}
      <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Başvuru yöntemleri için{" "}
      <Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>'nin 8. bölümüne bakınız.
    </p>
  </LegalLayout>
);

export default GizlilikPolitikasi;
