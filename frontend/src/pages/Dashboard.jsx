import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [gigs, setGigs] = useState([]);

  // ✅ Fetch Gigs from Backend when Dashboard Loads
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token for authentication
        const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/gigs/my-gigs", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gigs");
        }

        const data = await response.json();
        setGigs(data.gigs); // ✅ Store fetched gigs in state
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">Freelancer Hub</h1>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => navigate('/create-gig')} 
            className="bg-blue-600 text-black px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            + Create Gig
          </button>
          <div 
            className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile(true)}
          >
            <span className="text-xl">👤</span>
          </div>
        </div>
      </nav>

      {/* Gigs Grid */}
      <div className="flex-grow p-6">
        {gigs.length === 0 ? (
          <p className="text-center text-gray-400">No gigs created yet. Click on "Create Gig" to add one.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {gigs.map((gig) => (
              <div 
                key={gig._id} 
                className="bg-gray-800 p-5 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
                onClick={() => navigate(`/gig/${gig._id}`)} // ✅ Navigate to Gig Details
              >
                <img src={gig.thumbnail} alt={gig.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold text-blue-300">{gig.title}</h3>
                <p className="text-gray-400">{gig.category}</p>
                <p className="text-green-400 font-bold">${gig.price}</p>
                <p className="text-gray-300">Delivery Time: {gig.deliveryTime}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Settings */}
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Profile Settings</h2>
            <label className="block mb-2">Name:</label>
            <input type="text" className="w-full p-2 mb-4 rounded bg-gray-700 text-white" placeholder="Your Name" />

            <label className="block mb-2">Email:</label>
            <input type="email" className="w-full p-2 mb-4 rounded bg-gray-700 text-white" placeholder="Your Email" />

            <label className="block mb-2">Password:</label>
            <input type="password" className="w-full p-2 mb-4 rounded bg-gray-700 text-white" placeholder="New Password" />

            <label className="block mb-2">Profile Picture:</label>
            <input type="file" className="w-full p-2 mb-4 rounded bg-gray-700 text-white" />

            <button className="w-full bg-blue-600 text-black py-2 rounded-lg hover:bg-blue-700 transition">
              Save Changes
            </button>

            <button onClick={() => setShowProfile(false)} className="w-full mt-2 bg-red-600 text-black py-2 rounded-lg hover:bg-red-700 transition">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:bg-blue-700"
      >
        💬
      </button>

      {/* Chat Window */}
      {showChat && <Chat onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default Dashboard;
