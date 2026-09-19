import React, { useState, useEffect } from 'react';
import VisualUploader from './VisualUploader';
import { Video, Plus, Trash2, Edit3, X, Sparkles, Play } from 'lucide-react';
import { API_BASE_URL, getMediaUrl } from '@/config/api';

const TestimonialsPanel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    id: null,
    clientName: '',
    comment: '',
    mediaUrl: '',
    embedUrl: ''
  });

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/testimonials`);
      const data = await res.json();
      if (res.ok) {
        if (data.length === 0) {
          // Auto-seed existing 3 live review videos so client sees them immediately
          const initialReviews = [
            {
              clientName: "sayinsumeyyes",
              comment: "Film gibi olmuş, harika bir çekim deneyimi yaşadık!",
              mediaUrl: "/Referans/referans1.mp4"
            },
            {
              clientName: "seyma.eeroll",
              comment: "Çok güzel, beklentilerimizin çok ötesinde bir sonuç oldu.",
              mediaUrl: "/Referans/referans2.mp4"
            },
            {
              clientName: "_sevvalaktass",
              comment: "Hayallerimden daha güzel bir çekim oldu, çok teşekkürler!",
              mediaUrl: "/Referans/referans3.mp4"
            }
          ];
          const token = localStorage.getItem('adminToken');
          for (const item of initialReviews) {
            await fetch(`${API_BASE_URL}/api/testimonials`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify(item)
            });
          }
          const fresh = await fetch(`${API_BASE_URL}/api/testimonials`);
          const freshData = await fresh.json();
          setItems(freshData);
        } else {
          setItems(data);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.mediaUrl && !form.embedUrl) {
      alert("Lütfen bir video dosyası yükleyin veya Embed/Iframe linki girin.");
      return;
    }

    const token = localStorage.getItem('adminToken');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API_BASE_URL}/api/testimonials/${form.id}`
      : `${API_BASE_URL}/api/testimonials`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetchItems();
        setShowModal(false);
        resetForm();
      }
    } catch (e) {
      alert('Kaydedilemedi');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu referans videosunu silmek istediğinize emin misiniz?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch (e) {
      alert('Silinemedi');
    }
  };

  const resetForm = () => {
    setForm({ id: null, clientName: '', comment: '', mediaUrl: '', embedUrl: '' });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Video size={20} className="text-[#C8A45A]" />
            <h1 className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
              REFERANSLAR (VİDEO YÖNETİMİ)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            {items.length} Müşteri Referansı · Sitedeki vizör video oynatıcıda gösterilen kısa video kurguları.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(200,164,90,0.35)] transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} /> + YENİ VİDEO REFERANS
        </button>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          const fullMedia = getMediaUrl(item.mediaUrl);

          return (
            <div
              key={item.id}
              className="bg-[#12141C] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-[#C8A45A]/50 transition-all duration-300 flex flex-col group"
            >
              {/* Video Player Box */}
              <div className="relative aspect-[4/5] bg-black overflow-hidden flex items-center justify-center">
                {item.embedUrl ? (
                  <iframe
                    src={item.embedUrl}
                    className="w-full h-full object-cover"
                    frameBorder="0"
                    allowFullScreen
                    title={item.clientName}
                  />
                ) : (
                  <video
                    src={fullMedia}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    controls
                    muted
                    playsInline
                  />
                )}

                {/* Number Badge */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white/90 text-xs font-mono font-bold border border-white/10">
                  #{idx + 1}
                </span>
              </div>

              {/* Card Meta & Bottom Controls */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-[#0E1017]">
                <div>
                  <div className="flex items-center gap-1.5 text-[#C8A45A] font-bold text-sm">
                    <span>@{item.clientName}</span>
                  </div>
                  <p className="text-xs text-gray-300 font-light mt-2 italic line-clamp-3">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setForm(item);
                      setIsEditing(true);
                      setShowModal(true);
                    }}
                    className="flex-1 py-2 px-3 bg-white/5 hover:bg-[#C8A45A] text-white hover:text-black rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Edit3 size={14} /> Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-colors"
                    title="Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14161F] border border-white/10 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? 'Referansı Düzenle' : 'Yeni Video Referans Ekle'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  MÜŞTERİ ADI / KULLANICI ADI (INSTAGRAM)
                </label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={e => setForm({ ...form, clientName: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  placeholder="Örn: sayinsumeyyes"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  MÜŞTERİ YORUMU
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none resize-none"
                  placeholder="Örn: Film gibi olmuş, harika bir çekim deneyimi yaşadık!"
                />
              </div>

              {/* Video Uploader */}
              <VisualUploader
                label="VİDEO DOSYASI YÜKLE (MP4/MOV)"
                currentUrl={form.mediaUrl}
                mediaType="video"
                onUploadSuccess={(url) => setForm({ ...form, mediaUrl: url })}
                onRemove={() => setForm({ ...form, mediaUrl: '' })}
              />

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  VEYA EMBED / IFRAME URL (YOUTUBE / REELS / VIMEO)
                </label>
                <input
                  type="text"
                  value={form.embedUrl || ''}
                  onChange={e => setForm({ ...form, embedUrl: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  placeholder="https://www.youtube.com/embed/..."
                />
                <p className="text-[11px] text-gray-500 mt-1 pl-1">
                  Embed linki girilirse sunucu disk alanı harcanmaz.
                </p>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(200,164,90,0.3)]"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPanel;
