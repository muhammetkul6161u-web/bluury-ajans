import React from "react";

const LightCameraBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* İnce Altın Eskiz / Arayüz Çizgileri */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200, 164, 90, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 164, 90, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Düğün ve Çekim Ajansı Temalı Romantik Altın Işık Hüzmeleri (Soft Ambient Glows) */}
      <div className="absolute top-[8%] left-[5%] w-[45vh] h-[45vh] bg-[#C8A45A]/[0.08] blur-[120px] rounded-full" />
      <div className="absolute top-[35%] right-[8%] w-[55vh] h-[55vh] bg-white/[0.15] blur-[150px] rounded-full" />
      <div className="absolute top-[65%] left-[10%] w-[50vh] h-[50vh] bg-[#C8A45A]/[0.07] blur-[130px] rounded-full" />

      {/* ✨ Romantik Altın Işık Tozları (Floating Gold Sparkles / Bokeh) */}
      <div className="absolute top-[6%] left-[18%] w-1.5 h-1.5 bg-[#C8A45A]/25 rounded-full blur-[0.5px]" />
      <div className="absolute top-[12%] right-[22%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[1px]" />
      <div className="absolute top-[24%] left-[45%] w-1 h-1 bg-[#C8A45A]/30 rounded-full" />
      <div className="absolute top-[35%] left-[12%] w-2.5 h-2.5 bg-[#C8A45A]/15 rounded-full blur-[1.5px]" />
      <div className="absolute top-[42%] right-[35%] w-1.5 h-1.5 bg-[#C8A45A]/25 rounded-full" />
      <div className="absolute top-[52%] left-[28%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[0.5px]" />
      <div className="absolute top-[60%] right-[15%] w-1 h-1 bg-[#C8A45A]/35 rounded-full" />
      <div className="absolute top-[68%] left-[40%] w-2 h-2 bg-[#C8A45A]/15 rounded-full blur-[1px]" />
      <div className="absolute top-[75%] right-[45%] w-1.5 h-1.5 bg-[#C8A45A]/30 rounded-full" />
      <div className="absolute top-[84%] left-[18%] w-2 h-2 bg-[#C8A45A]/20 rounded-full blur-[1px]" />
      <div className="absolute top-[92%] right-[28%] w-1 h-1 bg-[#C8A45A]/30 rounded-full" />

      {/* 📸 Kamera Kadrajı Vizör Detayları (Camera Viewfinder Overlay Watermarks) */}
      {/* Köşe Kadraj Kılavuzları (Focus Corners) */}
      <div className="absolute top-[3%] left-[3%] w-10 h-10 border-t-2 border-l-2 border-black/15 pointer-events-none" />
      <div className="absolute top-[3%] right-[3%] w-10 h-10 border-t-2 border-r-2 border-black/15 pointer-events-none" />
      <div className="absolute bottom-[3%] left-[3%] w-10 h-10 border-b-2 border-l-2 border-black/15 pointer-events-none" />
      <div className="absolute bottom-[3%] right-[3%] w-10 h-10 border-b-2 border-r-2 border-black/15 pointer-events-none" />

      {/* Autofocus Netleme Noktaları ve Artı İşaretleri */}
      <div className="absolute top-[28%] left-[25%] text-black/15 font-light pointer-events-none text-2xl select-none">+</div>
      <div className="absolute top-[62%] right-[25%] text-black/15 font-light pointer-events-none text-2xl select-none">+</div>
      <div className="absolute top-[85%] left-[35%] text-black/15 font-light pointer-events-none text-2xl select-none">+</div>
      
      {/* Merkez Vizör AF Çerçevesi */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-dashed border-black/10 rounded-full flex items-center justify-center pointer-events-none select-none">
        <span className="text-black/15 text-sm select-none">+</span>
      </div>

      {/* 📡 Vizör Teknik HUD Bilgileri (Soft Viewfinder Camera HUD Status Panels) */}
      {/* Panel 1 - Üst Kısım */}
      <div className="absolute top-[4%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-red-500/30 rounded-full animate-pulse" />
          <span>REC  4K 60fps</span>
        </div>
        <div><span>CH1 ━━━━ CH2 ━━━━</span></div>
      </div>

      {/* Panel 2 - Orta Kısım */}
      <div className="absolute top-[45%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
        <div><span>F/2.8  1/125s  0.0ev</span></div>
        <div><span>ISO 100  RAW 16bit</span></div>
      </div>

      {/* Panel 3 - Alt Kısım */}
      <div className="absolute top-[85%] left-[5%] right-[5%] flex justify-between font-mono text-[9px] tracking-widest text-black/10 select-none pointer-events-none uppercase">
        <div><span>HLG  M-FOCUS  AF-C</span></div>
        <div className="flex items-center gap-2">
          <span>BATT 98%</span>
          <span className="px-1 border border-black/10 rounded-[2px] text-[7px] font-bold">███</span>
        </div>
      </div>
    </div>
  );
};

export default LightCameraBackground;
