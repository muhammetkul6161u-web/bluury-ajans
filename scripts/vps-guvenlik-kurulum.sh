#!/usr/bin/env bash
# VPS'te BİR KEZ çalıştırın (kod push edilip deploy bittikten sonra):
#   cd /var/www/bluuryajans.com && sudo bash scripts/vps-guvenlik-kurulum.sh
#
# Yaptıkları:
#   1. backend/.env dosyasını yedekler
#   2. MySQL kullanıcısının şifresini sizin gireceğiniz yeni şifreyle değiştirir
#   3. Yeni rastgele JWT_SECRET üretir (git geçmişine sızan eski anahtar geçersiz olur)
#   4. Yönetici kullanıcı adını ve şifresinin bcrypt hash'ini .env'e yazar (şifre düz metin saklanmaz)
#   5. Backend'i PM2 ile yeniden başlatır ve veritabanı bağlantısını test eder
# Hiçbir şifre bu dosyada yazılı değildir; hepsi çalışırken ekrandan (gizli olarak) sorulur.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/bluuryajans.com}"
ENV_FILE="${ENV_FILE:-$APP_DIR/backend/.env}"
PM2_APP=bluury-backend

[ "$(id -u)" -eq 0 ] || { echo "Root olarak çalıştırın: sudo bash $0"; exit 1; }
[ -f "$ENV_FILE" ] || { echo "$ENV_FILE bulunamadı."; exit 1; }
[ -f "$APP_DIR/scripts/hash-password.js" ] || { echo "Yeni kod henüz sunucuda değil. Önce push/deploy yapın."; exit 1; }
cd "$APP_DIR"

ask_secret() {
  local label="$1" a b
  while true; do
    read -rsp "$label: " a; echo
    read -rsp "$label (tekrar): " b; echo
    if [ "$a" != "$b" ]; then echo "  Eşleşmedi, tekrar deneyin."; continue; fi
    if [ "${#a}" -lt 12 ]; then echo "  En az 12 karakter olmalı."; continue; fi
    SECRET="$a"; return
  done
}

# Mevcut DATABASE_URL'den kullanıcı ve veritabanı bilgilerini oku
eval "$(node -e '
const t = require("fs").readFileSync(process.argv[1], "utf8");
const m = t.match(/^DATABASE_URL\s*=\s*["\x27]?([^"\x27\r\n]+)/m);
if (!m) { console.error("DATABASE_URL .env içinde bulunamadı"); process.exit(1); }
const u = new URL(m[1]);
const q = (s) => "\x27" + String(s).replace(/\x27/g, "\x27\\\x27\x27") + "\x27";
console.log("DB_USER=" + q(decodeURIComponent(u.username)));
console.log("DB_NAME=" + q(u.pathname.slice(1)));
' "$ENV_FILE")"

if [ "$DB_USER" = "root" ]; then
  echo "DATABASE_URL root kullanıcısını kullanıyor. Root şifresini değiştirmek 'sudo mysql' erişimini bozabilir;"
  echo "önce ayrı bir uygulama kullanıcısı oluşturun. Hiçbir değişiklik yapılmadı."
  exit 1
fi

echo "MySQL kullanıcısı: $DB_USER   Veritabanı: $DB_NAME"
echo
ask_secret "Yeni MySQL şifresi"; MYSQL_PW="$SECRET"
read -rp "Yönetici kullanıcı adı: " ADMIN_USER
[ -n "$ADMIN_USER" ] || { echo "Kullanıcı adı boş olamaz."; exit 1; }
ask_secret "Yönetici şifresi"; ADMIN_PW="$SECRET"
echo

# Önce geri alınamayan işlemlerden bağımsız olanları hazırla (hata olursa hiçbir şey değişmez)
ADMIN_HASH_LINE="$(printf '%s' "$ADMIN_PW" | node scripts/hash-password.js)"
ADMIN_HASH="${ADMIN_HASH_LINE#ADMIN_PASSWORD_HASH=\'}"; ADMIN_HASH="${ADMIN_HASH%\'}"
JWT="$(node -e 'console.log(require("crypto").randomBytes(48).toString("hex"))')"
unset ADMIN_PW

