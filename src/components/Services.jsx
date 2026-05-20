import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecoratedHeading from "@/components/DecoratedHeading";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Düğün Çekimi",
      description: "En özel gününüzü masalsı bir atmosferle ölümsüzleştiriyoruz. Duygu dolu anlar, zarif kurgular ve aşkınızın en doğal hali.",
      images: [
        "/Portfoy/Dugun/dugun1.webp",
        "/Portfoy/Dugun/dugun2.webp",
        "/Portfoy/Dugun/dugun3.webp"
      ]
    },
    {
      id: 2,
      title: "Moda Çekimi",
      description: "Markanızın stilini ve ruhunu yansıtan, trendlere yön veren profesyonel moda çekimleri. Işık, kompozisyon ve estetik bir arada.",
      images: [
        "/Portfoy/Moda/moda1.webp",
        "/Portfoy/Moda/moda2.webp",
        "/Portfoy/Moda/moda3.webp"
      ]
    },
    {
      id: 3,
      title: "Ürün Çekimi",
      description: "Ürünlerinizi en çarpıcı detaylarıyla sergileyen, satış odaklı ve yüksek kaliteli stüdyo çekimleri.",
      images: [
        "/Portfoy/urun/urun1.jpg",
        "/Portfoy/urun/urun2.jpg",
        "/Portfoy/urun/urun3.jpg"
      ]
    },
    {
      id: 4,
      title: "Reklam Çekimi",
      description: "Markanızı öne çıkaran, hikayenizi en çarpıcı görsel dille anlatan, dikkat çekici ve etkileyici reklam filmi ve fotoğraf çekimleri.",
      images: [
        "/Portfoy/video/video1.jpg",
        "/Portfoy/video/video2.jpg",
        "/Portfoy/video/video3.jpg"
      ]
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="services" className="relative py-20 md:py-28 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <DecoratedHeading text="Hizmetlerimiz" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-black text-sm font-semibold"
          >
            Her projede estetik ve mükemmellik arayışı
          </motion.p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-[450px] rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#C8A45A]/25 hover:border-[#C8A45A]/70 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.25)]"
            >
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentImageIndex}
                    src={service.images[currentImageIndex]}
                    alt={service.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5s] ease-linear group-hover:scale-105"
                    loading="lazy"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
 
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pb-6 md:pb-8 flex flex-col items-center justify-end z-10 text-center min-h-[150px] bg-gradient-to-t from-black via-black/90 to-transparent">
                <h3 className="font-heading text-2xl md:text-3xl mb-2 text-[#C8A45A] group-hover:scale-105 transition-all duration-500 tracking-wide">
                  {service.title}
                </h3>
                
                {/* 💫 Akıcı Yükseklik Geçişli Açıklama Alanı (Hizalamayı Bozmayan Çözüm) */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-[180px] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs md:text-sm font-semibold leading-relaxed pt-2 max-w-xs drop-shadow-md">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;