import React, { useState, useEffect, useRef } from "react";
import layeredVideo from "../assets/layered.mp4";

function Header() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    budget: "",
    timeline: "",
    services: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [animateDetails, setAnimateDetails] = useState(false);
  const [textPositions, setTextPositions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // ---------- Refs ----------
  var formRef = useRef(null);
  var hasAutoScrolled = useRef(false); // ensure auto-scroll runs only once
  var autoScrollTimer = useRef(null);

  // ---------- Responsive helper ----------
  const useWindowSize = function () {
    const [size, setSize] = useState({
      width: 1200,
      height: 800,
    });

    useEffect(function () {
      setIsClient(true);
      setSize({ width: window.innerWidth, height: window.innerHeight });

      var onResize = function () {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", onResize);
      return function () {
        window.removeEventListener("resize", onResize);
      };
    }, []);
    return size;
  };

  var winSize = useWindowSize();
  var winW = winSize.width;
  var isMobile = isClient && winW < 768;
  var isTablet = isClient && winW >= 768 && winW < 1024;
  var showFormDesktop = isClient && winW >= 1024;

  useEffect(function () {
    var id = "font-anton-google";
    if (!document.getElementById(id)) {
      var link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(function () {
    var timer = setTimeout(function () {
      setAnimateDetails(true);
    }, 1500);
    return function () {
      clearTimeout(timer);
    };
  }, []);

  useEffect(
    function () {
      if (animateDetails) {
        var positions = offsets.map(function () {
          return {
            x: Math.random() * 40 - 20,
            y: Math.random() * 36 - 18,
            scale: Math.random() * 0.2 + 0.95,
            rotation: Math.random() * 6 - 3,
          };
        });
        setTextPositions(positions);
      }
    },
    [animateDetails]
  );

  var API_BASE = "https://thebrightlayerbackend.onrender.com" || "http://localhost:5000";
  var ENDPOINT = API_BASE + "/api/sendMail/send-proposal";

  var handleChange = function (e) {
    var name = e.target.name;
    var value = e.target.value;
    setFormState(function (s) {
      var next = Object.assign({}, s);
      next[name] = value;
      return next;
    });
  };

  var validEmail = function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  };

  var handleSubmit = async function (e) {
    e.preventDefault();
    setStatus(null);
    if (!formState.name.trim()) return setStatus({ type: "error", text: "Please enter your name." });
    if (!formState.email.trim() || !validEmail(formState.email))
      return setStatus({ type: "error", text: "Please enter a valid email." });
    if (!formState.message.trim()) return setStatus({ type: "error", text: "Please enter a short message." });

    setLoading(true);

    var payload = {
      fromName: formState.name,
      fromEmail: formState.email,
      to: ["contact@thebrightlayer.com", "ritik210797@gmail.com"],
      cc: "",
      subject: "Website inquiry: " + (formState.company || formState.name),
      intro: "Thanks " + formState.name + "! We've received your inquiry and will reply shortly.",
      quickIntro: (formState.company ? formState.company + " \u2014 " : "") + "Thanks for contacting us via the site.",
      introInternal: "New website inquiry from " + formState.name,
      quickIntroInternal: (formState.company ? formState.company + " \u2014 " : "") + "Contact via header form.",
      highlights: [],
      scope: "",
      message:
        "Phone: " +
        formState.phone +
        "\nWebsite: " +
        formState.website +
        "\nBudget: " +
        formState.budget +
        "\nTimeline: " +
        formState.timeline +
        "\nServices: " +
        formState.services +
        "\n---\n" +
        formState.message,
      attachments: ["Digital-Marketing-Portfolio.pdf"],
    };

    try {
      var res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      var contentType = res.headers.get("content-type") || "";
      var data;
      if (contentType.indexOf("application/json") !== -1) data = await res.json();
      else data = { statusText: await res.text() };

      if (!res.ok) {
        var errMsg = (data && (data.error || data.details || data.statusText)) || "Server error";
        throw new Error(errMsg);
      }

      setStatus({
        type: "success",
        text: (data && (data.message || data.statusText)) || "Thanks \u2014 your message was sent. We'll reply within 24 hours.",
      });
      setFormState({
        name: "",
        email: "",
        company: "",
        phone: "",
        website: "",
        budget: "",
        timeline: "",
        services: "",
        message: "",
      });
    } catch (err) {
      console.error("Send error:", err);
      setStatus({ type: "error", text: err.message || "Failed to send. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  // ---------- Scrolling animation utility ----------
  var smoothScrollTo = function (targetY, duration, onDone) {
    if (typeof duration === "undefined") duration = 700;
    var startY = window.scrollY || window.pageYOffset || 0;
    var diff = targetY - startY;
    var startTime = performance.now();

    var easeInOutCubic = function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    var step = function (now) {
      var elapsed = now - startTime;
      var t = Math.min(1, elapsed / duration);
      var eased = easeInOutCubic(t);
      window.scrollTo(0, Math.round(startY + diff * eased));
      if (t < 1) requestAnimationFrame(step);
      else if (typeof onDone === "function") onDone();
    };

    requestAnimationFrame(step);
  };

  // ---------- Auto-scroll to form after 1s on text ----------
  useEffect(
    function () {
      if (!isClient) return;

      // don't run if we've already auto-scrolled
      if (hasAutoScrolled.current) return;

      // set timer for 1 second (1000ms)
      autoScrollTimer.current = setTimeout(function () {
        // if user has already scrolled more than a small threshold, do not auto-scroll
        var currentScroll = window.scrollY || window.pageYOffset || 0;
        if (currentScroll > 40) {
          hasAutoScrolled.current = true;
          return;
        }

        var targetTop = null;
        if (formRef && formRef.current) {
var rect = formRef.current.getBoundingClientRect();
targetTop = rect.top + (window.scrollY || window.pageYOffset || 0) - window.innerHeight * 0.12;

        } else {
          // fallback: scroll one viewport height
          targetTop = window.innerHeight;
        }

        // perform smooth scroll and mark as done
        smoothScrollTo(targetTop, 800, function () {
          hasAutoScrolled.current = true;
        });
      }, 1000);

      // cleanup
      return function () {
        if (autoScrollTimer.current) {
          clearTimeout(autoScrollTimer.current);
          autoScrollTimer.current = null;
        }
      };
    },
    [isClient]
  );

  // ---------- Floating trigger + visibility (restored) ----------
  var [showFloatingTrigger, setShowFloatingTrigger] = useState(false);

  useEffect(
    function () {
      if (!isClient) return;
      var mounted = true;
      var computeThreshold = function () {
        return Math.round(window.innerHeight * 1.8);
      };

      var onScroll = function () {
        var top = window.scrollY || window.pageYOffset || 0;
        var threshold = computeThreshold();
        if (!mounted) return;
        if (top > threshold) setShowFloatingTrigger(true);
        else setShowFloatingTrigger(false);
      };

      var onResize = function () {
        onScroll();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      onScroll();

      return function () {
        mounted = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    },
    [isClient]
  );

  // ---------- Floating stamp behavior ----------
  var [isStamping, setIsStamping] = useState(false);
  var floatingBtnRef = useRef(null);

  var onFloatingClick = function () {
    // scroll to form using ref when floating button is clicked
    var target = Math.round(window.innerHeight * 0.75);
    if (formRef && formRef.current) {
      var rect = formRef.current.getBoundingClientRect();
      target = rect.top + (window.scrollY || window.pageYOffset || 0) - 20;
    }

    setIsStamping(true);
    smoothScrollTo(target, 800, function () {
      var first = document.querySelector("#hero-contact-form input, #hero-contact-form textarea, #hero-contact-form select");
      if (first) first.focus({ preventScroll: true });
    });

    window.setTimeout(function () {
      setIsStamping(false);
    }, 900);
  };

  // ----- small helpers reused in UI (offsets, card hover, etc.) -----
  var fontNames = ["Moustache You", "Olympic", "TheMusicDemoRegular", "RougeVintage", "Unique Rose"];
  var [fontTick, setFontTick] = useState(0);
  var [isFontPaused, setIsFontPaused] = useState(false);

  useEffect(
    function () {
      if (!animateDetails) return;
      if (isFontPaused) return;
      var interval = setInterval(function () {
        setFontTick(function (n) {
          return (n + 1) % fontNames.length;
        });
      }, 1800);
      return function () {
        clearInterval(interval);
      };
    },
    [animateDetails, isFontPaused]
  );

  var offsets = [0, 1, 2, 3];
  var textLines = ["Strategy & Design", "Development", "Brand Identity", "Digital Experience"];

  var [pendingIndex, setPendingIndex] = useState(null);
  var [hoveredIndex, setHoveredIndex] = useState(null);
  var [cardPos, setCardPos] = useState({ left: 0, top: 0 });
  var hoverRefs = useRef([]);
  var delayTimer = useRef(null);
  var hideTimer = useRef(null);

  var cardDetails = [
    {
      title: "Strategy & Design",
      body:
        "We research, define product direction, and craft pixel-perfect visual systems \u2014 from IA and UX through refined UI and motion. We focus on measurable outcomes: conversion, retention, and brand clarity.",
      bullets: ["UX research & prototyping", "Visual systems & design systems", "Product strategy & roadmaps"],
    },
    {
      title: "Development",
      body:
        "Modern front-end and backend engineering \u2014 performant, accessible, and scalable. We ship production apps with clean APIs, testing, and CI/CD in place.",
      bullets: ["React / Next.js / TypeScript", "API design & integrations", "Performance & accessibility"],
    },
    {
      title: "Brand Identity",
      body: "From naming to identity systems, we make brands that feel distinct and flexible across digital and print touchpoints.",
      bullets: ["Logo & marks", "Guidelines & assets", "Tone of voice & messaging"],
    },
    {
      title: "Digital Experience",
      body: "End-to-end digital product design and optimization \u2014 landing pages, marketing sites, and web apps built for growth and clarity.",
      bullets: ["Landing page design", "Conversion optimization", "Analytics & experimentation"],
    },
  ];

  var positionCardForIndex = function (index) {
    var el = hoverRefs.current[index];
    if (!el) return;
    var rect = el.getBoundingClientRect();
    setCardPos({ left: rect.left + rect.width / 2, top: rect.bottom + 8 + window.scrollY });
  };

  var handleEnter = function (index) {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setPendingIndex(index);
    if (delayTimer.current) clearTimeout(delayTimer.current);
    delayTimer.current = setTimeout(function () {
      setHoveredIndex(index);
      setIsFontPaused(true);
      positionCardForIndex(index);
      delayTimer.current = null;
      setPendingIndex(null);
    }, 500);
  };

  var handleLeaveText = function () {
    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
      delayTimer.current = null;
      setPendingIndex(null);
    }
    if (hoveredIndex !== null) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(function () {
        setHoveredIndex(null);
        setIsFontPaused(false);
        hideTimer.current = null;
      }, 180);
    }
  };

  var handleCardEnter = function () {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };
  var handleCardLeave = function () {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(function () {
      setHoveredIndex(null);
      setIsFontPaused(false);
      hideTimer.current = null;
    }, 180);
  };

  useEffect(
    function () {
      if (hoveredIndex === null) return;
      var onScroll = function () {
        positionCardForIndex(hoveredIndex);
      };
      var onResize = function () {
        positionCardForIndex(hoveredIndex);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      return function () {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    },
    [hoveredIndex]
  );

  // ---------- BUILD formNode once (semi-transparent so video shows underneath) ----------
  var formNode = (
    <form
      id="hero-contact-form"
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full mt-8 font-anatson sm:mt-10 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl bg-white/6 backdrop-blur-md transition-all duration-300"
      aria-label="Hero contact form"
      style={{ minHeight: "auto" }}
    >
      <h3 className="text-left text-xl sm:text-2xl font-anatson text-white/90 mb-2">
        Request a Free Quote :
        <p className="text-left font-anatson text-sm text-white/70 mb-4">
          Share a few details about your project and goals — we’ll prepare a tailored proposal and estimate.
        </p>
      </h3>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 h-full">
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div className="relative col-span-1 sm:col-span-2 md:col-span-1">
              <input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                aria-required="true"
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow text-lg sm:text-base"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400"
              >
                Name <span className="text-green-400">*</span>
              </label>
            </div>

            <div className="relative col-span-1 sm:col-span-2 md:col-span-1">
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                aria-required="true"
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow text-lg sm:text-base"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400"
              >
                Email <span className="text-green-400">*</span>
              </label>
            </div>

            <div className="relative col-span-1 sm:col-span-1">
              <input
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow text-lg sm:text-base"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400"
              >
                Phone
              </label>
            </div>

            <div className="relative col-span-1 sm:col-span-1">
              <input
                id="website"
                name="website"
                value={formState.website}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow text-lg sm:text-base"
                placeholder=" "
              />
              <label
                htmlFor="website"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400"
              >
                Website
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            <div className="relative">
              <input
                id="company"
                name="company"
                value={formState.company}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow text-lg sm:text-base"
                placeholder=" "
              />
              <label
                htmlFor="company"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400"
              >
                Company
              </label>
            </div>

            <div className="relative">
              <select
                id="budget"
                name="budget"
                value={formState.budget}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow appearance-none cursor-pointer hover:bg-white/10 text-lg sm:text-base"
              >
                <option value="" hidden />
                <option className="bg-green-950/40" value=">$50k">
                  &gt;$50k
                </option>
                <option className="bg-green-950/40" value="<$5k">
                  &lt;$5k
                </option>
                <option className="bg-green-950/40" value="$5k-$15k">
                  $5k-$15k
                </option>
                <option className="bg-green-950/40" value="$15k-$50k">
                  $15k-$50k
                </option>
              </select>
              <label
                htmlFor="budget"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-1/2"
              >
                Budget
              </label>
            </div>

            <div className="relative">
              <select
                id="timeline"
                name="timeline"
                value={formState.timeline}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow appearance-none cursor-pointer hover:bg-white/10 text-lg sm:text-base"
              >
                <option value="" hidden />
                <option className="bg-green-950/40" value="Immediate">
                  Immediate (0-4 weeks)
                </option>
                <option className="bg-green-950/40" value="1-3 months">
                  1-3 months
                </option>
                <option className="bg-green-950/40" value="3-6 months">
                  3-6 months
                </option>
                <option className="bg-green-950/40" value=">6 months">
                  &gt;6 months
                </option>
              </select>
              <label
                htmlFor="timeline"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-1/2"
              >
                Timeline
              </label>
            </div>
          </div>

          <div className="mt-2 relative">
            <select
              id="services"
              name="services"
              value={formState.services}
              onChange={handleChange}
              className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow appearance-none cursor-pointer hover:bg-white/10 text-lg sm:text-base"
            >
              <option value="" hidden />
              <option className="bg-green-950/40" value="web-development">
                Web Development
              </option>
              <option className="bg-green-950/40" value="design">
                Design (UI/UX)
              </option>
              <option className="bg-green-950/40" value="mobile-app">
                Mobile App
              </option>
              <option className="bg-green-950/40" value="seo-marketing">
                SEO / Marketing
              </option>
              <option className="bg-green-950/40" value="consulting">
                Consulting
              </option>
            </select>
            <label
              htmlFor="services"
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm z-10 pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-1/2"
            >
              Services Needed
            </label>
          </div>

        </div>

        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1 flex-1 relative">
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={4}
              className="peer flex-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow resize-none text-lg sm:text-base"
              placeholder=" "
            />
            <label
              htmlFor="message"
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2  px-2 text-white/80 text-sm sm:text-sm z-10 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400"
            >
              Your Message
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {loading ? (
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 min-w-[120px] rounded-xl px-5 py-3 font-semibold text-black shadow-lg transition-transform duration-200 text-sm sm:text-base bg-green-300 cursor-not-allowed"
              >
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Sending...
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 min-w-[120px] rounded-xl px-5 py-3 font-semibold text-black shadow-lg transition-transform duration-200 text-sm sm:text-base bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            )}

            <div className="text-xs sm:text-sm text-white/70 flex items-center gap-1 justify-center sm:justify-start">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-center sm:text-left">We usually reply within 24 hours</span>
            </div>
          </div>

          {status && (
            <div
              className={
                "mt-1 text-xs sm:text-sm " +
                (status.type === "error" ? "text-red-400" : "text-green-300") +
                " font-medium flex items-center gap-2 justify-center sm:justify-start"
              }
            >
              {status.type === "error" ? (
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 sm:w-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {status.text}
            </div>
          )}
        </div>
      </div>
    </form>
  );

  // ---------- Hero + form inside same section so video is background for both ----------
  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* video covers the whole section */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            src={layeredVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover min-h-full min-w-full"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* content (z-20) */}
        <div className="relative z-20 w-[95vw] sm:w-[90vw] max-w-[1400px] mx-auto px-4 sm:px-0">
          {/* Hero block: fills first viewport */}
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h4 className="text-green-500 mb-5 font-bold uppercase text-xs sm:text-sm tracking-wider text-center">
              Redefining the future of Brand Growth
            </h4>

            <div className="flex justify-center w-full">
              <h2 className="about-title mb-2 text-white leading-[100%] font-extrabold text-center">
                <div className="relative inline-block text-left">
                  {!isClient ? (
                    <div
                      style={{
                        fontFamily: "'Anton', 'Futura', sans-serif",
                        fontWeight: 900,
                        fontSize: "64px",
                        lineHeight: "0.85",
                        color: "#fff",
                        letterSpacing: "-0.02em",
                        visibility: "hidden",
                      }}
                    >
                      <div className="block">WHERE</div>
                      <div className="block mt-2">AMBITION</div>
                      <div className="block mt-4">MEETS</div>
                      <div className="block mt-2">TRUE</div>
                      <div className="block mt-2">ACCELERATION</div>
                    </div>
                  ) : isMobile ? (
                    <div
                      style={{
                        fontFamily: "'Anton', 'Futura', sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(64px, 12vw, 92px)",
                        lineHeight: "0.85",
                        color: "#fff",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <div className="block">WHERE</div>
                      <div className="block mt-2">AMBITION</div>
                      <div className="block mt-4">MEETS</div>
                      <div className="block mt-2">TRUE</div>
                      <div className="block mt-2">ACCELERATION</div>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontFamily: "'Anton', 'Futura', sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(124px, 10vw, 140px)",
                        lineHeight: "0.9",
                        color: "#fff",
                      }}
                    >
                      <div>WHERE AMBITION</div>
                      <div>MEETS TRUE ACCELERATION</div>
                    </div>
                  )}

                  {isClient && (
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        transform: isMobile ? "translateY(2px) scaleY(1.1)" : "translateY(4px) scaleY(1.2)",
                        opacity: isMobile ? 0.25 : 0.35,
                        background:
                          "linear-gradient(to bottom, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.9) 60%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, white 60%, white 100%)",
                        maskImage: "linear-gradient(to bottom, transparent 10%, white 60%, white 100%)",
                      }}
                    >
                      {isMobile ? (
                        <div
                          style={{
                            fontFamily: "'Anton', 'Futura', sans-serif",
                            fontWeight: 900,
                            fontSize: "clamp(64px, 12vw, 92px)",
                            lineHeight: "0.85",
                            color: "#10B981",
                            transform: "scaleY(1.05)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          <div className="block">WHERE</div>
                          <div className="block mt-2">AMBITION</div>
                          <div className="block mt-4">MEETS</div>
                          <div className="block mt-2">TRUE</div>
                          <div className="block mt-2">ACCELERATION</div>
                        </div>
                      ) : (
                        <div
                          style={{
                            fontFamily: "'Anton', 'Futura', sans-serif",
                            fontWeight: 900,
                            fontSize: "clamp(124px, 10vw, 140px)",
                            lineHeight: "0.9",
                            color: "#10B981",
                            transform: "scaleY(1.1)",
                          }}
                        >
                          <div>WHERE AMBITION</div>
                          <div>MEETS TRUE ACCELERATION</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </h2>
            </div>
          </div>

          {/* Form block: immediately below hero but still inside section so video is background */}
          <div className="w-full max-w-[900px] mx-auto -mt-6 mb-12 px-4 sm:px-0">
            {formNode}
          </div>
        </div>

        {/* hover card */}
        {hoveredIndex !== null && (
          <div
            role="dialog"
            aria-label={cardDetails[hoveredIndex].title + " details"}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
            className="fixed z-40 max-w-[360px] w-[86vw] md:w-[340px] p-4 md:p-5 bg-white/6 backdrop-blur rounded-2xl border border-white/8 shadow-2xl transform transition-all duration-250 ease-out"
            style={{
              left: cardPos.left + "px",
              top: cardPos.top + "px",
              transform: "translate(-50%, 8px) scale(1)",
              opacity: 1,
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h5 className="text-white font-semibold text-base">{cardDetails[hoveredIndex].title}</h5>
                <p className="text-white/75 text-sm mt-2">{cardDetails[hoveredIndex].body}</p>
                <ul className="mt-3 text-sm text-white/80 list-disc pl-4 space-y-1">
                  {cardDetails[hoveredIndex].bullets.map(function (b, i) {
                    return (
                      <li key={i}>
                        {b}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="hidden md:flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* floating circular button */}
        {showFloatingTrigger && (
          <>
            <style>{"\n            @keyframes idle-rotate { 0% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } 100% { transform: rotate(-6deg); } }\n            @keyframes stamp-rotate { 0% { transform: rotate(0deg) scale(1); } 60% { transform: rotate(360deg) scale(0.86); } 100% { transform: rotate(324deg) scale(1); } }\n            @keyframes stamp-scale { 0% { transform: scale(1); } 50% { transform: scale(0.84); } 100% { transform: scale(1); } }\n            .floating-btn { transition: transform 160ms ease, box-shadow 160ms ease; will-change: transform; box-shadow: 0 10px 30px rgba(6,95,70,0.18); }\n            .floating-btn:active { transform: translateY(1px) scale(0.98); box-shadow: 0 6px 18px rgba(6,95,70,0.12); }\n            .idle-rot { animation: idle-rotate 2400ms ease-in-out infinite; transform-origin: 50% 50%; }\n            .stamping { animation: stamp-rotate 820ms cubic-bezier(.2,.9,.3,1) forwards; transform-origin: 50% 50%; }\n            .stamp-echo { position: absolute; inset: 0; border-radius: 9999px; opacity: 0.06; pointer-events: none; transform-origin: 50% 50%; animation: stamp-scale 820ms cubic-bezier(.2,.9,.3,1) forwards; }\n          "}</style>

            <button
              ref={floatingBtnRef}
              aria-label="Get Free Quote \u2014 scroll to form"
              onClick={onFloatingClick}
              className={
                "fixed z-50 right-6 bottom-6 w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-black flex flex-col items-center justify-center floating-btn " +
                (isStamping ? "stamping" : "idle-rot")
              }
              title="Get Free Quote"
              style={{ outline: "none" }}
            >
              {isStamping && <span className="stamp-echo bg-black/10 rounded-full" />}

              <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 2H8a2 2 0 00-2 2v16l6-3 6 3V4a2 2 0 00-2-2z" />
              </svg>

              <span className="text-[12px] leading-none font-semibold">Get Free</span>
              <span className="text-[12px] leading-none font-semibold">Quote</span>
            </button>
          </>
        )}
      </section>
    </>
  );
}

export default Header;
