import React from 'react';
import careersImage from '../assets/careers-bg.jpg'; // Path to your careers background image
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ContactPage() {
  return (
    <div className="bg-black text-white">

      {/* Hero Section: Contact Us */}
      <section className="bg-black text-white pt-32 pb-16 px-8">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8">CONTACT US</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-green-500 font-semibold mb-2">GENERAL INQUIRIES</p>
              <a href="mailto:hello@iprospect.com" className="text-white hover:underline">hello@example.com</a>
            </div>
            <div>
              <p className="text-green-500 font-semibold mb-2">PRESS CONTACT</p>
              <a href="mailto:hello@iprospect.com" className="text-white hover:underline">hello@example.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Locations and Form */}
      <section className="bg-white text-black py-16 px-8">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side: Locations */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Contact us in</h2>
            
            <div className="mb-8">
              <label htmlFor="market" className="block text-gray-700 font-semibold mb-2">MARKET*</label>
              <select id="market" name="market" className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Location: Bengaluru */}
            <div className="mb-6">
              <h3 className="text-xl text-green-500 font-semibold mb-2">iProspect Bengaluru</h3>
              <p className="text-gray-600">
                1st Floor, Alyssa No 23,<br />
                Richmond Road, Richmond Town<br />
                ,Bengaluru ,560025
              </p>
            </div>

            {/* Location: Mumbai */}
            <div className="mb-6">
              <h3 className="text-xl text-green-500 font-semibold mb-2">iProspect Mumbai</h3>
              <p className="text-gray-600">
                2nd floor, Survey No. 35, Deep<br />
                Complex, Above Renault<br />
                Showroom, Mumbai – Bangalore<br />
                Highway Road, Baner, Pune,<br />
                Maharashtra 411045, India
              </p>
            </div>

            {/* Location: Gurugram */}
            <div>
              <h3 className="text-xl text-green-500 font-semibold mb-2">iProspect Gurugram</h3>
              <p className="text-gray-600">
                2nd & 3rd Floor, AIHP Horizon,<br />
                445 Udyog Vihar Phase V, Sector<br />
                19, Gurugram, Haryana 122008,<br />
                India
              </p>
            </div>

          </div>

          {/* Right Side: Inquiry Form */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Inquiry form</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="jobTitle" className="block text-gray-700 font-semibold mb-2">JOB TITLE*</label>
                <input type="text" id="jobTitle" name="jobTitle" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">EMAIL ADDRESS*</label>
                <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label htmlFor="companyName" className="block text-gray-700 font-semibold mb-2">COMPANY NAME*</label>
                <input type="text" id="companyName" name="companyName" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label htmlFor="marketForm" className="block text-gray-700 font-semibold mb-2">MARKET*</label>
                <select id="marketForm" name="marketForm" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">COMMENT</label>
                <textarea id="comment" name="comment" rows="4" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <input type="checkbox" id="communications" name="communications" className="mt-1" />
                  <label htmlFor="communications" className="ml-2 text-sm text-gray-600">I would like to receive communications from iProspect and dentsu agencies for marketing purposes</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" id="privacyPolicy" name="privacyPolicy" className="mt-1" required />
                  <label htmlFor="privacyPolicy" className="ml-2 text-sm text-gray-600">I have read and agree to the Privacy Policy*</label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button type="submit" className="bg-green-500 text-white font-bold py-3 px-6 rounded-md flex items-center justify-end ml-auto">
                  SEND 
                  <span className="ml-2">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Careers Banner Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${careersImage})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          <p className="text-green-500 font-semibold uppercase mb-2">Careers</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6">
            KICKSTART YOUR CAREER <br /> WITH IPROSPECT
          </h2>
          <div className="mt-8 border-b-2 border-white pb-2 inline-block">
            <Link to="/careers" className="text-white text-lg md:text-xl font-bold hover:text-green-500 transition-colors">
              Open worldwide roles
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ContactPage;