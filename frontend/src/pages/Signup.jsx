import { useState } from "react";
import SkillInput from "../components/Skills";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const inputField = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-400";
const btnPrimary = "w-full bg-blue-600 text-black font-bold py-2 rounded-lg hover:bg-blue-700 transition";
const btnSecondary = "bg-gray-400 text-white px-4 py-2 rounded-lg";
const eyeIcon = "absolute top-0.5 right-0.5 text-gray-600 bg-transparent";
const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    skills: "",
    portfolio: "",
    resume: null,
    profilePicture: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log("Next clicked"); // Debugging log

    const { firstName, lastName, email, username, password, confirmPassword, phoneNumber } = formData;

    if (!firstName || !lastName || !email || !username || !password || !confirmPassword || !phoneNumber) {
      setError("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
  
    if (!emailRegex.test(email)) {
      setError ("Invalid email address");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setError ("Invalid phone number");
      return ;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setStep(2); // Move to step 2
    console.log("Step updated to:", step); // Debugging log
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { skills, portfolio, resume, profilePicture } = formData;

    if (!skills || !portfolio || !resume || !profilePicture) {
      setError("Please fill in all required freelancer profile details.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Signup completed with:", formData);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-600">Sign Up</h2>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4 mt-4">
            {/* First Name & Last Name */}
            <div className="flex space-x-2">
            </div>
              <input type="text" name="firstName" placeholder="First Name" className={inputField} value={formData.firstName} onChange={handleChange} />
              <input type="text" name="lastName" placeholder="Last Name" className={inputField} value={formData.lastName} onChange={handleChange} />

            {/* Email Address */}
            <input type="email" name="email" placeholder="Email Address" className={inputField} value={formData.email} onChange={handleChange} />

            {/* Username */}
            <input type="text" name="username" placeholder="Username" className={inputField} value={formData.username} onChange={handleChange} />

            <input type="tel" name="phoneNumber" placeholder="Phone Number" className={inputField} value={formData.phoneNumber} onChange={handleChange} />

            {/* Password */}
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className={inputField} value={formData.password} onChange={handleChange} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={eyeIcon}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className={inputField} value={formData.confirmPassword} onChange={handleChange} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={eyeIcon}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>


            {/* Next Button */}
            <div className="mt-4">

              <button type="submit" className={btnPrimary}>Next</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            {/* Skills */}
            {/* <input type="text" name="skills" placeholder="Skills" className={inputField} value={formData.skills} onChange={handleChange} /> */}
            <SkillInput/>

            {/* Portfolio */}
            {/* <input type="text" name="portfolio" placeholder="Portfolio (Links to projects)" className={inputField} value={formData.portfolio} onChange={handleChange} /> */}

            {/* Resume */}
           <div className="flex flex-col items-center">
            <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer">
              Upload Resume
              <input type="file" className="hidden" onChange={handleFileChange}/>
            </label>
          </div>

            {/* Profile Picture */}
           <div className="flex flex-col items-center">
          <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer">
            Upload Profile Picture
            <input type="file" className="hidden" />
          </label>
        </div>

            {/* Back & Submit Buttons */}
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} >Back</button>
              <button type="submit" className={btnPrimary}>{loading ? "Submitting..." : "Sign Up"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
