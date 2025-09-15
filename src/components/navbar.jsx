import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
        iPROSPECT
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex space-x-8 text-lg font-medium">
        <li className="cursor-pointer hover:text-yellow-400 transition">About</li>
        <li className="cursor-pointer hover:text-yellow-400 transition">Services</li>
        <li className="cursor-pointer hover:text-yellow-400 transition">Work</li>
        <li className="cursor-pointer hover:text-yellow-400 transition">Thoughts & Views</li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        <span className="cursor-pointer hover:text-yellow-400">🌐 Global</span>
        <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
          Get in touch →
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
