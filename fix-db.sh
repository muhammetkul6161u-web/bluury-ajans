#!/bin/bash
set -e

echo "🔧 [1/5] MySQL Veritabanı ve bluury_user Yetkilendiriliyor..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS bluury_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'bluury_user'@'localhost' IDENTIFIED BY 'bluury2026!';"
sudo mysql -e "ALTER USER 'bluury_user'@'localhost' IDENTIFIED BY 'bluury2026!';"
sudo mysql -e "GRANT ALL PRIVILEGES ON bluury_db.* TO 'bluury_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
echo "✅ MySQL yetkileri tamamlandı!"

echo "⚙️ [2/5] Backend .env Yapılandırılıyor..."
cat > /var/www/bluuryajans.com/backend/.env << 'EOF'
PORT=5000
DATABASE_URL="mysql://bluury_user:bluury2026!@localhost:3306/bluury_db"
JWT_SECRET="bluury_super_secret_jwt_key_2026_luxury"
CLIENT_URL="https://blurryajans.com"
EOF
echo "✅ .env dosyası güncellendi!"

echo "📦 [3/5] Prisma Tabloları Senkronize Ediliyor..."
cd /var/www/bluuryajans.com/backend
npx prisma generate
npx prisma db push

echo "🌱 [4/5] Admin Kullanıcısı Oluşturuluyor (Seed)..."
node seed.js

echo "🔄 [5/5] Backend Servisi Yeniden Başlatılıyor (PM2)..."
cd /var/www/bluuryajans.com
pm2 restart bluury-backend || pm2 start ecosystem.config.js --env production
pm2 save

echo ""
echo "=========================================================="
echo "🎉 TEBRİKLER! VERİTABANI VE ADMIN GİRİŞİ KUSURSUZ HAZIR!"
echo "👉 Admin URL : https://blurryajans.com/admin/login"
echo "👉 Kullanıcı : bluury"
echo "👉 Şifre     : bluuryadmin2026!"
echo "=========================================================="