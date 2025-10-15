// src/content/posts/mitchum-gaming-campaign.jsx
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import hero2 from "../assets/hero.png";

export const meta = {
  slug: "mitchum-gaming-campaign",
  title: "Mitchum Gaming Campaign",
  date: "2025-10-13",
  cover: hero,
};

export default function MitchumGamingCampaign() {
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
            Mitchum Gaming Campaign
          </h1>
          <p className="text-base text-gray-400">Mitchum x Kevin Chapman</p>
        </header>

        {/* Hero image */}
        {hero && (
          <div className="mb-12">
            <img
              src={hero}
              alt="Mitchum gaming campaign"
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
              Mitchum Male set out to increase awareness and affinity amongst
              young men in the UK. We wanted to understand what makes the male
              audience tick — and how to resonate with them through media. Our
              insights revealed that our audience were heavy gamers, and many
              British gamers admitted to skipping showers to keep playing.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              This gave us our opportunity — to empower gamers to skip the
              shower and still feel confident with Mitchum’s ultra-powerful
              48-hour sweat + odor protection for those long gaming sessions.
            </p>
          </section>

          {/* STRATEGY */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Strategy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We challenged gaming streamer <strong>Kevin Chapman</strong> to
              beat the Guinness World Record for “Longest Sports (Soccer) Video
              Game Marathon” — and to stay fresh using Mitchum.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Not only did Kevin stay fresh — he broke the World Record after
              more than 50 hours of non-stop play. We built a bespoke Mitchum
              branded set, complete with samplers and gaming challenges to
              engage our audience throughout the marathon.
            </p>
            <p className="text-gray-300 leading-relaxed">
              To expand reach, we streamed the entire event live across{" "}
              <strong>Twitch</strong> and <strong>TikTok</strong>, sharing
              highlights and social content during and after the record attempt.
              The wider campaign extended across <strong>Meta</strong>,{" "}
              <strong>YouTube</strong>, <strong>TikTok</strong> and{" "}
              <strong>PR</strong>.
            </p>
          </section>

          {/* optional second image */}
          {/* {hero2 && (
            <div className="my-12">
              <img
                src={hero2}
                alt="Man holding Mitchum deodorant"
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
              <div>
                <h3 className="font-semibold text-lg mb-2">The Campaign</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Delivered 13 million video views and 790k livestream views</li>
                  <li>Drove 469k engagements</li>
                  <li>Shared over 3,000 Mitchum samples</li>
                  <li>Earned two pieces of broadcast coverage</li>
                  <li>Broke one Guinness World Record</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">The Brand</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Brand awareness increased by more than 90%</li>
                  <li>Consideration increased by more than 150%</li>
                  <li>
                    Mitchum moved up three places within the competitor set for
                    purchase consideration — surpassing key established brands.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CONCLUSION */}
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Through creativity, insight, and collaboration, Mitchum tapped
              into gaming culture in an authentic and powerful way. By combining
              entertainment with brand utility, we didn’t just break a world
              record — we strengthened Mitchum’s position as the go-to brand for
              long-lasting freshness.
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
