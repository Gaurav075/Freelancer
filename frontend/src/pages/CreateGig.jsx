import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: null,
    workSamples: [],
    price: "",
    deliveryTime: "",
  });

  const [error, setError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    // ✅ Load gig details from localStorage
    const savedGigData = JSON.parse(localStorage.getItem("gigData"));
    if (savedGigData) setFormData(savedGigData);
  }, []);

  const categories = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "Video Editing",
    "Mobile App Development",
    "SEO & Marketing",
    "UI/UX Design",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem("gigData", JSON.stringify({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, thumbnail: file });
    setUploadMessage("Thumbnail uploaded successfully!");
  };
  

  const handleWorkSamplesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, workSamples: [...formData.workSamples, ...files] });
  };

  const handlePreview = () => {
    if (!formData.title || !formData.category || !formData.description || !formData.thumbnail || !formData.price || !formData.deliveryTime) {
      setError("Please fill in all fields before previewing.");
      return;
    }
    setError("");
    setPreview(true);
  };

  const handleSubmit = async () => {
    // ✅ Retrieve freelancer details from localStorage
    const freelancerData = JSON.parse(localStorage.getItem("signupData"));
    const freelancerProfile = JSON.parse(localStorage.getItem("freelancerProfile"));
  
    if (!freelancerData || !freelancerProfile) {
      setError("Missing freelancer details. Please restart the signup process.");
      return;
    }
  
    const formDataToSend = new FormData();
  
    // ✅ Append freelancer details
    formDataToSend.append("name", freelancerData.name);
    formDataToSend.append("username", freelancerData.username);
    formDataToSend.append("email", freelancerData.email);
    formDataToSend.append("phone", freelancerData.phone);
    formDataToSend.append("password", freelancerData.password);
    formDataToSend.append("professionalTitle", freelancerProfile.title);
    formDataToSend.append("bio", freelancerProfile.bio);
    formDataToSend.append("skills", freelancerProfile.skills);
  
    // ✅ Ensure `profilePicture` is valid before appending
    console.log("🔍 Debugging Profile Picture:", freelancerProfile.profilePicture);
    console.log("🟢 Profile Picture Data Type:", typeof freelancerProfile.profilePicture);
    console.log("🟢 Profile Picture Value:", freelancerProfile.profilePicture);
    
    const profilePictureData = freelancerProfile.profilePicture;

    console.log("🟢 Debugging Profile Picture:", profilePictureData);
    
    if (typeof profilePictureData === "string" && profilePictureData.startsWith("data:image")) {
      try {
        const response = await fetch(profilePictureData);
        const blob = await response.blob();
        formDataToSend.append("profilePicture", blob, "profilePicture.png");
      } catch (error) {
        console.error("❌ Error converting profile picture:", error);
        setError("Failed to process profile picture.");
        return;
      }
    } else {
      console.error("❌ Invalid profile picture format:", profilePictureData);
      setError("Profile picture format is invalid.");
      return;
    }
  
    // ✅ Append gig details
    formDataToSend.append("gigTitle", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("deliveryTime", formData.deliveryTime);
  
    // ✅ Append `thumbnail` if it's a valid file
    if (formData.thumbnail instanceof File) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    } else {
      console.error("❌ Thumbnail is not a valid file:", formData.thumbnail);
      setError("Thumbnail is missing or invalid.");
      return;
    }
  
    // ✅ Append work samples
    formData.workSamples.forEach((file) => {
      formDataToSend.append("workSamples", file);
    });
  
    // ✅ Debugging: Print FormData before sending
    console.log("🔹 Final FormData Before Sending:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/auth/signup/freelancer", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create gig.");
      }
  
      alert("Signup successful! Gig created.");
      localStorage.clear(); // ✅ Remove all signup data from localStorage
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Signup Error:", error);
      setError(error.message);
    }
  };
  
  
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-gray-800 overflow-hidden">
        {!preview ? (
          <>
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6 font-mono">Create Your Gig</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <div className="space-y-4">
              <input type="text" name="title" placeholder="Gig Title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <option value="" disabled>Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <textarea name="description" placeholder="Gig Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              
              <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer block">
                Upload Thumbnail
                <input type="file" name="thumbnail" onChange={handleFileChange} className="hidden" />
              </label>
              {uploadMessage && <p className="text-green-600 text-sm text-center">{uploadMessage}</p>}

              <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer block">
                Upload Work Samples
                <input type="file" name="workSamples" multiple onChange={handleWorkSamplesChange} className="hidden" accept="image/*,video/*" />
              </label>

              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
              <div className="grid grid-cols-2 gap-4">
  {formData.workSamples.map((sample, index) => (
    <div key={index} className="border border-gray-300 rounded-lg p-2">
      {sample?.type && sample.type.startsWith("image/") ? (
        <img src={URL.createObjectURL(sample)} alt={`Work Sample ${index}`} className="w-full h-24 object-cover rounded-lg" />
      ) : sample?.type && sample.type.startsWith("video/") ? (
        <video controls className="w-full h-24 rounded-lg">
          <source src={URL.createObjectURL(sample)} type={sample.type} />
        </video>
      ) : (
        <p className="text-red-500 text-sm text-center">Invalid File</p>
      )}
    </div>
  ))}
</div>
              </div>

              <input type="number" name="price" placeholder="Enter Price ($)" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <input type="text" name="deliveryTime" placeholder="Enter Delivery Time" value={formData.deliveryTime} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

              <div className="flex justify-between items-center space-x-4">
                <button onClick={() => navigate(-1)} className="w-1/2 bg-gray-500 text-black font-bold py-2 rounded-lg hover:bg-gray-600 transition">Back</button>
                <button onClick={handlePreview} className="w-1/2 bg-blue-600 text-black font-bold py-2 rounded-lg hover:bg-blue-700 transition">Preview</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6 font-mono">Gig Preview</h2>
            <div className="text-center space-y-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100">
              {formData.thumbnail && <img src={URL.createObjectURL(formData.thumbnail)} alt="Gig Thumbnail" className="w-72 h-72 object-cover rounded-lg shadow-md mx-auto border border-gray-400" />}
              <h3 className="text-2xl font-bold">{formData.title}</h3>
              <p className="text-gray-600">{formData.description}</p>
              <p className="text-green-600 font-extrabold text-lg">${formData.price}</p>
              <p className="text-gray-700">Delivery Time: {formData.deliveryTime}</p>
              <button onClick={handleSubmit} className="w-full bg-green-600 text-black font-bold py-2 rounded-lg hover:bg-green-700 transition">Complete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateGig;
