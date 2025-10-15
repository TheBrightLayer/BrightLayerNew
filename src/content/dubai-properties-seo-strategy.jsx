// src/content/posts/dubai-properties-seo-strategy.jsx
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/iprospectphotography-29.jpg";
import hero2 from "../assets/iprospectphotography-29.jpg";

export const meta = {
  slug: "dubai-properties-seo-strategy",
  title: "Dubai Properties — Full Funnel SEO Strategy Drives Incremental Traffic",
  date: "2025-10-15",
  cover: hero,
};

export default function DubaiPropertiesSEOStrategy() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 text-left">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/work"
            className="inline-block text-sm font-semibold tracking-wide hover:underline"
            style={{ color: "#00FF84" }}
          >
            ← BACK TO WORK
          </Link>
        </div>

        {/* Title + subtitle */}
        <header className="mb-8">
          <h1
            className="font-extrabold leading-tight mb-2"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.02em",
            }}
          >
            Dubai Properties — Full Funnel SEO Strategy Drives Incremental Traffic
          </h1>
          <p className="text-base text-gray-400">
            Organic search optimization & content strategy
          </p>
        </header>

        {/* Hero image */}
        {hero && (
          <div className="mb-12">
            <img
              src={hero}
              alt="Dubai Properties SEO strategy case study"
              className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <article className="space-y-12 text-left">
          {/* THE CHALLENGE */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              The Challenge
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Dubai Properties, a leading real estate master developer in the UAE, is responsible for shaping some of
              Dubai’s most renowned and iconic destinations. With real estate interest surging and search volumes
              increasing, the brand wanted to leverage <strong>organic search</strong> as a key driver of awareness,
              engagement, and lead generation — helping users discover and purchase their dream homes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              iProspect partnered with Dubai Properties to achieve ambitious goals:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-300 space-y-2">
              <li>Improve domain visibility by 25%</li>
              <li>Increase property bookings by 20% YoY</li>
              <li>Increase organic traffic by 25% YoY</li>
            </ul>
          </section>

          {/* STRATEGY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Strategy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              iProspect proposed a <strong>full-funnel SEO strategy</strong> designed to capture user intent at every stage
              — from awareness to conversion. The goal was to boost visibility, improve engagement, and increase property
              bookings through data-driven content and technical optimization.
            </p>

            <ul className="list-disc ml-6 space-y-2 text-gray-300">
              <li>Conducted keyword research to identify quick wins and high-potential competitive keywords</li>
              <li>Optimized Google My Business listings to enhance local brand presence</li>
              <li>Created and optimized FAQ content with structured schema markup for better SERP visibility</li>
              <li>Improved site navigation to streamline the user journey</li>
              <li>Implemented ongoing schema-backed blog content to maintain freshness and authority</li>
              <li>Executed multiple technical SEO projects, including Core Web Vitals improvements and broken link clean-up</li>
            </ul>
          </section>

          {/* optional second image */}
          {/* {hero2 && (
            <div className="my-12">
              <img
                src={hero2}
                alt="Dubai Properties organic search dashboard and results"
                className="w-full object-cover rounded-md shadow-lg"
              />
            </div>
          )} */}

          {/* THE NUMBERS */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              The Numbers
            </h2>

            <div className="space-y-8 text-gray-300">
              <p className="leading-relaxed">
                The implementation of a comprehensive SEO strategy led to strong growth across all organic KPIs.
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>+30% Domain Visibility / Impressions</li>
                <li>+32% Organic Traffic</li>
                <li>+35% Property Bookings</li>
              </ul>
            </div>
          </section>

          {/* CONCLUSION */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Through a full-funnel SEO strategy that combined content, technical, and local optimizations, Dubai Properties
              achieved remarkable growth in visibility, traffic, and conversions — positioning itself as a digital leader
              in Dubai’s competitive real estate landscape.
            </p>
          </section>

          {/* back link */}
          <div className="mt-12">
            <Link
              to="/work"
              className="inline-block font-semibold hover:underline"
              style={{ color: "#00FF84" }}
            >
              ← Back to Work
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
