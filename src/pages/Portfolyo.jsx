import React from "react";
import { Helmet } from "react-helmet-async";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import DecoratedHeading from "@/components/DecoratedHeading";
import LightCameraBackground from "@/components/LightCameraBackground";

const Portfolyo = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Portfolyo — Bluury Ajans | Düğün, Moda, Ürün Çekim Galerisi</title>
        <meta name="description" content="Bluury Ajans portfolyo galerisi. Düğün, moda, ürün ve reklam çekimlerimizden seçme kareler." />
        <meta property="og:title" content="Portfolyo — Bluury Ajans" />
        <meta property="og:description" content="Düğün, moda, ürün ve reklam çekimlerimizden seçme kareler içeren portfolyomuzu inceleyin." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bluuryajans.com/portfolyo" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bluuryajans.com/portfolyo" />
      </Helmet>

      <div className="relative z-10 bg-[#D6D6D6] overflow-hidden">
        {/* Lüks Arka Plan Tasarımı */}
        <LightCameraBackground />

        {/* Page Header */}
        <section className="relative pt-36 md:pt-40 pb-4">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
              <DecoratedHeading text="Portfolyo" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-black text-base font-semibold max-w-2xl mx-auto">
              Her kategoride özenle çekilmiş, profesyonel işlerimizi keşfedin.
            </motion.p>
          </div>
        </section>

        <Portfolio />
        <Testimonials />

      </div>
    </PageTransition>
  );
};

export default Portfolyo;
