import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import SplashScreen from "@/components/SplashScreen";
import WhatsAppButton from "@/components/WhatsAppButton";
import { API_BASE_URL } from "@/config/api";

// Main Pages
const AnaSayfa = lazy(() => import("@/pages/AnaSayfa"));
const Hizmetler = lazy(() => import("@/pages/Hizmetler"));
const Portfolyo = lazy(() => import("@/pages/Portfolyo"));
const Iletisim = lazy(() => import("@/pages/Iletisim"));
const Hakkimizda = lazy(() => import("@/pages/Hakkimizda"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Admin Pages
const AdminLogin = lazy(() => import("@/pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/Admin/AdminDashboard"));

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

// Layout for Main Site
const MainLayout = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data && data.maintenanceMode) {
          setMaintenanceMode(true);
        }
      })
      .catch(() => {});
  }, []);

  if (maintenanceMode) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center text-white text-center p-6">
        <h1 className="text-4xl md:text-5xl font-heading text-[#C8A45A] mb-4">Yapım Aşamasında</h1>
        <p className="text-gray-400 max-w-lg">Sitemizi size daha iyi hizmet verebilmek için güncelliyoruz. Kısa süre içinde tekrar yayında olacağız.</p>
      </div>
    );
  }

  return (
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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          
          {/* Main Website Routes */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
