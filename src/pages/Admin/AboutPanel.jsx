import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import VisualUploader from './VisualUploader';
import { Sparkles, Save, CheckCircle2, Film, BookOpen, Layers } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const AboutPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Hakkımızda Ana Verileri (Hikaye & İçerik)
  const [aboutData, setAboutData] = useState({
    title: "Hakkımızda — Hikâyemiz",
    content: `<p>Blurry Ajans, Trabzon'un kalbinde doğan bir fotoğrafçılık tutkusunun hikâyesidir. Bir kamera ve sonsuz bir hayal gücüyle başlayan yolculuğumuz, bugün profesyonel ekibimiz ve modern stüdyomuzla devam ediyor.</p><p>Her projemizde müşterilerimizin vizyonunu anlıyor, onların hikâyelerini en etkileyici şekilde karelere yansıtıyoruz. Düğün çekimlerinden moda projelerine, ürün fotoğraflarından kurumsal çalışmalara kadar geniş bir yelpazede hizmet veriyoruz.</p><p>Amacımız sadece fotoğraf çekmek değil — anıları ölümsüzleştirmek, duyguları yakalamak ve markaların görsel kimliğini güçlendirmek. Çünkü biz inanıyoruz ki, her kare bir hikâye anlatır.</p>`,
    mission: "Yaratıcı vizyonumuzla markanızın ve en özel anlarınızın hikayesini büyüleyici bir estetikle anlatmak.",
    vision: "Doğu Karadeniz ve Türkiye genelinde fotoğraf & video prodüksiyonunda lüks ve güvenin simgesi olmak."
  });

  // Hakkımızda Video/Fotoğraf Slaytları (About.jsx içindeki 3 video)
  const [slides, setSlides] = useState([
    {
      id: 1,
      video: "/about/doğa.mp4",
      title: "Doğanın Büyülü Ruhu",
      description: "Trabzon'un eşsiz doğasında, yeşilin her tonunu ve ışığın büyüsünü yakalıyoruz. Doğa çekimlerimizle anılarınızı zamansız karelere dönüştürüyoruz."
    },
    {
      id: 2,
      video: "/about/reklamvideo.mp4",
      title: "Markanızın Görsel Gücü",
      description: "Profesyonel reklam çekimleriyle markanızı öne çıkarıyoruz. Yaratıcı konseptler ve sinematik prodüksiyon ile satışlarınıza değer katıyoruz."
    },
    {
      id: 3,
      video: "/about/eğlence.mp4",
      title: "Enerjinin Ritmi",
      description: "Klüp, festival ve eğlence mekanlarınızın atmosferini dinamik video çekimleriyle ölümsüzleştiriyoruz. Enerjinizi hissettiren görseller üretiyoruz."
    }
  ]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/about`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setAboutData({
            title: data.title || aboutData.title,
            content: data.content || aboutData.content,
            mission: data.mission || aboutData.mission,
            vision: data.vision || aboutData.vision
          });
          if (data.slides) {
            try {
              const parsed = JSON.parse(data.slides);
              if (Array.isArray(parsed) && parsed.length > 0) setSlides(parsed);
            } catch (e) {}
          }
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSlideChange = (index, field, value) => {
    const updated = [...slides];
    updated[index][field] = value;
    setSlides(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    const token = localStorage.getItem('adminToken');

    try {
      const payload = {
        ...aboutData,
        slides: JSON.stringify(slides)
      };

      const res = await fetch(`${API_BASE_URL}/api/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        alert('Hakkımızda verileri kaydedilemedi.');
      }
    } catch (err) {
      alert('Sunucu hatası: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={20} className="text-[#C8A45A]" />
            <h1 className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
              HAKKIMIZDA SAYFASI DÜZENLE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Hakkımızda sayfasındaki döner video slaytlarını, ajans hikayenizi ve vizyon metinlerinizi canlı olarak görün ve yönetin.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(200,164,90,0.3)] transition-all active:scale-95 disabled:opacity-50 self-start sm:self-auto"
        >
          <Save size={16} />
          <span>{isSaving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm animate-fade-in">
          <CheckCircle2 size={20} />
          <span>Hakkımızda sayfası ve tüm medya slaytları başarıyla güncellendi!</span>
        </div>
      )}

      {/* 🎬 1. BÖLÜM: HAKKIMIZDA VİDEO SLAYTLARI (Sayfada Dönen 3 Video) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Film size={18} className="text-[#C8A45A]" />
          <h2 className="text-lg font-bold text-white">
            1. Sayfa Başı Sinematik Video Slaytları (3 Adet)
          </h2>
        </div>
        <p className="text-xs text-gray-400 -mt-3">
          Ziyaretçiler Hakkımızda sayfasına girdiğinde arkada otomatik dönen sinematik videolar ve üzerindeki metinler.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="bg-[#12141C] border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-xl space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#C8A45A] uppercase tracking-wider">
                    Slayt #{idx + 1}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">Video Döngüsü</span>
                </div>

                {/* Visual Video Uploader with Direct Preview */}
                <VisualUploader
                  label="VİDEO / GÖRSEL"
                  currentUrl={slide.video}
                  mediaType="video"
                  onUploadSuccess={(url) => handleSlideChange(idx, 'video', url)}
                  onRemove={() => handleSlideChange(idx, 'video', '')}
                />

                <div className="space-y-3 mt-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      BAŞLIK
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={e => handleSlideChange(idx, 'title', e.target.value)}
                      className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs font-semibold focus:border-[#C8A45A] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      AÇIKLAMA METNİ
                    </label>
                    <textarea
                      rows={3}
                      value={slide.description}
                      onChange={e => handleSlideChange(idx, 'description', e.target.value)}
                      className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs leading-relaxed focus:border-[#C8A45A] outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📖 2. BÖLÜM: HİKÂYEMİZ (ZENGİN METİN) */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <BookOpen size={18} className="text-[#C8A45A]" />
          <h2 className="text-lg font-bold text-white">
            2. Ajans Hikâyemiz Metni
          </h2>
        </div>

        <div className="bg-[#12141C] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              BÖLÜM BAŞLIĞI
            </label>
            <input
              type="text"
              value={aboutData.title}
              onChange={e => setAboutData({ ...aboutData, title: e.target.value })}
              className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              HİKAYE İÇERİĞİ (ZENGİN METİN)
            </label>
            <div className="bg-[#0D0E15] rounded-xl overflow-hidden border border-white/10">
              <ReactQuill
                theme="snow"
                value={aboutData.content}
                onChange={(val) => setAboutData({ ...aboutData, content: val })}
                modules={quillModules}
                className="text-white h-48 mb-12"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 3. BÖLÜM: VİZYON VE MİSYON */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Layers size={18} className="text-[#C8A45A]" />
          <h2 className="text-lg font-bold text-white">
            3. Vizyon & Misyon
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#12141C] border border-white/10 rounded-3xl p-6 space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              MİSYONUMUZ
            </label>
            <textarea
              rows={4}
              value={aboutData.mission}
              onChange={e => setAboutData({ ...aboutData, mission: e.target.value })}
              className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3.5 text-white text-xs leading-relaxed focus:border-[#C8A45A] outline-none resize-none"
            />
          </div>

          <div className="bg-[#12141C] border border-white/10 rounded-3xl p-6 space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              VİZYONUMUZ
            </label>
            <textarea
              rows={4}
              value={aboutData.vision}
              onChange={e => setAboutData({ ...aboutData, vision: e.target.value })}
              className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3.5 text-white text-xs leading-relaxed focus:border-[#C8A45A] outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t border-white/10 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-4 bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center gap-2 shadow-[0_0_25px_rgba(200,164,90,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          <Save size={18} />
          <span>{isSaving ? 'Kaydediliyor...' : 'Tüm Değişiklikleri Kaydet'}</span>
        </button>
      </div>

    </div>
  );
};

export default AboutPanel;
