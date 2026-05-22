import React from "react";
import { motion } from "framer-motion";
import DecoratedHeading from "@/components/DecoratedHeading";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Düğün Çekimi",
      description:
        "En özel gününüzün heyecanını, zarafetini ve tüm duygusal anlarını lüks ve sinematik karelerle ölümsüzleştiriyoruz.",
      image: "/hizmetler/düğünhz.webp",
    },
    {
      id: 2,
      title: "Dış Çekim",
      description:
        "Doğal ışık altında, büyüleyici Trabzon doğasında sanatsal ve estetik dış çekimlerle en güzel anılarınızı biriktiriyoruz.",
      image: "/hizmetler/dışhz.webp",
    },
    {
      id: 3,
      title: "Ürün Çekimi",
      description:
        "Ürünlerinizin tüm detaylarını, kalitesini ve estetiğini ön plana çıkaran yüksek çözünürlüklü ve satış odaklı çekimler sunuyoruz.",
      image: "/hizmetler/ürünhz.webp",
    },
    {
      id: 4,
      title: "Reklam Çekimi",
      description:
        "Markanızın vizyonunu, kimliğini ve gücünü en etkileyici ve dikkat çekici görsel dille anlatan kurumsal reklam çekimleri yapıyoruz.",
      image: "/hizmetler/reklamhz.webp",
    },
    {
      id: 5,
      title: "After Çekimi",
      description:
        "Düğün ve etkinliklerinizin ardından devam eden eğlenceyi, en enerjik ve doğal anlarıyla yakalayarak ölümsüzleştiriyoruz.",
      image: "/hizmetler/afterparti.webp",
    },
  ];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#C8A45A]/25 hover:border-[#C8A45A]/70 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(200,164,90,0.25)]"
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={service.image}
                  alt={`${service.title} Fotoğrafçılık Hizmeti - Bluury Ajans`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pb-6 md:pb-8 flex flex-col items-center justify-end z-10 text-center min-h-[150px] bg-gradient-to-t from-black via-black/90 to-transparent">
                <h3 className="font-heading text-xl md:text-2xl mb-2 text-[#C8A45A] group-hover:scale-105 transition-all duration-500 tracking-wide">
                  {service.title}
                </h3>

                {/* 💫 Akıcı Yükseklik Geçişli Açıklama Alanı — Mobilde her zaman açık, masastünde hover ile */}
                <div className="overflow-hidden max-h-[180px] md:max-h-0 md:group-hover:max-h-[180px] transition-all duration-700 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
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