import React from "react";

const SkeletonLoader = ({ type = "small", count = 3 }) => {
  const widthClass =
    type === "featured"
      ? "w-full"
      : type === "category"
      ? "sm:w-1/3 w-full"
      : "lg:w-1/3 sm:w-1/2 w-full";

  const heightClass =
    type === "featured" ? "h-[400px]" : type === "category" ? "h-[300px]" : "h-[400px]";

  return (
    <div className="mt-10 flex gap-5 flex-wrap">
      <style>{`
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer {
          background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%);
          background-repeat: no-repeat;
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.6s linear infinite;
        }
      `}</style>

      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          role="status"
          aria-busy="true"
          className={`${widthClass} ${heightClass} rounded-2xl overflow-hidden shimmer shadow-inner relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
          <div className="absolute inset-0 mix-blend-overlay" />

          <div className="relative h-full p-6 flex flex-col justify-end">
            <div className="w-3/4 h-4 rounded-md bg-gray-700 mb-3" />
            <div className="w-1/2 h-3 rounded-md bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
