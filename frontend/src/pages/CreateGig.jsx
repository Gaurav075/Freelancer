import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateGig = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    thumbnail: null,
    price: '',
    deliveryTime: ''
  });
  const [error, setError] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [preview, setPreview] = useState(false);

  const categories = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "Video Editing",
    "Mobile App Development",
    "SEO & Marketing",
    "UI/UX Design"
  ];

  const priceOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
  const deliveryOptions = ["1 Day", "2 Days", "3 Days", "5 Days", "7 Days", "10 Days"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
    setUploadMessage('Thumbnail uploaded successfully!');
  };

  const handlePreview = () => {
    if (!formData.title || !formData.category || !formData.description || !formData.thumbnail || !formData.price || !formData.deliveryTime) {
      setError('Please fill in all fields before previewing.');
      return;
    }
    setError('');
    setPreview(true);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-gray-800">
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

              {/* Price Input with Custom & Predefined Options */}
              <input 
                type="number" 
                name="price" 
                placeholder="Enter Price ($) or Select" 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none" 
                list="priceOptions" 
                min="5"  // ✅ Prevents values below $5
                onKeyDown={(e) => e.key === '-' && e.preventDefault()}  // ✅ Blocks negative values
              />

              <datalist id="priceOptions">
                {[...new Set(priceOptions)].map((price, index) => (  // ✅ Removes duplicate values
                  <option key={index} value={price}>${price}</option>
                ))}
              </datalist>



              {/* Delivery Time Input */}
              <input 
              type="number" 
              name="deliveryTime" 
              placeholder="Enter Delivery Time (Days) or Select" 
              value={formData.deliveryTime} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none" 
              list="deliveryOptions" 
              min="1"  // ✅ Prevents values below 1
              onKeyDown={(e) => e.key === '-' && e.preventDefault()}  // ✅ Blocks negative values
            />

            <datalist id="deliveryOptions">
              {[...new Set(deliveryOptions)].map((time, index) => (  // ✅ Removes duplicate values
                <option key={index} value={time}>{time}</option>
              ))}
            </datalist>


              {/* Navigation Buttons */}
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
              {formData.thumbnail && (
                <img src={URL.createObjectURL(formData.thumbnail)} alt="Gig Thumbnail" className="w-72 h-72 object-cover rounded-lg shadow-md mx-auto border border-gray-400" />
              )}
              <h3 className="text-2xl font-bold">{formData.title}</h3>
              <p className="text-gray-700 font-semibold">Category: {formData.category}</p>
              <p className="text-gray-600 italic">{formData.description}</p>
              <p className="text-green-600 font-extrabold text-lg">${formData.price}</p>
              <p className="text-gray-700">Delivery Time: {formData.deliveryTime}</p>

              {/* Preview Navigation Buttons */}
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
