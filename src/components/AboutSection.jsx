import React, { useEffect, useRef, useState  } from "react";
import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import { useNavigate } from "react-router-dom";

export default function AboutHome() {
    const navigate = useNavigate();
  const items = [
    {
      id: 0,
      img: work1,
      tag: "",
      year: "2024",
    },
    {
      id: 1,
      img: work2,
      tag: "",
      year: "2024",
    },
    {
      id: 2,
      img: work3,
      tag: "",
      year: "2024",
    },
  ];

  // company principles (title, subtitle, text, caption)
  const principles = [
    {
      heading: "Creative Groove",
      subtitle: "Rhythm in Idea and Execution",
      text:
        "We value rhythm and originality — crafting ideas that move audiences. Our creative groove keeps campaigns fresh, memorable, and emotionally resonant, ensuring brands cut through the noise and build long-term affinity.",
      caption:
        "How we work: iterative sprints, sonic thinking, and concept-led storytelling that lands across every channel.",
    },
    {
      heading: "Soul",
      subtitle: "Human Truths, Honest Stories",
      text:
        "At our core is human-centered work. Soul means empathy, authenticity, and purpose — we build narratives that connect, inspire trust, and create meaningful relationships between brands and people.",
      caption:
        "How we work: deep research, lived-experience interviews, and values-led messaging that resonates with audiences.",
    },
    {
      heading: "Focus",
      subtitle: "Clarity That Drives Results",
      text:
        "Disciplined focus turns bold ideas into measurable impact. We prioritize clarity, executional excellence, and KPI-driven thinking so creativity consistently delivers business results.",
      caption:
        "How we work: prioritized roadmaps, tight briefs, and measurement frameworks that prove real impact.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(items.map(() => false));
  const isAnimatingRef = useRef(false);

  const TRANSITION_MS = 1300;
  const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds
  const MASK_DELAY_MS = 100;

  // responsive helper
  const useWindowSize = () => {
    const [size, setSize] = useState({
      width:
        typeof window !== "undefined" ? window.innerWidth : 1200,
      height:
        typeof window !== "undefined" ? window.innerHeight : 800,
    });
    useEffect(() => {
      const onResize = () =>
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);
    return size;
  };

  const { width: winW } = useWindowSize();
  const isMobile = winW < 768;

  const isPaused = flipped.some(Boolean);

  // auto-slide (paused when flipped)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
      setFlipped(items.map(() => false));
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const toggleFlip = (idx) => {
    setFlipped((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const taglineParts = [
    "Powered by Groove.",
    "Guided by Soul.",
    "Driven by Focus.",
  ];

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* Glow & animation styles */}
      <style>{`
        .glow {
          text-shadow: 0 0 8px rgba(72, 244, 170, 0.95), 0 0 20px rgba(72, 244, 170, 0.55);
          animation: pulseGlow 2000ms infinite;
        }
        .glow-paused { animation-play-state: paused; opacity: 0.9; }
        @keyframes pulseGlow {
          0% { text-shadow: 0 0 6px rgba(72,244,170,0.6), 0 0 14px rgba(72,244,170,0.35); }
          50% { text-shadow: 0 0 14px rgba(72,244,170,0.95), 0 0 30px rgba(72,244,170,0.6); }
          100% { text-shadow: 0 0 6px rgba(72,244,170,0.6), 0 0 14px rgba(72,244,170,0.35); }
        }
      `}</style>

      {/* Intro */}
      <div className="w-full bg-black py-20 px-6 md:px-24 lg:px-32">
        <h4 className="text-green-500 font-bold uppercase text-sm tracking-wider mb-3">
          Redefining the Future of Brand Growth
        </h4>

        <h2
          className="about-title mb-6 text-white leading-[100%] tracking-[-2.4px] font-extrabold"
          style={{
            fontSize: isMobile
              ? "clamp(28px, 9vw, 48px)"
              : "clamp(48px, 6vw, 120px)",
          }}
        >
          <span className="text-[40px] md:text-[124px] lg:text-[96px] font-unique">
            WHERE PASSION
          </span>
          <br />
          <span className="text-[40px] md:text-[124px] lg:text-[96px] font-unique">
            POWERS PERFORMANCE
          </span>
        </h2>

        {/* Tagline with glow */}
        <div className="mt-4 mb-8 flex flex-col md:flex-row md:items-center md:gap-6">
          {taglineParts.map((part, idx) => {
            const isActivePart = activeIndex === idx;
            const classes = [
              "text-sm md:text-base uppercase tracking-wide font-semibold",
            ];
            if (isActivePart) classes.push("glow");
            if (isPaused) classes.push("glow-paused");
            return (
              <React.Fragment key={idx}>
                <span className={classes.join(" ")}>{part}</span>
                {idx < taglineParts.length - 1 && (
                  <span className="hidden md:inline-block text-gray-500">
                    &nbsp;•&nbsp;
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <p className="max-w-2xl text-gray-300 text-left">
          At BrightLayer, we drive meaningful growth by blending innovation
          with strategy. Our approach transforms quick encounters into powerful
          connections — helping brands stay ahead in a fast-moving world.
        </p>
      </div>

      {/* Slides */}
      <div
        className={`relative w-full ${
          isMobile ? "h-[72vh]" : "h-[92vh]"
        } flex items-center justify-center`}
      >
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

          const maskStyle = {
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.35) 70%, transparent 100%)",
            transform: `scaleX(${isActive ? 0 : 1})`,
            transformOrigin: "left",
            transition: `transform ${Math.round(
              TRANSITION_MS * 0.9
            )}ms cubic-bezier(.2,.95,.2,.99) ${MASK_DELAY_MS}ms`,
            zIndex: 30,
          };

          const cardInnerStyle = {
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition:
              "transform 700ms cubic-bezier(.2,.95,.2,.99)",
            transform: flipped[i]
              ? "rotateY(180deg)"
              : "rotateY(0deg)",
          };

          const faceStyle = {
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
          };

          const backFaceStyle = {
            ...faceStyle,
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            boxSizing: "border-box",
          };

          const imgStyle = {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            transition: `transform ${TRANSITION_MS + 200}ms cubic-bezier(.2,.95,.2,.99)`,
          };

          return (
            <div key={it.id} style={slideStyle}>
              <div
                style={frameStyle}
                onClick={() => toggleFlip(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    toggleFlip(i);
                }}
              >
                {/* card inner */}
                <div style={cardInnerStyle}>
                  {/* FRONT */}
                  <div style={faceStyle}>
                    <img
                      src={it.img}
                      alt={it.tag}
                      style={imgStyle}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-20" />
                    <div style={maskStyle} />
                    <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                      <div className="text-center">
                        <div className="text-3xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight">
                          {it.tag}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-6 left-6 text-3xl md:text-4xl font-bold text-white/30 z-40">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute bottom-6 left-6 z-40 text-sm text-gray-200/70">
                      Click to flip
                    </div>
                  </div>

                  {/* BACK */}
                  <div style={backFaceStyle}>
                    <div className="max-w-3xl text-left">
                      <div className="text-xs uppercase tracking-wide mb-3 text-green-400 font-semibold">
                        {it.tag}
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold mb-2">
                        {principles[i].heading}
                      </h3>
                      <h4 className="text-sm md:text-base text-gray-300 mb-4 font-medium">
                        {principles[i].subtitle}
                      </h4>
                      <p className="text-gray-200 mb-4">
                        {principles[i].text}
                      </p>
                      <div className="text-xs text-gray-400 italic mb-6">
                        {principles[i].caption}
                      </div>
                      <div className="flex items-center gap-6">
                      
                        <div className="text-white/80">
                          {it.year}
                        </div>
                        <button
                          className="ml-auto text-sm underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip(i);
                          }}
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
