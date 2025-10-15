import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const ANIM_DURATION = 300;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else if (isMounted && !isOpen) {
      const t = setTimeout(() => setIsMounted(false), ANIM_DURATION);
      return () => clearTimeout(t);
    }
  }, [isOpen, isMounted]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let navbarBackgroundClasses = "";
  if (location.pathname === "/") {
    navbarBackgroundClasses = isScrolled ? "bg-black/85 backdrop-blur-sm" : "bg-transparent";
  } else {
    navbarBackgroundClasses = "bg-black/95";
  }

  const linkBaseClasses =
    "text-white font-semibold text-base hover:text-blue-300 transition-colors duration-150";
  const mobileLinkBaseClasses =
    "block text-white font-semibold text-lg hover:text-blue-300 transition-colors duration-150 py-3";

  const prismStyles = `
  .prism-text {
    background: linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.12) 100%);
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    animation: subtleBeam 4.2s linear infinite;
    filter: drop-shadow(0 0 6px rgba(255,255,255,0.04));
  }
  @keyframes subtleBeam { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }

  @keyframes modalEnter { 0% { transform: translateY(10%) scale(0.995); opacity: 0; } 100% { transform: translateY(0%) scale(1); opacity: 1; } }
  @keyframes modalExit { 0% { transform: translateY(0%) scale(1); opacity: 1; } 100% { transform: translateY(10%) scale(0.995); opacity: 0; } }
  .modal-panel-enter { animation: modalEnter ${ANIM_DURATION}ms cubic-bezier(.2,.9,.2,1) both; }
  .modal-panel-exit { animation: modalExit ${ANIM_DURATION}ms cubic-bezier(.2,.9,.2,1) both; }

  .backdrop-fade-in { animation: fadeBackdrop ${ANIM_DURATION}ms ease both; }
  .backdrop-fade-out { animation: fadeBackdropOut ${ANIM_DURATION}ms ease both; }
  @keyframes fadeBackdrop { 0% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes fadeBackdropOut { 0% { opacity: 1; } 100% { opacity: 0; } }

  /* Dark Glassmorphic panel */
  .glass-panel {
    background: linear-gradient(180deg, rgba(15,15,20,0.8) 0%, rgba(10,10,15,0.9) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 10px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    backdrop-filter: blur(18px) saturate(140%);
    border-radius: 20px;
    overflow: hidden;
  }

  .glass-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 70%),
                radial-gradient(circle at bottom right, rgba(0,0,0,0.3), transparent 60%);
    pointer-events: none;
  }

  .glass-inner {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 2rem;
    color: white;
  }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: prismStyles }} />

      <nav
        className={`w-full fixed top-0 z-50 transition-colors duration-300 ${navbarBackgroundClasses}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-baseline space-x-2">
                <span className="text-2xl md:text-3xl font-anatson prism-text select-none">BrightLayer</span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-end items-center space-x-8">
              <Link to="/about" className={linkBaseClasses}>About</Link>
              <Link to="/services" className={linkBaseClasses}>Services</Link>
              <Link to="/work" className={linkBaseClasses}>Work</Link>

              <div className="flex items-center space-x-6 pl-6 border-l border-gray-700 ml-6">
                <Link to="/global" className="flex items-center text-blue-400 hover:text-blue-200 transition-colors duration-150 font-semibold text-base">
                  <span className="mr-2">🌐</span> Global
                </Link>
                <Link to="/contact" className="flex items-center text-white hover:text-blue-200 transition-colors duration-150 font-semibold text-base">
                  Get in touch <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => {
                  if (!isOpen) setIsMounted(true);
                  setIsOpen((s) => !s);
                }}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="text-white text-3xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                {isOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {isMounted && (
          <div id="mobile-menu" ref={menuRef} aria-hidden={!isOpen} className="md:hidden fixed inset-0 z-40">
            <div
              onClick={() => setIsOpen(false)}
              className={`absolute inset-0 bg-black/60 backdrop-blur-md ${isOpen ? "backdrop-fade-in" : "backdrop-fade-out"}`}
              aria-hidden="true"
            />

            <div className={`relative min-h-screen w-full flex items-center justify-center p-4`} onClick={(e) => e.stopPropagation()}>
              <div role="dialog" aria-modal="true" aria-labelledby="mobile-menu-heading" className={`w-full h-full max-h-full ${isOpen ? "modal-panel-enter" : "modal-panel-exit"}`} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div className="mx-auto w-full h-full max-w-md relative glass-panel">
                  <div className="glass-inner overflow-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h2 id="mobile-menu-heading" className="text-2xl font-semibold text-white">BrightLayer</h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-white text-2xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/60"
                        aria-label="Close menu"
                      >
                        ✖
                      </button>
                    </div>

                    <nav className="flex flex-col gap-4" aria-label="Mobile primary">
                      <Link to="/" className={mobileLinkBaseClasses} onClick={() => setIsOpen(false)}>Home</Link>
                      <Link to="/about" className={mobileLinkBaseClasses} onClick={() => setIsOpen(false)}>About</Link>
                      <Link to="/services" className={mobileLinkBaseClasses} onClick={() => setIsOpen(false)}>Services</Link>
                      <Link to="/work" className={mobileLinkBaseClasses} onClick={() => setIsOpen(false)}>Work</Link>
                      <Link to="/thoughts-and-views" className={mobileLinkBaseClasses} onClick={() => setIsOpen(false)}>Thoughts & Views</Link>

                      <div className="pt-6 border-t border-gray-700 mt-6">
                        <Link to="/global" className={mobileLinkBaseClasses} onClick={() => setIsOpen(false)}>
                          <span className="mr-3 inline-block align-middle">🌐</span> Global
                        </Link>
                        <Link to="/contact" className={mobileLinkBaseClasses} onClick={() => setIsOpen(false)}>Get in touch →</Link>
                      </div>
                    </nav>

                    <div className="mt-8 text-sm text-gray-400">
                      © {new Date().getFullYear()} BrightLayer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
