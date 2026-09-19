# 🚀 Bluury Ajans — Hostinger VPS Canlıya Alma Rehberi (Sprint Graphic Mimarisi)

Bu rehber, **Bluury Ajans** web sitesini ve yönetim panelini (Vercel yerine) **Hostinger VPS** sunucunuzda **Nginx + PM2 + MySQL + GitHub Actions (Otomatik Dağıtım)** ile canlıya almak için adım adım hazırlanmıştır.

---

## 🏗️ Sunucu Mimarisi Nasıl Çalışır?

```
                      [ Ziyaretçi / Müşteri ]
                                 │
                                 ▼
                     [ Nginx (Port 80 / 443 SSL) ]
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
[ Frontend Statik Dosyalar ]                [ Backend Express API (PM2) ]
/var/www/bluuryajans.com/dist               http://127.0.0.1:5000
(/ ve SPA Rotaları)                         (/api ve /uploads)
                                                         │
                                                         ▼
                                                  [ MySQL Database ]
                                                     bluury_db
```

* **Frontend:** Vite ile derlenen dosyalar (`dist/`) doğrudan Nginx tarafından maksimum hızda ve Gzip/Cache desteğiyle sunulur.
* **Backend API:** Node.js Express uygulaması PM2 ile arka planda kesintisiz çalışır.
* **Otomatik Dağıtım (CI/CD):** GitHub'a `git push` yaptığınızda GitHub Actions sunucuya bağlanır ve tek tıkla canlıyı günceller.

---

## 📋 Adım Adım Kurulum Kılavuzu

### 1. Adım: Kodları GitHub Reponuza Gönderin (Local Bilgisayar)
Local bilgisayarınızdaki terminalde:
```bash
git add .
git commit -m "feat: VPS deployment hazirliklari ve Sprint Admin entegrasyonu"
git push origin main
```

---

### 2. Adım: Hostinger VPS'e SSH ile Bağlanın
Terminalinizden (veya PuTTY / PowerShell):
```bash
ssh root@SUNUCU_IP_ADRESINIZ
```

---

### 3. Adım: Gerekli Paketlerin Kurulu Olduğunu Doğrulayın
(Sprint Graphic'i kurduğunuz VPS ise zaten Node.js, PM2, Nginx ve MySQL kuruludur):
```bash
node -v      # v18+ veya v20+ olmalı
npm -v
pm2 -v
nginx -v
```
*(Eğer kurulu değilse: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs nginx mysql-server && npm install -g pm2`)*

---

### 4. Adım: Projeyi Sunucuya Klonlayın
```bash
# Proje dizinine gidin
mkdir -p /var/www/bluuryajans.com
cd /var/www

# Repoyu klonlayın (Eğer dizin boşsa)
git clone https://github.com/KULLANICI_ADINIZ/bluury-ajans.git /var/www/bluuryajans.com

# Proje klasörüne girin
cd /var/www/bluuryajans.com
```

---

### 5. Adım: Backend `.env` ve MySQL Ayarları
Sunucuda MySQL üzerinde `bluury_db` adında veritabanı oluşturun:
```bash
mysql -u root -p
```
MySQL konsolunda:
```sql
CREATE DATABASE IF NOT EXISTS bluury_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

Şimdi backend `.env` dosyasını oluşturun:
```bash
nano /var/www/bluuryajans.com/backend/.env
```
İçerisine sunucu bilgilerinizi yapıştırın (CTRL+O -> Enter -> CTRL+X ile kaydedin):
```env
PORT=5000
DATABASE_URL="mysql://root:MYSQL_SIFRENIZ@localhost:3306/bluury_db"
JWT_SECRET="bluury_super_secret_jwt_key_2026_luxury"
CLIENT_URL="https://bluuryajans.com"
```

---

### 6. Adım: Backend Bağımlılıkları, Prisma DB ve PM2 Başlatma
```bash
cd /var/www/bluuryajans.com/backend

# Paketleri kurun
npm install

# Veritabanı tablolarını MySQL'e işleyin
npx prisma generate
npx prisma db push

# İlk Admin kullanıcısını ve örnek verileri tohumlayın (Seed)
node seed.js

# PM2 ile backend'i arka planda başlatın
cd /var/www/bluuryajans.com
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

### 7. Adım: Frontend'i Sunucuda Derleyin (Build)
```bash
cd /var/www/bluuryajans.com
npm install
npm run build
```
*(Bu komut `dist/` klasörünü oluşturacaktır)*

---

### 8. Adım: Nginx Yapılandırması
Projede sizin için hazırladığımız hazır Nginx ayarını kopyalayın:
```bash
sudo cp /var/www/bluuryajans.com/bluuryajans.nginx.conf /etc/nginx/sites-available/bluuryajans.com

# Domaini aktif sitelere bağlayın (Sembolik link)
sudo ln -s /etc/nginx/sites-available/bluuryajans.com /etc/nginx/sites-enabled/

# Nginx ayar testini çalıştırın
sudo nginx -t

# Nginx servisini yeniden başlatın
sudo systemctl reload nginx
```

---

### 9. Adım: Ücretsiz SSL (HTTPS) Sertifikası Kurun (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bluuryajans.com -d www.bluuryajans.com
```
*Gelen ekranda e-posta adresinizi girin ve yönlendirmeleri onaylayın (1/2 sorarsa 2: Redirect HTTP to HTTPS seçin).*

---

### 10. Adım: GitHub Actions Otomatik Dağıtımı (Auto-Deploy) Aktif Edin
Sprint Graphic'te olduğu gibi, GitHub'a her kod attığınızda sunucunun otomatik güncellenmesi için:

1. GitHub'da **bluury-ajans** reponuza gidin.
2. **Settings** -> **Secrets and variables** -> **Actions** sekmesine tıklayın.
3. **New repository secret** diyerek şu 4 değişkeni ekleyin:
   * `VPS_HOST`: VPS IP Adresiniz
   * `VPS_USERNAME`: `root`
   * `VPS_PASSWORD`: VPS SSH Giriş Şifreniz (veya SSH Key kullanıyorsanız `VPS_KEY`)
   * `VPS_PORT`: `22`

Artık bilgisayarınızda bir satır kod değiştirip `git push` yaptığınız anda, GitHub Actions sunucunuza bağlanacak, `git pull`, `npm run build`, `prisma db push` ve `pm2 reload` işlemlerini 30 saniyede sıfır kesintiyle tamamlayacaktır!

---

### 🎉 Tebrikler!
Artık siteniz Vercel'den tamamen bağımsız, kendi Hostinger VPS sunucunuzda, ultra hızlı ve tam donanımlı olarak yayında:
* **Canlı Site:** `https://bluuryajans.com`
* **Admin Paneli:** `https://bluuryajans.com/admin/login`
  * **Kullanıcı Adı:** `bluury`
  * **Şifre:** `bluuryadmin2026!`
