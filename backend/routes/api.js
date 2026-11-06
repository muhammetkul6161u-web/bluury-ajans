const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const authMiddleware = require('../middlewares/auth');
const { setSessionCookie, clearSessionCookie } = authMiddleware;
const { upload, processMedia } = require('../middlewares/upload');
const { rateLimit, failedAttemptLimiter, requireHttps } = require('../middlewares/rateLimit');

const prisma = new PrismaClient();

// İç hata ayrıntıları istemciye gönderilmez, yalnızca sunucu loguna yazılır
const serverError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: 'Sunucu hatası oluştu.' });
};

// Aynı IP'den 15 dakikada en fazla 5 başarısız giriş denemesi
const loginLimiter = failedAttemptLimiter({ windowMs: 15 * 60 * 1000, max: 5, message: 'Çok fazla başarısız giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.' });
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: 'Çok fazla mesaj gönderdiniz. Lütfen daha sonra tekrar deneyin.' });

// ==========================================
// 1. AUTH (GİRİŞ) İŞLEMLERİ
// ==========================================
// Kullanıcı adı ve şifre hash'i yalnızca sunucudaki backend/.env dosyasından okunur
// (ADMIN_USERNAME, ADMIN_PASSWORD_HASH). Hash üretmek için: node scripts/hash-password.js
const DUMMY_HASH = bcrypt.hashSync(crypto.randomBytes(16).toString('hex'), 12);

// Kullanıcı adını sabit sürede karşılaştır (zamanlama farkından bilgi sızmasın)
const safeEqual = (a, b) => {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

router.post('/login', loginLimiter.check, async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre gereklidir.' });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminUsername || !adminHash) {
    console.error('ADMIN_USERNAME veya ADMIN_PASSWORD_HASH tanımlı değil (backend/.env).');
    return res.status(503).json({ message: 'Yönetici girişi sunucuda yapılandırılmamış.' });
  }

  try {
    const usernameOk = safeEqual(username, adminUsername);
    // Kullanıcı adı yanlış olsa da bcrypt karşılaştırması yapılır: yanıt süresi kullanıcı adını ele vermez
    const passwordOk = await bcrypt.compare(password.slice(0, 200), usernameOk ? adminHash : DUMMY_HASH);

    if (!usernameOk || !passwordOk) {
      loginLimiter.fail(req);
      return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı.' });
    }

    loginLimiter.reset(req);
    setSessionCookie(res, adminUsername);
    res.json({ username: adminUsername });
  } catch (error) {
    serverError(res, error);
  }
});

router.post('/logout', (req, res) => {
  clearSessionCookie(res);
  res.json({ message: 'Çıkış yapıldı.' });
});

// Panel açılışında oturumun geçerli olup olmadığını kontrol etmek için
router.get('/me', authMiddleware, (req, res) => {
  res.json({ username: req.admin.username });
});


// ==========================================
// 2. SETTINGS (AYARLAR & BAKIM MODU)
// ==========================================
router.get('/settings', async (req, res) => {
  try {
    let settings = await prisma.setting.findFirst();
    if (!settings) {
      settings = await prisma.setting.create({ data: { maintenanceMode: false } });
    }
    res.json(settings);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/settings', authMiddleware, async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    const updated = await prisma.setting.update({
      where: { id: settings.id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    serverError(res, error);
  }
});

// ==========================================
// 3. MEDYA GÜNCELLEME ORTAK ENDPOINT (UPLOAD)
// ==========================================
// Bu endpoint, modele bağlı kalmaksızın resim/video yükleyip URL döndürür.
router.post('/upload', authMiddleware, upload.single('media'), processMedia, (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Dosya yüklenemedi.' });
  res.json({ url: req.file.fileUrl });
});

// ==========================================
// 4. PORTFOLIO
// ==========================================
router.get('/portfolio', async (req, res) => {
  try {
    const items = await prisma.portfolio.findMany({ orderBy: { orderIndex: 'asc' } });
    res.json(items);
  } catch (error) {
    serverError(res, error);
  }
});

router.post('/portfolio', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.portfolio.create({ data: req.body });
    res.json(item);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/portfolio/:id', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.portfolio.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(item);
  } catch (error) {
    serverError(res, error);
  }
});

router.delete('/portfolio/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.portfolio.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Silindi' });
  } catch (error) {
    serverError(res, error);
  }
});

// ==========================================
// 5. TESTIMONIALS (REFERANSLAR - VİDEO IFRAME DESTEKLİ)
// ==========================================
router.get('/testimonials', async (req, res) => {
  try {
    const items = await prisma.testimonial.findMany({ orderBy: { orderIndex: 'asc' } });
    res.json(items);
  } catch (error) {
    serverError(res, error);
  }
});

router.post('/testimonials', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.testimonial.create({ data: req.body });
    res.json(item);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.testimonial.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(item);
  } catch (error) {
    serverError(res, error);
  }
});

router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Silindi' });
  } catch (error) {
    serverError(res, error);
  }
});

