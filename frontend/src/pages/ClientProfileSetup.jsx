import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    fullName: "",
    companyName: "",
    bio: "",
    projectRequirements: "",
  });
  const [error, setError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };
      console.log("🔹 Updated FormData:", updatedData);
      return updatedData;
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
    setUploadMessage("Profile picture uploaded successfully!");
  };

  const handleComplete = async () => {
    console.log("🔹 FormData Before Validation:", formData);
  
    if (!formData.profilePicture || !formData.bio || !formData.projectRequirements) {
      setError("Please fill in all fields before proceeding.");
      console.log("❌ Missing Fields:", {
        profilePicture: !formData.profilePicture,
        fullName: !formData.fullName,
        bio: !formData.bio,
        projectRequirements: !formData.projectRequirements
      });
      return;
    }
  
    setError("");
  
    // ✅ Retrieve user details from localStorage (from first signup screen)
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    if (!signupData) {
      setError("Signup data is missing. Please restart the process.");
      return;
    }
  
    const accountType = localStorage.getItem("accountType");
    if (accountType !== "Client") {
      setError("Invalid account type. Please restart the process.");
      return;
    }
  
    // ✅ Prepare FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append("name", signupData.name);
    formDataToSend.append("username", signupData.username);
    formDataToSend.append("email", signupData.email);
    formDataToSend.append("phone", signupData.phone);
    formDataToSend.append("password", signupData.password);
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("projectRequirements", formData.projectRequirements);
    formDataToSend.append("accountType", "Client");
  
    // ✅ Ensure profile picture is valid
    if (formData.profilePicture instanceof File) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    } else {
      setError("Invalid profile picture format.");
      return;
    }
  
    console.log("🔹 Final FormData Before Sending:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/auth/signup/client", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Client signup failed.");
      }
  
      alert("Signup successful! Redirecting...");
      localStorage.clear(); // ✅ Clear stored data after signup
      navigate("/client-dashboard");
    } catch (error) {
      console.error("❌ Signup Error:", error);
      setError(error.message);
    }
  };
  
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Complete Your Profile</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <div className="space-y-4">
          <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer block">
            Upload Profile Picture
            <input type="file" name="profilePicture" onChange={handleFileChange} className="hidden" />
          </label>
          {uploadMessage && <p className="text-green-600 text-sm text-center">{uploadMessage}</p>}

         

          <input type="text" name="companyName" placeholder="Company Name (Optional)" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <textarea name="bio" placeholder="About You / Your Business" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <textarea name="projectRequirements" placeholder="What type of work do you need?" value={formData.projectRequirements} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <div className="flex justify-between items-center space-x-4">
            <button onClick={() => navigate(-1)} className="w-1/2 bg-gray-500 text-black font-bold py-2 rounded-lg hover:bg-gray-600">Back</button>
            <button onClick={handleComplete} className="w-1/2 bg-green-600 text-black font-bold py-2 rounded-lg hover:bg-green-700">Complete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileSetup;
