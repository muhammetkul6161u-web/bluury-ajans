const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const apiRoutes = require('./routes/api');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET tanımlı değil. backend/.env dosyasına uzun ve rastgele bir değer ekleyin.');
  process.exit(1);
}

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD_HASH) {
  console.warn('ADMIN_USERNAME / ADMIN_PASSWORD_HASH tanımlı değil: yönetici paneline giriş yapılamaz.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Nginx arkasında gerçek istemci IP'si ve protokolü (rate limit ve HTTPS kontrolü için)
app.set('trust proxy', 'loopback');

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
  'https://blurryajans.com',
  'https://www.blurryajans.com',
  'https://bluuryajans.com',
  'https://www.bluuryajans.com'
].filter(Boolean);

app.use(cors({
  // Yalnızca listedeki kaynaklara izin verilir; aynı kaynaklı (origin'siz) istekler etkilenmez
  origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)),
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Statik dosya sunumu (Yüklenen medya dosyaları için)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Rotaları
app.use('/api', apiRoutes);

// Test Endpoint
app.get('/', (req, res) => {
  res.send('Bluury Ajans API çalışıyor...');
});

// İletişim formu mesajlarını saklama süresi dolunca sil (KVKK m.7). Gün sayısı .env'de MESSAGE_RETENTION_DAYS ile verilir;
// tanımlı değilse otomatik silme yapılmaz.
const retentionDays = Number(process.env.MESSAGE_RETENTION_DAYS);
if (retentionDays > 0) {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const purgeOldMessages = async () => {
    try {
      const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
      const { count } = await prisma.message.deleteMany({ where: { createdAt: { lt: cutoff } } });
      if (count) console.log(`Saklama süresi dolan ${count} iletişim mesajı silindi.`);
    } catch (error) {
      console.error('Mesaj saklama temizliği başarısız:', error);
    }
  };
  purgeOldMessages();
  setInterval(purgeOldMessages, 24 * 60 * 60 * 1000).unref();
}

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
