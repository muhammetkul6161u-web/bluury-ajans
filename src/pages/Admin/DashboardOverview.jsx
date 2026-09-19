import React, { useState, useEffect } from 'react';
import { Camera, FileText, Mail, Video, TrendingUp, Star, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const DashboardOverview = ({ setActiveTab }) => {
  const [stats, setStats] = useState({
    portfolioCount: 0,
    serviceCount: 0,
    unreadMessages: 0,
    totalTestimonials: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${API_BASE_URL}/api/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (err) {
        console.error('Stats fetch error:', err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Portfolyo Çekimleri', value: stats.portfolioCount || 14, icon: Camera, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', tab: 'portfolio' },
    { title: 'Aktif Hizmetler', value: stats.serviceCount || 3, icon: FileText, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', tab: 'services' },
    { title: 'Okunmamış Mesajlar', value: stats.unreadMessages, icon: Mail, color: 'text-rose-400 bg-rose-400/10 border-rose-400/20', tab: 'messages' },
    { title: 'Video Referanslar', value: stats.totalTestimonials || 3, icon: Video, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', tab: 'testimonials' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#12141C] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A45A]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45A]">Sistem Durumu: Çevrimiçi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading text-white">
              Bluury Ajans Yönetim Paneline Hoş Geldiniz
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Web sitenizin tüm fotoğraflarını, sinematik videolarını, Google işletme yorumlarını ve müşteri mesajlarını tek noktadan kontrol edin.
            </p>
          </div>

          <a
            href="http://localhost:3000/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all self-start"
          >
            <ExternalLink size={14} /> Canlı Siteyi Aç
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab && setActiveTab(card.tab)}
              className="bg-[#12141C] p-6 rounded-2xl border border-white/10 flex items-center justify-between hover:border-[#C8A45A]/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl border ${card.color} transition-transform group-hover:scale-110`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">{card.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-0.5">{card.value}</h3>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-gray-600 group-hover:text-[#C8A45A] transition-colors" />
            </div>
          );
        })}
      </div>

      {/* Quick Visual Shortcuts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Shortcut: Hero */}
        <div
          onClick={() => setActiveTab && setActiveTab('hero')}
          className="bg-[#12141C] border border-white/10 rounded-2xl p-6 hover:border-[#C8A45A]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#C8A45A] uppercase tracking-wider">Ana Sayfa</span>
            <Sparkles size={16} className="text-[#C8A45A]" />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-[#C8A45A] transition-colors">
            Hero Karşılama Ekranı
          </h4>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Sitenin ilk açılışındaki video döngüsünü, ana başlığı ve randevu butonunu görsel önizlemeyle değiştirin.
          </p>
        </div>

        {/* Shortcut: Google Reviews */}
        <div
          onClick={() => setActiveTab && setActiveTab('google')}
          className="bg-[#12141C] border border-white/10 rounded-2xl p-6 hover:border-[#C8A45A]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#C8A45A] uppercase tracking-wider">İtibar Yönetimi</span>
            <Star size={16} className="text-[#C8A45A]" fill="#C8A45A" />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-[#C8A45A] transition-colors">
            Google Yorumları (5.0 ★)
          </h4>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Google İşletme profilinizdeki müşteri değerlendirmelerini, puanları görüntüleyin ve sitede sergileyin.
          </p>
        </div>

        {/* Shortcut: Portfolio */}
        <div
          onClick={() => setActiveTab && setActiveTab('portfolio')}
          className="bg-[#12141C] border border-white/10 rounded-2xl p-6 hover:border-[#C8A45A]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#C8A45A] uppercase tracking-wider">Medya Galerisi</span>
            <Camera size={16} className="text-[#C8A45A]" />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-[#C8A45A] transition-colors">
            Galeri & Fotoğraflar
          </h4>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Düğün, Dış Çekim ve Moda kategorilerindeki tüm görselleri canlı görün, tek tıkla yenisini ekleyin.
          </p>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
