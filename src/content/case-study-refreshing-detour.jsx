// src/content/posts/hendricks-portal-to-the-peculiar.jsx
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import hero2 from "../assets/hero.png";

export const meta = {
  slug: "hendricks-portal-to-the-peculiar",
  title: "Hendrick's — Portal to the Peculiar",
  date: "2025-10-13",
  cover: hero,
};

export default function HendricksPortalToThePeculiar() {
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
            Hendrick's — Portal to the Peculiar
          </h1>
          <p className="text-base text-gray-400">Immersive OOH at King’s Cross</p>
        </header>

        {/* Hero image */}
        {hero && (
          <div className="mb-12">
            <img
              src={hero}
              alt="Hendrick's Portal to the Peculiar at King's Cross"
              className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <article className="space-y-12 text-left">
          {/* THE REALITY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              The Reality
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Hendrick’s imaginative brand world is one of its most distinctive
              features — a point of differentiation in an extremely competitive
              category. We transported Londoners into this curious world during
              the dullest time of day: their commute. The Portal to the Peculiar
              created conversation and sharing, with an additional 2.2 million
              people reached via social channels.
            </p>
          </section>

          {/* STRATEGY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Strategy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our goal was to transform the daily slog through King’s Cross —
              one of London’s busiest stations — into an escape. We reimagined
              a 74-metre tunnel using a 1,000 square metre vinyl wrap, covering
              floors and walls with surreal illustrations: floating beluga
              whales, hot air balloons, and dapper gentlemen on unicycles high
              above the clouds.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Visitors were invited to “Escape the Conventional and Embrace the
              Delectable.” The installation disrupted routines: hundreds of
              commuters stopped to photograph and share the experience, travel
              guides such as Lonely Planet listed it as a must-visit, and some
              people even altered their routes to step inside our peculiar
              world.
            </p>
          </section>

          {/* optional second image */}
          {/* {hero2 && (
            <div className="my-12">
              <img
                src={hero2}
                alt="Illustrations inside the Portal to the Peculiar"
                className="w-full object-cover rounded-md shadow-lg"
              />
            </div>
          )} */}

          {/* THE NUMBERS */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              The Numbers
            </h2>

            <div className="space-y-8 text-gray-300">
              <p className="leading-relaxed">
                Hendrick’s Gin transported London commuters into a uniquely
                immersive brand world via the Portal to the Peculiar. Key
                results:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>409,000 busy London commuters experienced the installation</li>
                <li>
                  248,000 social media impressions which created an additional
                  2.2 million opportunities to see the campaign on social channels
                </li>
                <li>
                  The campaign’s first immersive activation proved a potent
                  brand experience
                </li>
                <li>
                  60% positive sentiment on social posts vs. just 2% negative
                </li>
              </ul>
            </div>
          </section>

          {/* CONCLUSION */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed">
              By turning a commuter tunnel into a Portal to the Peculiar, we
              brought Hendrick’s playful brand world into the everyday lives of
              Londoners — creating memorable moments, strong social engagement,
              and measurable uplift in awareness and brand conversation.
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
