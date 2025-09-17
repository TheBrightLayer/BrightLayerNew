// src/components/AboutPage.jsx
import React from 'react';
import aboutHero from "../assets/about-hero.jpg";
import leader4 from "../assets/leader4.jpg";

function AboutPage() {
  return (
    <div className="bg-black text-white w-full"> {/* Ensure main div is full width */}

      {/* Hero Text and Image Section */}
      <section className="bg-black text-white py-20"> {/* Removed px-8 */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Adjusted container for better responsiveness */}
          {/* Green Text Block */}
          <div className="bg-green-500 text-black px-6 py-4 inline-block mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              WE ARE BUILT TO <br className="hidden lg:block"/>
              ACCELERATE CHANGE THAT <br className="hidden lg:block"/>
              SHAPES THE FUTURE
            </h1>
          </div>
          
          {/* Image below the text block */}
          <div className="w-full mt-12">
            <img
              src={aboutHero}
              alt="Person working with a phone"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Text Below Hero Image Section */}
      <section className="bg-black text-gray-300 py-16"> {/* Removed px-8 */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Adjusted container for better responsiveness */}
          <p className="text-base leading-relaxed max-w-2xl mx-auto md:ml-auto">
            At iProspect, we offer a comprehensive suite of services designed to
            drive impactful growth. Our expertise spans personalized storytelling,
            dynamic creative optimization, full-funnel experience design, and
            advanced real-time measurement. By leveraging cutting-edge
            technology and deep data insights, we ensure your brand resonates
            with audiences across all touchpoints. Our approach integrates
            creativity with performance, empowering you to connect
            meaningfully, engage authentically, and achieve sustained business
            success in a multi-platform world.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white text-black py-20"> {/* Removed px-8 */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Adjusted container for better responsiveness */}
          <p className="text-green-500 text-sm font-semibold mb-2">STATS</p>
          <h2 className="text-5xl font-extrabold mb-12">FOCUSED ON GROWTH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-500 p-8 rounded-lg flex flex-col justify-between h-48">
              <p className="text-white text-sm font-semibold mb-4">COUNTRIES</p>
              <p className="text-white text-5xl font-extrabold">93</p>
            </div>
            <div className="bg-green-500 p-8 rounded-lg flex flex-col justify-between h-48">
              <p className="text-white text-sm font-semibold mb-4">EXPERTS</p>
              <p className="text-white text-5xl font-extrabold">8,000+</p>
            </div>
            <div className="bg-green-500 p-8 rounded-lg flex flex-col justify-between h-48">
              <p className="text-white text-sm font-semibold mb-4">OFFICE LOCATIONS</p>
              <p className="text-white text-5xl font-extrabold">126</p>
            </div>
            <div className="bg-green-500 p-8 rounded-lg flex flex-col justify-between h-48">
              <p className="text-white text-sm font-semibold mb-4">CLIENTS</p>
              <p className="text-white text-5xl font-extrabold">2,600+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-black text-white py-20"> {/* Removed px-8 */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Adjusted container for better responsiveness */}
          <p className="text-green-500 text-sm font-semibold mb-4 text-center md:text-left">AWARDS</p>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 border-b border-gray-800">
              <div className="flex-1 text-center md:text-left">
                <p className="text-white text-lg font-bold mb-1">RECMA</p>
                <p className="text-green-500 text-sm">Highest-Growth Media Network Globally</p>
              </div>
              <p className="text-gray-400">2024</p>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-800">
              <div className="flex-1 text-center md:text-left">
                <p className="text-white text-lg font-bold mb-1">Digital Cinema Media Awards</p>
                <p className="text-green-500 text-sm">Best Long-term Use of Cinema, iProspect UK x IKEA</p>
              </div>
              <p className="text-gray-400">2023</p>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-800">
              <div className="flex-1 text-center md:text-left">
                <p className="text-white text-lg font-bold mb-1">Advertising Week Africa</p>
                <p className="text-green-500 text-sm">Future is Female Awards, iProspect Kenya</p>
              </div>
              <p className="text-gray-400">2023</p>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-800">
              <div className="flex-1 text-center md:text-left">
                <p className="text-white text-lg font-bold mb-1">Effie Awards Latin America</p>
                <p className="text-green-500 text-sm">Influencer, iProspect Brazil x FYS</p>
              </div>
              <p className="text-gray-400">2023</p>
            </div>
            <div className="flex justify-between items-center py-4">
              <div className="flex-1 text-center md:text-left">
                <p className="text-white text-lg font-bold mb-1">MediaPost</p>
                <p className="text-green-500 text-sm">Search/Performance Agency of the Year, iProspect USA</p>
              </div>
              <p className="text-gray-400">2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-white text-black py-20"> {/* Removed px-8 */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Adjusted container for better responsiveness */}
          <p className="text-green-500 text-sm font-semibold mb-2">LEADERSHIP</p>
          <h2 className="text-5xl font-extrabold mb-12">
            GUIDING THE <br />
            VISION
          </h2>
          <div className="border-b border-gray-300 mb-12"></div> {/* Added horizontal line */}
          <div className="flex flex-col md:flex-row items-start md:space-x-8">
            <div className="flex-shrink-0 mb-8 md:mb-0">
              <img
                src={leader4}
                alt="Amanda Morrissey"
                className="w-40 h-40 object-cover" // Removed rounded-full class for a square image
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Amanda Morrissey</h3>
              <p className="text-green-500 text-sm mb-4">Global President, iProspect and Chief Growth Officer, Media</p>
              <p className="mb-4">
                Amanda Morrissey is responsible for the iProspect agency and brand globally and works closely with
                leadership and teams in over 90 markets to deliver digital-first end to end media solutions for clients.
                Skilled at leading through change, Amanda has teamed with local markets and area specialists to build
                and launch a new global agency proposition, one which brings together the science of performance
                marketing and the art of brand building.
              </p>
              <p>
                A champion for local nuance and culture, she has instilled a supportive and collaborative infrastructure
                of experts and teams across the globe, who work together at pace and at scale to accelerate both
                client business and talent opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Brand Growth Section */}
      <section className="bg-black text-white py-24 text-center"> {/* Removed px-4 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted container for better responsiveness */}
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            <span style={{ color: '#00ff99' }}>ACCELERATE</span> YOUR BRANDS GROWTH.
          </h2>
          <div className="inline-block mt-4">
            <a
              href="#"
              className="relative text-white font-semibold hover:text-[#00ff99] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#00ff99] after:transition-[width] after:duration-300 hover:after:w-full"
            >
              Start the conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;