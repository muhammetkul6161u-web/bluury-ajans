import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "@/pages/legal/LegalLayout";
import { LEGAL } from "@/pages/legal/legalInfo";

// 6563 sayılı Kanun m.3 kapsamındaki hizmet sağlayıcı bilgileri. İletişim sayfasında da kullanılır.
export const KunyeBilgileri = () => {
  const rows = [
    ["Hizmet sağlayıcı", LEGAL.controller],
    ["Adres", LEGAL.address],
    ["Telefon", <a href={LEGAL.phoneHref}>{LEGAL.phone}</a>],
    ["E-posta", <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>],
    ["KEP adresi", LEGAL.kep],
    ["Vergi dairesi / no", LEGAL.tax],
    ["MERSİS no", LEGAL.mersis],
    ["Ticaret sicil no", LEGAL.tradeRegistry],
    ["Meslek odası", LEGAL.chamber],
  ].filter(([, value]) => value); // bilgisi girilmemiş satırlar gösterilmez
  return (
    <dl>
      {rows.map(([label, value]) => (
        <React.Fragment key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
};

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
