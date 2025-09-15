import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h1>
          <span className="highlight">ACCELERATE</span> YOUR BRANDS GROWTH.
        </h1>
        <p className="conversation">Start the conversation</p>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">iPROSPECT</div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <p>Home</p>
            <p>About</p>
            <p>Services</p>
            <p>Work</p>
            <p>Thoughts & Views</p>
            <p>Get in touch</p>
          </div>
          <div>
            <h4>Careers</h4>
            <p>Open worldwide roles</p>
          </div>
          <div>
            <h4>Socials</h4>
            <p>Facebook</p>
            <p>LinkedIn</p>
          </div>
          <div>
            <h4>Legal</h4>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
            <p>Terms and Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
