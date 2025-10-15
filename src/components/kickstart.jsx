import React from "react";
import heroImg from "../assets/career.jpg";

export default function Kickstart() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background image covering entire section */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImg})`,
          filter: "contrast(0.95) brightness(0.55)",
        }}
        aria-hidden
      />

      {/* subtle dark overlay to make text pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/50" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36 flex flex-col items-center min-h-screen justify-center">
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block text-[10px] md:text-xs uppercase font-medium tracking-wider text-emerald-400">
              Careers
            </span>
          </div>

          <h1 className="font-extrabold text-5xl md:text-5xl lg:text-[56px] leading-tight md:leading-[0.98] lg:leading-[0.95] tracking-tight md:tracking-[-1px] font-unique">
         IGNITE
            <br />
            YOUR CAREER
            <br />
            JOIN BRIGHT LAYER
          </h1>
        </div>

        {/* bottom rule + link area */}
        <div className="w-full mt-12 md:mt-20">
          <div className="border-t border-white/30 pt-4 flex items-center justify-between">
            <div className="text-sm md:text-base text-white/90">Open worldwide roles</div>
            <div className="text-sm md:text-base text-white/90 flex items-center gap-2">
              <span>↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
