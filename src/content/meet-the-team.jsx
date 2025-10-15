// src/content/posts/meet-the-team.jsx
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import hero2 from "../assets/hero.png";

export const meta = {
  slug: "meet-the-team",
  title: "Meet the Team Behind Bright Layer",
  date: "2025-10-11",
  cover: hero,
};

export default function MeetTheTeamBehindBrightLayer() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 text-left">
        <div className="mb-6">
          <Link
            to="/work"
            className="inline-block text-sm font-semibold tracking-wide hover:underline"
            style={{ color: "#00FF84" }}
          >
            ← BACK TO WORK
          </Link>
        </div>

        <header className="mb-8">
          <h1
            className="font-extrabold leading-tight mb-2"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.02em",
            }}
          >
            Meet the Team Behind Bright Layer
          </h1>
          <p className="text-base text-gray-400">Bright Layer</p>
        </header>

        {hero && (
          <div className="mb-12">
            <img
              src={hero}
              alt="Bright Layer team"
              className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <article className="space-y-12 text-left">
          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Who We Are
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Bright Layer is an esteemed IT company in India, known for its innovative
              digital solutions. Our greatest strength lies in our people — a team of
              talented professionals who bring creativity, dedication, and expertise to
              every project. From web development and app creation to UI/UX design,
              digital marketing, and cloud solutions, our team is committed to excellence
              in everything we deliver.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Leadership That Inspires
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Bright Layer’s leadership team brings years of experience in IT and digital
              innovation. Their vision ensures every project meets the highest industry
              standards. With a focus on teamwork, innovation, and a client-first mindset,
              our leaders drive Bright Layer’s reputation as one of India’s most trusted
              technology partners.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Web & App Experts Who Deliver
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our web and app developers are the backbone of Bright Layer. They specialize
              in building responsive, secure, and customized digital experiences that fit
              each client’s needs. Whether it’s an e-commerce platform, a mobile app, or a
              corporate website, our specialists bring precision, scalability, and
              reliability to every project.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Contact us today to see how our experts can revolutionize your online
              presence.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Designers Who Get Users
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our UI/UX designers craft interfaces that are both beautiful and functional.
              They deeply understand user behavior, ensuring every interaction feels
              intuitive, seamless, and memorable. The result? Digital products that not
              only look great but provide exceptional user experiences.
            </p>
          </section>

          {/* {hero2 && (
            <div className="my-12">
              <img
                src={hero2}
                alt="Bright Layer office"
                className="w-full object-cover rounded-md shadow-lg"
              />
            </div>
          )} */}

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Marketing and Strategy Professionals
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Beyond development and design, our digital marketing team helps brands
              connect with their audiences. From SEO and social media to content marketing
              and PPC campaigns, we amplify your brand’s visibility and impact in today’s
              competitive digital world.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Cloud and Technical Solutions
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our engineers provide end-to-end cloud solutions that are scalable, secure,
              and efficient. By merging technology with strategic insight, we help
              companies harness the power of the cloud to achieve operational excellence
              and business growth.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Schedule a complimentary consultation to explore how we can customize a
              cloud strategy for your business.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              A Culture That Sets Us Apart
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Bright Layer thrives on collaboration, creativity, and continuous learning.
              Our culture encourages experimentation, open ideas, and bold thinking —
              enabling us to deliver cutting-edge solutions that exceed client
              expectations.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Client-Centric Approach
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Every decision we make begins with understanding our clients. By aligning
              with their vision, challenges, and goals, we ensure our work directly drives
              their business success. Bright Layer doesn’t just create projects — we build
              long-term partnerships.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Celebrating Achievements Together
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At Bright Layer, every milestone is a shared victory. We celebrate our
              clients’ success as our own — strengthening our unity and passion to keep
              innovating.
            </p>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Meet the People Behind the Success
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-300">
              <li>Seasoned project managers for seamless implementation.</li>
              <li>Talented developers who write with precision and purpose.</li>
              <li>Innovative designers passionate about UX/UI perfection.</li>
              <li>Marketing professionals who drive brand growth.</li>
              <li>Cloud engineers delivering secure, scalable solutions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed">
              The true strength of Bright Layer lies in its people — dedicated
              professionals united by a passion for technology and excellence. From
              leadership to developers, designers, marketers, and engineers, every member
              contributes to shaping digital success stories. Partner with Bright Layer to
              experience innovation, collaboration, and growth — all driven by a team that
              truly cares about your success.
            </p>
          </section>

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
