import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ExternalLink, Plus, Trash2, Edit3, Eye, EyeOff, Check, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const GoogleReviewsPanel = () => {
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState({
    placeName: 'Bluury Ajans',
    overallRating: 5.0,
    totalReviews: 48,
    googleMapsUrl: 'https://maps.google.com'
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    authorName: '',
    rating: 5,
    text: '',
    relativeTime: 'Yeni'
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const [reviewsRes, settingsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/google-reviews`),
        fetch(`${API_BASE_URL}/api/google-settings`)
      ]);
      const reviewsData = await reviewsRes.json();
      const settingsData = await settingsRes.json();

      if (reviewsRes.ok) setReviews(reviewsData);
      if (settingsRes.ok && settingsData) setSettings(settingsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
      ? `${API_BASE_URL}/api/google-reviews/${form.id}` 
      : `${API_BASE_URL}/api/google-reviews`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetchData();
        setShowModal(false);
        setIsEditing(false);
        setForm({ id: null, authorName: '', rating: 5, text: '', relativeTime: 'Yeni' });
      }
    } catch (err) {
      alert('İşlem başarısız');
    }
  };

  const handleToggleVisibility = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/google-reviews/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu Google yorumunu silmek istediğinize emin misiniz?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/google-reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Silinemedi');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/google-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setShowSettingsModal(false);
        alert('Google İşletme bilgileri güncellendi!');
      }
    } catch (err) {
      alert('Kaydedilemedi');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Stats Banner */}
      <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#C8A45A]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45A]">Google Business Entegrasyonu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading text-white">
              Google İşletme & Müşteri Yorumları
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              Google Haritalar ve İşletme profilinizdeki müşteri puanlarını, değerlendirmelerini görüntüleyin ve web sitesinde sergileyin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all"
            >
              ⚙️ Puan & Ayarlar
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setForm({ id: null, authorName: '', rating: 5, text: '', relativeTime: 'Yeni' });
                setShowModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#C8A45A] hover:bg-[#D4B76A] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(200,164,90,0.3)] transition-all active:scale-95"
            >
              <Plus size={16} /> Yeni Yorum Ekle
            </button>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-[#0D0E15] p-4 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C8A45A]/15 text-[#C8A45A] flex items-center justify-center font-bold text-xl">
              ★
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Google Ortalama Puanı</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-bold text-white">{settings.overallRating}</span>
                <div className="flex text-[#C8A45A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C8A45A" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0D0E15] p-4 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold text-xl">
              <MessageSquare size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Toplam Değerlendirme</p>
              <span className="text-2xl font-bold text-white">{settings.totalReviews} Yorum</span>
            </div>
          </div>

          <div className="bg-[#0D0E15] p-4 rounded-xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">İşletme Profili</p>
              <span className="text-sm font-bold text-white block mt-0.5">{settings.placeName}</span>
            </div>
            <a
              href={settings.googleMapsUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
              title="Haritada Gör"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Müşteri Yorumları</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C8A45A]/20 text-[#C8A45A] font-mono">
              {reviews.length}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id}
              className={`bg-[#12141C] border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                rev.isVisible 
                  ? 'border-white/10 hover:border-[#C8A45A]/50 shadow-lg' 
                  : 'border-white/5 opacity-50'
              }`}
            >
              <div>
                {/* User Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C8A45A] to-[#997930] text-black font-bold flex items-center justify-center text-sm shadow-md">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{rev.authorName}</h4>
                      <p className="text-[11px] text-gray-400">{rev.relativeTime || 'Google Kullanıcısı'}</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-white/5 text-gray-400">
                    #{idx + 1}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-[#C8A45A] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#C8A45A" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => handleToggleVisibility(rev.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    rev.isVisible
                      ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {rev.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span>{rev.isVisible ? 'Sitede Yayında' : 'Gizlendi'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setForm(rev);
                      setIsEditing(true);
                      setShowModal(true);
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors"
                    title="Düzenle"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-2 hover:bg-red-500/15 rounded-lg text-red-400 transition-colors"
                    title="Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Edit / Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14161F] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {isEditing ? 'Google Yorumunu Düzenle' : 'Yeni Google Yorumu Ekle'}
            </h3>
            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Müşteri Adı Soyadı</label>
                <input
                  type="text"
                  required
                  value={form.authorName}
                  onChange={e => setForm({ ...form, authorName: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  placeholder="Örn: Ayşe & Mehmet Kaya"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Puan (1-5)</label>
                  <select
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  >
                    <option value={5}>5 Yıldız ★★★★★</option>
                    <option value={4}>4 Yıldız ★★★★</option>
                    <option value={3}>3 Yıldız ★★★</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Zaman İbaresi</label>
                  <input
                    type="text"
                    value={form.relativeTime}
                    onChange={e => setForm({ ...form, relativeTime: e.target.value })}
                    className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                    placeholder="Örn: 2 hafta önce"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Yorum Metni</label>
                <textarea
                  required
                  rows={4}
                  value={form.text}
                  onChange={e => setForm({ ...form, text: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none resize-none"
                  placeholder="Müşterinin yaptığı yorum..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#C8A45A] hover:bg-[#D4B76A] text-black rounded-xl text-xs font-bold transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Google Business Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14161F] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Google İşletme Bilgileri
            </h3>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">İşletme Adı</label>
                <input
                  type="text"
                  value={settings.placeName}
                  onChange={e => setSettings({ ...settings, placeName: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Ortalama Puan (Örn: 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={settings.overallRating}
                    onChange={e => setSettings({ ...settings, overallRating: parseFloat(e.target.value) })}
                    className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Toplam Yorum Sayısı</label>
                  <input
                    type="number"
                    value={settings.totalReviews}
                    onChange={e => setSettings({ ...settings, totalReviews: parseInt(e.target.value) })}
                    className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Google Haritalar Profili URL</label>
                <input
                  type="url"
                  value={settings.googleMapsUrl || ''}
                  onChange={e => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#C8A45A] hover:bg-[#D4B76A] text-black rounded-xl text-xs font-bold transition-colors"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleReviewsPanel;
