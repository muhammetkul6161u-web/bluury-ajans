import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "@/pages/legal/LegalLayout";
import { LEGAL } from "@/pages/legal/legalInfo";

// 6563 sayılı Kanun m.3 kapsamındaki hizmet sağlayıcı bilgileri. İletişim sayfasında da kullanılır.
export const KunyeBilgileri = () => (
  <dl>
    <dt>Ad soyad / unvan</dt>
    <dd>{LEGAL.controller}</dd>
    <dt>Marka</dt>
    <dd>{LEGAL.brand}</dd>
    <dt>Adres</dt>
    <dd>{LEGAL.address}</dd>
    <dt>Telefon</dt>
    <dd><a href={LEGAL.phoneHref}>{LEGAL.phone}</a></dd>
    <dt>E-posta</dt>
    <dd><a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></dd>
    <dt>KEP adresi</dt>
    <dd>{LEGAL.kep}</dd>
    <dt>Vergi dairesi / no</dt>
    <dd>{LEGAL.tax}</dd>
    <dt>MERSİS no</dt>
    <dd>{LEGAL.mersis}</dd>
    <dt>Ticaret sicil no</dt>
    <dd>{LEGAL.tradeRegistry}</dd>
    <dt>Meslek odası</dt>
    <dd>{LEGAL.chamber}</dd>
    <dt>KVKK başvuruları</dt>
    <dd>{LEGAL.kvkkEmail}</dd>
  </dl>
);

const Kunye = () => (
  <LegalLayout
    path="/kunye"
    title="Künye"
    description="6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun kapsamında Bluury Ajans hizmet sağlayıcı bilgileri."
  >
    <p>
      6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve ilgili yönetmelik kapsamında {LEGAL.domain} sitesini
      işleten hizmet sağlayıcıya ait bilgiler aşağıdadır.
    </p>

    <h2>Hizmet Sağlayıcı</h2>
    <KunyeBilgileri />

    <h2>Barındırma</h2>
    <dl>
      <dt>Yer sağlayıcı</dt>
      <dd>{LEGAL.hostingProvider}</dd>
    </dl>

    <p>
      Kişisel verilerinize ilişkin bilgi için <Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>.
    </p>
  </LegalLayout>
);

export default Kunye;
