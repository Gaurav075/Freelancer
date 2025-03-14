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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
    setUploadMessage("Profile picture uploaded successfully!");
  };

  const handleComplete = () => {
    if (!formData.profilePicture || !formData.fullName || !formData.bio || !formData.projectRequirements) {
      setError("Please fill in all fields before proceeding.");
      return;
    }
    setError("");
    navigate("/client-dashboard"); // Redirect to Client Dashboard
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

          <input type="text" name="fullName" placeholder="Your Full Name" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

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
