import React from 'react';
import { motion } from 'framer-motion';

const DecoratedHeading = ({ text, className = "" }) => (
  <div className={`relative inline-block text-center px-4 mb-2 ${className}`}>
    <motion.div 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center"
    >
      <span className="relative z-10 font-heading text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#1A1A1A] via-[#8A8C8E] to-[#C8A45A] bg-clip-text text-transparent tracking-wide leading-relaxed py-2 block">
        {text}
      </span>
    </motion.div>
  </div>
);

export default DecoratedHeading;
