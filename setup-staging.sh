#!/bin/bash
set -e

echo "🚀 [1/6] Bluury Ajans Staging Klasörü Hazırlanıyor..."
if [ ! -d "/var/www/bluuryajans-staging" ]; then
    cd /var/www
    git clone https://github.com/muhammetkul6161u-web/bluury-ajans.git bluuryajans-staging
fi

cd /var/www/bluuryajans-staging
git checkout staging 2>/dev/null || git checkout -b staging
git pull origin staging 2>/dev/null || true

echo "⚙️ [2/6] MySQL Kullanıcısı ve Staging Veritabanı Yapılandırılıyor..."
mkdir -p backend/uploads

# Ubuntu MySQL için garantili bluury_user kullanıcısı ve veritabanı oluştur
sudo mysql -e "CREATE DATABASE IF NOT EXISTS bluury_staging_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'bluury_user'@'localhost' IDENTIFIED BY 'bluury2026!';"
sudo mysql -e "ALTER USER 'bluury_user'@'localhost' IDENTIFIED BY 'bluury2026!';"
sudo mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'bluury_user'@'localhost' WITH GRANT OPTION;"
sudo mysql -e "FLUSH PRIVILEGES;"

cat > backend/.env << 'EOF'
PORT=5001
JWT_SECRET=bluury_staging_secret_key_2026_test
DATABASE_URL="mysql://bluury_user:bluury2026!@localhost:3306/bluury_staging_db"
CLIENT_URL="https://staging.blurryajans.com"
EOF

cd backend
npm install --production=false
npx prisma generate
npx prisma db push
node seed.js 2>/dev/null || true

echo "🔄 [3/6] PM2 Staging Servisi Başlatılıyor (Port 5001)..."
cd /var/www/bluuryajans-staging
pm2 delete bluury-staging 2>/dev/null || true
PORT=5001 pm2 start backend/server.js --name bluury-staging
pm2 save

echo "📦 [4/6] Frontend Derleniyor (Build)..."
npm install
npm run build

echo "🌐 [5/6] Nginx ve SSL Yapılandırması..."
sudo cp /var/www/bluuryajans.com/staging.nginx.conf /etc/nginx/sites-available/staging.blurryajans.com
sudo ln -sf /etc/nginx/sites-available/staging.blurryajans.com /etc/nginx/sites-enabled/staging.blurryajans.com

echo "🔒 [6/6] SSL Sertifikası Alınıyor..."
sudo certbot --nginx -d staging.blurryajans.com --non-interactive --agree-tos --register-unsafely-without-email || true

sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "=========================================================="
echo "🎉 TEBRİKLER! STAGING ORTAMI BAŞARIYLA AYAĞA KALKTI!"
echo "👉 Test Sitesi: https://staging.blurryajans.com"
echo "👉 Test Admin : https://staging.blurryajans.com/admin"
echo "=========================================================="