#!/usr/bin/env bash
# VPS'te BİR KEZ çalıştırın (kod push edilip deploy bittikten sonra):
#   cd /var/www/bluuryajans.com && sudo bash scripts/vps-guvenlik-kurulum.sh
#
# Yaptıkları:
#   1. backend/.env dosyasını yedekler
#   2. Uygulama için yalnızca bu veritabanına yetkili MySQL kullanıcısını (bluury_user) sizin gireceğiniz
#      yeni şifreyle oluşturur/günceller. Uygulama daha önce root ile bağlanıyorsa root'a DOKUNMAZ,
#      bağlantıyı bu kullanıcıya taşır.
#   3. Yeni rastgele JWT_SECRET üretir (git geçmişine sızan eski anahtar geçersiz olur)
#   4. Yönetici kullanıcı adını ve şifresinin bcrypt hash'ini .env'e yazar (şifre düz metin saklanmaz)
#   5. Backend'i PM2 ile yeniden başlatır, veritabanı bağlantısını test eder; başarısızsa eski .env'i geri yükler
# Hiçbir şifre bu dosyada yazılı değildir; hepsi çalışırken ekrandan (gizli olarak) sorulur.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/bluuryajans.com}"
ENV_FILE="${ENV_FILE:-$APP_DIR/backend/.env}"
PM2_APP=bluury-backend
APP_DB_USER=bluury_user

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

# Mevcut DATABASE_URL'den kullanıcı, şifre ve veritabanı adını oku
eval "$(node -e '
const t = require("fs").readFileSync(process.argv[1], "utf8");
const m = t.match(/^DATABASE_URL\s*=\s*["\x27]?([^"\x27\r\n]+)/m);
if (!m) { console.error("DATABASE_URL .env içinde bulunamadı"); process.exit(1); }
const u = new URL(m[1]);
const q = (s) => "\x27" + String(s).replace(/\x27/g, "\x27\\\x27\x27") + "\x27";
console.log("DB_USER=" + q(decodeURIComponent(u.username)));
console.log("DB_PASS=" + q(decodeURIComponent(u.password)));
console.log("DB_NAME=" + q(u.pathname.slice(1)));
' "$ENV_FILE")"

# MySQL'e yönetici olarak bağlanma: önce Ubuntu'nun varsayılanı (root, auth_socket);
# olmazsa .env'deki root şifresi geçici bir seçenek dosyasıyla kullanılır (şifre komut satırında görünmez).
MYSQL_OPTS=()
cleanup() { [ -n "${MYSQL_CNF:-}" ] && rm -f "$MYSQL_CNF"; }
trap cleanup EXIT
if ! mysql -e "SELECT 1" >/dev/null 2>&1; then
  if [ "$DB_USER" = "root" ] && [ -n "$DB_PASS" ]; then
    MYSQL_CNF="$(mktemp)"; chmod 600 "$MYSQL_CNF"
    ESC_PASS="${DB_PASS//\\/\\\\}"; ESC_PASS="${ESC_PASS//\"/\\\"}"
    printf '[client]\nuser=root\npassword="%s"\n' "$ESC_PASS" > "$MYSQL_CNF"
    unset ESC_PASS
    MYSQL_OPTS=(--defaults-extra-file="$MYSQL_CNF")
    mysql "${MYSQL_OPTS[@]}" -e "SELECT 1" >/dev/null 2>&1 || { echo "MySQL'e yönetici olarak bağlanılamadı. Hiçbir değişiklik yapılmadı."; exit 1; }
  else
    echo "MySQL'e yönetici olarak bağlanılamadı ('sudo mysql' çalışmıyor). Hiçbir değişiklik yapılmadı."
    exit 1
  fi
fi
unset DB_PASS
run_mysql() { mysql "${MYSQL_OPTS[@]}" "$@"; }

