// Bağımlılıksız, bellek içi IP bazlı istek sınırlayıcı (tek PM2 süreci için yeterlidir).
const rateLimit = ({ windowMs, max, message }) => {
  const hits = new Map();

  // Süresi dolan kayıtları periyodik olarak temizle (IP adresleri gereğinden uzun tutulmasın)
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(ip);
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip || 'unknown';
    let entry = hits.get(ip);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(ip, entry);
    }
    entry.count += 1;
    if (entry.count > max) {
      res.set('Retry-After', Math.ceil((entry.resetAt - now) / 1000));
      return res.status(429).json({ message });
    }
    next();
  };
};

// Yalnızca BAŞARISIZ denemeleri sayan sınırlayıcı (giriş için). Başarılı girişte sayaç sıfırlanır.
const failedAttemptLimiter = ({ windowMs, max, message }) => {
  const failures = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of failures) {
      if (entry.resetAt <= now) failures.delete(ip);
    }
  }, windowMs).unref();

  const key = (req) => req.ip || 'unknown';

  return {
    check(req, res, next) {
      const entry = failures.get(key(req));
      if (entry && entry.resetAt > Date.now() && entry.count >= max) {
        res.set('Retry-After', Math.ceil((entry.resetAt - Date.now()) / 1000));
        return res.status(429).json({ message });
      }
      next();
    },
    fail(req) {
      const now = Date.now();
      let entry = failures.get(key(req));
      if (!entry || entry.resetAt <= now) {
        entry = { count: 0, resetAt: now + windowMs };
        failures.set(key(req), entry);
      }
      entry.count += 1;
    },
    reset(req) {
      failures.delete(key(req));
    },
  };
};

// Nginx X-Forwarded-Proto başlığını iletir; HTTPS dışında gelen gönderimleri reddet.
const requireHttps = (req, res, next) => {
  const proto = req.get('x-forwarded-proto');
  if (proto && proto.split(',')[0].trim() !== 'https') {
    return res.status(403).json({ message: 'Güvenli olmayan bağlantı üzerinden gönderim yapılamaz.' });
  }
  next();
};

module.exports = { rateLimit, failedAttemptLimiter, requireHttps };