// Benzer şekilde Services, Hero vb. modeller için eklenebilir.
// Basitlik adına buraya Services ekliyorum:
router.get('/services', async (req, res) => {
  try {
    const items = await prisma.service.findMany({ orderBy: { orderIndex: 'asc' } });
    res.json(items);
  } catch (error) {
    serverError(res, error);
  }
});

router.post('/services', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.service.create({ data: req.body });
    res.json(item);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/services/:id', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(item);
  } catch (error) {
    serverError(res, error);
  }
});

router.delete('/services/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Silindi' });
  } catch (error) {
    serverError(res, error);
  }
});

// ==========================================
// 6. HERO (ANA SAYFA KARŞILAMA)
// ==========================================
router.get('/hero', async (req, res) => {
  try {
    let hero = await prisma.hero.findFirst();
    if (!hero) {
      hero = await prisma.hero.create({
        data: {
          title: "Anıların Işığında <br /> Profesyonel Çekimler",
          subtitle: "Her karede duyguyu, hikâyeyi ve zamanı yakalıyoruz. Moda, etkinlik, ürün ve portre çekimlerinde estetik bakış açısıyla markanıza değer katarız.",
          mediaUrl: "/ana sayfa/gözdevideo.mp4",
          mediaType: "video",
          buttonText: "ÇEKİM PLANLA",
          buttonLink: "/iletisim"
        }
      });
    } else if (!hero.mediaUrl || hero.mediaUrl.trim() === '' || (hero.mediaUrl.includes('.mp4') && hero.mediaType === 'image')) {
      hero = await prisma.hero.update({
        where: { id: hero.id },
        data: {
          mediaUrl: hero.mediaUrl && hero.mediaUrl.trim() !== '' ? hero.mediaUrl : "/ana sayfa/gözdevideo.mp4",
          mediaType: "video"
        }
      });
    }
    res.json(hero);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/hero', authMiddleware, async (req, res) => {
  try {
    const hero = await prisma.hero.findFirst();
    const updated = await prisma.hero.update({
      where: { id: hero.id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    serverError(res, error);
  }
});

// ==========================================
// 7. ABOUT (HAKKIMIZDA)
// ==========================================
router.get('/about', async (req, res) => {
  try {
    let about = await prisma.about.findFirst();
    if (!about) {
      about = await prisma.about.create({
        data: {
          title: "Hakkımızda",
          content: "<p>Bluury Ajans, anılarınızı en estetik ve profesyonel biçimde ölümsüzleştirmek için kurulmuştur.</p>",
          mission: "<p>Görevimiz</p>",
          vision: "<p>Vizyonumuz</p>"
        }
      });
    }
    res.json(about);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/about', authMiddleware, async (req, res) => {
  try {
    const about = await prisma.about.findFirst();
    const updated = await prisma.about.update({
      where: { id: about.id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    serverError(res, error);
  }
});

// ==========================================
// 8. MESSAGES (İLETİŞİM FORMU MESAJLARI)
// ==========================================
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch (error) {
    serverError(res, error);
  }
});

// İletişim formu: yalnızca izin verilen alanlar alınır (veri minimizasyonu), doğrulanır ve spam'e karşı korunur
const EMAIL_RE = /^[^s@]+@[^s@]+.[^s@]{2,}$/;
const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

router.post('/messages', requireHttps, contactLimiter, async (req, res) => {
  const { name, email, content, website } = req.body || {};

  // Bot tuzağı (honeypot) doldurulmuşsa kaydetmeden başarılı yanıt dön
  if (typeof website === 'string' && website.trim() !== '') {
    return res.json({ message: 'Mesajınız alındı.' });
  }

  const data = {
    name: clean(name, 100),
    email: clean(email, 254).toLowerCase(),
    content: clean(content, 5000),
    subject: 'Web Sitesi İletişim Formu Talebi',
  };

  if (data.name.length < 2) return res.status(400).json({ message: 'Lütfen adınızı ve soyadınızı giriniz.' });
  if (!EMAIL_RE.test(data.email)) return res.status(400).json({ message: 'Lütfen geçerli bir e-posta adresi giriniz.' });
  if (data.content.length < 5) return res.status(400).json({ message: 'Lütfen mesajınızı yazınız.' });

  try {
    await prisma.message.create({ data });
    res.status(201).json({ message: 'Mesajınız alındı.' });
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.message.update({
      where: { id: Number(id) },
      data: { isRead: true }
    });
    res.json(updated);
  } catch (error) {
    serverError(res, error);
  }
});

router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({ where: { id: Number(id) } });
    res.json({ message: 'Mesaj silindi' });
  } catch (error) {
    serverError(res, error);
  }
});

// ==========================================
// 9. DASHBOARD STATS (ÖZET EKRANI)
// ==========================================
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const portfolioCount = await prisma.portfolio.count();
    const serviceCount = await prisma.service.count();
    const unreadMessages = await prisma.message.count({ where: { isRead: false } });
    const totalTestimonials = await prisma.testimonial.count();
    
    res.json({
      portfolioCount,
      serviceCount,
      unreadMessages,
      totalTestimonials
    });
  } catch (error) {
    serverError(res, error);
  }
});

