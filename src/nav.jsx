import {Link} from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#eaf6f6] to-[#f5fbfc] border-b border-[#e0f2f1]">
      <div className="mx-auto px-8 py-3 flex flex-col">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            {/* Replace with your SVG logo if needed */}
            <span className="text-[#14b8a6] text-3xl font-bold">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M6 8V6a6 6 0 1112 0v2" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18" cy="6" r="1.5" fill="#ef4444"/>
                <path d="M6 8h12v8a6 6 0 01-12 0V8z" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="font-bold text-xl text-[#1e293b]">HealthSync</span>
          </div>
          {/* Search Bar */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search"
              className="w-96 px-4 py-2 rounded-full bg-[#eaf6f6] text-[#1e293b] placeholder-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
            />
          </div>
          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            <button className="bg-[#eaf6f6] p-2 rounded-md hover:bg-[#d1f5f5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e293b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {/* Language Dropdown */}
            <div className="relative">
              <button className="flex items-center bg-[#eaf6f6] px-3 py-2 rounded-md border border-[#d1f5f5] text-[#1e293b] font-medium hover:bg-[#d1f5f5]">
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 4.636" />
                </svg>
                Language
                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu can be added here */}
            </div>
            {/* Login Button */}
            <button className="ml-2 px-5 py-2 border-2 border-[#14b8a6] rounded-lg font-semibold text-[#1e293b] bg-white hover:bg-[#eaf6f6]">
              Login
            </button>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="flex space-x-8 mt-4">
         <Link to="/" className="font-bold text-[#1e293b] hover:text-[#14b8a6]">Home</Link>
          <Link to="/about" className="font-bold text-[#1e293b] hover:text-[#14b8a6]">About</Link>
          <Link to="/conduct" className="font-bold text-[#1e293b] hover:text-[#14b8a6]">Contact</Link>
          <Link to="/services" className="font-bold text-[#1e293b] hover:text-[#14b8a6]">Services</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;