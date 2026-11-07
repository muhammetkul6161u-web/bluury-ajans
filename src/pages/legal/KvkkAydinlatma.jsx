import React from "react";
import LegalLayout from "@/pages/legal/LegalLayout";
import KvkkAydinlatmaIcerik from "@/pages/legal/KvkkAydinlatmaIcerik";

const KvkkAydinlatma = () => (
  <LegalLayout
    path="/kvkk-aydinlatma-metni"
    title="KVKK Aydınlatma Metni"
    description="Bluury Ajans web sitesi üzerinden işlenen kişisel veriler hakkında 6698 sayılı KVKK m.10 kapsamında aydınlatma metni."
  >
    <KvkkAydinlatmaIcerik />
  </LegalLayout>
);

export default KvkkAydinlatma;
