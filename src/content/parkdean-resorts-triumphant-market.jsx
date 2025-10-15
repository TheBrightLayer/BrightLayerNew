// src/content/posts/parkdean-resorts-triumphant-market.jsx
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/parkhero.png";
import hero2 from "../assets/parkhero.png";

export const meta = {
  slug: "parkdean-resorts-triumphant-market",
  title: "Parkdean Resorts — Triumphant in a Tough Market",
  date: "2025-10-15",
  cover: hero,
};

export default function ParkdeanResortsTriumphantMarket() {
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
            Parkdean Resorts — Triumphant in a Tough Market
          </h1>
          <p className="text-base text-gray-400">Integrated brand and performance campaign</p>
        </header>

        {/* Hero image */}
        {hero && (
          <div className="mb-12">
            <img
              src={hero}
              alt="Parkdean Resorts brand campaign hero"
              className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <article className="space-y-12 text-left">
          {/* THE REALITY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">The Reality</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              When Covid-19 forced Parkdean Resorts to close during peak trading, the business faced an unprecedented
              challenge: rebuilding momentum and reclaiming visibility in a market frozen by uncertainty. To get 2020
              back on track, Parkdean needed to re-establish brand authority and stay top of mind as the travel sector
              slowly reopened.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Initial 2020 planning had centered around direct response channels. However, waiting for these to reignite
              would risk losing ground to competitors when demand returned. We needed a bold new approach — fast.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With reduced media costs and a captive audience, we had a two-month window to move from concept to launch
              and seize the opportunity in a quiet marketplace.
            </p>
          </section>

          {/* STRATEGY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">Strategy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We developed an integrated, multi-channel campaign built on four guiding principles: <strong>Audience, Awareness, Authority, and Attainability.</strong>
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The strategy centered around a <strong>TV & Sponsorship launch</strong> to establish a refreshed brand proposition,
              supported by Radio and Press for amplification. This was underpinned by an aggressive digital plan including
              Video on Demand (VOD), Paid Social, High-Impact Takeovers (HPTO), Sponsored Forum discussions, and PPC.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With domestic holidays poised to surge as international travel waned, Parkdean positioned itself at the
              forefront of this shift — ready to capture demand and redefine the staycation experience in the UK.
            </p>
          </section>

          {/* optional second image */}
          {/* {hero2 && (
            <div className="my-12">
              <img
                src={hero2}
                alt="Parkdean Resorts integrated media campaign visuals"
                className="w-full object-cover rounded-md shadow-lg"
              />
            </div>
          )} */}

          {/* THE NUMBERS */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">The Numbers</h2>

            <div className="space-y-8 text-gray-300">
              <p className="leading-relaxed">
                The campaign delivered exceptional results, driving visibility, engagement, and efficiency across channels:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>24% Above-the-line Share of Voice — up from 6% pre-campaign</li>
                <li>42% YoY reduction in Cost Per Click (CPC)</li>
                <li>68% YoY reduction in Cost Per Acquisition (CPA)</li>
              </ul>

              <blockquote className="border-l-4 border-[#00FF84] pl-4 italic text-gray-400">
                “iProspect quickly responded during the most disruptive period we have ever had. The campaign put us in a
                market-leading position for 2020 and placed us in a strong position for the future.”
                <br />
                <span className="not-italic text-gray-500 block mt-2">— Jonathan Alcock, Marketing Director</span>
              </blockquote>
            </div>
          </section>

          {/* CONCLUSION */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">Conclusion</h2>
            <p className="text-gray-300 leading-relaxed">
              Through a bold, fast-moving integrated strategy, Parkdean Resorts not only weathered a challenging year but
              emerged as a stronger, more visible brand. The campaign’s success demonstrated the power of adaptive media
              planning and rapid execution — securing long-term market leadership in a recovering travel industry.
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
