// src/components/HomeHeroAbout.js
import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/prism2.mp4"; // hero video
import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import Stats from "../components/stats";
import AwardsSection from "../components/awardsSection";
import Brand from "../components/brand";
import Leadership from "../components/leadership";

export default function AboutPage() {
  const featured = [
    // {
    //   id: 0,
    //   img: work1,
    //   tag: "FMCG",
    //   title: "Giving Gamers the Power to Skip a Shower",
    //   year: "2024",
    //   link: "/work/power-to-gamers", // maps to case-study-power-to-gamers.jsx
    // },
    {
      id: 0,
      img: work2,
      tag: "Real-Estate",
      title: "Full Funnel SEO Strategy Drives Incremental Traffic",
      year: "2024",
      link: "/work/dubai-properties-seo-strategy", // dubai-properties-seo-strategy.jsx
    },
    // {
    //   id: 2,
    //   img: work3,
    //   tag: "FMCG",
    //   title: "A Bold Brand Activation That Stood Out",
    //   year: "2024",
    //   link: "/work/refreshing-detour", // case-study-refreshing-detour.jsx
    // },
    {
      id: 1,
      img: work1,
      tag: "Hospitality",
      title: "Parkdean Resorts’ Triumphant Market Strategy",
      year: "2024",
      link: "/work/parkdean-resorts-triumphant-market", // parkdean-resorts-triumphant-market.jsx
    },
    {
      id: 2,
      img: work2,
      tag: "E-commerce",
      title: "Printful Search Optimization",
      year: "2024",
      link: "/work/printful-search-optimization", // printful-search-optimization.jsx
    },
    {
      id: 3,
      img: work3,
      tag: "Programmatic",
      title: "Programmatic Advertising Services",
      year: "2024",
      link: "/work/programmatic-advertising-services", // programmatic-advertising-services.jsx
    },
    // additional items reuse links or add more mappings as needed
    {
      id: 4,
      img: work1,
      tag: "FMCG",
      title: "Giving Gamers the Power to Skip a Shower (repeat)",
      year: "2024",
      link: "/work/power-to-gamers",
    },
    {
      id: 5,
      img: work2,
      tag: "Real-Estate",
      title: "Full Funnel SEO Strategy Drives Incremental Traffic (repeat)",
      year: "2024",
      link: "/work/dubai-properties-seo-strategy",
    },
    {
      id: 6,
      img: work3,
      tag: "FMCG",
      title: "A Bold Brand Activation That Stood Out (repeat)",
      year: "2024",
      link: "/work/refreshing-detour",
    },
  ];

  return (
    <main className="w-full bg-black text-white">
      {/* wrapper to center content and limit width */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20">
        {/* Hero Title */}
        <header className="mb-10 md:mb-16">
          <h1
            className="
              font-extrabold text-left mt-10
              text-[34px] sm:text-[40px] md:text-[58px] lg:text-[88px] xl:text-[96px]
              leading-[0.95] md:leading-[0.92]
              tracking-tight
              max-w-6xl
            "
          >
            <span className="block">WE ARE BUILT TO</span>
            <span className="block">
              <span className="text-green-500">ACCELERATE CHANGE</span> THAT SHAPES
            </span>
            <span className="block"> THE FUTURE</span>
          </h1>
        </header>

        {/* Big Video with animation */}
        <section className="mb-12">
          <video
            src={heroImg}
            autoPlay
            muted
            loop
            playsInline
            className="
              w-full object-cover
              opacity-0 animate-videoExpand
              max-h-[560px]
            "
          />
        </section>

        {/* Lower content block (diagraph style) */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="hidden md:block md:col-span-7" />
            <div className="col-span-1 md:col-span-5"></div>
          </div>
        </section>

        {/* ---------- New Featured Work section (aboutWork-like) ---------- */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-green-500 font-semibold text-sm uppercase tracking-wider">
                Featured work
              </h3>
              <h2 className="text-white font-extrabold text-3xl md:text-5xl leading-tight mt-2">
                Selected Case Studies
              </h2>
            </div>
            <Link
              to="/work"
              className="hidden sm:inline-block text-sm font-medium underline text-white/90 hover:text-white"
            >
              View all work
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((f) => (
              <Link key={f.id} to={f.link} className="block group">
                <article className="relative rounded-md overflow-hidden bg-gray-900 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.75)] transition-shadow duration-300">
                  <div className="w-full h-56 sm:h-64 md:h-56 lg:h-64">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />

                  <div className="p-5 md:p-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-wider text-green-400 font-semibold">
                        {f.tag}
                      </div>
                      <div className="text-white/80 text-sm">{f.year}</div>
                    </div>

                    <h4 className="mt-3 text-lg md:text-xl font-bold leading-tight text-white">
                      {f.title}
                    </h4>

                    <div className="mt-4">
                      {/* Keep a visible link label for accessibility; still navigates via Link wrapper */}
                      <span className="inline-block text-sm font-semibold underline decoration-white/25 text-white/90">
                        View case study
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              to="/work"
              className="inline-block text-sm font-medium underline text-white/90"
            >
              View all work
            </Link>
          </div>
        </section>
      </div>

      {/* global sections */}
      {/* <Stats />
      <AwardsSection />
      <Leadership /> */}
      <Brand />
    </main>
  );
}
