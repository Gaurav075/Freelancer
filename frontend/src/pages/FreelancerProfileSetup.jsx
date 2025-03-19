import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FreelancerProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    title: '',
    bio: '',
    skills: ''
  });
  const [error, setError] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  // ✅ Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('freelancerProfile')) || {};
    setFormData((prev) => ({ ...prev, ...savedData }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem('freelancerProfile', JSON.stringify({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedProfile = {
        ...formData,
        profilePicture: reader.result, // ✅ Store Base64 instead of File object
      };
      setFormData(updatedProfile);
      localStorage.setItem("freelancerProfile", JSON.stringify(updatedProfile));
    };
    reader.readAsDataURL(file);
  };
  

  const handleNext = () => {
    if (!formData.profilePicture || !formData.title || !formData.bio || !formData.skills) {
      setError('Please fill in all fields before proceeding.');
      return;
    }

    // ✅ Store final profile data before moving to the next step
    localStorage.setItem('freelancerProfile', JSON.stringify(formData));

    navigate('/create-gig'); // Move to the next step
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800">
      {/* Profile Setup Box */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 font-sans tracking-wide whitespace-nowrap">
          Complete Your Profile
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="space-y-4">
          {/* Profile Picture Upload */}
          <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer block">
            Upload Profile Picture
            <input type="file" name="profilePicture" onChange={handleFileChange} className="hidden" />
          </label>
          {uploadMessage && <p className="text-green-600 text-sm text-center">{uploadMessage}</p>}

          {/* Input Fields */}
          <input type="text" name="title" placeholder="Your Professional Title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center space-x-4">
            <button onClick={() => navigate(-1)} className="w-1/2 bg-gray-500 text-black font-bold py-2 rounded-lg hover:bg-gray-600 transition">
              Back
            </button>
            <button onClick={handleNext} className="w-1/2 bg-green-500 text-black font-bold py-2 rounded-lg hover:bg-green-600 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfileSetup;
