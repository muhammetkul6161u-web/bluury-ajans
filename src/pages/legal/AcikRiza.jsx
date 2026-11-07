import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "@/pages/legal/LegalLayout";
import { LEGAL } from "@/pages/legal/legalInfo";
import { useConsent } from "@/components/consent/ConsentProvider";

const AcikRiza = () => {
  const { openPreferences } = useConsent();

  return (
    <LegalLayout
      path="/acik-riza-metni"
      title="Açık Rıza Metni"
      description="Bluury Ajans web sitesinde yalnızca açık rızanıza dayanan veri işleme faaliyetleri ve rızanızı nasıl verip geri alabileceğiniz."
    >
      <p>
        Bu metin, <Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>'nden ayrı olarak, {LEGAL.controller}{" "}
        tarafından <strong>yalnızca açık rızanıza dayanılarak</strong> yürütülen işlemleri açıklar.
        Rıza vermek tamamen isteğe bağlıdır. Rıza vermemeniz sitemizi kullanmanıza, bize ulaşmanıza veya hizmet
        almanıza engel değildir.
      </p>

      <h2>1. Rızanıza Dayanan İşlemler</h2>

      <h3>a) 3. taraf içerikler (İşlevsel çerezler)</h3>
      <p>
        İletişim sayfamızdaki Google Haritalar haritası ile sitede yer alabilecek gömülü videolar (ör. YouTube) dış
        sağlayıcılar tarafından sunulur. Bu içerikleri yüklemeniz halinde:
      </p>
      <ul>
        <li>
          <strong>İşlenen veriler:</strong> IP adresiniz, tarayıcı ve cihaz bilgileriniz, sağlayıcının çerez kimlikleri
          ve içerikle etkileşiminiz.
        </li>
        <li><strong>Amaç:</strong> Harita ve video içeriklerinin size gösterilmesi.</li>
        <li><strong>Alıcı:</strong> Google (Google Haritalar, YouTube).</li>
        <li>
          <strong>Yurt dışına aktarım:</strong> Bu veriler sağlayıcının yurt dışındaki (ör. ABD) sunucularına KVKK m.9/6-a
          kapsamında açık rızanıza dayanılarak aktarılır. Aktarılan ülkelerde Türkiye'deki ile eşdeğer bir koruma
          bulunmayabileceğini, bu aktarım için yeterlilik kararı veya KVKK m.9/4 kapsamında uygun güvence
          bulunmayabileceğini ve haklarınızı kullanmanın daha zor olabileceğini hatırlatırız.
        </li>
      </ul>

      <h3>b) Analitik çerezler</h3>
      <p>
        Sitemizde şu anda analitik araç (ör. Google Analytics) <strong>kullanılmamaktadır</strong>. İleride kullanılması
        halinde bu metin güncellenecek ve onayınız yeniden istenecektir.
      </p>

      <h3>c) Pazarlama çerezleri</h3>
      <p>
        Sitemizde şu anda pazarlama veya reklam çerezi (ör. Meta Pixel) <strong>kullanılmamaktadır</strong>. İleride
        kullanılması halinde bu metin güncellenecek ve onayınız yeniden istenecektir.
      </p>

      <h3>d) Ticari elektronik ileti</h3>
      <p>
        Sitemiz üzerinden bülten aboneliği veya kampanya/duyuru gönderimi için izin <strong>alınmamaktadır</strong>.
      </p>

      <h2>2. Rızanızı Nasıl Verirsiniz?</h2>
      <ul>
        <li>
          Çerez bildirimindeki "Tümünü Kabul Et" butonu ile veya "Tercihleri Yönet" penceresinde ilgili kategoriyi açıp
          kaydederek. Tüm isteğe bağlı kategoriler varsayılan olarak kapalıdır.
        </li>
        <li>
          Harita veya video alanındaki "Yükle" butonu ile yalnızca o içerik ve o sayfa görüntülemesi için; "Bu tür
          içeriklere her zaman izin ver" seçeneği ile kalıcı olarak.
        </li>
      </ul>
      <p>Sayfayı kaydırmanız, sitede gezinmeniz veya sayfada kalmanız rıza olarak kabul edilmez.</p>

      <h2>3. Rızanızı Nasıl Geri Alırsınız?</h2>
      <p>
        Rızanızı dilediğiniz zaman, gerekçe göstermeden ve ücretsiz olarak geri alabilirsiniz. Bunun için her sayfanın
        altındaki "Çerez Tercihleri" bağlantısını veya aşağıdaki butonu kullanabilirsiniz. Geri alma, geri alma anından
        itibaren hüküm doğurur. 3. taraf sağlayıcıların kendi alan adlarında oluşturduğu çerezleri tarayıcınızın
        ayarlarından ayrıca silebilirsiniz.
      </p>
      <p>
        <button
          type="button"
          onClick={openPreferences}
          className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#C8A45A] text-[#1A1A1A] hover:bg-[#D4B76A] font-bold text-xs tracking-widest uppercase border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
        >
          Çerez tercihlerini aç
        </button>
      </p>
      <p>
        Kişisel verilerinizin işlenmesine ilişkin diğer bilgiler ve KVKK m.11 kapsamındaki haklarınız için{" "}
        <Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>'ni, çerezlerin ayrıntılı listesi için{" "}
        <Link to="/cerez-politikasi">Çerez Politikası</Link>'nı inceleyebilirsiniz.
      </p>
    </LegalLayout>
  );
};

export default AcikRiza;
