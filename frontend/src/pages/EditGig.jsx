import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditGig = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    deliveryTime: "",
    thumbnail: null,
    workSamples: [],
  });
  const [deletedSamples, setDeletedSamples] = useState([]);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/gigs/${gigId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch gig details");
        const data = await response.json();

        setFormData({
          title: data.title,
          category: data.category,
          description: data.description,
          price: data.price,
          deliveryTime: data.deliveryTime,
          thumbnail: data.thumbnail,
          workSamples: data.workSamples || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigDetails();
  }, [gigId]);

  // const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => setFormData({ ...formData, thumbnail: e.target.files[0] });

  const handleWorkSamplesChange = (e) => {
    setFormData({ ...formData, workSamples: [...formData.workSamples, ...e.target.files] });
  };

  const removeWorkSample = (index) => {
    const updatedSamples = [...formData.workSamples];
    const removedSample = updatedSamples.splice(index, 1)[0];

    if (typeof removedSample === "string") {
      setDeletedSamples([...deletedSamples, removedSample]);
    }
    setFormData({ ...formData, workSamples: updatedSamples });
  };

  const handleAddSample = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    console.log("🔍 Form Data Before Submit:", formData);
  
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
  
      // ✅ Append Text Fields
      formDataToSend.append("title", formData.title || "");
      formDataToSend.append("category", formData.category || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("price", formData.price || "");
      formDataToSend.append("deliveryTime", formData.deliveryTime || "");
  
      // ✅ Append Thumbnail if it is a File
      if (formData.thumbnail instanceof File) {
        formDataToSend.append("thumbnail", formData.thumbnail);
      }
  
      // ✅ Append Work Samples (Only Files)
      formData.workSamples.forEach((file) => {
        if (file instanceof File) {
          formDataToSend.append("workSamples", file);
        }
      });
  
      // ✅ Append Deleted Samples if Any
      if (deletedSamples.length > 0) {
        formDataToSend.append("deletedSamples", JSON.stringify(deletedSamples));
      }
  
      // ✅ Log After Appending All Data
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`📤 ${key}:`, value);
      }
  
      // ✅ Send the FormData
      const response = await fetch(
        `https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/gigs/${gigId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` }, // ❌ No content-type for FormData
          body: formDataToSend,
        }
      );
  
      if (!response.ok) throw new Error("Failed to update gig");
  
      alert("Gig updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error submitting:", error);
      setError(error.message);
    }
  };
  
  
  

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">FreelancerHub</h1>
      </nav>

      <div className="flex-grow flex flex-col md:flex-row gap-8 p-8">
        <div className="md:w-2/5 space-y-4">
          <h3 className="text-2xl font-bold text-blue-300 mb-1">Thumbnail</h3>
          {formData.thumbnail && <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-64 object-cover rounded-lg shadow-md" />}
          <label className="block bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 text-center cursor-pointer">
            Upload New Thumbnail
            <input type="file" name="thumbnail" onChange={handleFileChange} className="hidden" />
          </label>

          <h3 className="text-2xl font-bold text-blue-300 mb-2">Work Samples</h3>

{/* Scrollable Work Samples Grid with Horizontal Scroll */}
<div className="max-h-64 overflow-x-auto whitespace-nowrap border border-gray-700 rounded-lg p-3 bg-gray-800 shadow-md">
              {formData.workSamples.map((sample, index) => (
                <div key={index} className="inline-block w-28 mr-4 relative group hover:scale-105 transition transform duration-200 ease-in-out">
                  <img 
                    src={typeof sample === "string" ? sample : URL.createObjectURL(sample)} 
                    alt={`Work Sample ${index + 1}`} 
                    className="w-full h-28 object-cover rounded-lg shadow-lg" 
                  />
                  <button
                    onClick={() => removeWorkSample(index)}
                    className="absolute top-1 right-1 bg-red-600 text-black w-5 h-5 flex items-center justify-center text-xs rounded-full hover:bg-red-700"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <div className="inline-block w-28 flex justify-center items-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-gray-800" onClick={handleAddSample}>
                <span className="text-3xl font-extrabold text-blue-400">+</span>
              </div>
            </div>


{/* Upload Button OUTSIDE the box */}
<label className="block bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 text-center cursor-pointer mt-4">
  Upload More Work Samples
  <input 
    type="file" 
    name="workSamples" 
    multiple 
    onChange={handleWorkSamplesChange} 
    className="hidden" 
  />
</label>

        </div>

        <form onSubmit={handleSubmit} className="md:w-3/5 space-y-6">
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Gig Title" />
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Category" />
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Gig Description"></textarea>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Price ($)" />
          <input type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Delivery Time" />

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => navigate(-1)} className="w-1/3 bg-gray-600 py-3 rounded-lg hover:bg-gray-700 text-black">Cancel</button>
            <button type="submit" className="w-1/3 bg-green-600 py-3 rounded-lg hover:bg-green-700 text-black">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGig;
