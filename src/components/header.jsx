import React from "react";
import hero from "../assets/hero.jpg";
import about from "../assets/about.jpg";
import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import work4 from "../assets/work4.jpg";



export default function Header() {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="relative h-screen w-full bg-black text-white">
        <img
          src={hero}
          alt="Hero"
          className="w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-lg tracking-wider font-semibold mb-4">
            DEFINING A NEW ERA
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold">
            OF BRAND BUILDING
          </h2>
        </div>

        <div className="absolute bottom-6 right-10 text-sm opacity-80">
          Scroll ↓
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h3 className="text-green-600 uppercase font-semibold tracking-wider mb-2">
              About Us
            </h3>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">
              Accelerating <br /> Growth
            </h2>
            <img src={about} alt="About" className="w-full rounded-lg" />
          </div>

          {/* Right */}
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className="mb-6">
              In this time of enormous change where media is more important than
              ever before, people are longing for humanity – for real
              connection, for truth and for what binds us together.
            </p>
            <p className="mb-6">
              Our unique understanding of the intersection of culture, content,
              data, and technology powers how we build brands out of every
              moment of connection. For today, and for tomorrow.
            </p>
            <a
              href="#"
              className="font-bold border-b-2 border-black pb-1 hover:text-green-600 transition"
            >
              About
            </a>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
        <div className="max-w-6xl w-full">
          <h3 className="text-green-500 uppercase font-semibold mb-2">
            Our Work
          </h3>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            Advancing Brands
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-3xl">
            At iProspect, we accelerate growth that shapes the future. By
            blending creativity with data-driven insights, we craft bold,
            personalized stories that resonate across all platforms, transforming
            fleeting moments into lasting engagement.
          </p>

          {/* Work Items */}
          <div className="space-y-12">
            <div className="relative">
              <img src={work1} alt="Work1" className="w-full rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold">
                  Giving Gamers the Power to Skip a Shower
                </h3>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>FMCG</span>
                <span>2024</span>
              </div>
            </div>

            <div className="relative">
              <img src={work2} alt="Work2" className="w-full rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold">
                  Full Funnel SEO Strategy Drives Incremental Traffic
                </h3>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Real-Estate</span>
                <span>2024</span>
              </div>
            </div>

            <div className="relative">
              <img src={work3} alt="Work3" className="w-full rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold">The TikTok You Stay In</h3>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Travel</span>
                <span>2024</span>
              </div>
            </div>

            <div className="relative">
              <img src={work4} alt="Work4" className="w-full rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold">A Refreshing Detour</h3>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>FMCG</span>
                <span>2024</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="text-white font-semibold border-b-2 border-white pb-1 hover:text-green-500 hover:border-green-500 transition"
            >
              View all
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full min-h-screen bg-white px-6 py-16 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full grid grid-cols-1 gap-12">
          <div>
            <span className="text-green-600 font-semibold uppercase tracking-wider mb-2">
              Services
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
              GLOBAL DIGITAL <br /> MARKETING
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-gray-300">
            <div className="flex justify-between items-center py-6">
              <span className="text-lg font-medium">
                Experience Design Across Every Channel
              </span>
              <span className="text-2xl font-light">+</span>
            </div>
            <div className="flex justify-between items-center py-6">
              <span className="text-lg font-medium">
                Digital Marketing Strategy & Planning
              </span>
              <span className="text-2xl font-light">+</span>
            </div>
            <div className="flex justify-between items-center py-6">
              <span className="text-lg font-medium">
                Digital Marketing Channels We Specialize In
              </span>
              <span className="text-2xl font-light">+</span>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="text-black font-medium border-b border-gray-400 hover:text-green-600 transition">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="relative w-full h-screen">
        <img
          src={about}
          alt="Careers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-green-500 uppercase font-semibold mb-3">
            Careers
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            KICKSTART <br /> YOUR CAREER <br /> WITH iPROSPECT
          </h2>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center border-t border-white/40 pt-4">
          <div>
            <span className="uppercase text-xs text-white/70">Open Roles</span>
            <p className="text-white text-lg font-medium">
              Open worldwide roles
            </p>
          </div>
          <div className="text-white text-2xl">↗</div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-20 px-6 bg-white text-black">
        <h2 className="text-green-600 text-sm font-bold uppercase">
          Our Insights
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-8">
          Leading With Thought
        </h3>

        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center border-b pb-4">
            <img
              src={about}
              alt="Post 1"
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <span className="text-xs border px-2 py-1 rounded-full mr-2">
                Blog
              </span>
              <h4 className="font-bold text-lg mt-2">
                Led by iProspect, dentsu secures major BMW Group media win across
                Europe
              </h4>
            </div>
            <div className="text-xl">→</div>
          </div>

          <div className="flex items-center border-b pb-4">
            <img
              src={about}
              alt="Post 2"
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <span className="text-xs border px-2 py-1 rounded-full mr-2">
                News
              </span>
              <h4 className="font-bold text-lg mt-2">
                Nothing Brings Phone (3) to Life with Show Stopping Giant-Scale
                Shoreditch Installation
              </h4>
            </div>
            <div className="text-xl">→</div>
          </div>

          <div className="flex items-center border-b pb-4">
            <img
              src={about}
              alt="Post 3"
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <span className="text-xs border px-2 py-1 rounded-full mr-2">
                Insights
              </span>
              <h4 className="font-bold text-lg mt-2">
                Culture Accelerated in the Algorithmic Era: A quick read for busy
                CEOs
              </h4>
            </div>
            <div className="text-xl">→</div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="border px-6 py-2 rounded-full hover:bg-gray-100">
            View all
          </button>
        </div>
      </section>
    </div>
  );
}