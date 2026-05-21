import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import SplashScreen from "@/components/SplashScreen";
import WhatsAppButton from "@/components/WhatsAppButton";

const AnaSayfa = lazy(() => import("@/pages/AnaSayfa"));
const Hizmetler = lazy(() => import("@/pages/Hizmetler"));
const Portfolyo = lazy(() => import("@/pages/Portfolyo"));
const Iletisim = lazy(() => import("@/pages/Iletisim"));
const Hakkimizda = lazy(() => import("@/pages/Hakkimizda"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-[#C8A45A]/30 border-t-[#C8A45A] rounded-full animate-spin" />
      <span className="text-[#C8A45A] text-sm tracking-[0.3em] font-light uppercase">Yükleniyor</span>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/hizmetler" element={<Hizmetler />} />
        <Route path="/portfolyo" element={<Portfolyo />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <BrowserRouter>
      <div className="bg-[#FFFFFF] text-[#333333] relative overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
        <Toaster />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
