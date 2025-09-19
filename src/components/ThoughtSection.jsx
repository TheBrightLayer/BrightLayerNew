import React from "react";
import { ArrowRight } from "lucide-react";

// Import your images
import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import work4 from "../assets/work4.jpg";

// Articles data with images repeating
const articles = [
  { id: 1, tag: "Blog", image: work1, title: "LinkedIn Live – Culture Accelerated" },
  { id: 2, tag: "News", image: work2, title: "Led by iProspect, dentsu secures major BMW Group media win across Europe" },
  { id: 3, tag: "Insights", image: work3, title: "Nothing Brings Phone (3) to Life with Show Stopping Giant-Scale Shoreditch Installation" },
  { id: 4, tag: "Blog", image: work4, title: "Culture Accelerated in the Algorithmic Era: A quick read for busy CEOs" },
  { id: 5, tag: "Insights", image: work1, title: "Introducing The Media Edge" },
  { id: 6, tag: "Blog", image: work2, title: "Luxury Brands Know Culture. But Even They Need to Rethink the Playbook" },
  { id: 7, tag: "News", image: work3, title: "Protecting Brand Equity in the TikTok Shop Era" },
  { id: 8, tag: "Insights", image: work4, title: "iProspect UK CEO James Bailey Shortlisted for Media Leader of the Year 2025" },
  { id: 9, tag: "News", image: work1, title: "iProspect Malaysia Awarded Silver in Four Categories" },
  { id: 10, tag: "Insights", image: work2, title: "Five Shortlists for iProspect at Media Week Awards 2025" },
];

export default function ThoughtSection() {
  return (
    <div className="w-full">
      {/* ===== Hero / Thought Section ===== */}
<section
  id="thoughtSection"
  className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 bg-black text-white text-center"
>
  <div className="relative z-10 max-w-4xl">
    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
      <span className="text-white">LEADING WITH</span>{" "}
      <span className="text-green-500">THOUGHT</span>
    </h1>
    <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
      We have the experience and point of view to <br></br>help transform and
      elevate your brand.
    </p>
  </div>
</section>


      {/* ===== Insights List Section ===== */}
<section
  id="InsightsList"
  className="w-full bg-white flex justify-center py-12"
>
  <div className="w-full max-w-4xl px-4">
    {articles.map((item, index) => (
      <div key={item.id}>
        <div className="flex items-center justify-between gap-4 py-6">
          {/* Left Part (Image + Content) */}
          <div className="flex items-center gap-4">
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-28 object-cover"
            />

            {/* Content */}
            <div className="flex flex-col">
              <span className="inline-block px-2 py-0.5 border border-gray-400 rounded-full text-[10px] font-medium text-gray-700 mb-2">
              {item.tag}
              </span>
              <h3 className="text-lg font-semibold text-black leading-snug">
                {item.title}
              </h3>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-6 h-6 text-black flex-shrink-0" />
        </div>

        {/* Divider */}
        {index < articles.length - 1 && (
          <div className="border-b border-gray-300"></div>
        )}
      </div>
    ))}

    {/* Pagination */}
    <div className="flex justify-center items-center gap-2 mt-8">
      {[1, 2, 3, 4, "...", 18].map((num, i) => (
        <button
          key={i}
          className={`px-3 py-1 text-sm font-medium ${
            num === 1
              ? "bg-green-500 text-white rounded"
              : "text-gray-700 hover:bg-gray-200 rounded"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  </div>
</section>

    </div>
  );
}