BACKUP="$HOME/bluury-env-yedek-$(date +%Y%m%d-%H%M%S)"
cp "$ENV_FILE" "$BACKUP" && chmod 600 "$BACKUP"
echo "✔ .env yedeklendi: $BACKUP"

# MySQL şifresini değiştir (şifre komut satırında görünmesin diye heredoc ile)
SQL_PW="${MYSQL_PW//\\/\\\\}"; SQL_PW="${SQL_PW//\'/\'\'}"
SQL_USER="${DB_USER//\'/\'\'}"
mysql <<SQL
ALTER USER '${SQL_USER}'@'localhost' IDENTIFIED BY '${SQL_PW}';
FLUSH PRIVILEGES;
SQL
unset SQL_PW
echo "✔ MySQL şifresi değiştirildi"

# .env güncelle (değerler ortam değişkeniyle aktarılır, komut satırında görünmez)
MYSQL_PW="$MYSQL_PW" JWT="$JWT" ADMIN_USER="$ADMIN_USER" ADMIN_HASH="$ADMIN_HASH" node -e '
const fs = require("fs");
const file = process.argv[1];
let lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
const get = (k) => { const l = lines.find((x) => new RegExp("^" + k + "\\s*=").test(x)); return l && l.replace(/^[^=]*=\s*/, "").replace(/^["\x27]|["\x27]$/g, ""); };
const set = (k, v, onlyIfMissing = false) => {
  const i = lines.findIndex((x) => new RegExp("^" + k + "\\s*=").test(x));
  if (i >= 0) { if (!onlyIfMissing) lines[i] = k + "=" + v; } else lines.push(k + "=" + v);
};
const u = new URL(get("DATABASE_URL"));
u.password = encodeURIComponent(process.env.MYSQL_PW);
set("DATABASE_URL", "\"" + u.toString() + "\"");
set("JWT_SECRET", "\"" + process.env.JWT + "\"");
set("ADMIN_USERNAME", "\"" + process.env.ADMIN_USER + "\"");
set("ADMIN_PASSWORD_HASH", "\x27" + process.env.ADMIN_HASH + "\x27");
set("SESSION_HOURS", "2", true);
set("MESSAGE_RETENTION_DAYS", "365", true);
lines = lines.filter((x) => !/^ADMIN_PASSWORD\s*=/.test(x)); // düz metin şifre satırı kalmasın
fs.writeFileSync(file, lines.join("\n").replace(/\n*$/, "\n"));
' "$ENV_FILE"
unset MYSQL_PW JWT ADMIN_HASH
chmod 600 "$ENV_FILE"
echo "✔ .env güncellendi"

pm2 restart "$PM2_APP" --update-env >/dev/null
sleep 4
CODE="$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:5000/api/settings || true)"
if [ "$CODE" = "200" ]; then
  echo "✔ Backend yeniden başladı, veritabanı bağlantısı çalışıyor"
  pm2 save >/dev/null
else
  echo "✘ Backend testi başarısız (HTTP $CODE). Loglar: pm2 logs $PM2_APP --lines 40"
  echo "  Eski .env yedeği: $BACKUP (MySQL şifresi yeni şifreye geçti; DATABASE_URL'i kontrol edin)"
  exit 1
fi

echo
read -rp "Artık kullanılmayan eski Admin tablosu kayıtları (eski sızmış şifreler) silinsin mi? (e/h): " ANS
if [ "$ANS" = "e" ] || [ "$ANS" = "E" ]; then
  mysql "$DB_NAME" -e "DELETE FROM Admin;"
  echo "✔ Eski Admin kayıtları silindi"
fi

echo
echo "Tamamlandı. https://blurryajans.com/admin/login adresinden yeni bilgilerle giriş yapın."
