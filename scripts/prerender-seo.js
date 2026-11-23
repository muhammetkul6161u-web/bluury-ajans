import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const BASE_URL = "https://blurryajans.com";

const NAV_NOSCRIPT = `
        <nav aria-label="Ana Menü">
          <ul>
            <li><a href="/">Trabzon Fotoğrafçı — Ana Sayfa</a></li>
            <li><a href="/hizmetler">Trabzon Fotoğraf ve Video Çekimi Hizmetlerimiz</a></li>
            <li><a href="/portfolyo">Trabzon Düğün, Dış Çekim ve Reklam Portfolyosu</a></li>
            <li><a href="/hakkimizda">Hakkımızda — Bluury Ajans Trabzon</a></li>
            <li><a href="/iletisim">İletişim &amp; Çekim Randevusu (Ortahisar / Trabzon)</a></li>
          </ul>
        </nav>
        <nav aria-label="Yasal metinler">
          <ul>
            <li><a href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</a></li>
            <li><a href="/acik-riza-metni">Açık Rıza Metni</a></li>
            <li><a href="/cerez-politikasi">Çerez Politikası</a></li>
            <li><a href="/gizlilik-politikasi">Gizlilik Politikası</a></li>
            <li><a href="/kunye">Künye</a></li>
          </ul>
        </nav>`;

