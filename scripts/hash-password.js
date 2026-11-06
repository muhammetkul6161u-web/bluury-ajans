// Yönetici şifresinin bcrypt hash'ini üretir. Şifre komut satırına yazılmaz (shell geçmişinde kalmaması için):
//   node scripts/hash-password.js            → şifreyi gizli olarak sorar
//   echo -n "şifre" | node scripts/hash-password.js   → stdin'den okur
// Çıktıdaki satırı sunucudaki backend/.env dosyasına (tek tırnaklarla birlikte) ekleyin.
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const backendDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "backend");
const require = createRequire(path.join(backendDir, "package.json"));
const bcrypt = require("bcryptjs");

const COST = 12;
const MIN_LENGTH = 12;

const readHidden = (prompt) =>
  new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (ch) => {
      if (ch === "\r" || ch === "\n" || ch === "\u0004") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.off("data", onData);
        stdout.write("\n");
        resolve(value);
      } else if (ch === "\u0003") {
        process.exit(130);
      } else if (ch === "\u007f" || ch === "\b") {
        value = value.slice(0, -1);
      } else {
        value += ch;
      }
    };
    stdin.on("data", onData);
  });

const readPiped = () =>
  new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data.replace(/\r?\n$/, "")));
  });

const password = process.stdin.isTTY ? await readHidden("Yönetici şifresi: ") : await readPiped();

if (password.length < MIN_LENGTH) {
  console.error(`Şifre en az ${MIN_LENGTH} karakter olmalıdır.`);
  process.exit(1);
}

const hash = await bcrypt.hash(password, COST);
console.log(`ADMIN_PASSWORD_HASH='${hash}'`);
