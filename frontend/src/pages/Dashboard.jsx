import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState([]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white p-6">
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-3xl font-extrabold text-blue-400">Freelancer Hub</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/create-gig')} 
            className="bg-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            + Create Gig
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-xl">👤</span>
          </div>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Your Gigs</h2>
        {gigs.length === 0 ? (
          <p className="text-gray-400">No gigs created yet. Click "Create Gig" to add one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {gigs.map((gig, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">{gig.title}</h3>
                <p className="text-gray-400">{gig.category}</p>
                <p className="text-green-400 font-bold">${gig.price}</p>
                <p className="text-gray-300">Delivery Time: {gig.deliveryTime}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
