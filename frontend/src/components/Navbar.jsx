import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Freelancer Hub
      </Link>
    <div className="flex space-x-4 ml-auto">
      {/* Right Side: Login Button */}
      <Link
        to="/Signup"
        className="mt-2"
      >
        <span className="text-blue-600 font-bold">Signup</span>
      </Link>
      <Link
        to="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
      >
        <span className="text-white">Login</span>
      </Link>

    </div>
    </nav>
  );
};

export default Navbar;
