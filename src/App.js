import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Header from "./components/header";
import About from "./components/about";
import Footer from "./components/footer";
import ContactPage from "./components/ContactPage";
import Work from "./components/Work";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-center">
          <Routes>
            <Route path="/" element={<Header/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/ContactPage" element={<ContactPage/>}/>
            <Route path="/Work" element={<Work/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;