if [ "$DB_USER" = "root" ]; then
  TARGET_USER="$APP_DB_USER"
  echo "Uygulama şu an MySQL'e root ile bağlanıyor. Root'a dokunulmayacak; yalnızca '$DB_NAME'"
  echo "veritabanına yetkili '$TARGET_USER' kullanıcısı oluşturulup bağlantı ona taşınacak."
else
  TARGET_USER="$DB_USER"
  echo "MySQL kullanıcısı: $TARGET_USER   Veritabanı: $DB_NAME"
fi
echo
ask_secret "Yeni MySQL şifresi ($TARGET_USER)"; MYSQL_PW="$SECRET"
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

# Uygulama kullanıcısını oluştur/güncelle (şifre komut satırında görünmesin diye heredoc ile)
SQL_PW="${MYSQL_PW//\\/\\\\}"; SQL_PW="${SQL_PW//\'/\'\'}"
SQL_USER="${TARGET_USER//\'/\'\'}"
SQL_DB="${DB_NAME//\`/\`\`}"
run_mysql <<SQL
CREATE USER IF NOT EXISTS '${SQL_USER}'@'localhost' IDENTIFIED BY '${SQL_PW}';
CREATE USER IF NOT EXISTS '${SQL_USER}'@'127.0.0.1' IDENTIFIED BY '${SQL_PW}';
ALTER USER '${SQL_USER}'@'localhost' IDENTIFIED BY '${SQL_PW}';
ALTER USER '${SQL_USER}'@'127.0.0.1' IDENTIFIED BY '${SQL_PW}';
GRANT ALL PRIVILEGES ON \`${SQL_DB}\`.* TO '${SQL_USER}'@'localhost';
GRANT ALL PRIVILEGES ON \`${SQL_DB}\`.* TO '${SQL_USER}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
unset SQL_PW
echo "✔ MySQL kullanıcısı '$TARGET_USER' yeni şifreyle hazır (yalnızca $DB_NAME yetkili)"

# .env güncelle (değerler ortam değişkeniyle aktarılır, komut satırında görünmez)
TARGET_USER="$TARGET_USER" MYSQL_PW="$MYSQL_PW" JWT="$JWT" ADMIN_USER="$ADMIN_USER" ADMIN_HASH="$ADMIN_HASH" node -e '
const fs = require("fs");
const file = process.argv[1];
let lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
const get = (k) => { const l = lines.find((x) => new RegExp("^" + k + "\\s*=").test(x)); return l && l.replace(/^[^=]*=\s*/, "").replace(/^["\x27]|["\x27]$/g, ""); };
const set = (k, v, onlyIfMissing = false) => {
  const i = lines.findIndex((x) => new RegExp("^" + k + "\\s*=").test(x));
  if (i >= 0) { if (!onlyIfMissing) lines[i] = k + "=" + v; } else lines.push(k + "=" + v);
};
const u = new URL(get("DATABASE_URL"));
u.username = encodeURIComponent(process.env.TARGET_USER);
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
  echo "✘ Backend testi başarısız (HTTP $CODE). Eski .env geri yükleniyor, site eski ayarlarla çalışmaya devam edecek."
  cp "$BACKUP" "$ENV_FILE" && chmod 600 "$ENV_FILE"
  pm2 restart "$PM2_APP" --update-env >/dev/null
  echo "  Hatanın nedenini görmek için: pm2 logs $PM2_APP --lines 40"
  exit 1
fi

echo
read -rp "Artık kullanılmayan eski Admin tablosu kayıtları (eski sızmış şifreler) silinsin mi? (e/h): " ANS
if [ "$ANS" = "e" ] || [ "$ANS" = "E" ]; then
  run_mysql "$DB_NAME" -e "DELETE FROM Admin;"
  echo "✔ Eski Admin kayıtları silindi"
fi

echo
echo "Tamamlandı. https://blurryajans.com/admin/login adresinden yeni bilgilerle giriş yapın."
