import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
// import {Signup} from "./Signup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
  
      // Check content type before parsing JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }
  
        console.log("✅ Login Successful:", data);
        alert("Login successful!");
  
        // Store the JWT token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error("Server returned an unexpected response");
      }
  
    } catch (err) {
      console.error("❌ Login Error:", err.message);
      setError(err.message);
    }
  
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden relative">
      {/* Full Screen Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-blue-800 -z-10"></div>
  
      {/* Centered Login Box */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-gray-800 overflow-hidden">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Welcome Back!</h2>
  
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
  
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          {/* Password Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-4 text-gray-600 bg-transparent hover:text-blue-500 transition"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
  
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-black font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
  
        {/* Forgot Password & Signup Links */}
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password?</a>
          <p className="text-sm mt-2">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
  

  
  
  
  
};

export default Login;


