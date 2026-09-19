import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, Clock, User, Phone, Send } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const MessagesPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_BASE_URL}/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu mesajı kalıcı olarak silmek istediğinize emin misiniz?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null);
        fetchMessages();
      }
    } catch (e) {
      alert('Mesaj silinemedi');
    }
  };

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      handleMarkAsRead(msg.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
          GELEN KUTUSU
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Web sitenizin iletişim ve çekim rezervasyon formundan gönderilen müşteri mesajları.
        </p>
      </div>

      <div className="bg-[#12141C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[640px] flex flex-col md:flex-row">
        
        {/* Mesaj Listesi (Sol Sütun) */}
        <div className="w-full md:w-[360px] border-r border-white/5 flex flex-col bg-[#0E1017]">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Mesajlar ({messages.length})
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#C8A45A]/15 text-[#C8A45A] font-semibold">
              {messages.filter(m => !m.isRead).length} Okunmamış
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {messages.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-xs">
                Gelen kutusu boş.
              </div>
            )}

            {messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  selectedMessage?.id === msg.id
                    ? 'bg-[#C8A45A]/10 border-l-4 border-l-[#C8A45A]'
                    : msg.isRead
                      ? 'hover:bg-white/5 opacity-75'
                      : 'bg-white/5 hover:bg-white/10 border-l-4 border-l-[#C8A45A]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-xs font-bold truncate ${msg.isRead ? 'text-gray-300' : 'text-white'}`}>
                    {msg.name}
                  </span>
                  {msg.isRead ? (
                    <MailOpen size={13} className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <Mail size={13} className="text-[#C8A45A] flex-shrink-0" />
                  )}
                </div>

                <p className="text-[11px] text-gray-400 truncate">
                  {msg.subject || msg.content}
                </p>

                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono mt-2">
                  <Clock size={10} />
                  <span>{new Date(msg.createdAt).toLocaleString('tr-TR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mesaj Detayı (Sağ Sütun) */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-[#12141C]">
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {selectedMessage.subject || 'Rezervasyon / İletişim Talebi'}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <User size={14} className="text-[#C8A45A]" /> {selectedMessage.name}
                    </span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="flex items-center gap-1.5 text-[#C8A45A] hover:underline"
                    >
                      <Mail size={14} /> {selectedMessage.email}
                    </a>
                    {selectedMessage.phone && (
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="flex items-center gap-1.5 text-emerald-400 hover:underline"
                      >
                        <Phone size={14} /> {selectedMessage.phone}
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Mesajı Sil"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Message Content */}
              <div className="bg-[#0D0E15] p-6 rounded-2xl border border-white/5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-light">
                {selectedMessage.content}
              </div>

              {/* Reply shortcut */}
              <div className="pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Bluury Ajans Çekim Talebi')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C8A45A] hover:bg-[#D4B76A] text-black text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Send size={14} /> Müşteriye E-Posta ile Yanıt Ver
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600 py-20">
              <Mail size={56} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Görüntülemek için sol taraftan bir mesaj seçin</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MessagesPanel;
