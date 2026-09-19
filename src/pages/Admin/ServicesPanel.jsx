import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import VisualUploader from './VisualUploader';
import { Plus, Edit2, Trash2, Eye, EyeOff, Wrench, X, Save, Sparkles } from 'lucide-react';
import { API_BASE_URL, getMediaUrl } from '@/config/api';

const ServicesPanel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [form, setForm] = useState({
    id: null,
    title: '',
    shortDesc: '',
    description: '',
    mediaUrl: '',
    orderIndex: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services`);
      const data = await res.json();
      if (res.ok) {
        if (data.length === 0) {
          // Default initial services for Bluury Ajans if empty
          const defaults = [
            {
              title: "Düğün & Dış Çekim",
              shortDesc: "En özel gününüzü sinematik ve zamansız karelerle taçlandırıyoruz.",
              description: "<p>Düğün hikayesi, dış çekim, save the date ve klip prodüksiyonlarıyla anılarınızı kusursuz şekilde kaydediyoruz.</p>",
              mediaUrl: "/Portfoy/Dugun/dugun1.webp"
            },
            {
              title: "Moda & Katalog Çekimi",
              shortDesc: "Markanızın yeni koleksiyonunu yüksek prodüksiyon kalitesiyle yansıtın.",
              description: "<p>Tekstil, aksesuar ve lookbook çekimlerinde profesyonel ışık, stüdyo ve model yönetimi.</p>",
              mediaUrl: "/katolog/katolog1.webp"
            },
            {
              title: "Etkinlik & Klip Prodüksiyonu",
              shortDesc: "Dinamik kurgu, 4K sinematik kameralar ve profesyonel ses/ışık.",
              description: "<p>Lansman, gala, konser ve özel davetleriniz için anında kurgu ve sosyal medya uyumlu video içerikleri.</p>",
              mediaUrl: "/Portfoy/Dış/dış1.webp"
            }
          ];
          // Seed to backend
          const token = localStorage.getItem('adminToken');
          for (const item of defaults) {
            await fetch(`${API_BASE_URL}/api/services`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify(item)
            });
          }
          const refreshed = await fetch(`${API_BASE_URL}/api/services`);
          const refData = await refreshed.json();
          setItems(refData);
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
    if (!form.mediaUrl) {
      alert("Lütfen bir kapak görseli veya videosu yükleyin.");
      return;
    }

    setIsSaving(true);
    const token = localStorage.getItem('adminToken');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
      ? `${API_BASE_URL}/api/services/${form.id}` 
      : `${API_BASE_URL}/api/services`;

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
      } else {
        alert('Kaydedilirken hata oluştu.');
      }
    } catch (e) {
      alert('Sunucu hatası: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch (e) {
      alert('Hata oluştu');
    }
  };

  const handleOpenEdit = (item) => {
    setForm(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({ id: null, title: '', shortDesc: '', description: '', mediaUrl: '', orderIndex: 0 });
    setIsEditing(false);
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
    <div className="space-y-8">
      {/* Top Action Header Bar (like in S'Print Admin) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench size={20} className="text-[#C8A45A]" />
            <h1 className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
              HİZMETLERİ YÖNET
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            {items.length} Hizmet · Düzenlemek veya fotoğrafını değiştirmek için karta tıklayın
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(200,164,90,0.35)] transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} /> + YENİ HİZMET
        </button>
      </div>

      {/* Services Grid (S'Print style 3-column cards with top image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          const fullMedia = getMediaUrl(item.mediaUrl);
          const isVideo = item.mediaUrl?.endsWith('.mp4') || item.mediaUrl?.endsWith('.mov');

          return (
            <div
              key={item.id}
              className="bg-[#12141C] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-[#C8A45A]/50 transition-all duration-300 flex flex-col group"
            >
              {/* Card Photo/Video Banner with #Number Badge */}
              <div className="relative w-full aspect-[16/10] bg-black/60 overflow-hidden">
                {isVideo ? (
                  <video
                    src={fullMedia}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={fullMedia}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-black/30" />

                {/* Index Badge */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white/90 text-xs font-mono font-bold border border-white/10">
                  #{idx + 1}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#C8A45A] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  
                  {item.shortDesc && (
                    <p className="text-xs font-semibold text-[#C8A45A] mt-1 line-clamp-1">
                      {item.shortDesc}
                    </p>
                  )}

                  <div 
                    className="text-xs text-gray-400 mt-3 line-clamp-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.description || '' }}
                  />
                </div>

                {/* Bottom Actions matching Screenshot 4 */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="flex-1 py-2.5 px-4 bg-white/5 hover:bg-[#C8A45A] text-white hover:text-black rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Edit2 size={14} /> Düzenle
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2.5 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-colors"
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

      {/* Modal for Add / Edit Service */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14161F] border border-white/10 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl my-8 relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  HİZMET BAŞLIĞI
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  placeholder="Örn: Profesyonel Ürün Çekimi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  KISA VURGU / ALT METİN
                </label>
                <input
                  type="text"
                  value={form.shortDesc || ''}
                  onChange={e => setForm({ ...form, shortDesc: e.target.value })}
                  className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                  placeholder="Örn: İlk izlenim markanızın geleceğidir"
                />
              </div>

              {/* Visual Uploader with current preview */}
              <VisualUploader
                label="HİZMET GÖRSELİ VEYA VİDEOSU (ÖNİZLEME)"
                currentUrl={form.mediaUrl}
                onUploadSuccess={(url) => setForm({ ...form, mediaUrl: url })}
                onRemove={() => setForm({ ...form, mediaUrl: '' })}
              />

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  DETAYLI İÇERİK (ZENGİN METİN)
                </label>
                <div className="bg-[#0D0E15] rounded-xl overflow-hidden border border-white/10">
                  <ReactQuill
                    theme="snow"
                    value={form.description}
                    onChange={(val) => setForm({ ...form, description: val })}
                    modules={quillModules}
                    className="text-white h-44 mb-12"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(200,164,90,0.3)] disabled:opacity-50"
                >
                  {isSaving ? 'Kaydediliyor...' : 'Hizmeti Kaydet'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPanel;
