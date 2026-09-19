import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/config/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUsername', data.username);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Giriş başarısız. Lütfen bilgileri kontrol edin.');
      }
    } catch (err) {
      setError('Sunucuya bağlanılamadı. Lütfen backend servisinin çalıştığından emin olun.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Arka plan süslemesi (Lüks Gold yansıma) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#C8A45A]/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="bg-[#111111]/80 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          
          <div className="text-center mb-10">
            <h1 className="font-heading text-4xl text-white tracking-wide mb-2">BLUURY</h1>
            <h2 className="text-[#C8A45A] font-light text-sm tracking-[0.3em] uppercase">Yönetim Paneli</h2>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm text-center font-light leading-relaxed"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider pl-1">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C8A45A] focus:ring-1 focus:ring-[#C8A45A]/50 transition-all duration-300"
                placeholder="bluury"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider pl-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C8A45A] focus:ring-1 focus:ring-[#C8A45A]/50 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-[#C8A45A] text-black font-semibold py-4 rounded-xl mt-4 transition-all duration-500 hover:shadow-[0_0_20px_rgba(200,164,90,0.3)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-xs tracking-[0.2em] uppercase">
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </span>
            </button>
          </form>

        </div>
        
        <p className="text-center text-white/30 text-xs mt-8 tracking-wider font-light">
          © {new Date().getFullYear()} Bluury Ajans. Tüm Hakları Saklıdır.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
