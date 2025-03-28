import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [profilePic, setProfilePic] = useState('');

  // ✅ Fetch Gigs from Backend when Dashboard Loads
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const token = localStorage.getItem("token");
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
        setGigs(data.gigs);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfilePic(data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchGigs();
    fetchProfile();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">Freelancer Hub</h1>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => navigate('/create-gig')} 
            className="bg-blue-600 text-black px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            + Create Gig
          </button>
          <img 
            src={profilePic || 'https://via.placeholder.com/150'} 
            alt="Profile" 
            className="w-12 h-12 rounded-full cursor-pointer" 
            onClick={() => navigate('/update-profile')} 
          />
        </div>
      </nav>

      <div className="flex-grow p-6">
        {gigs.length === 0 ? (
          <p className="text-center text-gray-400">No gigs created yet. Click on \"Create Gig\" to add one.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {gigs.map((gig) => (
              <div 
                key={gig._id} 
                className="bg-gray-800 p-5 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
                onClick={() => navigate(`/gig/${gig._id}`)}
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

      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:bg-blue-700"
      >
        💬
      </button>

      {showChat && <Chat onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default Dashboard;
