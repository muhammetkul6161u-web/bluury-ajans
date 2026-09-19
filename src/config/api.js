// API ve Medya Base URL Yapılandırması
// Local geliştirme ortamında http://localhost:5000, 
// VPS / Canlı sunucuda ise Nginx reverse-proxy üzerinden boş string ('') veya ilgili domain kullanılır.

export const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined 
  ? import.meta.env.VITE_API_URL 
  : (import.meta.env.PROD ? '' : 'http://localhost:5000');

export const getMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  
  if (import.meta.env.PROD) {
    return cleanUrl; // Nginx /uploads ve statik dosyaları doğrudan karşılar
  }
  
  return `http://localhost:5000${cleanUrl}`;
};
