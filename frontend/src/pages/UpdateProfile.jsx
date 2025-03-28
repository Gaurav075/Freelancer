import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    professionalTitle: '',
    bio: '',
    skills: '',
    profilePicture: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            email: data.email,
            password: '',
            phone: data.phone,
            professionalTitle: data.professionalTitle,
            bio: data.bio,
            skills: data.skills.join(","),
            profilePicture: data.profilePicture,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const updatedFormData = new FormData();

    updatedFormData.append("name", formData.name);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("password", formData.password);
    updatedFormData.append("phone", formData.phone);
    updatedFormData.append("professionalTitle", formData.professionalTitle);
    updatedFormData.append("bio", formData.bio);
    updatedFormData.append("skills", formData.skills);
    if (formData.profilePicture) {
      updatedFormData.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await fetch(
        "https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: updatedFormData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">Freelancer Hub</h1>
        <button onClick={() => navigate('/dashboard')} className="bg-blue-600 py-2 rounded text-black font-bold">Back to Dashboard</button>
      </nav>
      <div className="flex-grow overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-900 rounded" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-900 rounded" />
          <input type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-900 rounded" />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-900 rounded" />
          <input type="text" name="professionalTitle" placeholder="Professional Title" value={formData.professionalTitle} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-900 rounded" />
          <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-900 rounded"></textarea>
          <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-900 rounded" />

          <label className="block text-center mb-4">
            <span className="w-full p-2 mb-4 bg-gray-900 rounded">Update Profile Picture</span>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          <button type="submit" className="bg-blue-600 w-full py-2 rounded text-black font-bold">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
