const jwt = require('jsonwebtoken');

const SESSION_COOKIE = 'bluury_admin_oturum';
const SESSION_HOURS = Number(process.env.SESSION_HOURS) > 0 ? Number(process.env.SESSION_HOURS) : 2;
const SESSION_MS = SESSION_HOURS * 60 * 60 * 1000;

// Oturum çerezi: JavaScript erişemez (httpOnly), yalnızca HTTPS (secure), başka sitelerden gönderilmez (sameSite=strict)
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/api',
};

const readCookie = (req, name) => {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return null;
};

const setSessionCookie = (res, username) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: `${SESSION_HOURS}h` });
  res.cookie(SESSION_COOKIE, token, { ...cookieOptions, maxAge: SESSION_MS });
};

const clearSessionCookie = (res) => {
  res.clearCookie(SESSION_COOKIE, cookieOptions);
};

const authMiddleware = (req, res, next) => {
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) {
    return res.status(401).json({ message: 'Oturum bulunamadı. Lütfen giriş yapın.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // .env'deki kullanıcı adı değiştirilirse eski oturumlar geçersiz olur
    if (verified.username !== process.env.ADMIN_USERNAME) throw new Error('Kullanıcı eşleşmiyor');
    req.admin = verified;
    next();
  } catch (err) {
    clearSessionCookie(res);
    res.status(401).json({ message: 'Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.' });
  }
};

module.exports = authMiddleware;
module.exports.setSessionCookie = setSessionCookie;
module.exports.clearSessionCookie = clearSessionCookie;
