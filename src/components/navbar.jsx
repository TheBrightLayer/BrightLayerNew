import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-400">
            BrightLayer
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition">
              Home
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              About
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Services
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
          <a href="#" className="block hover:text-blue-400 transition">
            Home
          </a>
          <a href="#" className="block hover:text-blue-400 transition">
            About
          </a>
          <a href="#" className="block hover:text-blue-400 transition">
            Services
          </a>
          <a href="#" className="block hover:text-blue-400 transition">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
