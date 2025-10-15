import React, { useEffect, useRef, useState } from "react";
import work1 from "../assets/Palmetto-Reel-004_4x5_2.0m.mp4";
import work2 from "../assets/1_Tilt_Hero_Vertical_01.mp4";
import work3 from "../assets/Wise_CS_KeyVisual_4x5_v4.mp4";
import work4 from  "../assets/Palmetto-Reel-004_4x5_2.0m.mp4";
import work5 from "../assets/Papier-KV-5-4_2025-05-27-162321_fxxu (1).mp4";

export default function Work() {
  const items = [
    { id: 0, img: work1, title: "Giving Gamers the Power to Skip a Shower", tag: "FMCG", year: "2024", description: "A playful campaign targeting young gamers with on-demand hygiene products — created to fit into short attention spans while driving brand memorability." },
    { id: 1, img: work2, title: "A REFRESHING DETOUR ENDRICKS", tag: "FMCG", year: "2024", description: ""},
    { id: 2, img: work3, title: "A Bold Brand Activation That Stood Out", tag: "FMCG", year: "2024", description: "A multi-channel activation combining experiential events and social-first creative to drive strong earned media results." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(items.map(() => false));
  const isAnimatingRef = useRef(false);

  // refs for video elements so we can play/pause the active one
  const videoRefs = useRef([]);
  const slideAdvanceTimeoutRef = useRef(null);
  const endedListenerRefs = useRef([]);

  const TRANSITION_MS = 1300;
  const MASK_DELAY_MS = 100;
  const AUTO_SLIDE_FALLBACK = 3000; // fallback if video metadata isn't accessible

  const clearAdvance = () => {
    if (slideAdvanceTimeoutRef.current) {
      clearTimeout(slideAdvanceTimeoutRef.current);
      slideAdvanceTimeoutRef.current = null;
    }
  };

  const goToSlide = (idx) => {
    if (idx < 0 || idx >= items.length) return false;
    setActiveIndex(idx);
    // reset flips when changing slides
    setFlipped(items.map(() => false));
    isAnimatingRef.current = true;
    clearAdvance();
    setTimeout(() => {
      isAnimatingRef.current = false;
      // start auto-advance for the newly active video
      startAutoAdvanceForActiveVideo();
    }, TRANSITION_MS + 100);
    return true;
  };

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
    setFlipped(items.map(() => false));
  };

  // Start auto-advance tied to the active video's natural end.
  const startAutoAdvanceForActiveVideo = () => {
    clearAdvance();
    const v = videoRefs.current[activeIndex];
    if (!v) {
      // fallback timed advance
      slideAdvanceTimeoutRef.current = setTimeout(goToNextSlide, AUTO_SLIDE_FALLBACK);
      return;
    }

    // If already ended or duration is 0, fallback
    const duration = v.duration;

    // Attach a dedicated ended listener per element so we can remove it later
    const onEnded = () => {
      clearAdvance();
      goToNextSlide();
    };

    // clean up any previous listener on this element
    try {
      if (endedListenerRefs.current[activeIndex] && v.removeEventListener) {
        v.removeEventListener('ended', endedListenerRefs.current[activeIndex]);
      }
    } catch (e) {}

    endedListenerRefs.current[activeIndex] = onEnded;
    try {
      v.addEventListener('ended', onEnded);
    } catch (e) {
      // ignore
    }

    // If metadata already loaded and duration is finite and > 0, rely on 'ended'.
    // Otherwise, use a fallback timeout (for streams or inaccessible metadata).
    if (Number.isFinite(duration) && duration > 0) {
      // make sure video is playing
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { v.controls = true; });
      }
      // else rely on ended event
    } else {
      // play and set a fallback timeout
      try { v.play().catch(() => { v.controls = true; }); } catch (e) {}
      slideAdvanceTimeoutRef.current = setTimeout(goToNextSlide, AUTO_SLIDE_FALLBACK);
    }
  };

  // Pause all videos other than active; ensure active video plays (unless flipped)
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      try {
        if (i === activeIndex && !flipped[i]) {
          // ensure settings allow autoplay on most browsers
          v.muted = true;
          v.playsInline = true;
          v.controls = false;
          // remove loop so we can detect natural 'ended'
          v.loop = false;
          const p = v.play();
          if (p !== undefined) p.catch(() => { v.controls = true; });

          // start listening for ended and setup fallback timer
          startAutoAdvanceForActiveVideo();
        } else {
          // pause and reset currentTime to 0 so next play starts from beginning
          try { v.pause(); } catch (e) {}
          try { v.currentTime = 0; } catch (e) {}
          v.controls = false;
          // remove any ended listener attached earlier
          try {
            if (endedListenerRefs.current[i] && v.removeEventListener) {
              v.removeEventListener('ended', endedListenerRefs.current[i]);
              endedListenerRefs.current[i] = null;
            }
          } catch (e) {}
        }
      } catch (e) {
        // ignore individual video errors
      }
    });

    return () => {
      // don't automatically clear advance here; controlled elsewhere
    };
  }, [activeIndex, flipped]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAdvance();
      videoRefs.current.forEach((v, i) => {
        try {
          if (endedListenerRefs.current[i] && v && v.removeEventListener) v.removeEventListener('ended', endedListenerRefs.current[i]);
        } catch (e) {}
      });
    };
  }, []);

  const useWindowSize = () => {
    const isClient = typeof window === "object";
    const [size, setSize] = useState({ width: isClient ? window.innerWidth : 1200, height: isClient ? window.innerHeight : 800 });

    useEffect(() => {
      if (!isClient) return;
      const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    return size;
  };

  const { width: winW } = useWindowSize();
  const isMobile = winW < 768;

  const toggleFlip = (idx) => {
    // toggle the specified card's flip. When flipped to backside, stop the active video's play and stop auto-advance.
    setFlipped((prev) => {
      const next = prev.map((v, i) => (i === idx ? !v : v));

      const becameFlipped = !prev[idx] && next[idx];
      const becameUnflipped = prev[idx] && !next[idx];

      const vEl = videoRefs.current[idx];

      // If flipping to back: pause auto-advance and pause the video
      if (becameFlipped) {
        clearAdvance();
        if (vEl) {
          try { vEl.pause(); } catch (e) {}
        }
      }

      // If flipping back to front: resume video and restart auto-advance only if this is the active slide
      if (becameUnflipped) {
        if (vEl && idx === activeIndex) {
          try { vEl.play().catch(() => { vEl.controls = true; }); } catch (e) {}
          // restart auto advance for active video
          startAutoAdvanceForActiveVideo();
        }
      }

      return next;
    });
  };

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      <style>{`
        .gradient-text { background: linear-gradient(90deg, #7ef9b2 0%, #4ee3ff 35%, #b78bff 70%); -webkit-background-clip: text; background-clip: text; color: transparent; background-size: 200% 100%; animation: gradientShift 3.8s linear infinite; }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes floatSlight { 0% { transform: translateY(0); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0); } }
        .card-float { animation: floatSlight 6s ease-in-out infinite; }
        .glass-shine::after { content: ''; position: absolute; left: -60%; top: -40%; width: 40%; height: 180%; transform: rotate(18deg); background: linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 100%); transition: transform 650ms cubic-bezier(.2,.95,.2,.99), left 650ms cubic-bezier(.2,.95,.2,.99); pointer-events: none; opacity: 0.0; }
        .group:hover .glass-shine::after { left: 120%; opacity: 1; }
        .overlay-title { font-size: clamp(18px, 3.8vw, 28px); }
        .overlay-sub { font-size: clamp(12px, 2.6vw, 14px); }
        /* Pause keyframe animations when a card is flipped by adding this class to the root frame */
        .pause-animations .card-float { animation-play-state: paused !important; }
      `}</style>

      <div className="w-full bg-black py-20 px-6 md:px-24 lg:px-32">
        <h4 className="text-green-500 font-bold uppercase text-sm tracking-wider mb-3">Our Work</h4>
        <h2 className="about-title mb-14 text-white leading-[100%] tracking-[-2.4px] font-unique" style={{ fontSize: isMobile ? "clamp(32px, 9.5vw, 64px)" : "clamp(64px, 6vw, 120px)", lineHeight: isMobile ? "1.05" : "100%", textAlign: isMobile ? "center" : undefined, marginLeft: isMobile ? "auto" : undefined, marginRight: isMobile ? "auto" : undefined }}>
          ELEVATING
          <br /> BRANDS
        </h2>
        <p className="max-w-2xl text-gray-300" style={{ fontSize: isMobile ? "clamp(14px, 3.6vw, 16px)" : "clamp(15px, 1.6vw, 18px)", textAlign: isMobile ? "center" : "left", marginLeft: isMobile ? "auto" : undefined, marginRight: isMobile ? "auto" : undefined }}>
          At BrightLayer, we drive meaningful growth by blending innovation with strategy. Our approach transforms
          quick encounters into powerful connections — helping brands stay ahead in a fast-moving world.
        </p>
      </div>

      <div className={`relative w-full ${isMobile ? "h-[72vh]" : "h-[92vh]"} flex items-center justify-center`}>
        {items.map((it, i) => {
          const offset = (i - activeIndex) * 100;
          const isActive = i === activeIndex;

          const imgScale = isActive ? 1 : 1.18;
          const slideStyle = {
            transform: `translateX(${offset}%)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(.2,.95,.2,.99)`,
            opacity: isActive ? 1 : 0.9,
            zIndex: isActive ? 20 : 10,
            position: "sticky",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          };

          const frameStyle = {
            width: isMobile ? "100vw" : "90vw",
            height: isMobile ? "72vh" : "90vh",
            maxWidth: isMobile ? "100%" : "1400px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
            perspective: 1200,
            cursor: "pointer",
          };

          const cardInnerStyle = {
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 700ms cubic-bezier(.2,.95,.2,.99)",
            transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)",
          };

          const faceStyle = {
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          };

          const backFaceStyle = {
            ...faceStyle,
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            boxSizing: "border-box",
            background: "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
          };

          const imgStyle = {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            transition: `transform ${TRANSITION_MS + 200}ms cubic-bezier(.2,.95,.2,.99)`,
          };

          // Add a class on the frame to pause animations when this card (or any card) is flipped.
          const pauseClass = flipped[i] ? 'pause-animations' : '';

          return (
            <div key={it.id} style={slideStyle}>
              <div
                style={frameStyle}
                className={`group ${pauseClass}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleFlip(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlip(i); }}
              >
                <div style={cardInnerStyle}>
                  {/* FRONT (video) */}
                  <div style={faceStyle}>
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      src={it.img}
                      style={imgStyle}
                      muted
                      playsInline
                      // intentionally not looping: we want to advance when the video ends
                      loop={false}
                      // user clicks on the video should not trigger the flip
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 z-20" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.35) 70%, transparent 100%)', transform: `scaleX(${isActive ? 0 : 1})`, transformOrigin: 'left', transition: `transform ${Math.round(TRANSITION_MS * 0.9)}ms cubic-bezier(.2,.95,.2,.99) ${MASK_DELAY_MS}ms`, zIndex: 30 }} />

                    <div className="absolute top-6 left-6 text-3xl md:text-4xl font-bold text-white/30 z-40">{String(i + 1).padStart(2, '0')}</div>

                    <div className="absolute right-4 md:right-6 bottom-6 z-50 flex justify-end items-end" style={{ width: isMobile ? '92%' : 'auto', pointerEvents: 'none' }}>
                      <div className={`relative pointer-events-auto max-w-[86%] sm:max-w-[56%] md:max-w-[44%] lg:max-w-[34%] rounded-2xl p-4 md:p-5 backdrop-blur-md bg-black/40 border border-white/6 text-right transition-transform duration-500 ${isActive ? 'card-float' : ''} glass-shine`}>
                        <div className="flex justify-end items-center gap-3">
                          <div className="text-xs uppercase tracking-wider font-semibold text-green-300 bg-white/3 px-2 py-1 rounded-full">{it.tag}</div>
                          <div className="text-sm text-white/70">{it.year}</div>
                        </div>

                        <h3 className="overlay-title mt-3 font-extrabold gradient-text leading-tight">{it.title}</h3>

                        <p className="overlay-sub mt-2 text-gray-200/90 hidden sm:block">Quick preview — bold idea, crafted execution. Click the card to read more.</p>

                        <div className="mt-3 flex justify-end"><span className="inline-block text-sm font-semibold underline decoration-white/20">Read more</span></div>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div style={backFaceStyle}>
                    <div className="max-w-3xl text-left">
                      <div className="text-xs uppercase tracking-wide mb-3 text-green-400 font-semibold">{it.tag}</div>
                      <h3 className="text-2xl md:text-4xl font-bold mb-4">{it.title}</h3>
                      <p className="text-gray-200 mb-6">{it.description}</p>

                      <div className="flex items-center gap-6">
                        <button
                          className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
                          onClick={(e) => { e.stopPropagation(); alert('View case study: ' + it.title); }}
                        >
                          View case study
                        </button>
                        <div className="text-white/80">{it.year}</div>

                        <button
                          className="ml-auto text-sm underline"
                          onClick={(e) => { e.stopPropagation(); toggleFlip(i); }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
