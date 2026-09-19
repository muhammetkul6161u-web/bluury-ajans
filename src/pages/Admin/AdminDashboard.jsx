import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Image as ImageIcon, 
  Settings, 
  Video, 
  Wrench, 
  Menu, 
  X, 
  LayoutDashboard, 
  Mail, 
  BookOpen, 
  Sparkles, 
  Star, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

import DashboardOverview from './DashboardOverview';
import HeroPanel from './HeroPanel';
import ServicesPanel from './ServicesPanel';
import PortfolioPanel from './PortfolioPanel';
import AboutPanel from './AboutPanel';
import TestimonialsPanel from './TestimonialsPanel';
import MessagesPanel from './MessagesPanel';
import GoogleReviewsPanel from './GoogleReviewsPanel';
import SettingsPanel from './SettingsPanel';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const navGroups = [
    {
      groupTitle: 'SAYFALAR',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'hero', label: 'Hero (Start)', icon: Sparkles },
        { id: 'services', label: 'Hizmetler', icon: Wrench },
        { id: 'portfolio', label: 'Galeri / Portfolyo', icon: ImageIcon },
        { id: 'about', label: 'Hakkımızda', icon: BookOpen },
        { id: 'testimonials', label: 'Referanslar', icon: Video },
      ]
    },
    {
      groupTitle: 'MESAJLAR & DEĞERLENDİRMELER',
      items: [
        { id: 'messages', label: 'Gelen Kutusu', icon: Mail },
        { id: 'google', label: 'Google Yorumları', icon: Star },
      ]
    },
    {
      groupTitle: 'AYARLAR',
      items: [
        { id: 'settings', label: 'Site Ayarları', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B10] text-gray-200 flex font-sans antialiased selection:bg-[#C8A45A] selection:text-black">
      
      {/* 🌌 Left Sidebar (Sprint Graphic Admin Layout) */}
      <aside className={`fixed inset-y-0 left-0 bg-[#0E1017] w-64 text-white z-50 transform ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 flex flex-col border-r border-white/5`}>
        
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C8A45A] via-[#E2C785] to-[#997930] flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(200,164,90,0.3)]">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-heading tracking-wide text-white flex items-center gap-1.5 font-bold">
                BLUURY <span className="text-[#C8A45A] font-light">ADMIN</span>
              </h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                FOTOĞRAF & VİDEO
              </p>
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Grouped Navigation Links */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 block">
                {group.groupTitle}
              </span>
              
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-xs font-semibold ${
                      isActive
                        ? 'bg-[#C8A45A] text-black shadow-[0_0_20px_rgba(200,164,90,0.3)] font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-black' : 'text-gray-400'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-xs font-bold border border-red-500/20"
          >
            <LogOut size={16} />
            <span>Çıkış Yap</span>
          </button>
        </div>

      </aside>

      {/* 🚀 Main Work Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Navbar matching Screenshot 4 */}
        <header className="bg-[#0E1017]/90 backdrop-blur-md border-b border-white/5 h-16 sticky top-0 z-40 px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="md:hidden text-white p-2 rounded-lg bg-white/5"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb */}
            <div className="text-xs text-gray-400 font-medium hidden sm:flex items-center gap-2">
              <span className="hover:text-white cursor-pointer" onClick={() => setActiveTab('overview')}>
                Yönetim Paneli
              </span>
              <span>/</span>
              <span className="text-white font-semibold capitalize">
                {navGroups.flatMap(g => g.items).find(i => i.id === activeTab)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right Header Status Controls */}
          <div className="flex items-center gap-4">
            
            {/* Live Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SİTE: CANLI</span>
            </div>

            {/* View Live Site Link */}
            <a
              href="http://localhost:3000/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Canlı Sitede Gör</span>
            </a>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#C8A45A] text-black font-bold flex items-center justify-center text-xs shadow-md">
                B
              </div>
              <span className="text-xs font-bold text-white hidden md:inline">
                Bluury Admin
              </span>
            </div>

          </div>

        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <DashboardOverview setActiveTab={setActiveTab} />}
          {activeTab === 'hero' && <HeroPanel />}
          {activeTab === 'services' && <ServicesPanel />}
          {activeTab === 'portfolio' && <PortfolioPanel />}
          {activeTab === 'about' && <AboutPanel />}
          {activeTab === 'testimonials' && <TestimonialsPanel />}
          {activeTab === 'messages' && <MessagesPanel />}
          {activeTab === 'google' && <GoogleReviewsPanel />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;
