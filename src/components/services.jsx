import React from "react";
import hero from "../assets/about.jpg";

export default function Services() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="Services" className="relative w-full h-screen flex items-center justify-center bg-gray-900">
        {/* Background Image */}
        <img
          src={hero}
          alt="Digital Marketing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6 text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-green-500">DIGITAL MARKETING</span>{" "}
            <span className="text-white">SERVICES</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light max-w-2xl">
            At iProspect, we deliver digital marketing services designed to help
            brands grow faster and smarter. We partner with marketers ready to
            harness the power of modern media. They are outcome enthusiasts,
            restless experimenters, and disruptors who move at the speed of
            their customers.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="bg-white text-black px-6 md:px-20 py-16 space-y-16">
        {/* Block 1 */}
        <div className="w-full px-10 py-16">
      {/* One Service Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-10">
        {/* Left side - Heading */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-xl font-bold text-green-700">
            Experience Design Across Every Channel
          </h2>
        </div>

        {/* Right side - Paragraph */}
        <div className="md:w-1/2 text-gray-700 text-base leading-relaxed">
          <p>
            In today’s algorithm-driven world, every moment is a chance to connect,
            shop, share, or belong. Our digital marketing services create seamless
            cross-platform ecosystems that blend media, content, and commerce.
            Powered by 8,000+ media specialists, we test, refine, and scale ideas in
            real time - across SEO, PPC, social, video, and more - to meet people
            where they are and move with them wherever they go.
          </p>
          <p className="mt-4 font-semibold">
            <u>Performance Marketing Services: Transforming Businesses</u>
          </p>
        </div>
      </div>
    </div>

        {/* Block 2 */}
        <div className="w-full px-10 py-16">
      {/* One Service Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-10">
        {/* Left side - Heading */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-xl font-bold text-green-700">
            Experience Design Across Every Channel
          </h2>
        </div>

        {/* Right side - Paragraph */}
        <div className="md:w-1/2 text-gray-700 text-base leading-relaxed">
          <p>
            We go beyond optimizing campaigns, we rewire growth. At iProspect,
            we're more than a marketing partner; we're architects of progress.
            Our vision is to transform how digital marketing delivers value
            through transparency, accountability, and automation across all
            channels.
          </p>
          <p className="mt-4 font-semibold">
            Digital Marketing Strategy & Planning
          </p>
        </div>
      </div>
    </div>

        {/* Block 3 */}

        <div className="w-full px-10 py-16">
      {/* One Service Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-10">
        {/* Left side - Heading */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-xl font-bold text-green-700">
              Digital Marketing Channels We Specialize In
          </h2>
        </div>

        {/* Right side - Paragraph */}
        <div className="md:w-1/2 text-gray-700 text-base leading-relaxed">
          <p>
            In today's Algorithmic Era, performance is engineered through
            intelligence. Brands need more than generalists — they need precise
            orchestration, and the power of human ingenuity combined with
            artificial intelligence. At iProspect, we bring together
            channel-specific expertise across all major digital marketing
            domains, to create a single, cohesive system that drives measurable
            growth.
            <ul className="list-disc ml-6 space-y-2 text-gray-800">
            <u><li>Search Engine Optimization (SEO) Services</li>
            <li>Pay-Per-Click (PPC) Services</li>
            <li>Programmatic Advertising Services</li>
            <li>Retail Media Advertising</li>
            <li>Paid Social Services</li>
            <li>Video Advertising Services</li>
            <li>Digital Out-Of-Home Advertising</li>
            <li>Affiliate Marketing & Agile Measurement Solutions</li></u>
            </ul>
          </p>
        </div>
      </div>
    </div>
      </section>
    </div>
  );
}