// ==========================================
// 10. GOOGLE REVIEWS & GOOGLE BUSINESS
// ==========================================
router.get('/google-reviews', async (req, res) => {
  try {
    const reviews = await prisma.googleReview.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // If empty, auto-seed realistic Bluury Ajans Google reviews
    if (reviews.length === 0) {
      const seeded = await prisma.googleReview.createMany({
        data: [
          {
            authorName: "Elif & Burak Demir",
            rating: 5,
            text: "Düğün hikayesi ve dış çekimimiz için Bluury Ajans ile çalıştık. Samimiyetleri, enerjileri ve çektikleri efsane kareler için sonsuz teşekkür ederiz! Fotoğraflarımız adeta Vogue kapağı gibi oldu.",
            relativeTime: "2 hafta önce",
            isVisible: true
          },
          {
            authorName: "Mert Yılmaz (Studio Atelier)",
            rating: 5,
            text: "Markamızın katalog ve lookbook çekimlerini gerçekleştirdik. Işık kullanımı, ekipman kalitesi ve teslim hızı muazzamdı. Kesinlikle sektördeki en profesyonel ajans.",
            relativeTime: "1 ay önce",
            isVisible: true
          },
          {
            authorName: "Sümeyye Sayın",
            rating: 5,
            text: "Klip ve video çekimlerindeki renk tonlamaları, sinematik geçişler olağanüstü. Kendimizi film yıldızı gibi hissettik!",
            relativeTime: "2 ay önce",
            isVisible: true
          },
          {
            authorName: "Caner & Selin Korkmaz",
            rating: 5,
            text: "Nişan çekimimizi yaptık, her ayrıntı özenle düşünüldü. Güler yüzlü ekipleriyle çekim boyunca hiç gerilmedik, çok eğlendik.",
            relativeTime: "3 ay önce",
            isVisible: true
          }
        ]
      });
      const fresh = await prisma.googleReview.findMany({ orderBy: { createdAt: 'desc' } });
      return res.json(fresh);
    }
    res.json(reviews);
  } catch (error) {
    serverError(res, error);
  }
});

router.post('/google-reviews', authMiddleware, async (req, res) => {
  try {
    const { authorName, authorPhoto, rating, text, relativeTime } = req.body;
    const review = await prisma.googleReview.create({
      data: {
        authorName,
        authorPhoto: authorPhoto || null,
        rating: parseInt(rating) || 5,
        text,
        relativeTime: relativeTime || "Yeni",
        isVisible: true
      }
    });
    res.json(review);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/google-reviews/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { authorName, authorPhoto, rating, text, relativeTime, isVisible } = req.body;
    const updated = await prisma.googleReview.update({
      where: { id: Number(id) },
      data: {
        ...(authorName && { authorName }),
        ...(authorPhoto !== undefined && { authorPhoto }),
        ...(rating !== undefined && { rating: parseInt(rating) }),
        ...(text && { text }),
        ...(relativeTime && { relativeTime }),
        ...(isVisible !== undefined && { isVisible })
      }
    });
    res.json(updated);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/google-reviews/:id/toggle', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await prisma.googleReview.findUnique({ where: { id: Number(id) } });
    if (!current) return res.status(404).json({ message: "Yorum bulunamadı" });
    const updated = await prisma.googleReview.update({
      where: { id: Number(id) },
      data: { isVisible: !current.isVisible }
    });
    res.json(updated);
  } catch (error) {
    serverError(res, error);
  }
});

router.delete('/google-reviews/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.googleReview.delete({ where: { id: Number(id) } });
    res.json({ message: 'Yorum silindi' });
  } catch (error) {
    serverError(res, error);
  }
});

// Google İşletme Genel Ayarları (Puan, Toplam Yorum Sayısı vb.)
router.get('/google-settings', async (req, res) => {
  try {
    let setting = await prisma.googleSetting.findFirst();
    if (!setting) {
      setting = await prisma.googleSetting.create({
        data: {
          placeName: "Bluury Ajans",
          overallRating: 5.0,
          totalReviews: 48,
          googleMapsUrl: "https://maps.google.com"
        }
      });
    }
    res.json(setting);
  } catch (error) {
    serverError(res, error);
  }
});

router.put('/google-settings', authMiddleware, async (req, res) => {
  try {
    let setting = await prisma.googleSetting.findFirst();
    if (!setting) {
      setting = await prisma.googleSetting.create({ data: req.body });
      return res.json(setting);
    }
    const updated = await prisma.googleSetting.update({
      where: { id: setting.id },
      data: {
        ...req.body,
        overallRating: parseFloat(req.body.overallRating) || setting.overallRating,
        totalReviews: parseInt(req.body.totalReviews) || setting.totalReviews
      }
    });
    res.json(updated);
  } catch (error) {
    serverError(res, error);
  }
});

module.exports = router;
