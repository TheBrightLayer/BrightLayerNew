// src/components/AwardsSection.js
import React from "react";

const AWARD_GREEN = "#2dbf7a";

const awards = [
  {
    title: "RECMA",
    description: "Highest-Growth Media Network Globally",
    year: "2024",
  },
  {
    title: "Digital Cinema Media Awards",
    description: "Best Long-term Use of Cinema, iProspect UK x IKEA",
    year: "2023",
  },
  {
    title: "Advertising Week Africa",
    description: "Future is Female Awards, iProspect Kenya",
    year: "2023",
  },
  {
    title: "Effie Awards Latin America",
    description: "Influencer, iProspect Brazil x FYS",
    year: "2023",
  },
  {
    title: "MediaPost",
    description: "Search/Performance Agency of the Year, iProspect USA",
    year: "2023",
  },
];

export default function AwardsSection() {
  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-[1300px] mx-auto px-4 md:px-6 py-8 md:py-10 text-left">
        {/* Small label */}
        <div>
          <span
            className="inline-block text-[12px] md:text-[13px] font-semibold uppercase"
            style={{ color: AWARD_GREEN, letterSpacing: "0.6px" }}
          >
            AWARDS
          </span>
        </div>

        {/* Compact list container */}
        <div className="mt-6">
          {/* slightly thinner but visible divider — keeps it compact */}
          <div className="divide-y divide-white/25">
            {awards.map((a, idx) => (
              <div
                key={idx}
                className="py-4 md:py-5 grid grid-cols-12 items-start gap-3 md:gap-4"
              >
                {/* Left: award title (left-aligned) */}
                <div className="col-span-12 md:col-span-4 text-left">
                  <h3
                    className="text-[15px] md:text-[16px] font-semibold"
                    style={{ color: "#ffffff" }}
                  >
                    {a.title}
                  </h3>
                </div>

                {/* Middle: description (green) - left-aligned */}
                <div className="col-span-12 md:col-span-6 text-left">
                  <p
                    className="text-[14px] md:text-[15px] leading-tight"
                    style={{ color: AWARD_GREEN }}
                  >
                    {a.description}
                  </p>
                </div>

                {/* Right: year - left-aligned */}
                <div className="col-span-12 md:col-span-2 text-left">
                  <span className="text-[14px] md:text-[15px] font-medium">
                    {a.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
