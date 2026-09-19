import React, { useRef, useState } from 'react';
import { UploadCloud, Loader2, CheckCircle2, Image as ImageIcon, Video, Trash2, RefreshCw } from 'lucide-react';
import { API_BASE_URL, getMediaUrl } from '@/config/api';

const VisualUploader = ({ 
  currentUrl, 
  onUploadSuccess, 
  onRemove,
  label = "Görsel / Video Yükle", 
  mediaType = "image", 
  onTypeChange 
}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('media', file);

    setIsUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        onUploadSuccess(data.url);
        if (onTypeChange) {
          const isVid = file.type.startsWith('video') || data.url.endsWith('.mp4') || data.url.endsWith('.mov') || data.url.endsWith('.webm');
          onTypeChange(isVid ? 'video' : 'image');
        }
      } else {
        alert(data.message || 'Yükleme başarısız oldu.');
      }
    } catch (err) {
      alert('Sunucu hatası: ' + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    handleFileUpload(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const isVideo = mediaType === 'video' || (currentUrl && (currentUrl.endsWith('.mp4') || currentUrl.endsWith('.mov') || currentUrl.endsWith('.webm')));
  const fullMediaUrl = getMediaUrl(currentUrl);

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Main Upload / Preview Container */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-[#14161F] border rounded-2xl p-4 transition-all duration-300 ${
          isDragging 
            ? 'border-[#C8A45A] bg-[#C8A45A]/10 shadow-[0_0_25px_rgba(200,164,90,0.2)]' 
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        {isUploading ? (
          <div className="py-10 flex flex-col items-center justify-center text-[#C8A45A]">
            <Loader2 className="animate-spin mb-3" size={36} />
            <span className="text-sm font-semibold tracking-wide">Medya sıkıştırılıyor ve yükleniyor...</span>
          </div>
        ) : currentUrl ? (
          <div className="space-y-4">
            {/* Visual Box with thumbnail and info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0D0E15] p-3 rounded-xl border border-white/5">
              
              {/* Media Preview Box */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-black/50 border border-white/10 flex-shrink-0 group">
                {isVideo ? (
                  <video 
                    src={fullMediaUrl} 
                    className="w-full h-full object-cover" 
                    muted 
                    loop 
                    autoPlay 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={fullMediaUrl} 
                    alt="Mevcut Medya" 
                    className="w-full h-full object-cover" 
                  />
                )}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  title="Değiştirmek için tıkla"
                >
                  <RefreshCw size={20} className="text-[#C8A45A]" />
                </div>
              </div>

              {/* Info & Action Buttons */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <p className="text-sm font-medium text-white truncate max-w-[280px] sm:max-w-md">
                  {currentUrl}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-semibold mt-1">
                  <CheckCircle2 size={14} />
                  <span>Yüklendi ve hazır</span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs font-semibold">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#C8A45A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw size={12} /> Değiştir
                  </button>
                  <span className="text-gray-600">•</span>
                  <button 
                    type="button"
                    onClick={() => {
                      if (onRemove) onRemove();
                      else onUploadSuccess('');
                    }}
                    className="text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={12} /> Kaldır
                  </button>
                </div>
              </div>
            </div>

            {/* Readonly URL Field */}
            <input 
              type="text" 
              readOnly 
              value={currentUrl} 
              className="w-full bg-[#0B0C12] border border-white/5 rounded-lg px-3.5 py-2 text-xs text-gray-400 font-mono focus:outline-none"
            />
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="py-10 flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-[#C8A45A]/15 border border-white/10 group-hover:border-[#C8A45A]/40 flex items-center justify-center text-gray-400 group-hover:text-[#C8A45A] transition-all duration-300 mb-3 shadow-inner">
              <UploadCloud size={28} />
            </div>
            <p className="text-sm font-semibold text-white group-hover:text-[#C8A45A] transition-colors">
              Görsel veya Video yüklemek için tıklayın
            </p>
            <p className="text-xs text-gray-400 mt-1">veya sürükleyip bu alana bırakın (WebP, JPG, PNG, MP4)</p>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,video/*" 
        />
      </div>

      {/* Media Type Toggle Buttons (like in S'Print admin: [ 🖼️ BILD ] [ 🎥 VIDEO ]) */}
      {onTypeChange && (
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">TÜR:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onTypeChange('image')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mediaType === 'image'
                  ? 'bg-[#C8A45A] text-black shadow-[0_0_15px_rgba(200,164,90,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <ImageIcon size={14} /> GÖRSEL
            </button>
            <button
              type="button"
              onClick={() => onTypeChange('video')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mediaType === 'video'
                  ? 'bg-[#C8A45A] text-black shadow-[0_0_15px_rgba(200,164,90,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Video size={14} /> VİDEO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualUploader;
