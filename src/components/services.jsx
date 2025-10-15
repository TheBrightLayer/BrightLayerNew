import React, { useState } from "react";

/**
 * Services.jsx
 *
 * Improvements:
 * - Bigger circular toggle button flush to the right of the content area (always clickable).
 * - Toggle shows + / X via rotation, stronger contrast on open state.
 * - Full-width separators inside the centered container.
 * - Smooth panel open/close using max-height + transition for nicer UX.
 * - Better spacing + responsive tweaks so rows breathe on mobile.
 */

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  const rows = [
    {
      title: "Experience Design Across Every Channel",
      body:
        "In today’s algorithm-driven world, every moment is a chance to connect, shop, share, or belong. Our digital marketing services create seamless cross-platform ecosystems that blend media, content, and commerce. Powered by 8,000+ media specialists, we test, refine, and scale ideas in real time - across SEO, PPC, social, video, and more - to meet people where they are and move with them wherever they go.",
    },
    {
      title: "Digital Marketing Strategy & Planning",
      body:
        "We go beyond optimizing campaigns, we rewire growth. At iProspect, we’re more than a marketing partner, we’re architects of progress. Our vision is to transform how digital marketing delivers value through transparency, addressability, and automation across all channels.",
    },
    {
      title: "Digital Marketing Channels We Specialize In",
      body:
        "In today’s Algorithmic Era, performance is engineered through intelligence. Brands need more than generalists - they need precision, orchestration, and the power of human ingenuity combined with artificial intelligence. At iProspect, we bring together deep expertise across all major digital marketing channels, to create a single, adaptive system that delivers measurable growth. Our channel specialisms include:",
    },
  ];

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  const Icon = ({ open = false }) => (
    <svg
      className={`w-5 h-5 transform transition-transform duration-200 ${open ? "rotate-45" : "rotate-0"}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transformOrigin: "center" }}
    >
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <main className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16">
      <div className="text-sm text-green-600 font-semibold mb-6">SERVICES</div>

      <h1 className="font-extrabold leading-[0.9] tracking-tight text-5xl md:text-7xl lg:text-[120px] mb-10 font-unique">
        GLOBAL DIGITAL
        <br />
        ACCELARATION
      </h1>

      {/* Separator */}
      <div className="border-t border-black/60 mb-8" />

      {/* Accordion rows */}
      <div className="space-y-10">
        {rows.map((r, i) => {
          const isOpen = openIndex === i;

          return (
            <section key={i} className="relative">
              {/* Title row */}
              <div className="flex items-start md:items-center">
                {/* Title column */}
                <div className="w-full md:w-1/3">
                  <h2
                    id={`heading-${i}`}
                    className={`font-semibold text-lg md:text-2xl ${isOpen ? "text-green-600" : "text-black"}`}
                  >
                    {r.title}
                  </h2>
                </div>

                {/* spacer for alignment on md+ */}
                <div className="hidden md:block md:flex-1" />

                {/* Toggle button — positioned inside the section but visually flush to right of container.
                    Using a circular bg makes it readable against any image/color. */}
                <div className="ml-4 md:ml-0">
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`panel-${i}`}
                    aria-labelledby={`heading-${i}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(i);
                    }}
                    className={`relative z-20 flex items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14 transition-shadow focus:outline-none ${
                      isOpen ? "bg-green-600 text-white shadow-lg" : "bg-white text-black/80 border border-black/5 hover:shadow"
                    }`}
                    style={{ boxShadow: isOpen ? "0 10px 30px rgba(16,185,129,0.18)" : undefined }}
                  >
                    <Icon open={isOpen} />
                  </button>
                </div>
              </div>

              {/* full-width separator below the heading (keeps inside container width) */}
              <div className="border-t border-black/60 mt-6" />

              {/* Animated panel: we use max-height transitions for smooth opening while keeping DOM simple */}
              <div
                id={`panel-${i}`}
                role="region"
                aria-labelledby={`heading-${i}`}
                className={`overflow-hidden transition-all duration-400 mt-4 ${
                  isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(.2,.95,.2,.99)" }}
              >
                <div className="md:flex md:gap-6 pt-4">
                  <div className="md:w-1/3" />
                  <div className="md:w-2/3 text-sm text-gray-600">
                    <p className="leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <a href="/services" className="inline-block text-base font-medium underline">
          View all
        </a>
      </div>
    </main>
  );
}
