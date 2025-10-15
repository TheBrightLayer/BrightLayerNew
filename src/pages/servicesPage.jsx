import React from "react";
import heroVideo from "../assets/pinterest-video-40.mp4.crdownload"; // make sure file name is correct
import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import Stats from "../components/stats";
import AwardsSection from "../components/awardsSection";
import Brand from "../components/brand";
import Leadership from "../components/leadership";

export default function ServicesPage() {
  const featured = [
    { id: 0, img: work1, tag: "FMCG", title: "Giving Gamers the Power to Skip a Shower", year: "2024" },
    { id: 1, img: work2, tag: "Real-Estate", title: "Full Funnel SEO Strategy Drives Incremental Traffic", year: "2024" },
    { id: 2, img: work3, tag: "FMCG", title: "A Bold Brand Activation That Stood Out", year: "2024" },
    // ... you can keep the rest if needed
  ];

  return (
    <main className="w-full bg-black text-white">
      {/* HERO: video sits at the top of the viewport; navbar (fixed) will appear above it due to z-index */}
      <section className="relative text-left w-full h-[100vh] md:h-[78vh] lg:h-[82vh]">
        {/* Absolute video fills the hero section and starts at the very top */}
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* subtle overlay to ensure text legibility (video is behind this) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/85 z-10" />

        {/* Text overlay sits on top of the video */}
        <div className="relative text-left z-20 px-6 md:px-12 max-w-6xl mx-auto flex items-center justify-center h-full">
          <div className="text-center">
            <h1
              className="
                font-extrabold text-[34px] sm:text-[44px] md:text-[68px] lg:text-[88px] xl:text-[96px]
                leading-[0.95] tracking-tight
              "
            >
              <span className="block">WE ARE BUILT TO</span>
              <span className="block">
                <span className="text-green-500">ACCELERATE CHANGE</span> THAT SHAPES
              </span>
              <span className="block">THE FUTURE</span>
            </h1>
          </div>
        </div>
      </section>

      {/* IMPORTANT: push the rest of the page down so it doesn't hide under the fixed navbar */}
      <div className="pt-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20">
        {/* Featured Work section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-green-500 font-semibold text-sm uppercase tracking-wider">Featured work</h3>
              <h2 className="text-white font-extrabold text-3xl md:text-5xl leading-tight mt-2">Selected Case Studies</h2>
            </div>
            <a href="/work" className="hidden sm:inline-block text-sm font-medium underline text-white/90 hover:text-white">View all work</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((f) => (
              <article key={f.id} className="relative rounded-md overflow-hidden bg-gray-900 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="w-full h-56 sm:h-64 md:h-56 lg:h-64">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
                <div className="p-5 md:p-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-wider text-green-400 font-semibold">{f.tag}</div>
                    <div className="text-white/80 text-sm">{f.year}</div>
                  </div>

                  <h4 className="mt-3 text-lg md:text-xl font-bold leading-tight text-white">{f.title}</h4>

                  <div className="mt-4">
                    <a href="#" className="inline-block text-sm font-semibold underline decoration-white/25 text-white/90">View case study</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <a href="/work" className="inline-block text-sm font-medium underline text-white/90">View all work</a>
          </div>
        </section>
      </div>

      {/* Global sections */}
      {/* <Stats />
      <AwardsSection />
      <Leadership />
      <Brand /> */}
    </main>
  );
}
