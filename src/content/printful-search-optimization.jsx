// src/content/posts/printful-search-optimization.jsx
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/printful-media---fulfilment-01.jpg";
import hero2 from "../assets/printful-media---fulfilment-01.jpg";

export const meta = {
  slug: "printful-search-optimization",
  title: "Printful — 65% More Leads Through Search",
  date: "2025-10-15",
  cover: hero,
};

export default function PrintfulSearchOptimization() {
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
            Printful — 65% More Leads Through Search
          </h1>
          <p className="text-base text-gray-400">Search advertising & measurement optimization</p>
        </header>

        {/* Hero image */}
        {hero && (
          <div className="mb-12">
            <img
              src={hero}
              alt="Printful search advertising case study"
              className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <article className="space-y-12 text-left">
          {/* THE REALITY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">The Reality</h2>
            <p className="text-gray-300 leading-relaxed">
              Printful — a global leader in print-on-demand dropshipping founded in Latvia — engaged iProspect to
              attract new clients across both existing and new markets. The brief was to drive higher-quality leads via
              Search advertising and to improve return on ad spend (ROAS).
            </p>
          </section>

          {/* STRATEGY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">Strategy</h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              We began by strengthening measurement: implementing new tracking templates and conversion goals to
              increase data accuracy and make performance actionable.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              Advertising platform data and Google Analytics were automatically combined with Printful’s internal metrics
              inside <strong>Datorama</strong> dashboards, enabling joint analysis of media performance and real business outcomes.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              After a full account audit we restructured the ad account to support optimization and market expansion. Campaigns
              launched across 16 countries including the United States and Canada. We used <strong>Search Ads 360</strong> to
              manage bidding at scale and relied on Datorama for tactical and strategic decisions.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Additional improvements included extensive keyword research and competitive analysis, plus A/B testing for landing
              pages and ad copy to improve conversion rates and reduce CPA.
            </p>
          </section>

          {/* optional second image */}
          {/* {hero2 && (
            <div className="my-12">
              <img
                src={hero2}
                alt="Printful campaign dashboards and creative"
                className="w-full object-cover rounded-md shadow-lg"
              />
            </div>
          )} */}

          {/* THE NUMBERS */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">Results</h2>

            <div className="space-y-8 text-gray-300">
              <p className="leading-relaxed">
                The combined improvements in measurement, account structure, bidding, and creative optimization led to
                significant business impact. Key results included:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>65% increase in leads</li>
                <li>89% increase in ROAS</li>
                <li>14 new markets activated (campaigns launched in 16 countries total)</li>
              </ul>
            </div>
          </section>

          {/* CONCLUSION */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">Conclusion</h2>
            <p className="text-gray-300 leading-relaxed">
              By prioritizing accurate measurement, integrating media and business data, and optimizing search at scale,
              we delivered measurable growth for Printful — more leads, higher ROAS, and a scalable approach to expand into
              new markets.
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
