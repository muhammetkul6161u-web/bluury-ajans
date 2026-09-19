import React, { useState, useEffect } from 'react';
import VisualUploader from './VisualUploader';
import { Image as ImageIcon, Trash2, RefreshCw, Plus, Eye, Sparkles } from 'lucide-react';
import { API_BASE_URL, getMediaUrl } from '@/config/api';

const CATEGORIES = [
  { id: 'Dugun', label: 'Düğün Fotoğrafları' },
  { id: 'Dis', label: 'Dış Çekim & Klip' },
  { id: 'Reklam', label: 'Moda & Katalog' }
];

const PortfolioPanel = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('Dugun');
  const [loading, setLoading] = useState(true);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio`);
      const data = await res.json();
      if (res.ok) {
        if (data.length === 0) {
          // Auto-seed existing site images so client can see them immediately!
          const initialPortfolio = [
            { category: 'Dugun', mediaUrl: '/Portfoy/Dugun/dugun1.webp', title: 'Düğün Hikayesi 1' },
            { category: 'Dugun', mediaUrl: '/Portfoy/Dugun/dugun2.webp', title: 'Düğün Hikayesi 2' },
            { category: 'Dugun', mediaUrl: '/Portfoy/Dugun/dugun3.webp', title: 'Düğün Hikayesi 3' },
            { category: 'Dugun', mediaUrl: '/Portfoy/Dugun/dugun4.webp', title: 'Düğün Hikayesi 4' },
            { category: 'Dugun', mediaUrl: '/Portfoy/Dugun/dugun5.webp', title: 'Düğün Hikayesi 5' },
            { category: 'Dis', mediaUrl: '/Portfoy/Dış/dış1.webp', title: 'Dış Çekim 1' },
            { category: 'Dis', mediaUrl: '/Portfoy/Dış/dış2.webp', title: 'Dış Çekim 2' },
            { category: 'Dis', mediaUrl: '/Portfoy/Dış/dış3.webp', title: 'Dış Çekim 3' },
            { category: 'Dis', mediaUrl: '/Portfoy/Dış/dış4.webp', title: 'Dış Çekim 4' },
            { category: 'Dis', mediaUrl: '/Portfoy/Dış/dış5.webp', title: 'Dış Çekim 5' },
            { category: 'Reklam', mediaUrl: '/katolog/katolog1.webp', title: 'Katalog Moda 1' },
            { category: 'Reklam', mediaUrl: '/katolog/katolog2.webp', title: 'Katalog Moda 2' },
            { category: 'Reklam', mediaUrl: '/katolog/katolog3.webp', title: 'Katalog Moda 3' },
            { category: 'Reklam', mediaUrl: '/katolog/katolog4.webp', title: 'Katalog Moda 4' },
          ];
          const token = localStorage.getItem('adminToken');
          for (const item of initialPortfolio) {
            await fetch(`${API_BASE_URL}/api/portfolio`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify(item)
            });
          }
          const fresh = await fetch(`${API_BASE_URL}/api/portfolio`);
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

  const handleAdd = async (mediaUrl) => {
    if (!mediaUrl) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ category, mediaUrl, title: `${category} Çekimi` })
      });
      if (res.ok) fetchItems();
    } catch (e) {
      alert('Fotoğraf eklenirken hata oluştu');
    }
  };

  const handleReplace = async (id, newUrl) => {
    if (!newUrl) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ mediaUrl: newUrl })
      });
      if (res.ok) fetchItems();
    } catch (e) {
      alert('Fotoğraf değiştirilemedi');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu görseli portfolyodan silmek istediğinize emin misiniz?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch (e) {
      alert('Silinemedi');
    }
  };

  const filteredItems = items.filter(i => i.category === category);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon size={20} className="text-[#C8A45A]" />
            <h1 className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
              GALERİ & PORTFOLYO YÖNETİMİ
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Sitede sergilenen tüm çekimleri buradan canlı önizleyin, doğrudan değiştirin veya silin.
          </p>
        </div>
      </div>

      {/* Category Tabs with Item Badges */}
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map(cat => {
          const count = items.filter(i => i.category === cat.id).length;
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#C8A45A] text-black shadow-[0_0_20px_rgba(200,164,90,0.3)]'
                  : 'bg-[#14161F] text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Upload Box for Currently Selected Category */}
      <div className="bg-[#12141C] border border-white/10 rounded-3xl p-6">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Plus size={16} className="text-[#C8A45A]" />
          <span>Bu Kategoriye Yeni Görsel / Video Ekle</span>
        </h3>
        <VisualUploader
          label=""
          currentUrl={null}
          onUploadSuccess={handleAdd}
        />
      </div>

      {/* Grid of Current Images with Direct Visual Previews */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-300">
            Mevcut {CATEGORIES.find(c => c.id === category)?.label} ({filteredItems.length} Görsel)
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const fullUrl = getMediaUrl(item.mediaUrl);
            const isVideo = item.mediaUrl.endsWith('.mp4') || item.mediaUrl.endsWith('.mov');

            return (
              <div
                key={item.id}
                className="group relative bg-[#12141C] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-[#C8A45A]/60 transition-all duration-300 flex flex-col"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/5] bg-black/60 overflow-hidden">
                  {isVideo ? (
                    <video
                      src={fullUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={fullUrl}
                      alt={item.title || 'Portfolyo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/10">
                    #{idx + 1}
                  </span>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setSelectedPreview(fullUrl)}
                      className="p-3 bg-black/70 hover:bg-[#C8A45A] text-white hover:text-black rounded-xl transition-all shadow-lg"
                      title="Büyüt"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg"
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Bottom Card Bar: Replace Action */}
                <div className="p-3 bg-[#0E1017] border-t border-white/5 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-gray-400 truncate max-w-[120px]">
                    {item.mediaUrl.split('/').pop()}
                  </span>

                  <label className="text-[11px] text-[#C8A45A] hover:underline font-bold cursor-pointer flex items-center gap-1">
                    <RefreshCw size={11} />
                    <span>Değiştir</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append('media', file);
                        const token = localStorage.getItem('adminToken');
                        const res = await fetch(`${API_BASE_URL}/api/upload`, {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${token}` },
                          body: formData
                        });
                        const data = await res.json();
                        if (res.ok) handleReplace(item.id, data.url);
                      }}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPreview(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20">
            <img src={selectedPreview} alt="Büyük Görsel" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPanel;
