// src/LenisProvider.jsx (production-ready)
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useLocation } from "react-router-dom";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const rafRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    setLenisInstance(lenis);

    const loop = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { lenis.destroy(); } catch (e) {}
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
      lenisInstance.scrollTo(0, { duration: 0.6, easing: (t) => t });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location, lenisInstance]);

  return <LenisContext.Provider value={lenisInstance}>{children}</LenisContext.Provider>;
}
