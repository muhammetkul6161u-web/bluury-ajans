import React from "react";
import { Helmet } from "react-helmet-async";
import About from "@/components/About";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Eye, Heart, Shield, Zap } from "lucide-react";
import DecoratedHeading from "@/components/DecoratedHeading";
import LightCameraBackground from "@/components/LightCameraBackground";

const Hakkimizda = () => {
  const values = [
    { icon: Eye, title: "Yaratıcı Vizyon", desc: "Her projede benzersiz bir bakış açısı sunarak, markanızın hikâyesini en etkileyici şekilde anlatıyoruz." },
    { icon: Heart, title: "Tutku & Özen", desc: "İşimize olan tutkumuz her karede kendini gösterir. Detaylara gösterdiğimiz özen, farkımızı ortaya koyar." },
    { icon: Shield, title: "Güvenilirlik", desc: "Zamanında teslimat, profesyonel iletişim ve müşteri memnuniyeti en öncelikli değerlerimizdir." },
    { icon: Zap, title: "Modern Teknoloji", desc: "En güncel ekipman ve yazılımlarla çalışarak, endüstri standardının ötesinde sonuçlar üretiyoruz." },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Hakkımızda — Bluury Ajans | Trabzon Fotoğrafçılık Ajansı</title>
        <meta name="description" content="Bluury Ajans'ın hikâyesini keşfedin. Trabzon'da fotoğrafçılık tutkusu ile kurulan modern ve lüks fotoğraf ajansımız." />
        <meta property="og:title" content="Hakkımızda — Bluury Ajans" />
        <meta property="og:description" content="Bluury Ajans'ın hikâyesini keşfedin. Trabzon merkezli profesyonel fotoğrafçılık stüdyosu." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bluuryajans.com/hakkimizda" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bluuryajans.com/hakkimizda" />
      </Helmet>

      <div className="relative z-10 bg-[#D6D6D6] overflow-hidden">
        {/* Lüks Arka Plan Tasarımı */}
        <LightCameraBackground />

        {/* About componenti kendi içinde fotoğraf barındırıyor */}
        <div className="relative z-10">
          <About />
        </div>

        {/* Tüm sayfayı saran açık tema */}
        <div className="relative z-10 bg-transparent">
          {/* Hikâyemiz */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
              <div className="mb-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <DecoratedHeading text="Hikâyemiz" />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.3 }} className="space-y-4 md:space-y-6 bg-[#FAFAF8] backdrop-blur-md p-6 md:p-12 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <p className="text-[#1A1A1A] text-sm md:text-lg font-light leading-relaxed">
                  Bluury Ajans, Trabzon'un kalbinde doğan bir fotoğrafçılık tutkusunun hikâyesidir. Bir kamera ve sonsuz bir hayal gücüyle başlayan yolculuğumuz, bugün profesyonel ekibimiz ve modern stüdyomuzla devam ediyor.
                </p>
                <p className="text-[#1A1A1A] text-sm md:text-lg font-light leading-relaxed">
                  Her projemizde müşterilerimizin vizyonunu anlıyor, onların hikâyelerini en etkileyici şekilde karelere yansıtıyoruz. Düğün çekimlerinden moda projelerine, ürün fotoğraflarından kurumsal çalışmalara kadar geniş bir yelpazede hizmet veriyoruz.
                </p>
                <p className="text-[#1A1A1A] text-sm md:text-lg font-light leading-relaxed">
                  Amacımız sadece fotoğraf çekmek değil — anıları ölümsüzleştirmek, duyguları yakalamak ve markaların görsel kimliğini güçlendirmek. Çünkü biz inanıyoruz ki, her kare bir hikâye anlatır.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Değerlerimiz */}
          <section className="py-16 md:py-24 bg-[#CECECE] border-t border-black/5">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <div className="text-center mb-14">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <DecoratedHeading text="Değerlerimiz" />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-[#FAFAF8] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#C8A45A]/30 transition-all duration-500 text-center flex flex-col items-center hover:shadow-[0_10px_30px_rgba(200,164,90,0.08)]">
                    <div className="w-14 h-14 mb-6 rounded-full bg-[#E5E5E5] border border-black/5 flex items-center justify-center">
                      <v.icon className="text-[#C8A45A]" size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-xl text-[#1A1A1A] mb-3">{v.title}</h3>
                    <p className="text-[#8A8C8E] text-sm font-light leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Hakkimizda;
