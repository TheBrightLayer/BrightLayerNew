// src/content/posts/programmatic-advertising-services.jsx
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import hero2 from "../assets/hero.png";

export const meta = {
  slug: "programmatic-advertising-services",
  title: "Programmatic Advertising Services",
  date: "2025-09-30",
  cover: hero,
};

export default function ProgrammaticAdvertisingServices() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Constrain width but keep text left-aligned */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 text-left">
        {/* Back link (left) */}
        <div className="mb-6">
          <Link
            to="/work"
            className="inline-block text-sm font-semibold tracking-wide hover:underline"
            style={{ color: "#00FF84" }}
          >
            ← BACK TO WORK
          </Link>
        </div>

        {/* Title + subtitle (left-aligned) */}
        <header className="mb-8">
          <h1
            className="font-extrabold leading-tight mb-2"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.02em",
            }}
          >
            Programmatic Advertising Services
          </h1>
          <p className="text-base text-gray-400">Bright Layer</p>
        </header>

        {/* Hero image inside the same content width */}
        {hero && (
          <div className="mb-12">
            <img
              src={hero}
              alt="Programmatic advertising"
              className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        {/* Article content (force left alignment on everything) */}
        <article className="space-y-12 text-left">
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Digital advertising is changing fast, so businesses need smart ways to reach the right people at the right moment.
              Programmatic advertising services help make this possible. With programmatic advertising, you don’t have to buy ads by hand.
              AI and automation place your ads on websites, apps, and other platforms in real time, so your ads reach the right people and
              your budget goes further.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              What is Programmatic Advertising?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Programmatic advertising is the automated way of buying and selling digital ads. In the past, marketers had to call publishers,
              agree on prices, and set up ads themselves. Now, software and algorithms make the process faster and more efficient.
            </p>

            <p className="text-gray-300 leading-relaxed mb-2">With programmatic, businesses can:</p>

            <ul className="list-disc ml-6 space-y-2 text-gray-300">
              <li>Show ads only to people who match their target audience.</li>
              <li>Adjust campaigns in real-time.</li>
              <li>Save time and money with automation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Why Programmatic Advertising Services are Important
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              Programmatic advertising has become a must for modern businesses. Here’s why:
            </p>

            <ul className="list-disc ml-6 space-y-2 text-gray-300">
              <li>
                <strong>Precise Targeting:</strong> Ads reach only the audience most likely to buy your product or service.
              </li>
              <li>
                <strong>Real-Time Bidding:</strong> Your ads compete for space in milliseconds, making sure you get the best deal.
              </li>
              <li>
                <strong>Cost-Effective:</strong> Your budget is used wisely, with no wasted spending.
              </li>
              <li>
                <strong>Scalable Campaigns:</strong> You can run thousands of ads across multiple platforms at once.
              </li>
              <li>
                <strong>Better Results:</strong> Through continuous optimization, you achieve more clicks, leads, and sales.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Types of Programmatic Advertising Services
            </h2>

            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold">Display Ads</h3>
                <p className="mt-1">Banner ads on websites and apps to build awareness with strong visual creatives.</p>
              </div>

              <div>
                <h3 className="font-semibold">Video Ads</h3>
                <p className="mt-1">Short video placements on YouTube, social, and streaming apps to capture attention.</p>
              </div>

              <div>
                <h3 className="font-semibold">Native Ads</h3>
                <p className="mt-1">Seamless sponsored content that feels native to the user’s experience and drives engagement.</p>
              </div>

              <div>
                <h3 className="font-semibold">Audio Ads</h3>
                <p className="mt-1">Ads on music apps and podcasts — perfect for on-the-go reach.</p>
              </div>

              <div>
                <h3 className="font-semibold">Connected TV (CTV) Ads</h3>
                <p className="mt-1">Video ads for smart TVs and streaming services to reach viewers in living rooms.</p>
              </div>

              <div>
                <h3 className="font-semibold">Mobile Programmatic Ads</h3>
                <p className="mt-1">Targeted ads built for mobile devices, reaching audiences anytime and anywhere.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              How Programmatic Advertising Services Work
            </h2>

            <ol className="list-decimal list-inside ml-6 space-y-3 text-gray-300">
              <li>
                <strong>Audience Research:</strong> The system gathers data about what users search for, watch, or click on.
              </li>
              <li>
                <strong>Real-Time Bidding (RTB):</strong> Advertisers bid in milliseconds; the highest relevant bid wins and the ad is served.
              </li>
              <li>
                <strong>Optimization:</strong> Systems learn and optimize delivery to the best-performing users and placements.
              </li>
              <li>
                <strong>Performance Tracking:</strong> Detailed reports on impressions, clicks, conversions and ROI help guide decisions.
              </li>
            </ol>

            <p className="mt-4 text-gray-300">Automation reduces manual tasks and improves targeting accuracy.</p>
          </section>

          {/* optional second image (keeps within content width) */}
          {/* {hero2 && (
            <div className="my-12">
              <img src={hero2} alt="Programmatic example" className="w-full object-cover rounded-md shadow-lg" />
            </div>
          )} */}

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Benefits for Businesses
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <ul className="space-y-3">
                <li><strong>More Reach:</strong> Appear across thousands of sites, apps and platforms.</li>
                <li><strong>Better ROI:</strong> Spend only on placements and users that matter.</li>
                <li><strong>Personalization:</strong> Ads tailored to viewer interests increase relevance.</li>
              </ul>

              <ul className="space-y-3">
                <li><strong>Transparency:</strong> See exactly where budget goes and how ads perform.</li>
                <li><strong>Speed:</strong> Ads can go live within minutes, skipping long negotiations.</li>
                <li><strong>Competitive Advantage:</strong> Smarter targeting and scale beats old methods.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Programmatic advertising uses automation, data and smart targeting to make ads work better and cost less. Whether you aim to boost sales,
              build awareness, or expand reach, programmatic advertising helps you achieve those goals. At Bright Layer, we design campaigns that deliver
              real results — from research to reporting, we handle it end-to-end.
            </p>
          </section>

          <div className="mt-12">
            <Link to="/work" className="inline-block font-semibold hover:underline" style={{ color: "#00FF84" }}>
              ← Back to Work
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
