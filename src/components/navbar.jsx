import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">iPROSPECT</div>

      <ul className="navbar-links">
        <li>About</li>
        <li>Services</li>
        <li>Work</li>
        <li>Thoughts & Views</li>
      </ul>

      <div className="navbar-right">
        <span className="global">🌐 Global</span>
        <button className="contact-btn">Get in touch →</button>
      </div>
    </nav>
  );
}

export default Navbar;
