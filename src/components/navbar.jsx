import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust this threshold based on your hero section's height
      if (scrollPosition > 100) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false); // Close mobile menu on route change
    // Optional: If you want to force the scrolled state on certain pages initially,
    // or reset it on others. For now, scroll behavior applies.
  }, [location.pathname]);

  // Determine navbar background classes
  let navbarBackgroundClasses = '';
  if (location.pathname === '/') {
    // On the Home page: transparent when at top, dark when scrolled
    navbarBackgroundClasses = isScrolled ? 'bg-black' : 'bg-transparent';
  } else {
    // On other pages (like About), always dark/black
    navbarBackgroundClasses = 'bg-black';
  }

  // Common classes for all links (text color and size)
  const linkBaseClasses = "text-white font-semibold text-lg hover:text-blue-400 transition-colors duration-200";
  const mobileLinkBaseClasses = "block text-white font-semibold text-lg hover:text-blue-400 transition-colors duration-200 py-2";

  return (
    <nav className={`w-full fixed top-0 z-50 transition-colors duration-300 ${navbarBackgroundClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center"> {/* Increased height slightly */}
          {/* Logo */}
          <div className="flex-shrink-0 text-3xl font-extrabold"> {/* Increased logo size/boldness */}
            <Link to="/" className="text-white">Brightlayer</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-end items-center space-x-8"> {/* Increased space-x */}
            <Link to="/about" className={linkBaseClasses}>About</Link>
            <Link to="/services" className={linkBaseClasses}>Services</Link>
            <Link to="/Work" className={linkBaseClasses}>Work</Link>
            <Link to="/thoughts-and-views" className={linkBaseClasses}>Thoughts & Views</Link>

            
            {/* Global and Get in touch section */}
            <div className="flex items-center space-x-6 pl-6 border-l border-gray-700 ml-6">
              <Link to="/global" className="flex items-center text-blue-400 hover:text-blue-200 transition-colors duration-200 font-semibold text-lg">
                <span className="mr-2">🌐</span> Global 
              </Link>
              <Link to="/ContactPage" className="hover:text-blue-200 transition-colors duration-200 flex items-center text-white font-semibold text-lg">
                Get in touch <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-3xl focus:outline-none" // Ensure button is white
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
          <Link to="/" className={mobileLinkBaseClasses}>Home</Link>
          <Link to="/about" className={mobileLinkBaseClasses}>About</Link>
          <Link to="/services" className={mobileLinkBaseClasses}>Services</Link>
          <Link to="/work" className={mobileLinkBaseClasses}>Work</Link>
          <Link to="/thoughts-and-views" className={mobileLinkBaseClasses}>Thoughts & Views</Link>
          <Link to="/global" className={mobileLinkBaseClasses}>
            <span className="mr-2 text-blue-400">🌐</span> Global
          </Link>
          <Link to="/contact" className={mobileLinkBaseClasses}>Get in touch →</Link>
        </div>
      )}
    </nav>
  );
}
