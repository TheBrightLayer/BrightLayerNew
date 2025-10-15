// src/App.jsx
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Header from "./components/header";
import About from "./components/about";
import ServicesPage from "./pages/servicesPage";
import ServicesGrid from "./components/servicesGrid";
import AboutPage from "./pages/aboutPage";
import Work from "./components/aboutWork";
import Services from "./components/services";
import Insights from "./components/insights";
import AboutHome from "./components/aboutHome";
import AboutSection from "./components/AboutSection";
import Kickstart from "./components/kickstart";
import Brand from "./components/brand";
import Footer from "./components/footer";
import ContactPage from "./pages/ContactPage";
import WorkPage from "./components/Work";
import WorkList from "./pages/WorkList";
import WorkPost from "./pages/WorkPost";

// NEW: Cursor aura
import CursorAura from "./components/CursorAura";

// Import Lenis
import Lenis from "@studio-freight/lenis";

function LenisManager() {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const loop = (time) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.6, easing: (t) => t });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Global cursor aura overlay */}
      <CursorAura />

      <Navbar />
      <div className="text-center">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <AboutSection />
                <AboutHome />
                <About />
                <Work />
                <Services />
                <Kickstart />
                <Brand />
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/services"
            element={
              <>
                <ServicesPage />
                <ServicesGrid />
                <Brand />
              </>
            }
          />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Work" element={<WorkPage />} />
          <Route path="/work" element={<WorkList />} />
          <Route path="/work/:slug" element={<WorkPost />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <LenisManager />
      <AppContent />
    </Router>
  );
}

export default App;
