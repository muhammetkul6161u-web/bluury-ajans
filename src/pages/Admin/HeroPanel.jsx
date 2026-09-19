import React, { useState, useEffect } from 'react';
import VisualUploader from './VisualUploader';
import { Save, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const HeroPanel = () => {
  const [heroData, setHeroData] = useState({
    title: 'Anıların Işığında <br /> Profesyonel Çekimler',
    subtitle: 'Her karede duyguyu, hikâyeyi ve zamanı yakalıyoruz. Moda, etkinlik, ürün ve portre çekimlerinde estetik bakış açısıyla markanıza değer katarız.',
    buttonText: 'ÇEKİM PLANLA',
    buttonLink: '/iletisim',
    mediaUrl: '/ana sayfa/gözdevideo.mp4',
    mediaType: 'video',
    isEmbed: false
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hero`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setHeroData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            buttonText: data.buttonText || 'ÇEKİM PLANLA',
            buttonLink: data.buttonLink || '/iletisim',
            mediaUrl: data.mediaUrl || '/ana sayfa/gözdevideo.mp4',
            mediaType: data.mediaType || 'video',
            isEmbed: data.isEmbed || false
          });
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(`${API_BASE_URL}/api/hero`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(heroData)
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        alert('Kaydedilirken hata oluştu.');
      }
    } catch (err) {
      alert('Sunucu hatası: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-[#C8A45A]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45A]">Ana Sayfa Bölümü</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading text-white">Hero (Start) Düzenle</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Ziyaretçilerin web sitesine girdiklerinde ilk gördükleri video/fotoğraf ve karşılama metinleri.
          </p>
        </div>

        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors self-start"
        >
          <ExternalLink size={14} /> Canlı Sitede Gör
        </a>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm animate-fade-in">
          <CheckCircle2 size={20} />
          <span>Değişiklikler başarıyla kaydedildi ve canlı sitede güncellendi!</span>
        </div>
      )}

      {/* Main Form - S'Print Admin Style */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* HAUPTTITEL / ANA BAŞLIK */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            HAUPTTITEL (ANA BAŞLIK)
          </label>
          <input
            type="text"
            required
            value={heroData.title}
            onChange={e => setHeroData({ ...heroData, title: e.target.value })}
            className="w-full bg-[#12141C] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-semibold focus:border-[#C8A45A] focus:ring-1 focus:ring-[#C8A45A] outline-none transition-all"
            placeholder="Örn: Anıların Işığında <br /> Profesyonel Çekimler"
          />
          <p className="text-[11px] text-gray-500 pl-1">
            Metni alt satıra geçirmek için dilediğiniz yere <code className="text-[#C8A45A]">&lt;br /&gt;</code> ekleyebilirsiniz.
          </p>
        </div>

        {/* UNTERTITEL / BESCHREIBUNG (ALT BAŞLIK / AÇIKLAMA) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            UNTERTITEL / BESCHREIBUNG (ALT BAŞLIK / AÇIKLAMA)
          </label>
          <textarea
            rows={4}
            required
            value={heroData.subtitle}
            onChange={e => setHeroData({ ...heroData, subtitle: e.target.value })}
            className="w-full bg-[#12141C] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm leading-relaxed focus:border-[#C8A45A] focus:ring-1 focus:ring-[#C8A45A] outline-none transition-all resize-none"
            placeholder="Ana sayfa giriş açıklaması..."
          />
        </div>

        {/* BUTTON-TEXT & BUTTON-LINK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              BUTTON-TEXT (BUTON METNİ)
            </label>
            <input
              type="text"
              value={heroData.buttonText}
              onChange={e => setHeroData({ ...heroData, buttonText: e.target.value })}
              className="w-full bg-[#12141C] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-[#C8A45A] outline-none transition-all"
              placeholder="Örn: ÇEKİM PLANLA"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              BUTTON-LINK (BUTON YÖNLENDİRME)
            </label>
            <input
              type="text"
              value={heroData.buttonLink}
              onChange={e => setHeroData({ ...heroData, buttonLink: e.target.value })}
              className="w-full bg-[#12141C] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-[#C8A45A] outline-none transition-all"
              placeholder="Örn: /iletisim veya https://..."
            />
          </div>
        </div>

        {/* HINTERGRUNDBILD / VIDEO (DRAG & DROP VEYA TIKLA SEÇ) */}
        <VisualUploader
          label="HINTERGRUNDBILD / VIDEO (DRAG & DROP VEYA TIKLA SEÇ)"
          currentUrl={heroData.mediaUrl}
          mediaType={heroData.mediaType}
          onTypeChange={(type) => setHeroData({ ...heroData, mediaType: type })}
          onUploadSuccess={(url) => setHeroData({ ...heroData, mediaUrl: url })}
          onRemove={() => setHeroData({ ...heroData, mediaUrl: '' })}
        />

        {/* Submit Action */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(200,164,90,0.3)] transition-all active:scale-95 disabled:opacity-50"
          >
            <Save size={18} />
            <span>{isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default HeroPanel;
