import { Link } from "react-router-dom";
import { useState } from 'react';
import { Bell, Globe,Search } from 'lucide-react'; // Import icons from lucide-react

function Navbar() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#e8f5f3] border-b border-[#d1f5f5] shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Row - Logo and Search */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            {/* Stethoscope Heart Logo */}
            <div className="text-[#14b8a6]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                {/* Stethoscope tube */}
                <path d="M8 4h8v2H8V4z" fill="#14b8a6"/>
                <path d="M8 6v2c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V6" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Heart shape */}
                <path d="M12 10c-2-2-4-3-4-5 0-1.1.9-2 2-2s2 .9 2 2c0-1.1.9-2 2-2s2 .9 2 2c0 2-2 3-4 5z" fill="#14b8a6"/>
                {/* Stethoscope bell */}
                <circle cx="12" cy="16" r="2" fill="#14b8a6"/>
              </svg>
            </div>
            <span className="font-instrument font-bold text-2xl text-[#1e293b]">HealthSync</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center max-w-md">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#1e293b]" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/80 text-[#1e293b] placeholder-gray-500 border border-[#d1f5f5] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row - Navigation Menu and Right Elements */}
        <div className="flex flex-nowrap items-center justify-between">
          {/* Navigation Menu */}
          <div className="flex items-center gap-6 ">
            <Link to="/" className="font-bold text-lg text-[#1e293b] hover:text-[#14b8a6] transition-colors">Home</Link>
            <Link to="/about" className="font-bold text-lg text-[#1e293b] hover:text-[#14b8a6] transition-colors">About</Link>
            <Link to="/contact" className="font-bold text-lg text-[#1e293b] hover:text-[#14b8a6] transition-colors">Contact</Link>
            <Link to="/services" className="font-bold text-lg text-[#1e293b] hover:text-[#14b8a6] transition-colors">Services</Link>
          </div>

          {/* Right Elements */}
          <div className="flex items-center space-x-10 shrink-0">
            {/* Notification Bell */}
            <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
              <Bell className="h-6 w-6 text-[#1e293b]" />
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleLanguageDropdown}
                className="flex items-center bg-white/80 px-4 py-2 rounded-lg border border-[#d1f5f5] text-[#1e293b] font-medium hover:bg-white transition-colors"
              >
                <Globe className="h-5 w-5 mr-2" />
                Language
                <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLanguageOpen && (
                <ul className="absolute top-full right-0 bg-white shadow-lg rounded-lg mt-2 py-2 w-32 z-10">
                  <li>
                    <a href="#" className="block px-4 py-2 text-[#1e293b] hover:bg-gray-100 transition-colors">English</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-[#1e293b] hover:bg-gray-100 transition-colors">Tamil</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-[#1e293b] hover:bg-gray-100 transition-colors">Sinhala</a>
                  </li>
                </ul>
              )}
            </div>

            {/* Login Button */}
            <button className="px-6 py-2 bg-[#14b8a6] text-white font-semibold rounded-lg hover:bg-[#0f766e] transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;