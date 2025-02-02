import { useState,useRef,useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to toggle dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(()=>{
    const handleclickoutside = (event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownOpen(false)
      }
    
    }
    if(isDropdownOpen)
      {
        document.addEventListener('mousedown',handleclickoutside)
      }

    return ()=>{
      document.removeEventListener('mousedown',handleclickoutside)
    }
  },[isDropdownOpen])

 

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0">
      {/* Logo on the left */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Freelancer Hub
      </Link>

      {/* Buttons container */}
      <div className="flex space-x-4 ml-auto">
        {/* Login Button
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Login
        </Link> */}

        {/* More Button (Dropdown) - Placed Left of Signup */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 bg-gray-600 text-black rounded-full font-semibold shadow-md hover:bg-gray-700 transition"
          >
            Explore
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
              <Link
                to="/podcasts"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Podcasts
              </Link>
              <Link
                to="/blog"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                About
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
        >
          <span className="text-white">Login</span> 
        </Link>
        {/* Signup Button */}
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
        >
          <span className="text-white">Signup</span> 
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
