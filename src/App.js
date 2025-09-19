import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Header from "./components/header";
import Services from "./components/services";
import Footer from "./components/footer";
import ThoughtSection from "./components/ThoughtSection";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/services" element={<Services />} />
        <Route path="/thoughts-and-views" element={<ThoughtSection />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
