import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/public/navbar";
import Footer from "./components/public/footer";

// Lazy load components
const Home = lazy(() => import("./components/public/home"));
const About = lazy(() => import("./components/public/about"));
const Certifications = lazy(() => import("./components/public/certifications"));
const Franchise = lazy(() => import("./components/public/franchise"));
const Gallery = lazy(() => import("./components/public/gallery"));
const Contact = lazy(() => import("./components/public/contact"));
const Registration = lazy(() => import("./components/public/Registration"));
const Privacypolicy = lazy(() => import("./components/public/Privacypolicy"));
const Refundpolicy = lazy(() => import("./components/public/refundpolicy"));
const Termsconditions = lazy(() => import("./components/public/termsconditions"));
const Testimonials = lazy(() => import("./components/public/Testimonials"));
const Services = lazy(() => import("./components/public/Services"));
const Disclaimer = lazy(() => import("./components/public/Disclaimer"));
const Shop = lazy (()=>import("./components/public/shop"))

function App() {
  const Spinner = (
    <div className="flex items-center justify-center h-96">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin text-gray-400"></div>
    </div>
  );

  return (
    <Router>
      <Navbar />
      <Suspense fallback={Spinner}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/privacy-policy" element={<Privacypolicy />} />
          <Route path="/refund-policy" element={<Refundpolicy />} />
          <Route path="/terms-conditions" element={<Termsconditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/testimonial" element={<Testimonials />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shop" element ={<Shop/>}/>
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
