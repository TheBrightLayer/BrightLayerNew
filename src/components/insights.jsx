import React, { useState } from "react";

// ServicesAccordion.jsx + InsightsSection
// Tailwind CSS required
// This file includes two pieces:
// - ServicesAccordion: your FAQ/Services accordion (closed by default)
// - InsightsSection: visually matches the "Our Insights / Leading with Thought" list you showed

// You can split these into separate files if you prefer. Drop this into your project as-is.

const Arrow = ({ className = "" }) => (
  <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function InsightsSection({ items }) {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-12">
      <div className="text-sm text-green-600 font-semibold mb-6">OUR INSIGHTS</div>

      <h2 className="font-extrabold leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-8">
        LEADING WITH THOUGHT
      </h2>

      <div className="border-t border-black/60 mb-6" />

      <div className="space-y-6">
        {items.map((it, idx) => (
          <article key={idx} className="flex items-center py-6">
            {/* Thumbnail */}
            <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 mr-6 overflow-hidden rounded-sm bg-gray-100">
              {/* Use the provided image URL or a neutral placeholder */}
              <img src={it.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Tag + Title */}
            <div className="flex-1">
              <div className="mb-3">
                <span className="inline-block border border-black/20 rounded-full px-3 py-1 text-sm text-black/80">{it.tag}</span>
              </div>

              <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">{it.title}</h3>

              {/* Optional excerpt (small) */}
              {it.excerpt && <p className="text-sm text-gray-600 mt-3 hidden md:block">{it.excerpt}</p>}

              <div className="border-t border-black/60 mt-6 md:mt-4" />
            </div>

            {/* Arrow on the far right */}
            <div className="ml-4 md:ml-8 flex-shrink-0">
              <button className="text-black/80 focus:outline-none">
                <Arrow />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Insights() {
  const [openIndex, setOpenIndex] = useState(null); // services accordion closed by default

  const rows = [
    { title: "Experience Design Across Every Channel", body: "We design end-to-end experiences across web, mobile and emerging channels." },
    { title: "Digital Marketing Strategy & Planning", body: "We go beyond optimizing campaigns — we rewire growth with measurable plans." },
    { title: "Digital Marketing Channels We Specialize In", body: "Paid search, paid social, programmatic, SEO — we tailor channel mixes that scale." },
  ];

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  const Icon = ({ open = false }) => (
    <svg
      className={`w-8 h-8 transform transition-transform duration-200 ${open ? "rotate-45" : "rotate-0"}`}
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

  // sample insights data (replace image URLs with your real assets)
  const insights = [
    {
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd",
      tag: "Insights",
      title: "Unified Media: Accelerating Brands to Shape the Future",
      excerpt:
        "Short excerpt that supports the headline — use this for SEO-friendly snippets on wide screens.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1545996124-1b6d57d1f9f6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=efgh",
      tag: "Blog",
      title: "40 Under 40 2025: Keigo Chang, iProspect Taiwan",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=ijkl",
      tag: "News",
      title: "Carlsberg x Campaign Win — What We Did",
    },
  ];

  return (
    <div>
      {/* Insights Section */}
      <InsightsSection items={insights} />

      {/* Services Accordion below insights */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="text-sm text-green-600 font-semibold mb-6">SERVICES</div>

        <h1 className="font-extrabold leading-[0.9] tracking-tight text-4xl md:text-6xl lg:text-7xl mb-10 font-unique">
          GLOBAL DIGITAL
          <br />
          MARKETING
        </h1>

        <div className="border-t border-black/60 mb-6" />

        <div className="relative">
          {rows.map((r, i) => {
            const isOpen = openIndex === i;
            return (
              <section key={i} className="mb-8 relative">
                <div className="py-8">
                  <div className="flex items-center">
                    <div className="w-full md:w-1/3">
                      <h2 className={`font-semibold text-xl md:text-2xl ${isOpen ? "text-green-600" : "text-black"}`}>
                        {r.title}
                      </h2>
                    </div>

                    <div className="hidden md:block md:flex-1" />
                  </div>

                  <div className="border-t border-black/60 mt-6" />

                  <div className="pointer-events-none">
                    <button
                      aria-expanded={isOpen}
                      aria-controls={`panel-${i}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(i);
                      }}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 md:right-8 lg:right-12 z-10 pointer-events-auto ${
                        isOpen ? "text-green-600" : "text-black/80"
                      } focus:outline-none`}
                      style={{ background: "transparent" }}
                    >
                      <Icon open={isOpen} />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div id={`panel-${i}`} role="region" aria-labelledby={`heading-${i}`} className="mt-6 md:flex md:gap-6">
                    <div className="md:w-1/3" />
                    <div className="md:w-2/3 text-sm text-gray-600">
                      <p>{r.body}</p>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="inline-block text-base font-medium underline">
            View all
          </a>
        </div>
      </main>
    </div>
  );
}
