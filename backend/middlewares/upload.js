const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Dosyaları önce bellekte tut (Sharp ile işlemek için)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max 50 MB (Videolar için)
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Desteklenmeyen dosya formatı. (Sadece JPG, PNG, WEBP, MP4, MOV)'), false);
    }
  }
});

const processMedia = async (req, res, next) => {
  if (!req.file) return next();

  const uploadPath = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const isVideo = req.file.mimetype.startsWith('video/');
  const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);

  if (isVideo) {
    // Videoları olduğu gibi kaydet (İleride FFmpeg eklenebilir ama şu an Multer yeterli)
    const ext = path.extname(req.file.originalname);
    const filename = `${uniquePrefix}${ext}`;
    const filePath = path.join(uploadPath, filename);
    
    fs.writeFileSync(filePath, req.file.buffer);
    req.file.processedFilename = filename;
    req.file.fileUrl = `/uploads/${filename}`;
    next();
  } else {
    // Görselleri Sharp ile WebP'ye çevir ve sıkıştır
    const filename = `${uniquePrefix}.webp`;
    const filePath = path.join(uploadPath, filename);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 1920, withoutEnlargement: true }) // Maksimum genişlik 1920px
        .webp({ quality: 82 }) // Sıkıştırma kalitesi %82
        .toFile(filePath);

      req.file.processedFilename = filename;
      req.file.fileUrl = `/uploads/${filename}`;
      next();
    } catch (error) {
      console.error('Sharp işleme hatası:', error);
      next(error);
    }
  }
};

module.exports = { upload, processMedia };
