import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-6 text-center overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white p-10 md:p-16 rounded-3xl border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
      >
        <h1
          className="text-8xl md:text-[10rem] text-[#C8A45A] mb-4 leading-none"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          404
        </h1>
        <p className="text-[#666666] text-lg md:text-xl font-light mb-10 tracking-wide">
          Kadrajın dışına çıktınız. Aradığınız sayfa bulunamadı.
        </p>
        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden rounded-full border border-[#C8A45A]/40 hover:border-[#C8A45A]/70 no-underline transition-all duration-500 bg-white shadow-[0_4px_20px_rgba(200,164,90,0.05)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.15)]"
        >
          <div className="absolute inset-0 bg-[#C8A45A]/0 group-hover:bg-[#C8A45A]/5 transition-colors duration-500" />
          <Home size={18} className="relative z-10 text-[#C8A45A] transition-transform duration-500 group-hover:scale-110" />
          <span className="relative z-10 text-[#C8A45A] text-sm font-semibold tracking-widest uppercase transition-colors duration-500">
            Ana Sayfaya Dön
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
