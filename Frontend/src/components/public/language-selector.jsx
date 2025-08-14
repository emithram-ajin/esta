import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // optional icon

function Languageselecor() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', lng: 'EN' },
    { code: 'ml', lng: 'മ' },
    { code: 'ta', lng: 'த' },
  ];

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false); // close dropdown after selection
  };

  return (
    <div className="relative">
      {/* Large screen: inline buttons */}
      <div className="hidden sm:flex bg-white/10 backdrop-blur-sm rounded-full p-1">
        {languages.map((lng) => {
          const isSelected = lng.code === currentLang;
          return (
            <button
              key={lng.code}
              onClick={() => handleLanguageChange(lng.code)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isSelected
                  ? 'bg-white text-teal-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
                }`}
            >
              {lng.lng}
            </button>
          );
        })}
      </div>

      {/* Small screen: dropdown */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center px-4 py-2 bg-white/10 text-white backdrop-blur-sm rounded-full text-sm font-medium"
        >
          {languages.find(l => l.code === currentLang)?.lng}
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md z-30">
            {languages.map((lng) => (
              <button
                key={lng.code}
                onClick={() => handleLanguageChange(lng.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  lng.code === currentLang ? 'bg-teal-100 text-teal-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lng.lng}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Languageselecor;