const ROUTES = [
  {
    route: "/",
    title: "Trabzon Fotoğrafçı & Profesyonel Çekim — Bluury Ajans (Blurry Ajans)",
    description:
      "Trabzon fotoğrafçı ve profesyonel fotoğraf çekimi ajansı Bluury Ajans (Blurry Ajans). Trabzon düğün fotoğrafçısı, nişan, dış çekim, moda, reklam, ürün fotoğrafçılığı ve sinematik video klip çekimi.",
    keywords:
      "Trabzon fotoğrafçı, Trabzon fotoğraf çekimi, Trabzon düğün fotoğrafçısı, Trabzon dış çekim, Bluury Ajans, Blurry Ajans, Trabzon ürün çekimi, Trabzon reklam ajansı, Trabzon fotoğraf stüdyosu, Trabzon mezuniyet çekimi, Boztepe dış çekim, Uzungöl dış çekim",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>Bluury Ajans (Blurry Ajans) — Trabzon Profesyonel Fotoğrafçı ve Fotoğraf &amp; Video Çekim Ajansı</h1>
        <p>Trabzon Ortahisar Gazipaşa merkezli Bluury Ajans; düğün fotoğrafçılığı, gelin-damat dış çekim, nişan, söz, mezuniyet, moda, e-ticaret ürün fotoğrafçılığı, katalog ve kurumsal reklam prodüksiyonu alanlarında sinematik ve lüks çekim hizmetleri sunar.</p>
        <h2>Trabzon Fotoğraf ve Video Çekimi Hizmetlerimiz</h2>
        <ul>
          <li><strong>Trabzon Düğün &amp; Nişan Fotoğrafçısı:</strong> Tam gün düğün hikayesi, save the date, nişan, kına ve sinematik düğün klibi çekimleri.</li>
          <li><strong>Trabzon Dış Mekan &amp; Doğa Çekimi:</strong> Boztepe, Uzungöl, Sümela Manastırı, Akçaabat Orta Mahalle, Ganita, KTÜ Kampüsü, Hıdırnebi ve Kayabaşı yaylalarında altın saat dış çekimleri.</li>
          <li><strong>Trabzon Ürün, Katalog &amp; Reklam Çekimi:</strong> Markalar, restoranlar, oteller ve e-ticaret firmaları için satış odaklı ürün fotoğrafçılığı ve sosyal medya Reels prodüksiyonu.</li>
          <li><strong>After Party &amp; Etkinlik Çekimi:</strong> Düğün sonrası eğlence, konser ve kurumsal davet çekimleri.</li>
        </ul>
        <h2>İletişim ve Randevu</h2>
        <p>Adres: Gazipaşa, Yavuz Selim Blv. No:50 Kat:3 No:16, 61030 Ortahisar / Trabzon | Telefon &amp; WhatsApp: +90 536 496 56 98 | E-posta: info@blurryajans.com</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/hizmetler",
    title: "Trabzon Fotoğraf Çekimi Hizmetleri — Düğün, Dış Çekim, Ürün & Reklam | Bluury Ajans",
    description:
      "Trabzon'da profesyonel fotoğraf ve video çekimi hizmetlerimiz: Düğün fotoğrafçılığı, dış mekan çekimi, nişan, ürün, katalog, kurumsal reklam ve after party çekimleri.",
    keywords:
      "Trabzon fotoğraf çekimi hizmetleri, Trabzon düğün fotoğrafçısı fiyatları, Trabzon dış çekim paketleri, Trabzon ürün fotoğrafçısı, Trabzon reklam çekimi, Trabzon klip çekimi",
    ogImage: `${BASE_URL}/hizmet-gorselleri/d%C3%BC%C4%9F%C3%BCnhz.webp`,
    extraSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Trabzon'da fotoğraf çekimi için nasıl randevu alabilirim?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WhatsApp hattımız (+90 536 496 56 98) üzerinden bize yazarak, iletişim formunu doldurarak veya Ortahisar Gazipaşa'daki ofisimizi ziyaret ederek hemen çekim randevusu oluşturabilirsiniz.",
          },
        },
        {
          "@type": "Question",
          name: "Trabzon düğün ve dış çekim lokasyonları nerelerdir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Çekim konseptinize göre Boztepe, Uzungöl, Sümela Manastırı, Akçaabat Orta Mahalle, Ganita, KTÜ Kampüsü, Hıdırnebi ve Kayabaşı yaylaları başta olmak üzere tüm Trabzon ve Karadeniz genelinde çekim yapıyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Fotoğraflar ve videolar ne zaman teslim edilir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Profesyonel renk düzenlemesi (color grading) ve retouch süreci dahil genellikle 7-14 iş günü içinde tüm fotoğraflarınız ve videolarınız yüksek çözünürlüklü dijital olarak teslim edilir.",
          },
        },
      ],
    },
    noscriptHtml: `
      <main>
        <h1>Trabzon Fotoğraf Çekimi ve Video Prodüksiyon Hizmetlerimiz — Bluury Ajans</h1>
        <p>Trabzon'da bireysel ve kurumsal tüm fotoğrafçılık ihtiyaçlarınız için en güncel Sony Alpha ekipmanlar, profesyonel ışık sistemleri ve yaratıcı post-prodüksiyon ekibimizle hizmet veriyoruz.</p>
        <h2>1. Trabzon Düğün ve Nişan Çekimi</h2>
        <p>En özel gününüzün heyecanını, zarafetini ve tüm duygusal anlarını lüks ve sinematik karelerle ölümsüzleştiriyoruz. Düğün hikayesi, gelin alma, kuaför hazırlık, save the date ve panoramik albüm çekimleri.</p>
        <h2>2. Trabzon Dış Mekan ve Konsept Çekim</h2>
        <p>Doğal ışık altında, büyüleyici Trabzon doğasında (Boztepe, Uzungöl, Akçaabat, Maçka, yaylalar) sanatsal dış çekim, mezuniyet ve portre fotoğrafçılığı.</p>
        <h2>3. Trabzon Ürün ve Katalog Çekimi</h2>
        <p>E-ticaret siteleri, pazaryerleri, restoran menüleri ve kataloglar için yüksek çözünürlüklü, renk doğruluğu yüksek, satış odaklı ürün fotoğrafçılığı.</p>
        <h2>4. Trabzon Kurumsal Reklam ve Sosyal Medya Çekimi</h2>
        <p>Markanızın vizyonunu ve kimliğini öne çıkaran kurumsal tanıtım filmleri, Instagram Reels videoları, mekan ve mimari fotoğraf çekimleri.</p>
        <h2>5. After Party ve Etkinlik Çekimi</h2>
        <p>Düğün ve organizasyonlarınızın ardından devam eden eğlenceyi en enerjik ve doğal anlarıyla yakalayan fotoğraf ve video klip çekimi.</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/portfolyo",
    title: "Trabzon Fotoğraf Çekimi Portfolyosu — Düğün, Dış Çekim & Reklam Galerisi | Bluury Ajans",
    description:
      "Bluury Ajans Trabzon fotoğraf çekimi portfolyosu. Trabzon düğün hikayesi, Boztepe ve Uzungöl dış çekim, nişan, ürün ve kurumsal reklam çekimlerimizden seçme kareler ve müşteri referansları.",
    keywords:
      "Trabzon fotoğraf portfolyosu, Trabzon düğün fotoğrafları, Trabzon dış çekim örnekleri, Bluury Ajans portfolyo, Trabzon reklam çekimi referanslar",
    ogImage: `${BASE_URL}/Portfoy/Dugun/dugun1.webp`,
    noscriptHtml: `
      <main>
        <h1>Bluury Ajans Portfolyo — Trabzon Düğün, Dış Çekim ve Reklam Fotoğraf Galerisi</h1>
        <p>Trabzon ve Karadeniz genelinde gerçekleştirdiğimiz düğün fotoğrafçılığı, doğa ve dış mekan çekimleri, moda, ürün ve kurumsal reklam projelerimizden seçme eserlerimizi inceleyin.</p>
        <h2>Portfolyo Kategorilerimiz</h2>
        <ul>
          <li><strong>Düğün Çekimi Galerisi:</strong> Trabzon'da gerçekleştirdiğimiz sinematik gelin-damat ve düğün hikayesi fotoğrafları.</li>
          <li><strong>Dış Çekim Galerisi:</strong> Boztepe, Uzungöl, yaylalar ve sahil lokasyonlarında altın saat dış mekan portre ve çift çekimleri.</li>
          <li><strong>Reklam &amp; Katalog Galerisi:</strong> Markalar için ürettiğimiz moda, katalog ve kurumsal ürün fotoğrafları.</li>
        </ul>
        <h2>Müşteri Referanslarımız</h2>
        <p>Bizimle çalışan çiftlerimizin ve markalarımızın gerçek çekim deneyimleri ve memnuniyet yorumları.</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/hakkimizda",
    title: "Hakkımızda — Bluury Ajans | Trabzon Fotoğrafçılık ve Prodüksiyon Ajansı",
    description:
      "Bluury Ajans (Blurry Ajans) hikâyesini keşfedin. Trabzon Ortahisar merkezli modern ve lüks fotoğrafçılık stüdyomuzda düğün, dış çekim, ürün ve kurumsal reklam prodüksiyonu.",
    keywords:
      "Bluury Ajans kimdir, Blurry Ajans Trabzon, Trabzon fotoğraf ajansı, Trabzon fotoğraf stüdyosu, Trabzon prodüksiyon ajansı",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>Hakkımızda — Bluury Ajans (Blurry Ajans) Trabzon Fotoğrafçılık Stüdyosu</h1>
        <p>Bluury Ajans, Trabzon'un kalbinde (Ortahisar / Gazipaşa) doğan bir fotoğrafçılık ve görsel sanat tutkusunun hikâyesidir. Profesyonel ekibimiz ve modern stüdyomuzla Trabzon başta olmak üzere tüm Karadeniz bölgesinde hizmet veriyoruz.</p>
        <h2>Vizyonumuz ve Değerlerimiz</h2>
        <ul>
          <li><strong>Yaratıcı Vizyon:</strong> Her projede benzersiz bir bakış açısı sunarak hikâyenizi en etkileyici görsel dille anlatıyoruz.</li>
          <li><strong>Tutku &amp; Özen:</strong> Işık, kompozisyon ve renk düzenlemesinde (color grading) en ince detaylara özen gösteriyoruz.</li>
          <li><strong>Güvenilirlik:</strong> Zamanında teslimat, şeffaf iletişim ve koşulsuz müşteri memnuniyeti önceliğimizdir.</li>
          <li><strong>Modern Teknoloji:</strong> En güncel tam kare (full-frame) sinema kameraları, prime lensler ve ışık ekipmanlarıyla endüstri standardının ötesinde sonuçlar üretiyoruz.</li>
        </ul>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/iletisim",
    title: "İletişim & Randevu — Bluury Ajans | Trabzon Fotoğrafçı (Ortahisar / Gazipaşa)",
    description:
      "Bluury Ajans ile iletişime geçin. Trabzon Ortahisar Gazipaşa'daki fotoğraf stüdyomuzda düğün, dış çekim, nişan, ürün ve reklam çekimi için randevu ve fiyat teklifi alın.",
    keywords:
      "Bluury Ajans iletişim, Trabzon fotoğrafçı telefon, Trabzon fotoğraf stüdyosu adres, Ortahisar fotoğrafçı, Trabzon çekim randevusu",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>İletişim ve Çekim Randevusu — Bluury Ajans Trabzon</h1>
        <p>Trabzon'da düğün, nişan, dış çekim, mezuniyet, ürün, katalog ve reklam çekimi randevusu veya fiyat teklifi almak için bizimle hemen iletişime geçin.</p>
        <h2>İletişim Bilgilerimiz</h2>
        <ul>
          <li><strong>Adres:</strong> Gazipaşa, Yavuz Selim Blv. No:50 Kat:3 No:16, 61030 Ortahisar / Trabzon</li>
          <li><strong>Telefon &amp; WhatsApp:</strong> <a href="tel:+905364965698">0536 496 56 98</a></li>
          <li><strong>E-Posta:</strong> <a href="mailto:info@blurryajans.com">info@blurryajans.com</a></li>
          <li><strong>Çalışma Saatleri:</strong> Pazartesi - Cumartesi: 10:00 - 19:00</li>
          <li><strong>Instagram:</strong> <a href="https://www.instagram.com/blurry_ajans">@blurry_ajans</a></li>
        </ul>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/kvkk-aydinlatma-metni",
    title: "KVKK Aydınlatma Metni — Bluury Ajans",
    description:
      "Bluury Ajans web sitesi üzerinden işlenen kişisel veriler hakkında 6698 sayılı KVKK m.10 kapsamında aydınlatma metni.",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>KVKK Aydınlatma Metni — Bluury Ajans</h1>
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) m.10 kapsamında veri sorumlusu Bluury Ajans (Gazipaşa, Yavuz Selim Blv. No:50 Kat:3 No:16, 61030 Ortahisar / Trabzon) tarafından web sitesi ziyaretçileri ve iletişim formu kullanıcıları için hazırlanan aydınlatma metnidir.</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/acik-riza-metni",
    title: "Açık Rıza Metni — Bluury Ajans",
    description:
      "Bluury Ajans web sitesinde yalnızca açık rızanıza dayanan veri işleme faaliyetleri ve rızanızı nasıl verip geri alabileceğiniz.",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>Açık Rıza Metni — Bluury Ajans</h1>
        <p>Bluury Ajans web sitesinde açık rızanıza dayanan 3. taraf işlevsel içerikler (Google Haritalar ve gömülü videolar) ile rıza yönetimi ve geri alma haklarınız hakkında bilgilendirme metnidir.</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/cerez-politikasi",
    title: "Çerez Politikası — Bluury Ajans",
    description:
      "Bluury Ajans web sitesinde kullanılan çerezler, türleri, sağlayıcıları, süreleri ve çerez tercihlerinizi nasıl yönetebileceğiniz.",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>Çerez Politikası — Bluury Ajans</h1>
        <p>blurryajans.com web sitesinde kullanılan zorunlu ve isteğe bağlı işlevsel çerezlerin envanteri, kullanım amaçları, saklama süreleri ve çerez tercihlerinizi yönetme yöntemleri.</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/gizlilik-politikasi",
    title: "Gizlilik Politikası — Bluury Ajans",
    description:
      "Bluury Ajans web sitesinin kişisel verilerin gizliliği ve güvenliğine ilişkin genel yaklaşımı ve güvenlik önlemleri.",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>Gizlilik Politikası — Bluury Ajans</h1>
        <p>Bluury Ajans olarak ziyaretçilerimizin kişisel verilerinin gizliliğini ve güvenliğini korumak amacıyla uyguladığımız temel ilkeler, HTTPS şifreleme, veri minimizasyonu ve güvenlik tedbirleri.</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
  {
    route: "/kunye",
    title: "Künye — Bluury Ajans | Hizmet Sağlayıcı Bilgileri",
    description:
      "6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun kapsamında Bluury Ajans hizmet sağlayıcı ve iletişim bilgileri.",
    ogImage: `${BASE_URL}/Navbar/Navbar.webp`,
    noscriptHtml: `
      <main>
        <h1>Künye — Bluury Ajans Hizmet Sağlayıcı Bilgileri</h1>
        <p>Hizmet Sağlayıcı: Bluury Ajans | Adres: Gazipaşa, Yavuz Selim Blv. No:50 Kat:3 No:16, 61030 Ortahisar / Trabzon | Telefon: 0536 496 56 98 | E-posta: info@blurryajans.com | Yer Sağlayıcı: Hostinger.</p>
        ${NAV_NOSCRIPT}
      </main>`,
  },
];

