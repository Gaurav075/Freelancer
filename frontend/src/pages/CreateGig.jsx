import { useState } from "react";
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

  const priceOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
  const deliveryOptions = ["1 Day", "2 Days", "3 Days", "5 Days", "7 Days", "10 Days"];

  // Handling text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling thumbnail file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
    setUploadMessage("Thumbnail uploaded successfully!");
  };

  // Handling work samples file input
  const handleWorkSamplesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, workSamples: [...formData.workSamples, ...files] });
  };

  // Handle preview before final submission
  const handlePreview = () => {
    if (!formData.title || !formData.category || !formData.description || !formData.thumbnail || !formData.price || !formData.deliveryTime) {
      setError("Please fill in all fields before previewing.");
      return;
    }
    setError("");
    setPreview(true);
  };

  // Handle gig submission
  const handleSubmit = () => {
    console.log("Gig created:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-gray-800 overflow-hidden">
        {!preview ? (
          <>
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6 font-mono">Create Your Gig</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <div className="space-y-4">
              {/* Gig Title & Category */}
              <input type="text" name="title" placeholder="Gig Title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <option value="" disabled>Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Gig Description */}
              <textarea name="description" placeholder="Gig Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

              {/* Upload Thumbnail */}
              <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer block">
                Upload Thumbnail
                <input type="file" name="thumbnail" onChange={handleFileChange} className="hidden" />
              </label>
              {uploadMessage && <p className="text-green-600 text-sm text-center">{uploadMessage}</p>}

              {/* Upload Work Samples */}
              <label className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-center cursor-pointer block">
                Upload Work Samples
                <input type="file" name="workSamples" multiple onChange={handleWorkSamplesChange} className="hidden" accept="image/*,video/*" />
              </label>

              {/* Work Samples Preview (Scrollable) */}
              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                <div className="grid grid-cols-2 gap-4">
                  {formData.workSamples.map((sample, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-2">
                      {sample.type.startsWith("image/") ? (
                        <img src={URL.createObjectURL(sample)} alt={`Work Sample ${index}`} className="w-full h-24 object-cover rounded-lg" />
                      ) : (
                        <video controls className="w-full h-24 rounded-lg">
                          <source src={URL.createObjectURL(sample)} type={sample.type} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Delivery Time */}
              <input type="number" name="price" placeholder="Enter Price ($) or Select" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg min-w-0" list="priceOptions" min="5" step="5" />
              <datalist id="priceOptions">
                {priceOptions.map((price, index) => (
                  <option key={index} value={price}>${price}</option>
                ))}
              </datalist>

              <input type="text" name="deliveryTime" placeholder="Enter Delivery Time or Select" value={formData.deliveryTime} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" list="deliveryOptions" />
              <datalist id="deliveryOptions">
                {deliveryOptions.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </datalist>

              {/* Buttons */}
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
              {/* ✅ Only show the thumbnail in the final preview */}
              {formData.thumbnail && (
                <img src={URL.createObjectURL(formData.thumbnail)} alt="Gig Thumbnail" className="w-72 h-72 object-cover rounded-lg shadow-md mx-auto border border-gray-400" />
              )}
              <h3 className="text-2xl font-bold">{formData.title}</h3>
              <p className="text-gray-700 font-semibold">Category: {formData.category}</p>
              <p className="text-gray-600 italic">{formData.description}</p>
              <p className="text-green-600 font-extrabold text-lg">${formData.price}</p>
              <p className="text-gray-700">Delivery Time: {formData.deliveryTime}</p>

              {/* Buttons */}
              <div className="flex justify-between items-center space-x-4 mt-6">
                <button onClick={() => setPreview(false)} className="w-1/2 bg-gray-500 text-black font-bold py-2 rounded-lg hover:bg-gray-600 transition">Back</button>
                <button onClick={() => navigate('/dashboard')} className="w-1/2 bg-green-600 text-black font-bold py-2 rounded-lg hover:bg-green-700 transition">Complete</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateGig;
