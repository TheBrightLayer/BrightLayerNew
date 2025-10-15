import React from "react";
import { Link } from "react-router-dom"; // ✅ added import

export default function ServicesGrid() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
        {/* Each "row" is constrained to the same content width */}
        <div className="space-y-20">
          {/* ROW 1 */}
          <div>
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* left: narrow green heading */}
              <div className="col-span-12 lg:col-span-3">
                <h3
                  className="text-[#17b682] font-semibold"
                  style={{
                    fontSize: "clamp(20px, 2.2vw, 28px)",
                    lineHeight: 1.1,
                    letterSpacing: "0.01em",
                  }}
                >
                  Experience Design Across Every Channel
                </h3>
              </div>

              {/* right: paragraph and underlined link (constrained width, aligned to the right column) */}
              <div className="col-span-12 lg:col-span-9">
                <div className="max-w-[560px] ml-auto">
                  <p
                    className="text-gray-600"
                    style={{ fontSize: "16px", lineHeight: 1.7 }}
                  >
                    In today's algorithm-driven world, every moment is a chance
                    to connect, shop, share, or belong. Our digital marketing
                    services create seamless cross-platform ecosystems that
                    blend media, content, and commerce. Powered by 8,000+ media
                    specialists, we test, refine, and scale ideas in real time
                    - across SEO, PPC, social, video, and more - to meet people
                    where they are and move with them wherever they go.
                  </p>

                  {/* ✅ blog link updated */}
                  <Link
                    to="/work/programmatic-advertising-services"
                    className="inline-block mt-6 font-semibold"
                    style={{
                      fontSize: "15px",
                      color: "#111",
                      borderBottom: "2px solid #111",
                      paddingBottom: "3px",
                    }}
                  >
                    Performance Marketing Services: Transforming Businesses
                  </Link>
                </div>
              </div>
            </div>

            {/* divider aligned with content container width */}
            <div className="mt-12">
              <div className="border-t border-gray-300" />
            </div>
          </div>

          {/* ROW 2 */}
          <div>
            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-3">
                <h3
                  className="text-[#17b682] font-semibold"
                  style={{
                    fontSize: "clamp(20px, 2.2vw, 28px)",
                    lineHeight: 1.1,
                    letterSpacing: "0.01em",
                  }}
                >
                  Digital Marketing Strategy & Planning
                </h3>
              </div>

              <div className="col-span-12 lg:col-span-9">
                <div className="max-w-[560px] ml-auto">
                  <p
                    className="text-gray-600"
                    style={{ fontSize: "16px", lineHeight: 1.7 }}
                  >
                    We go beyond optimizing campaigns, we rewire growth. At
                    iProspect, we're more than a marketing partner, we're
                    architects of progress. Our vision is to transform how
                    digital marketing delivers value through transparency,
                    addressability, and automation across all channels
                  </p>

                  <a
                    href="#"
                    className="inline-block mt-6 font-semibold"
                    style={{
                      fontSize: "15px",
                      color: "#111",
                      borderBottom: "2px solid #111",
                      paddingBottom: "3px",
                    }}
                  >
                    Digital Strategy Services
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="border-t border-gray-300" />
            </div>
          </div>

          {/* ROW 3 */}
          <div>
            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-3">
                <h3
                  className="text-[#17b682] font-semibold"
                  style={{
                    fontSize: "clamp(20px, 2.2vw, 28px)",
                    lineHeight: 1.1,
                    letterSpacing: "0.01em",
                  }}
                >
                  Digital Marketing Channels We Specialize In
                </h3>
              </div>

              <div className="col-span-12 lg:col-span-9">
                <div className="max-w-[560px] ml-auto">
                  <p
                    className="text-gray-600"
                    style={{ fontSize: "16px", lineHeight: 1.7 }}
                  >
                    In today's Algorithmic Era, performance is engineered
                    through intelligence. Brands need more than generalists -
                    they need precision, orchestration, and the power of human
                    ingenuity combined with artificial intelligence. At
                    iProspect, we bring together deep expertise across all
                    major digital marketing channels to create a single,
                    adaptive system that delivers measurable growth. Our
                    channel specialisms
                  </p>

                  <a
                    href="#"
                    className="inline-block mt-6 font-semibold"
                    style={{
                      fontSize: "15px",
                      color: "#111",
                      borderBottom: "2px solid #111",
                      paddingBottom: "3px",
                    }}
                  >
                    Digital Channel Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
