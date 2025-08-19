import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faYoutube, faTwitter, faLinkedinIn, } from '@fortawesome/free-brands-svg-icons';
const API_URL= import.meta.env.VITE_API


export default function Navbar() {
  const navItems = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "CERTIFICATIONS", path: "/certifications" },
    { label: "SERVICES", path: "/services" },
    { label: "GALLERY", path: "/gallery" },
    { label: "CONTACT", path: "/contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
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
    <>
      {/* Top Bar */}
      <div className="bg-[#235764] w-full top-0 z-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-6 md:px-6 py-2 sm:py-1 md:py-2.5 flex justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <a
              href="https://www.youtube.com/@emithram.csc."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#0d9488] to-[#87d54b] items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="text-white text-xs sm:text-sm transition-transform duration-300 group-hover:scale-140"
              />
            </a>

            <a
              href="https://www.youtube.com/@emithram.csc."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#0d9488] to-[#87d54b] items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-white text-xs sm:text-sm transition-transform duration-300 group-hover:scale-140"
              />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#0d9488] to-[#87d54b] items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-white text-xs sm:text-sm transition-transform duration-300 group-hover:scale-140"
              />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#0d9488] to-[#87d54b] items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-white text-xs sm:text-sm transition-transform duration-300 group-hover:scale-140"
              />
            </a>
          </div>

          {/* Contact Information */}
          <div className="flex items-center">
            <button
              className="px-1 sm:px-1 rounded-xl hover:scale-102 transition-transform cursor-pointer"
              onClick={() => {
                navigate('/shop')
              }}
            >
              <span className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 border border-[#a8b9a9] rounded-xl bg-gradient-to-r from-[#0d9488] to-[#87d54b] transition-colors">
               <img
                  src={images?.shopicon?.image || "/Cart Icon@2x.webp"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/Cart Icon@2x.webp";
                  }}
                  alt="Support Icon"
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain flex-shrink-0"
                />
                <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium whitespace-nowrap">
                  <span className="hidden xs:inline sm:inline md:inline lg:inline xl:inline">SHOP DEVICES</span>
                  <span className="xs:hidden sm:hidden md:hidden lg:hidden xl:hidden">SHOP</span>
                </span>
              </span>
            </button>

            <button
              className="px-1 sm:px-1 rounded-xl hover:scale-102 transition-transform cursor-pointer"
              onClick={() => {
                const confirmed = window.confirm("Do you want to chat on WhatsApp with +91 9539270777?");
                if (confirmed) {
                  window.open("https://wa.me/919539270777", "_blank");
                }
              }}
            >
              <span className="flex items-center gap-1  border border-[#a8b9a9] bg-gradient-to-r from-[#0d9488] to-[#87d54b] px-2 sm:px-3 md:px-3 py-1 rounded-xl">
                <img
                  src={images?.navbarsupport?.image || "/Asset 33@2x.webp"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/Asset 33@2x.webp";
                  }}
                  alt="Support Icon"
                  className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 object-contain flex-shrink-0"
                />
                <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium whitespace-nowrap">
                  <span className="hidden xs:inline sm:inline">+91 9539270777</span>
                  <span className="xs:hidden sm:hidden">Call</span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white w-full shadow-md font-poppins top-0 z-40 sticky">
        <div className="max-w-8xl mx-auto flex items-center justify-between px-6 sm:px-6 py-2 sm:py-3 md:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
                  src={images?.toplogo?.image || "/emithramtlogo.webp"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/emithramtlogo.webp";
                  }}
              alt="Logo"
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className="relative group text-md xl:text-base 2xl:text-lg hover:text-[#235764] transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}

              >
                {({ isActive }) => (
                  <div>
                    <span className={`${isActive ? "font-semibold text-black" : "text-gray-800"} whitespace-nowrap`}>
                      {item.label}
                    </span>
                    <span
                      className={`absolute left-0 -bottom-1 h-[3px] md:h-[4px] lg:h-[5px] bg-[#D9E535] transition-all duration-300 ease-in-out ${isActive ? "w-full" : ""
                        }`}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden lg:flex flex-shrink-0 space-x-2">
            <button className="bg-[#D9E535] px-4 xl:px-6 py-1 xl:py-1.5 text-sm xl:text-lg font-bold rounded-full border-1 border-gray-200 hover:bg-[#c4d330] transition-colors cursor-pointer"
              onClick={() => {
                navigate('/register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}

            >
              Register
            </button>
            <button
              onClick={() => {
                window.location.href = "https://www.emithram.in/franchise/login.php";
              }}
              className="bg-[#D9E535] px-4 xl:px-6 py-1 xl:py-1.5 text-sm xl:text-lg font-bold rounded-full border-1 border-gray-200 hover:bg-[#c4d330] transition-colors cursor-pointer"
            >
              LOGIN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`
            lg:hidden fixed inset-0 z-50 transition-opacity duration-300
            ${menuOpen ? "opacity-100 pointer-events-auto bg-transparent bg-opacity-40" : "opacity-0 pointer-events-none"}
          `}
          onClick={() => setMenuOpen(false)}
        >
          {/* Sidebar */}
          <div
            className={`
              fixed top-0 right-0 h-full w-[75%] sm:w-[60%] md:w-[45%] bg-white shadow-2xl z-60
              transform transition-transform duration-300 ease-in-out
              ${menuOpen ? "translate-x-0" : "translate-x-full"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex items-center justify-end p-4 border-b border-gray-200">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="p-4 h-full overflow-y-auto">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block py-3 px-4 transition-all duration-200 transform hover:scale-105 ${isActive
                          ? "bg-gray-100 text-black"
                          : "text-gray-800 hover:scale-105"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Login Buttons */}
              <div className="mt-6 pt-4 space-y-3">
                <button
                  className="w-full bg-[#D9E535] px-4 py-3 rounded-lg font-bold border-1 border-gray-200 text-black hover:bg-[#c4d330] transition-all duration-200 transform hover:scale-105 shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </button>
                <button
                  className="w-full bg-[#D9E535] px-4 py-3 rounded-lg font-bold border-1 border-gray-200 text-black hover:bg-[#c4d330] transition-all duration-200 transform hover:scale-105 shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}