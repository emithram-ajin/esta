import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaYoutube, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
const API_URL= import.meta.env.VITE_API



export default function Footer() {

  const [images, setImages] = useState()
  
    useEffect(() => {
      fetch(`${API_URL}/api/uploads?page=logo`)
        .then(res => res.json())
        .then(data => {
          console.log('Fetched:', data);
  
          const grouped = {};
          data.forEach(img => {
            grouped[img.position] = img;
          });
  
          setImages(grouped);
        })
        .catch(err => console.error('Error fetching images:', err));
    }, []);

  return (
    <footer className="bg-[#008C80] text-white px-10 sm:px-10 lg:px-12 py-6 sm:py-8 font-poppins border-t-6 border-[#89B6C1]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
        {/* About Us */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <a href='/'>
            <div
              className="w-auto h-[60px] bg-no-repeat bg-contain cursor-pointer"
              style={{ backgroundImage: `url(${images?.bottomlogo?.image})` }}
              aria-label="e-Mithram Logo"
            ></div>
          </a>

          <p className="text-sm text-white leading-relaxed font-poppins mt-3 sm:mt-5">
            Our business model works with the scope
            of entrepreneurship
          </p>
          <h3 className="mt-6 text-xl sm:text-2xl font-bold">Follow Us</h3>
          <div className="flex flex-wrap gap-3 mt-3">
            <a href="https://www.youtube.com/@emithram.csc." target="_blank" rel="noopener noreferrer">
              <div className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white text-[#008C80] items-center justify-center hover:scale-105 transition-transform duration-300">
                <FaYoutube size={14} />
              </div>
            </a>

            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <div className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white text-[#008C80]  items-center justify-center hover:scale-105 transition-transform duration-300">
                <FaFacebookF size={14} />
              </div>
            </a>

            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <div className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white text-[#008C80]  items-center justify-center hover:scale-105 transition-transform duration-300">
                <FaTwitter size={14} />
              </div>
            </a>

            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <div className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white text-[#008C80]  items-center justify-center hover:scale-105 transition-transform duration-300">
                <FaLinkedinIn size={14} />
              </div>
            </a>
          </div>
        </div>

        {/* Our Services */}
        <div className="lg:border-r-2 lg:border-[#368899] lg:pl-2">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Our Services</h3>
          <ul className="space-y-2 text-white font-poppins text-sm mt-3 sm:mt-5">
            <li>• Govt Services</li>
            <li>• Banking Services</li>
            <li>• Matrimony Services</li>
            <li>• Other Services</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="lg:border-r-2 lg:border-[#368899] lg:pl-2">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Useful Links</h3>
          <ul className="space-y-2 font-poppins text-white mt-3 sm:mt-5 text-sm">
            <li>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">• Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">• Privacy & Policy</Link>
            </li>
            <li>
              <Link to="/refund-policy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">• Refund Policy</Link>
            </li>
            <li>
              <Link to="/terms-conditions" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">• Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/disclaimer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">• Disclaimer</Link>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className="lg:pl-6">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Address</h3>
          <p className="text-sm text-white font-poppins leading-relaxed">
            DD Vyapar Bhavan<br />
            KP Vallon Rd, Kadavanthra, Kochi, Ernakulam<br />
            Pincode: 682020
          </p>

          <div className="mt-4 space-y-1 text-white">
            <div className="flex items-center text-sm">
              <FaPhone className="mr-2 flex-shrink-0" />
              <span>95392 70777</span>
            </div>
            <div className="flex items-center text-sm">
              <FaPhone className="mr-2 flex-shrink-0" />
              <span>95392 70666</span>
            </div>
            <p className="text-sm">✉ emithramcare@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white text-sm sm:text-base mt-8 sm:mt-8 md:mt-1 pt-4 ">
        Copyright © 2025 e-Mithram | All Rights Reserved.
      </div>
    </footer>
  );
}