import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateEmail(formData.email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Invalid phone number (must be 10 digits)');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long and contain both letters and numbers');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://your-api-url/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      alert('Signup successful!');
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-blue-800 -z-10"></div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-gray-800 overflow-hidden">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Create Account</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200" />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200" />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200" />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-2.5 right-4 text-gray-600 bg-transparent hover:text-blue-500 transition">
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 transition duration-200" />
          <button type="button" onClick={() => navigate('/account-type')} className="w-full bg-blue-600 text-black font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center shadow-md hover:shadow-lg">
            Next
          </button>
        </form>
        <p className="text-sm text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
