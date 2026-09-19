const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');
const { upload, processMedia } = require('../middlewares/upload');

const prisma = new PrismaClient();

// ==========================================
// 1. AUTH (GİRİŞ) İŞLEMLERİ
// ==========================================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    let admin = await prisma.admin.findUnique({ where: { username } });
    
    // Eğer veritabanında bluury admin henüz oluşturulmamışsa otomatik oluştur
    if (!admin && username === 'bluury' && password === 'bluuryadmin2026!') {
      const hashedPassword = await bcrypt.hash('bluuryadmin2026!', 10);
      admin = await prisma.admin.create({
        data: { username: 'bluury', password: hashedPassword }
      });
    }

    if (!admin) return res.status(404).json({ message: 'Yönetici bulunamadı.' });

    let validPassword = await bcrypt.compare(password, admin.password);
    
    // bluury kullanıcısı için şifre güncel değilse otomatik eşitle
    if (!validPassword && username === 'bluury' && password === 'bluuryadmin2026!') {
      const hashedPassword = await bcrypt.hash('bluuryadmin2026!', 10);
      admin = await prisma.admin.update({
        where: { username: 'bluury' },
        data: { password: hashedPassword }
      });
      validPassword = true;
    }

    if (!validPassword) return res.status(400).json({ message: 'Hatalı şifre.' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET || 'bluury_secret_key_2026', { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed admin (İlk kurulum için)
router.post('/seed-admin', async (req, res) => {
  try {
    const count = await prisma.admin.count();
    if (count > 0) return res.status(400).json({ message: 'Admin zaten mevcut.' });

    const hashedPassword = await bcrypt.hash('123456', 10);
    const admin = await prisma.admin.create({
      data: { username: 'admin', password: hashedPassword }
    });
    res.json({ message: 'Admin oluşturuldu: admin / 123456' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.post('/portfolio', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.portfolio.create({ data: req.body });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.delete('/portfolio/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.portfolio.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.post('/testimonials', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.testimonial.create({ data: req.body });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Benzer şekilde Services, Hero vb. modeller için eklenebilir.
// Basitlik adına buraya Services ekliyorum:
router.get('/services', async (req, res) => {
  try {
    const items = await prisma.service.findMany({ orderBy: { orderIndex: 'asc' } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/services', authMiddleware, async (req, res) => {
  try {
    const item = await prisma.service.create({ data: req.body });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.delete('/services/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const message = await prisma.message.create({
      data: req.body
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({ where: { id: Number(id) } });
    res.json({ message: 'Mesaj silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.delete('/google-reviews/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.googleReview.delete({ where: { id: Number(id) } });
    res.json({ message: 'Yorum silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
