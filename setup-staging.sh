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

echo "⚙️ [2/6] Staging Backend ve Veritabanı Yapılandırılıyor..."
mkdir -p backend/uploads

PROD_ENV="/var/www/bluuryajans.com/backend/.env"
if [ -f "$PROD_ENV" ]; then
    # Sadece yorum olmayan gerçek DATABASE_URL satırını al
    DB_URL=$(grep -E '^[[:space:]]*DATABASE_URL[[:space:]]*=' "$PROD_ENV" | tail -n 1 | cut -d '=' -f2- | tr -d '"' | tr -d "'" | sed 's/bluury_db/bluury_staging_db/g')
else
    DB_URL="mysql://root:123456@localhost:3306/bluury_staging_db"
fi

cat > backend/.env << EOF
PORT=5001
JWT_SECRET=bluury_staging_secret_key_2026_test
DATABASE_URL="${DB_URL}"
CLIENT_URL="https://staging.blurryajans.com"
EOF

# Staging veritabanını oluştur (canlı veritabanındaki kullanıcı/şifre ile veya root ile)
DB_USER=$(echo "$DB_URL" | sed -E 's#.*://([^:]+):([^@]+)@.*#\1#')
DB_PASS=$(echo "$DB_URL" | sed -E 's#.*://([^:]+):([^@]+)@.*#\2#')

if [ -n "$DB_PASS" ] && [ "$DB_PASS" != "$DB_URL" ]; then
    mysql -u "$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS bluury_staging_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || true
else
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS bluury_staging_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || true
fi

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