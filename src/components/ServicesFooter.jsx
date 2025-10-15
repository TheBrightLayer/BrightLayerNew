import React from "react";
import { Link } from "react-router-dom";
export default function Brand() {
  return (
    <section className="w-full bg-black  text-white flex flex-col items-center justify-center text-center py-32 px-6">
      <h1 className="text-[54px] md:text-[96px] font-extrabold leading-tight">
        <span className="text-green-500">ENHANCE</span>{" "}
        YOUR <br />
        BRANDS WITH US<span className="text-white">.</span>
      </h1>

      <Link to="/contact" className="mt-10 text-lg font-medium border-b-2 border-white/40 hover:border-white transition duration-300">
        Start the conversation
      </Link>
    </section>
  );
}
