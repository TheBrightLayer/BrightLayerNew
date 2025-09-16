import React from "react";
import heroImg from "../assets/hero.jpg";  

export default function Header() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Hero background"
          className="w-full h-full object-cover brightness-75"
        />
        {/* Optional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Text overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 md:px-20">
        <h2 className="text-xl md:text-2xl uppercase tracking-wide text-white mb-4">
          Defining a new era
        </h2>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Of Brand Building
        </h2>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-10 z-10 text-sm text-white/80 animate-bounce">
        Scroll ↓
      </div>
    </section>
  );
}
