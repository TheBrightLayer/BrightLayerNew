import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import aboutImg from "../assets/prismHero2.jpg";
import t1 from "../assets/sanjana.jpg";
import t2 from "../assets/Kapisha.jpg";
import t3 from "../assets/sweety.jpg";
import t4 from "../assets/ritik.jpg";
import t5 from "../assets/juhi.png";
import t6 from "../assets/varsha.png";
import t7 from "../assets/akshit.png";
import t8 from "../assets/tanisha.png";

export default function About() {
  // Add optional `focus` for each image (object-position). Tweak per-photo if needed.
  const teamMembers = [
    { id: 0, img: t1, name: "Sanjana Arora", role: "Marketing Lead", tag: "Design", year: "2025", description: "Crafts beautiful campaigns that people love. Transforms briefs into soulful visual systems.", focus: "center 20%" },
    { id: 1, img: t2, name: "Kapisha Gautam", role: "Team Lead", tag: "Marketing", year: "2025", description: "Builds resilient, scalable products. Turns complex problems into elegant code.", focus: "center 24%" },
    { id: 2, img: t3, name: "Sweety Manchandani", role: "Social Media Manager", tag: "Strategy", year: "2025", description: "Finds the north star in noisy markets. Aligns business goals with meaningful work.", focus: "center 22%" },
    { id: 3, img: t4, name: "Ritik Sinha", role: "Project Manager", tag: "Delivery", year: "2025", description: "Keeps teams shipping on time and happy. Turns chaos into predictable delivery.", focus: "center 18%" },
    { id: 4, img: t5, name: "Juhi Gangwani", role: "SEM Expert", tag: "Data", year: "2025", description: "Finds signal inside the noise. Turns insights into action and impact.", focus: "center 22%" },
    { id: 5, img: t6, name: "Versha Verma", role: "Frontend Engineer", tag: "Engineering", year: "2025", description: "Designs experiments that scale growth.Turns complex problems into elegant code.", focus: "center 22%" },
    { id: 6, img: t7, name: "Akshit Verma", role: "Frontend Engineer", tag: "Frontend", year: "2025", description: "Brings motion and micro-interactions to life. Obsessed with pixel-perfect experiences.", focus: "center 20%" },
    { id: 7, img: t8, name: "Tanisha Srivastava", role: "Full Stack Developer", tag: "Code", year: "2025", description: "Writes code that converts and delights. Builds products that scale across channels.", focus: "center 22%" },
  ];

  // tuned timings (slower & smoother)
  const TRANSITION_MS = 1100; // slower
  const MASK_DELAY_MS = 220;
  const AUTO_SLIDE_INTERVAL = 5000; // 11 seconds (longer, smoother)

  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(teamMembers.map(() => false));

  const flipTimeoutRef = useRef(null);
  const unflipTimeoutRef = useRef(null);
  const cycleIntervalRef = useRef(null);

  // preload images
  useEffect(() => {
    teamMembers.forEach((m) => { const im = new Image(); im.src = m.img; });
  }, []);

  // window size hook
  const useWindowSize = () => {
    const isClient = typeof window === "object";
    const [size, setSize] = useState({ width: isClient ? window.innerWidth : 1200, height: isClient ? window.innerHeight : 800 });

    useEffect(() => {
      if (!isClient) return;
      let rafId = null;
      const onResize = () => {
        // use rAF to avoid multiple forced reflows on heavy resize
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => setSize({ width: window.innerWidth, height: window.innerHeight }));
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, []);

    return size;
  };

  const { width: winW } = useWindowSize();
  const isMobile = winW < 768;

  // automatic cycling
  useEffect(() => {
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);

    cycleIntervalRef.current = setInterval(() => {
      setActiveIndex((p) => (p + 1) % teamMembers.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
      if (unflipTimeoutRef.current) clearTimeout(unflipTimeoutRef.current);
    };
  }, []);

  // when activeIndex changes, flip the active card automatically then unflip shortly before next slide
  useEffect(() => {
    // clear any existing
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    if (unflipTimeoutRef.current) clearTimeout(unflipTimeoutRef.current);

    // reset flips
    setFlipped(teamMembers.map(() => false));

    // flip after the slide transition has settled a bit
    flipTimeoutRef.current = setTimeout(() => {
      setFlipped((prev) => prev.map((v, i) => (i === activeIndex ? true : v)));
    }, Math.round(TRANSITION_MS * 0.5));

    // unflip shortly before the next auto-slide
    unflipTimeoutRef.current = setTimeout(() => {
      setFlipped((prev) => prev.map((v, i) => (i === activeIndex ? false : v)));
    }, AUTO_SLIDE_INTERVAL - 1000);

    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
      if (unflipTimeoutRef.current) clearTimeout(unflipTimeoutRef.current);
    };
  }, [activeIndex]);

  const toggleFlip = useCallback((idx) => {
    setFlipped((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  }, []);

  return (
    <section className="relative w-full bg-white text-black overflow-hidden py-20 px-6 md:px-24 lg:px-32 min-h-screen">
      <style>{`
        .gradient-text { background: linear-gradient(90deg, #7ef9b2 0%, #4ee3ff 35%, #b78bff 70%); -webkit-background-clip: text; background-clip: text; color: transparent; background-size: 200% 100%; animation: gradientShift 6s linear infinite; }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes floatSlight { 0% { transform: translateY(0); } 50% { transform: translateY(-4px); } 100% { transform: translateY(0); } }
        .card-float { animation: floatSlight 9s ease-in-out infinite; }
        .glass-shine::after { content: ''; position: absolute; left: -60%; top: -40%; width: 40%; height: 180%; transform: rotate(18deg); background: linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 100%); transition: transform 850ms cubic-bezier(.2,.95,.2,.99), left 850ms cubic-bezier(.2,.95,.2,.99); pointer-events: none; opacity: 0.0; }
        .group:hover .glass-shine::after { left: 120%; opacity: 1; }
        .overlay-title { font-size: clamp(18px, 3.8vw, 28px); }
        .overlay-sub { font-size: clamp(12px, 2.6vw, 14px); }
      `}</style>

      <div className="w-full bg-white py-6 md:py-10 px-0 md:px-6 lg:px-12">
        <h4 className="about-label mb-3 text-center">ABOUT US</h4>

        <h2
          className="about-title mb-8 text-black leading-[100%] tracking-[-2.4px] font-unique"
          style={{
            fontSize: isMobile ? "clamp(28px, 8.5vw, 56px)" : "clamp(64px, 6vw, 120px)",
            lineHeight: isMobile ? "1.02" : "100%",
            textAlign: isMobile ? "center" : undefined,
          }}
        >
          FUELING <br /> TRANSFORMATION
        </h2>

        <p
          className="max-w-2xl text-gray-700 mb-6"
          style={{
            fontSize: isMobile ? "clamp(14px, 3.6vw, 16px)" : "clamp(15px, 1.6vw, 18px)",
            textAlign: isMobile ? "center" : "left",
            marginLeft: isMobile ? "auto" : undefined,
            marginRight: isMobile ? "auto" : undefined,
          }}
        >
          We unite culture, creativity, technology and data to create brand experiences that matter. Meet the people who make it happen.
        </p>
      </div>

      {/* carousel container: make overflow-hidden so cards don't escape the frame */}
      <div className={`relative w-full ${isMobile ? "h-[72vh]" : "h-[92vh]"} flex items-center justify-center overflow-hidden`}>
        {teamMembers.map((it, i) => {
          // center each slide by positioning at 50% and translating
          const leftPercent = (i - activeIndex) * 100;
          const isActive = i === activeIndex;

          // less zoom to avoid aggressive cropping and jitter
          const imgScale = isActive ? 1 : 1.03;

          const slideStyle = {
            left: `50%`,
            transform: `translateX(${leftPercent - 50}%) translateZ(0)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.2,1), opacity ${Math.round(TRANSITION_MS * 0.6)}ms ease`,
            opacity: isActive ? 1 : 0.95,
            zIndex: isActive ? 20 : 10,
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            boxSizing: "border-box",
            willChange: "transform, opacity",
          };

          const frameStyle = {
            width: isMobile ? "100vw" : "90vw",
            height: isMobile ? "72vh" : "90vh",
            maxWidth: isMobile ? "100%" : "1400px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.12)",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
            perspective: 1400,
            cursor: "pointer",
            background: "#fff",
          };

          const cardInnerStyle = {
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: `transform 950ms cubic-bezier(.18,.9,.2,1)`,
            transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)",
            willChange: "transform",
            transformOrigin: "center center",
          };

          const faceStyle = {
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          };

          const objectPos = it.focus ?? (isMobile ? "center center" : "center 22%");

          const imgStyle = {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: objectPos,
            transform: `scale(${imgScale}) translateZ(0)`,
            transition: `transform ${TRANSITION_MS + 200}ms cubic-bezier(.22,.9,.2,1)`,
            willChange: "transform",
          };

          return (
            <div key={it.id} style={slideStyle}>
              <div
                style={frameStyle}
                className="group"
                role="button"
                tabIndex={0}
                onClick={() => toggleFlip(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleFlip(i); }}
              >
                <div style={cardInnerStyle}>
                  {/* FRONT */}
                  <div style={faceStyle}>
                    <img src={it.img} alt={it.name} style={imgStyle} />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/6 via-white/10 to-white/30 z-20" />

                    <div className="absolute top-6 left-6 text-3xl md:text-4xl font-bold text-black/20 z-40">{String(i + 1).padStart(2, "0")}</div>

                    <div className="absolute right-4 md:right-6 bottom-6 z-50 flex justify-end items-end" style={{ width: isMobile ? "92%" : "auto", pointerEvents: "none" }}>
                      <div className={`relative pointer-events-auto max-w-[86%] sm:max-w-[56%] md:max-w-[44%] lg:max-w-[34%] rounded-2xl p-4 md:p-5 backdrop-blur-md bg-white/80 border border-black/6 text-right transition-transform duration-300 ${isActive ? "card-float" : ""} glass-shine`} style={{ transitionTimingFunction: "cubic-bezier(.25,.9,.2,1)" }}>
                        <div className="flex justify-end items-center gap-3">
                          <div className="text-xs uppercase tracking-wider font-semibold text-green-600 bg-black/3 px-2 py-1 rounded-full">{it.tag}</div>
                          <div className="text-sm text-black/60">{it.year}</div>
                        </div>

                        <h3 className="overlay-title mt-3 font-extrabold gradient-text leading-tight text-black">{it.name} — <span className="text-black/70 font-semibold">{it.role}</span></h3>

                        <p className="overlay-sub mt-2 text-black/60 hidden sm:block">Quick preview — click to flip for more about what they bring.</p>

                        <div className="mt-3 flex justify-end"><span className="inline-block text-sm font-semibold underline decoration-black/10">Read more</span></div>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div style={{ position: "absolute", inset: 0, transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                    {/* blurred background image */}
                    <img
                      src={it.img}
                      alt="bg"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: objectPos,
                        filter: "blur(8px) brightness(0.64)",
                        transform: "scale(1.06) translateZ(0)",
                        transition: `filter ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
                        willChange: "filter, transform",
                      }}
                    />

                    {/* subtle overlay to lift content */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.35))" }} />

                    <div style={{ position: "relative", zIndex: 40, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 24 : 40, boxSizing: "border-box" }}>
                      <div className="max-w-3xl text-left text-white" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.6)" }}>
                        <div className="text-xs uppercase tracking-wide mb-3 text-green-300 font-semibold">{it.tag}</div>
                        <h3 className="text-2xl md:text-4xl font-bold mb-4">{it.name} — {it.role}</h3>
                        <p className="mb-6" style={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}>{it.description}</p>

                        <div className="flex items-center gap-6">
                          <button
                            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); alert("Contact: " + it.name); }}
                          >
                            Contact
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
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <Link to="/work/meet-the-team" className="about-link">About</Link>
      </div>
    </section>
  );
}
