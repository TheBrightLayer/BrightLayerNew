import React, { useEffect, useRef, useState } from "react";
import "../assets/HeroPrismBg.jpg"
/**
 * Integrated Stats Section — redesigned to fit the provided full-page layout.
 * Goals:
 * - Visually tie into the dark, bold homepage (black background, green accent)
 * - Make the stats feel like a feature (larger numbers, bold typography)
 * - Improve spatial rhythm: narrow headline + wide horizontal card row that overlaps the section above
 * - Mobile-first, responsive (stack → horizontal scroll → 4-up grid)
 * - Uses IntersectionObserver to animate counters only when visible
 *
 * Import notes:
 * - This component uses Tailwind utility classes (already used across the project)
 * - Drop it where the previous stats band was located (it uses overlap via negative margin)
 */

export default function IntegratedStats({
  stats = [
    { id: "markets", icon: "globe", label: "Markets", value: 3, caption: "regions served" },
    { id: "team", icon: "people", label: "Growth Marketers", value: 12, caption: "strategy & ops" },
    { id: "services", icon: "bundle", label: "Core Services", value: 6, caption: "creative + ads" },
    { id: "clients", icon: "clients", label: "Clients", value: 25, caption: "SMBs & startups" },
  ],
  eyebrow = "OUR IMPACT",
  title = "Results-driven digital growth",
  subtitle = "Performance marketing, creative and strategy for startups and scale-ups.",
  cta = { href: "#contact", label: "Start the conversation" },
}) {
  // hook: animate number when visible
  const useInViewCount = (target, duration = 1000, enabled = true) => {
    const [n, setN] = useState(0);
    const [played, setPlayed] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      if (!enabled) return;
      if (!ref.current) return;

      const el = ref.current;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !played) {
              setPlayed(true);
            }
          });
        },
        { threshold: 0.4 }
      );

      obs.observe(el);
      return () => obs.disconnect();
    }, [ref, played, enabled]);

    useEffect(() => {
      if (!played) return;
      let start = null;
      const from = 0;
      const to = Number(target) || 0;
      const raf = (ts) => {
        if (!start) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.floor(from + (to - from) * eased);
        setN(val);
        if (t < 1) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }, [played, target, duration]);

    return [ref, n, played];
  };

  const Icon = ({ name, className = "w-5 h-5" }) => {
    const props = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
    switch (name) {
      case "globe":
        return (
          <svg {...props} viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            <path d="M2 12h20M12 2c2.5 3.5 2.5 16 0 20" />
          </svg>
        );
      case "people":
        return (
          <svg {...props} viewBox="0 0 24 24" aria-hidden>
            <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11z" />
            <path d="M2 20a6 6 0 0 1 12 0M12 20a6 6 0 0 1 12 0" />
          </svg>
        );
      case "bundle":
        return (
          <svg {...props} viewBox="0 0 24 24" aria-hidden>
            <path d="M3 7h18M7 21V7M17 21V7" />
            <path d="M3 7c0-1.657 1.343-3 3-3h12c1.657 0 3 1.343 3 3" />
          </svg>
        );
      case "clients":
        return (
          <svg {...props} viewBox="0 0 24 24" aria-hidden>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Layout: this block uses a dark background. To create the sense of "jelling" with the page
  // we intentionally overlap the previous section with negative margin on larger screens.
  return (
    <section className="w-full bg-transparent">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 -mt-10 md:-mt-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">{/* white card that contrasts the dark page */}
          <div className="px-6 md:px-10 py-10 md:py-14">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-wide text-green-600">{eyebrow}</p>
              <h3 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight text-gray-900">{title}</h3>
              <p className="mt-2 text-sm md:text-base text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            </div>

            {/* Stats row: responsive behavior ------------------------------------------------- */}
            <div className="mt-8">
              {/* Mobile: horizontal scroll, medium: 2 columns, large: 4 columns grid */}
              <div className="-mx-4 md:mx-0">
                <div className="flex gap-4 overflow-x-auto px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                  {stats.map((s) => (
                    <StatCard key={s.id} stat={s} useInViewCount={useInViewCount} />
                  ))}
                </div>
              </div>

              {/* CTA centered under the cards */}
              <div className="mt-8 flex justify-center">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-semibold shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                  {cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ---------------- Subcomponent ----------------
  function StatCard({ stat, useInViewCount }) {
    const [ref, value, played] = useInViewCount(stat.value, 900);
    // if original value had a plus sign (e.g. "25+"), keep it
    const hasPlus = String(stat.value).includes("+");

    return (
      <div ref={ref} className="min-w-[220px] md:min-w-0 bg-gradient-to-br from-white to-white/95 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between ring-1 ring-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-green-50 text-green-700 flex items-center justify-center ring-1 ring-green-100">
            <Icon name={stat.icon} className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</div>
            <div className="mt-1 text-xs text-gray-400">{stat.caption}</div>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {value}{hasPlus ? "+" : ""}
          </div>
          <div className="text-xs text-gray-400">since launch</div>
        </div>
      </div>
    );
  }
}
