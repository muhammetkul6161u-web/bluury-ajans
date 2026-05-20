import React, { useEffect, useRef } from 'react';

const CameraBackground = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        // Fareyi takip eden ışık efekti performansı düşürmeden çalışır (Vanilla JS)
        spotlightRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(200,164,90,0.05), transparent 45%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#1A1816] via-[#141210] to-[#0D0C0A]">
      
      {/* ── 1. İnteraktif Spotlight (Fare Takibi) ── */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at 50% 50%, rgba(200,164,90,0.05), transparent 45%)`
        }}
      />

      {/* ── 2. Sensör Tarama Çizgileri (Scanlines) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[linear-gradient(transparent_50%,#000_50%)] bg-[length:100%_4px]" />

      {/* ── Dot Grid Pattern (Mevcut modern doku) ── */}
      <div className="absolute inset-0 z-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* ── Film Grain (Sinematik Doku) ── */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* ── Sabit Bokeh / Lens Glows (Yumuşak Altın/Bronz Işıklar) ── */}
      <div className="absolute top-[-15%] left-[-10%] z-0 w-[50%] h-[50%] bg-[#C8A45A]/[0.03] blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] z-0 w-[60%] h-[60%] bg-[#8A7340]/[0.03] blur-[180px] rounded-full" />
      <div className="absolute top-[30%] left-[70%] z-0 w-[40%] h-[40%] bg-[#D4B76A]/[0.02] blur-[130px] rounded-full" />

      {/* ── 3. Teknik Kamera Vizör Detayları (Minimal OSD) ── */}
      {/* REC Indicator */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 flex items-center gap-2">
        <div className="w-[6px] h-[6px] md:w-2 md:h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">REC</span>
      </div>

      {/* Format & Resolution */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 flex flex-col gap-1">
        <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-white/20 uppercase">RAW</span>
        <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-white/30 uppercase font-bold">4K 60FPS</span>
      </div>

      {/* Exposure & Lens Settings */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex items-center gap-3 md:gap-5">
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/20">ISO 100</span>
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-[#C8A45A]/40 font-bold">F/2.8</span>
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/20">1/125s</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/20 hidden md:inline">EV -0.3</span>
      </div>

      {/* Center Focus Brackets (Mevcut ekranın ortasında ince çerçeveler) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[50vw] h-[40vh] border border-white/[0.015] rounded-[3rem] pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[30px] h-[30px] pointer-events-none">
        {/* Ortadaki '+' ikonu */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[14px] h-[1px] bg-white/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[14px] bg-white/[0.04]" />
      </div>

      {/* ── Frame Corners (Vizör Köşelikleri) ── */}
      <div className="absolute top-10 left-10 md:top-12 md:left-12 z-10 w-12 h-12 md:w-16 md:h-16 border-t border-l border-white/[0.06]" />
      <div className="absolute top-10 right-10 md:top-12 md:right-12 z-10 w-12 h-12 md:w-16 md:h-16 border-t border-r border-white/[0.06]" />
      <div className="absolute bottom-10 left-10 md:bottom-12 md:left-12 z-10 w-12 h-12 md:w-16 md:h-16 border-b border-l border-white/[0.06]" />
      <div className="absolute bottom-10 right-10 md:bottom-12 md:right-12 z-10 w-12 h-12 md:w-16 md:h-16 border-b border-r border-white/[0.06]" />
    </div>
  );
};

export default CameraBackground;
