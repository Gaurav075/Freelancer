import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditGig = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
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

  // ✅ Fetch Gig Details
  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/gigs/${gigId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
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

  // ✅ Handle Input Changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, thumbnail: e.target.files[0] });

  // ✅ Handle Work Samples Upload & Removal
  const handleWorkSamplesChange = (e) => {
    setFormData({ ...formData, workSamples: [...formData.workSamples, ...e.target.files] });
  };

  const removeWorkSample = (index) => {
    const updatedSamples = [...formData.workSamples];
    updatedSamples.splice(index, 1);
    setFormData({ ...formData, workSamples: updatedSamples });
  };

  // ✅ Submit Updated Gig
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "workSamples") {
          formData.workSamples.forEach((file) => formDataToSend.append("workSamples", file));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(
        `https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/gigs/${gigId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToSend,
        }
      );

      if (!response.ok) throw new Error("Failed to update gig");

      alert("Gig updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">Freelancer Hub</h1>
      </nav>

      {/* Full-Screen Form Container */}
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="w-full max-w-5xl bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-blue-400 mb-6 text-center">Edit Gig</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Inputs */}
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Gig Title" />
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Category" />
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Gig Description"></textarea>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Price ($)" />
            <input type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-700 text-white" placeholder="Delivery Time" />

            {/* Thumbnail Preview */}
            {formData.thumbnail && (
              <div className="mb-4">
                <h3 className="text-lg font-bold text-blue-300 mb-2">Current Thumbnail</h3>
                <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-40 object-cover rounded-lg shadow-md" />
              </div>
            )}
            <label className="block bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 text-center cursor-pointer">
              Upload New Thumbnail
              <input type="file" name="thumbnail" onChange={handleFileChange} className="hidden" />
            </label>

            {/* Work Samples Preview */}
            {formData.workSamples.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-bold text-blue-300 mb-2">Current Work Samples</h3>
                <div className="grid grid-cols-2 gap-4">
                  {formData.workSamples.map((sample, index) => (
                    <div key={index} className="relative">
                      <img src={sample} alt={`Work Sample ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                      <button
                        onClick={() => removeWorkSample(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full hover:bg-red-700"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <label className="block bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 text-center cursor-pointer">
              Upload More Work Samples
              <input type="file" name="workSamples" multiple onChange={handleWorkSamplesChange} className="hidden" />
            </label>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => navigate(-1)} className="w-1/3 bg-gray-600 py-3 rounded-lg hover:bg-gray-700">Cancel</button>
              <button type="submit" className="w-1/3 bg-green-600 py-3 rounded-lg hover:bg-green-700">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGig;
