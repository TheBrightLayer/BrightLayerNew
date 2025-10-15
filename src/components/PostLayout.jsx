import React from "react";
import { Link } from "react-router-dom";

/**
 * Reusable layout wrapper for case study / work posts.
 * Automatically applies black background, bright green accents, and consistent typography.
 */
export default function PostLayout({ title, subtitle, cover, children }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 text-left">
        {/* Back link */}
        <div className="mb-6">
      
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1
            className="font-extrabold leading-tight mb-2"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          {subtitle && <p className="text-base text-gray-400">{subtitle}</p>}
        </header>

        {/* Cover Image */}
        {cover && (
          <div className="mb-12">
            <img
              src={cover}
              alt={title}
              className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="space-y-12 text-left">{children}</article>

        {/* Back link at bottom */}
        <div className="mt-12">
          <Link
            to="/work"
            className="inline-block font-semibold hover:underline"
            style={{ color: "#00FF84" }}
          >
            ← Back to Work
          </Link>
        </div>
      </div>
    </div>
  );
}