function buildBreadcrumbSchema(route, title) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: `${BASE_URL}/`,
    },
  ];
  if (route !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: title.split("—")[0].trim(),
      item: `${BASE_URL}${route}`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function generateRouteHtml(templateHtml, page) {
  const canonicalUrl = page.route === "/" ? `${BASE_URL}/` : `${BASE_URL}${page.route}`;
  let html = templateHtml;

  // Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);

  // Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${page.description}" />`
  );

  // Meta Keywords
  if (page.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="keywords" content="${page.keywords}" />`
    );
  }

  // Canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // OpenGraph
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${page.description}" />`
  );
  if (page.ogImage) {
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${page.ogImage}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${page.ogImage}" />`
    );
  }

  // Twitter Title & Description
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${page.description}" />`
  );

  // Breadcrumb + Extra Schema
  const breadcrumbSchema = buildBreadcrumbSchema(page.route, page.title);
  let extraScripts = `\n    <script type="application/ld+json">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n    </script>`;
  if (page.extraSchema) {
    extraScripts += `\n    <script type="application/ld+json">\n${JSON.stringify(page.extraSchema, null, 2)}\n    </script>`;
  }
  html = html.replace("</head>", `${extraScripts}\n  </head>`);

  // Noscript Content
  if (page.noscriptHtml) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/i,
      `<noscript>${page.noscriptHtml}\n    </noscript>`
    );
  }

  return html;
}

function run() {
  const indexHtmlPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    console.error("Hata: dist/index.html bulunamadı. Önce 'vite build' çalıştırılmalıdır.");
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, "utf-8");

  for (const page of ROUTES) {
    const routeHtml = generateRouteHtml(templateHtml, page);
    if (page.route === "/") {
      fs.writeFileSync(indexHtmlPath, routeHtml, "utf-8");
      console.log("✓ SEO Pre-render tamamlandı: / (dist/index.html)");
    } else {
      const subDir = path.join(distDir, page.route.replace(/^\//, ""));
      fs.mkdirSync(subDir, { recursive: true });
      const targetPath = path.join(subDir, "index.html");
      fs.writeFileSync(targetPath, routeHtml, "utf-8");
      console.log(`✓ SEO Pre-render tamamlandı: ${page.route} (dist${page.route}/index.html)`);
    }
  }
}

run();
