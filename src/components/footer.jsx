// src/components/Footer.jsx
import React from 'react';
import './footer.css'; // You can use a separate CSS file for these custom styles

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 px-8">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row md:justify-between items-start md:items-center">
        {/* Logo and Copyright */}
        <div className="flex flex-col mb-8 md:mb-0 md:mr-12 ">
          <div className="text-2xl text-white font-bold mb-2">BrightLayer</div>
          <div className="text-sm">Ambition meeting Accelaration</div>
          <div className="text-xs text-gray-500 mt-4">© 2025 BrightLayer. All rights reserved.</div>
        </div>
        
        {/* Navigation Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 flex-1">
          <div className="footer-link-column">
            <h4 className="font-bold text-white mb-2">COMPANY</h4>
            <ul>
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Thoughts & Views</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Get in touch</a></li>
            </ul>
          </div>
          <div className="footer-link-column">
            <h4 className="font-bold text-white mb-2">CAREERS</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Open worldwide roles <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link-column">
            <h4 className="font-bold text-white mb-2">SOCIALS</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Facebook <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link-column">
            <h4 className="font-bold text-white mb-2">LEGAL</h4>
            <ul>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Modern Slavery Act</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Interest-based advertising notice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms and conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;