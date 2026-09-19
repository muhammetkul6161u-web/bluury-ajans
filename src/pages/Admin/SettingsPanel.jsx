import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Share2, Phone } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    phone: '+90 530 000 00 00',
    email: 'info@bluuryajans.com',
    address: 'Trabzon, Türkiye',
    instagramUrl: 'https://www.instagram.com/blurry_ajans',
    whatsappNumber: '+905300000000',
    facebookUrl: '',
    twitterUrl: '',
    mapEmbedUrl: '',
    footerText: '© 2026 Bluury Ajans. Tüm Hakları Saklıdır.'
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`);
      const data = await res.json();
      if (res.ok && data) setSettings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        alert('Ayarlar kaydedilemedi.');
      }
    } catch (e) {
      alert('Hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-400">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings size={20} className="text-[#C8A45A]" />
            <h1 className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
              SİTE & İLETİŞİM AYARLARI
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            İletişim numaralarını, sosyal medya hesaplarını, harita konumunu ve bakım modunu buradan yönetin.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(200,164,90,0.3)] transition-all active:scale-95 disabled:opacity-50 self-start sm:self-auto"
        >
          <Save size={16} />
          <span>{isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm animate-fade-in">
          <CheckCircle2 size={20} />
          <span>Site ayarları başarıyla kaydedildi!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Bakım Modu Card */}
        <div className={`p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between gap-6 ${
          settings.maintenanceMode
            ? 'bg-amber-500/10 border-amber-500/40'
            : 'bg-[#12141C] border-white/10'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl ${settings.maintenanceMode ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400'}`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Bakım Modu (Maintenance Mode)</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Aktif edildiğinde normal ziyaretçilere "Yapım Aşamasında" ekranı gösterilir. Siz admin panelinde çalışmaya devam edebilirsiniz.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
            />
            <div className="w-14 h-7 bg-[#0D0E15] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-[#C8A45A]"></div>
          </label>
        </div>

        {/* 2 Sütunlu Form Alanı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* İletişim Bilgileri */}
          <div className="bg-[#12141C] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Phone size={18} className="text-[#C8A45A]" />
              <h3 className="font-bold text-white text-sm">İletişim & Randevu Kanalları</h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Telefon Numarası</label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={e => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">WhatsApp Numarası (Uluslararası Format)</label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                placeholder="+905..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">E-Posta Adresi</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={e => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Stüdyo / Ajans Adresi</label>
              <textarea
                rows={3}
                value={settings.address || ''}
                onChange={e => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none resize-none"
              />
            </div>
          </div>

          {/* Sosyal Medya & Harita */}
          <div className="bg-[#12141C] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Share2 size={18} className="text-[#C8A45A]" />
              <h3 className="font-bold text-white text-sm">Sosyal Medya & Harita Bağlantıları</h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Instagram Profili URL</label>
              <input
                type="url"
                value={settings.instagramUrl || ''}
                onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Facebook URL</label>
              <input
                type="url"
                value={settings.facebookUrl || ''}
                onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Twitter / X URL</label>
              <input
                type="url"
                value={settings.twitterUrl || ''}
                onChange={e => setSettings({ ...settings, twitterUrl: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Google Maps Embed Harita Linki</label>
              <input
                type="text"
                value={settings.mapEmbedUrl || ''}
                onChange={e => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
                className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
          </div>

          {/* Footer Telif Yazısı */}
          <div className="md:col-span-2 bg-[#12141C] border border-white/10 rounded-3xl p-6 space-y-2 shadow-xl">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Footer (Alt Bilgi) Telif Metni
            </label>
            <input
              type="text"
              value={settings.footerText || ''}
              onChange={e => setSettings({ ...settings, footerText: e.target.value })}
              className="w-full bg-[#0D0E15] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C8A45A] outline-none"
              placeholder="© 2026 Bluury Ajans. Tüm Hakları Saklıdır."
            />
          </div>

        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-4 bg-gradient-to-r from-[#C8A45A] to-[#B69145] hover:from-[#D4B76A] hover:to-[#C8A45A] text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center gap-2 shadow-[0_0_25px_rgba(200,164,90,0.3)] transition-all active:scale-95 disabled:opacity-50"
          >
            <Save size={18} />
            <span>{isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default SettingsPanel;
