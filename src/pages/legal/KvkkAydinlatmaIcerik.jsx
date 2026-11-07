import React from "react";
import { Link } from "react-router-dom";
import { LEGAL } from "@/pages/legal/legalInfo";

// KVKK Aydınlatma Metni gövdesi: ayrı sayfada, iletişim sayfasındaki akordeonda ve footer penceresinde kullanılır.
const KvkkAydinlatmaIcerik = () => (
  <>
    <p>
      Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10. maddesi ve Aydınlatma Yükümlülüğünün
      Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, <strong>{LEGAL.domain}</strong> web sitesi
      ve sitede yer alan iletişim kanalları üzerinden işlenen kişisel verileriniz hakkında sizi bilgilendirmek amacıyla
      hazırlanmıştır. Bu metin yalnızca bilgilendirme amaçlıdır; sizden onay veya rıza istenmemektedir.
    </p>

    <h2>1. Veri Sorumlusu</h2>
    <dl>
      <dt>Veri sorumlusu</dt>
      <dd>{LEGAL.controller}</dd>
      <dt>Adres</dt>
      <dd>{LEGAL.address}</dd>
      <dt>E-posta</dt>
      <dd><a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></dd>
      {LEGAL.kep && (
        <>
          <dt>KEP adresi</dt>
          <dd>{LEGAL.kep}</dd>
        </>
      )}
    </dl>

    <h2>2. İşlenen Kişisel Veri Kategorileri</h2>
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Kategori</th><th>Veriler</th><th>Nereden</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Kimlik</td>
            <td>Ad, soyad</td>
            <td>İletişim formu; e-posta, telefon veya WhatsApp ile bize ulaştığınızda ilettiğiniz bilgiler</td>
          </tr>
          <tr>
            <td>İletişim</td>
            <td>E-posta adresi; bizi aradığınızda veya WhatsApp ile yazdığınızda telefon numarası</td>
            <td>İletişim formu, e-posta, telefon, WhatsApp</td>
          </tr>
          <tr>
            <td>Talep / müşteri işlem</td>
            <td>Mesaj içeriği, çekim veya hizmet talebinize ilişkin ayrıntılar, yazışma kayıtları</td>
            <td>İletişim formu, e-posta, telefon, WhatsApp</td>
          </tr>
          <tr>
            <td>İşlem güvenliği</td>
            <td>IP adresi, erişim tarihi ve saati, ziyaret edilen sayfa, tarayıcı ve cihaz bilgisi</td>
            <td>Sunucu kayıtları (otomatik)</td>
          </tr>
          <tr>
            <td>Çerez ve benzeri teknolojiler</td>
            <td>
              Çerez tercihiniz (yalnızca kendi cihazınızda saklanır); onay vermeniz halinde 3. taraf içerik
              sağlayıcılarının çerez kimlikleri
            </td>
            <td>Tarayıcınız; ayrıntılar için <Link to="/cerez-politikasi">Çerez Politikası</Link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Sitemizde üyelik, bülten veya online ödeme bulunmamaktadır; pazarlama amaçlı kişisel veri toplanmamaktadır.
      İletişim formunda yalnızca talebinizi yanıtlamak için gerekli asgari bilgiler istenir. Bu metin web sitesi
      üzerinden yürütülen işlemleri kapsar; çekim hizmeti kapsamında işlenen görsel veriler (fotoğraf ve video) için
      hizmet öncesinde ayrıca bilgilendirme yapılır.
    </p>

    <h2>3. İşleme Amaçları ve Hukuki Sebepler</h2>
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Amaç</th><th>Veri kategorileri</th><th>Hukuki sebep (KVKK m.5)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Teklif, randevu ve çekim taleplerinizin değerlendirilmesi ve yanıtlanması</td>
            <td>Kimlik, iletişim, talep</td>
            <td>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (m.5/2-c)</td>
          </tr>
          <tr>
            <td>Genel soru, öneri ve şikâyetlerinizin yanıtlanması</td>
            <td>Kimlik, iletişim, talep</td>
            <td>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaat (m.5/2-f)</td>
          </tr>
          <tr>
            <td>Yazışma kayıtlarının saklanması ve olası uyuşmazlıklarda delil olarak kullanılması</td>
            <td>Kimlik, iletişim, talep</td>
            <td>Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması (m.5/2-e)</td>
          </tr>
          <tr>
            <td>Sitenin güvenli işletilmesi, bilgi güvenliği, spam ve kötüye kullanımın önlenmesi</td>
            <td>İşlem güvenliği</td>
            <td>Meşru menfaat (m.5/2-f)</td>
          </tr>
          <tr>
            <td>Yetkili kamu kurum ve kuruluşlarının yasal bilgi taleplerinin karşılanması</td>
            <td>İlgili olduğu ölçüde tüm kategoriler</td>
            <td>Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi (m.5/2-ç)</td>
          </tr>
          <tr>
            <td>Çerez tercihinizin hatırlanması</td>
            <td>Çerez tercihi</td>
            <td>Meşru menfaat (m.5/2-f); zorunlu çerez niteliğindedir</td>
          </tr>
          <tr>
            <td>
              Google Haritalar, gömülü video gibi 3. taraf içeriklerin gösterilmesi; ileride kullanılması halinde
              analitik ve pazarlama çerezleri
            </td>
            <td>İşlem güvenliği, çerez kimlikleri</td>
            <td>
              Açık rıza (m.5/1) — yalnızca onay vermeniz halinde; bkz. <Link to="/acik-riza-metni">Açık Rıza Metni</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>4. Kişisel Verilerin Toplanma Yöntemi</h2>
    <p>
      Kişisel verileriniz; web sitemizdeki iletişim formu, e-posta, telefon ve WhatsApp aracılığıyla sizin tarafınızdan
      iletilmesi yoluyla <strong>kısmen otomatik</strong> yöntemlerle; sunucu kayıtları ve çerezler aracılığıyla
      <strong> otomatik</strong> yöntemlerle toplanmaktadır. Zorunlu olmayan çerezler yalnızca onayınızla kullanılır.
    </p>

    <h2>5. Kişisel Verilerin Aktarılması</h2>
    <h3>Yurt içi aktarım</h3>
    <p>
      Kişisel verileriniz, hukuki yükümlülüklerimizin gerektirdiği hallerde yetkili kamu kurum ve kuruluşlarına ve
      yargı mercilerine; ilgili olduğu ölçüde hizmet aldığımız hukuk ve mali müşavirlik danışmanlarına KVKK m.8
      kapsamında aktarılabilir.
    </p>
    <h3>Yurt dışı aktarım</h3>
    <p>Web sitemiz ve iletişim kanallarımız aşağıdaki hizmet sağlayıcıların altyapısı kullanılarak işletilmektedir:</p>
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Alıcı</th><th>Hizmet</th><th>Aktarılan veri</th><th>Dayanak (KVKK m.9)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>{LEGAL.hostingProvider} — sunucu konumu: {LEGAL.hostingCountry}</td>
            <td>Web sitesi barındırma, veritabanı</td>
            <td>Form mesajları, sunucu kayıtları</td>
            <td>KVKK m.9 kapsamında öngörülen güvencelere uygun olarak</td>
          </tr>
          {LEGAL.emailProvider && (
            <tr>
              <td>{LEGAL.emailProvider}</td>
              <td>Kurumsal e-posta</td>
              <td>E-posta yazışmaları</td>
              <td>KVKK m.9 kapsamında öngörülen güvencelere uygun olarak</td>
            </tr>
          )}
          {LEGAL.cdnProvider && (
            <tr>
              <td>{LEGAL.cdnProvider}</td>
              <td>İçerik dağıtımı ve güvenlik</td>
              <td>IP adresi, istek bilgileri</td>
              <td>KVKK m.9 kapsamında öngörülen güvencelere uygun olarak</td>
            </tr>
          )}
          <tr>
            <td>WhatsApp (Meta Platforms)</td>
            <td>WhatsApp üzerinden yazmayı seçmeniz halinde mesajlaşma</td>
            <td>Telefon numarası, ad, mesaj içeriği</td>
            <td>
              Talebiniz üzerine sözleşme öncesi tedbirlerin uygulanması için zorunlu olması (m.9/6-b). Bu kanalı
              kullanmak isteğe bağlıdır; form, e-posta veya telefonla da ulaşabilirsiniz.
            </td>
          </tr>
          <tr>
            <td>Google (Haritalar, YouTube)</td>
            <td>Harita ve video gösterimi</td>
            <td>IP adresi, cihaz bilgisi, çerez kimlikleri</td>
            <td>Yalnızca açık rızanız ile (m.9/6-a); bkz. <Link to="/acik-riza-metni">Açık Rıza Metni</Link></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>6. Saklama Süreleri</h2>
    <ul>
      <li>İletişim formu ve yazışma kayıtları: {LEGAL.messageRetention}.</li>
      <li>Sunucu (erişim) kayıtları: {LEGAL.logRetention}.</li>
      <li>Çerez tercihiniz: 6 ay; bu sürenin sonunda tercihiniz yeniden sorulur.</li>
      <li>
        Talebinizin bir sözleşmeye dönüşmesi halinde: ilgili mevzuatta öngörülen süreler (ör. vergi mevzuatı
        kapsamında 5 yıl, genel zamanaşımı süresi 10 yıl).
      </li>
    </ul>
    <p>
      Süresi dolan veriler, Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik
      uyarınca silinir, yok edilir veya anonim hale getirilir.
    </p>

    <h2>7. KVKK m.11 Kapsamındaki Haklarınız</h2>
    <p>Veri sorumlusuna başvurarak:</p>
    <ol type="a">
      <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
      <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
      <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
      <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
      <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
      <li>KVKK m.7'deki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
      <li>(e) ve (f) bentleri uyarınca yapılan işlemlerin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
      <li>
        İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun
        ortaya çıkmasına itiraz etme,
      </li>
      <li>Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
    </ol>
    <p>haklarına sahipsiniz.</p>

    <h2>8. Başvuru Yöntemi</h2>
    <p>
      Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca Türkçe ve
      yazılı olarak aşağıdaki yollarla iletebilirsiniz:
    </p>
    <ul>
      <li>Islak imzalı dilekçe ile şahsen veya posta yoluyla: {LEGAL.address}</li>
      {LEGAL.kep && <li>Kayıtlı elektronik posta (KEP) ile: {LEGAL.kep}</li>}
      <li>Güvenli elektronik imza veya mobil imza ile ya da sistemimizde kayıtlı e-posta adresinizden: {LEGAL.kvkkEmail}</li>
    </ul>
    <p>
      Başvurunuzda; adınız soyadınız, başvuru yazılı ise imzanız, Türkiye Cumhuriyeti vatandaşları için T.C. kimlik
      numaranız, yabancılar için uyruğunuz ve pasaport numaranız, tebligata esas adresiniz, varsa bildirime esas e-posta
      adresiniz, telefon numaranız ve talep konunuz bulunmalıdır.
    </p>
    <p>
      Başvurunuz, talebin niteliğine göre en kısa sürede ve <strong>en geç 30 gün içinde</strong> ücretsiz olarak
      sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi halinde Kişisel Verileri Koruma Kurulu tarafından
      belirlenen tarifedeki ücret alınabilir. Başvurunuzun reddedilmesi, verilen cevabı yetersiz bulmanız veya süresinde
      cevap verilmemesi halinde KVKK m.14 uyarınca Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz.
    </p>
  </>
);

export default KvkkAydinlatmaIcerik;
