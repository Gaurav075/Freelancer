import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col bg-gradient-to-r from-blue-500 to-blue-800">
      {/* FreelancerHub Branding in Top Left */}
      <h1 className="absolute top-5 left-5 text-2xl font-bold text-white tracking-wide">
    FreelancerHub
  </h1>



      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-4 font-mono">Forgot Password</h2>
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="w-full bg-blue-600 text-black font-bold py-2 rounded-lg hover:bg-blue-700">
              Send Reset Link
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
