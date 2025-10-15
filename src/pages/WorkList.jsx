import React from "react";
import { Link } from "react-router-dom";
import { postsMeta } from "../data/postsIndex";

export default function WorkList() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Work / Blog</h1>

      <div className="space-y-8">
        {postsMeta.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <Link
              to={`/work/${post.slug}`}
              className="text-2xl font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p className="mt-2 text-gray-700">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
