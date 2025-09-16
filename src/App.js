import React from "react";
import Navbar from "./components/navbar"; 
import Header  from "./components/header";
import About from "./components/about";
import Footer from "./components/footer"; 


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 text-center">
       <Header/>
       <About/>
      </div>
    </div>
  );
}

export default App;
