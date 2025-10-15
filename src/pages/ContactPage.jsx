import React, { useState, useEffect, useRef } from 'react';
import careersImage from '../assets/careers-bg.jpg';
import { Link } from 'react-router-dom';

function ContactPage() {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
  const ENDPOINT = `${API_BASE}/api/sendMail/send-proposal`;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    companyName: "",
    marketForm: "india",
    comment: "",
    communications: false,
    privacyPolicy: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: '...' }
  const firstInputRef = useRef(null);

  useEffect(() => {
    // autofocus first input on mount for convenience
    if (firstInputRef.current) firstInputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // simple validations (mirror Header)
    if (!form.firstName.trim()) return setStatus({ type: "error", text: "Please enter your first name." });
    if (!form.lastName.trim()) return setStatus({ type: "error", text: "Please enter your last name." });
    if (!form.jobTitle.trim()) return setStatus({ type: "error", text: "Please enter your job title." });
    if (!form.companyName.trim()) return setStatus({ type: "error", text: "Please enter your company name." });
    if (!form.email.trim() || !validEmail(form.email)) return setStatus({ type: "error", text: "Please enter a valid email address." });
    if (!form.privacyPolicy) return setStatus({ type: "error", text: "You must accept the Privacy Policy to continue." });

    setLoading(true);

    // Build payload similar to Header
    const payload = {
      fromName: `${form.firstName} ${form.lastName}`,
      fromEmail: form.email,
      to: ["contact@thebrightlayer.com"], // adjust recipients as desired
      cc: "",
      subject: `Inquiry: ${form.companyName} — ${form.jobTitle}`,
      intro: `Thanks ${form.firstName}! We've received your inquiry and will reply shortly.`,
      quickIntro: `${form.companyName ? `${form.companyName} — ` : ""}Inquiry via contact page.`,
      introInternal: `New inquiry from ${form.firstName} ${form.lastName}`,
      quickIntroInternal: `${form.companyName ? `${form.companyName} — ` : ""}Contact via ContactPage.`,
      highlights: [],
      scope: "",
      message: `Market: ${form.marketForm}\nCommunications opt-in: ${form.communications ? "Yes" : "No"}\n\n${form.comment}`,
      attachments: [],
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) data = await res.json();
      else data = { statusText: await res.text() };

      if (!res.ok) {
        const errMsg = (data && (data.error || data.details || data.statusText)) || "Server error";
        throw new Error(errMsg);
      }

      setStatus({ type: "success", text: (data && (data.message || data.statusText)) || "Thanks — your message was sent. We'll reply within 24 hours." });

      // clear form (but keep market selection)
      setForm({
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        companyName: "",
        marketForm: form.marketForm || "india",
        comment: "",
        communications: false,
        privacyPolicy: false,
      });

      // focus back to first input
      if (firstInputRef.current) firstInputRef.current.focus();
    } catch (err) {
      console.error("Send error:", err);
      setStatus({ type: "error", text: err.message || "Failed to send. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="bg-black text-white pt-28 pb-16 px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-10 tracking-wide">
            CONTACT US
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-green-500 font-semibold uppercase mb-2">General Inquiries</p>
              <a href="mailto:hello@iprospect.com" className="text-lg hover:underline">
                hello@thebrightlayer.com
              </a>
            </div>
            <div>
              <p className="text-green-500 font-semibold uppercase mb-2">Press Contact</p>
              <a href="mailto:hello@iprospect.com" className="text-lg hover:underline">
                contact@thebrightlayer.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Locations & Form */}
      <section className="bg-white text-black py-20 px-8">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Locations */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Contact us in</h2>
            
            <div className="mb-8">
              <select
                id="market"
                name="market"
                value={form.marketForm}
                onChange={(e) => setForm((s) => ({ ...s, marketForm: e.target.value }))}
                className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </select>
            </div>

            {/* Location Items */}
            <div className="space-y-8">
              <div>
                <h3 className="text-green-600 font-bold text-xl mb-2">BrightLayer Bengaluru</h3>
                <p className="text-gray-700 text-base">
                  1st Floor, Alyssa No 23,<br />
                  Richmond Road, Richmond Town,<br />
                  Bengaluru, 560025
                </p>
              </div>
              <div>
                <h3 className="text-green-600 font-bold text-xl mb-2">BrightLayer Mumbai</h3>
                <p className="text-gray-700 text-base">
                  2nd floor, Survey No. 35, Deep Complex,<br />
                  Above Renault Showroom,<br />
                  Mumbai – Bangalore Highway Road,<br />
                  Baner, Pune, Maharashtra 411045, India
                </p>
              </div>
              <div>
                <h3 className="text-green-600 font-bold text-xl mb-2">BrightLayer Gurugram</h3>
                <p className="text-gray-700 text-base">
                  2nd & 3rd Floor, AIHP Horizon,<br />
                  445 Udyog Vihar Phase V,<br />
                  Sector 19, Gurugram, Haryana 122008, India
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Inquiry Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Inquiry form</h2>
            <form className="space-y-6 bg-gray-50 p-8 rounded-md shadow-sm" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                    FIRST NAME*
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                    LAST NAME*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-semibold mb-2">
                  JOB TITLE*
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  EMAIL ADDRESS*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold mb-2">
                  COMPANY NAME*
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="marketForm" className="block text-sm font-semibold mb-2">
                  MARKET*
                </label>
                <select
                  id="marketForm"
                  name="marketForm"
                  value={form.marketForm}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                </select>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-semibold mb-2">
                  COMMENT
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  value={form.comment}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="communications"
                    name="communications"
                    checked={form.communications}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <label htmlFor="communications" className="ml-2 text-sm text-gray-700">
                    I would like to receive communications from iProspect and dentsu agencies for
                    marketing purposes
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    name="privacyPolicy"
                    checked={form.privacyPolicy}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="privacyPolicy" className="ml-2 text-sm text-gray-700">
                    I have read and agree to the Privacy Policy*
                  </label>
                </div>
              </div>

              {/* Status message */}
              {status && (
                <div className={`mt-2 text-sm ${status.type === "error" ? "text-red-500" : "text-green-600"} font-medium flex items-center gap-2`}>
                  {status.type === "error" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md flex items-center ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      SEND <span className="ml-2">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Careers Banner Section */}
      <section
        className="relative h-[60vh] md:h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${careersImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          <p className="text-green-500 font-semibold uppercase mb-2">Careers</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6">
            KICKSTART YOUR CAREER <br /> WITH IPROSPECT
          </h2>
          <div className="mt-8 border-b-2 border-white pb-2 inline-block">
            <Link
              to="/contact"
              className="text-white text-lg md:text-xl font-bold hover:text-green-500 transition-colors"
            >
              Open worldwide roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
