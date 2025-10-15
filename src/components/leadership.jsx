// src/components/LeadershipSectionV2.js
import React from "react";
import portrait from "../assets/hero.png"; // <-- replace with your image

export default function Leadership() {
  return (
    <section className="w-full bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 md:py-16">

        {/* small green label */}
        <div>
          <span
            className="inline-block text-[13px] md:text-[13px] font-semibold uppercase"
            style={{ color: "#2dbf7a", letterSpacing: "0.6px" }}
          >
            LEADERSHIP
          </span>
        </div>

        {/* huge left-aligned headline */}
        <h2
          className="mt-6 font-extrabold text-[56px] sm:text-[72px] md:text-[88px] leading-[0.92] tracking-[-2px] text-left"
          style={{
            fontFamily:
              "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
          }}
        >
          GUIDING THE
          <br />
          VISION
        </h2>

        {/* thin horizontal divider (full width of content) */}
        <div className="mt-8">
          <div className="w-full border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }} />
        </div>

        {/* content row: portrait left, text right */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* portrait column */}
          <div className="md:col-span-4">
            <div className="w-[320px] md:w-[340px] lg:w-[360px]">
              <img
                src={portrait}
                alt="Amanda Morrissey"
                className="w-full h-[420px] object-cover rounded-sm"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* text column */}
          <div className="md:col-span-8">
            <h3
              className="text-[22px] md:text-[26px] lg:text-[28px] font-extrabold mb-2 text-left"
              style={{ color: "#0f0f10" }}
            >
              Amanda Morrissey
            </h3>

            <div
              className="text-[14px] md:text-[15px] font-semibold mb-6 text-left"
              style={{ color: "#2dbf7a" }}
            >
              Global President, iProspect and Chief Growth Officer, Media
            </div>

            <div className="max-w-[820px]">
              <p
                className="text-[14px] md:text-[15px] text-[#6d6d6f] leading-[1.68] mb-5 text-left"
              >
                Amanda Morrissey is responsible for the iProspect agency and brand globally and works closely with leadership and teams in over 90 markets to deliver digital-first end to end media solutions for clients. Skilled at leading through change, Amanda has teamed with local markets and area specialists to build and launch a new global agency proposition, one which brings together the science of performance marketing and the art of brand building.
              </p>

              <p
                className="text-[14px] md:text-[15px] text-[#6d6d6f] leading-[1.68] text-left" 
              >
                A champion for local nuance and culture, she has instilled a supportive and collaborative infrastructure of experts and teams across the globe, who work together at pace and at scale to accelerate both domestic and international client growth. Amanda re-launched iProspect as a new global agency in March 2021 with this new proposition, enhanced capabilities and a brand-new identity.
              </p>
            </div>
          </div>
        </div>

        {/* thin bottom divider */}
        <div className="mt-10">
          <div className="w-full border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
