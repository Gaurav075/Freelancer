import { useState } from "react";
import SkillInput from "../components/Skills";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const inputField = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-400";
const btnPrimary = "w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition";
const eyeIcon = "absolute top-2 right-3 text-gray-600 bg-transparent";

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
    skills: [],
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
    e.preventDefault();
    const { firstName, lastName, email, username, password, confirmPassword, phoneNumber } = formData;

    if (!firstName || !lastName || !email || !username || !password || !confirmPassword || !phoneNumber) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setError("Invalid phone number.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "skills") {
        formDataObj.append(key, JSON.stringify(formData.skills));  // ✅ Send skills as JSON string
      } else {
        formDataObj.append(key, formData[key]);
      }
    });
  
    try {
      const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/auth/signup", {
        method: "POST",
        body: formDataObj,
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
  
      console.log("✅ Signup Successful:", data);
      alert("Signup successful!");
    } catch (err) {
      console.error("❌ Signup Error:", err.message);
      setError(err.message);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-600">Sign Up</h2>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4 mt-4">
            <input type="text" name="firstName" placeholder="First Name" className={inputField} value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" className={inputField} value={formData.lastName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" className={inputField} value={formData.email} onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" className={inputField} value={formData.username} onChange={handleChange} />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" className={inputField} value={formData.phoneNumber} onChange={handleChange} />

            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className={inputField} value={formData.password} onChange={handleChange} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={eyeIcon}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>

            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className={inputField} value={formData.confirmPassword} onChange={handleChange} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={eyeIcon}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>

            <div className="mt-4">
              <button type="submit" className={btnPrimary}>Next</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            <SkillInput />
            <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer">
              Upload Resume
              <input type="file" name="resume" className="hidden" onChange={handleFileChange} />
            </label>
            <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer">
              Upload Profile Picture
              <input type="file" name="profilePicture" className="hidden" onChange={handleFileChange} />
            </label>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="text-blue-600 hover:underline">Back</button>
              <button type="submit" className={btnPrimary}>{loading ? "Submitting..." : "Sign Up"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
