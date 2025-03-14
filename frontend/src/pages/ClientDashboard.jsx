import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCommentDots, FaTimes } from "react-icons/fa";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  // Mock freelancer gigs (Replace with backend data later)
  const [freelancerGigs] = useState([
    {
      id: 1,
      title: "Web Development",
      category: "Programming & Tech",
      price: 100,
      deliveryTime: "3 days",
      freelancer: "John Doe",
      image: "https://source.unsplash.com/300x200/?developer,web",
    },
    {
      id: 2,
      title: "Graphic Design",
      category: "Design & Creative",
      price: 80,
      deliveryTime: "2 days",
      freelancer: "Sarah Lee",
      image: "https://source.unsplash.com/300x200/?graphic,design",
    },
    {
      id: 3,
      title: "SEO Optimization",
      category: "Digital Marketing",
      price: 120,
      deliveryTime: "5 days",
      freelancer: "Michael Smith",
      image: "https://source.unsplash.com/300x200/?seo,marketing",
    },
  ]);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">FreelancerHub</h1>
        <div className="flex items-center space-x-6">
          {/* Message Icon */}
          <button
            onClick={() => navigate("/messages")}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center"
          >
            <FaCommentDots className="text-white text-2xl" />
          </button>

          {/* Profile Icon - Click to Open Profile Popup */}
          <div
            className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition"
            onClick={() => setShowProfilePopup(true)}
          >
            <FaUser className="text-white text-2xl" />
          </div>
        </div>
      </nav>

      {/* Profile Popup Modal (Styled like FreelancerDashboard) */}
      {showProfilePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">Update Profile</h2>
              <button onClick={() => setShowProfilePopup(false)}>
                <FaTimes className="text-gray-700 text-xl hover:text-red-500 transition" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
            />
            <textarea
              placeholder="Bio"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
            ></textarea>
            <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full p-6">
        <h2 className="text-3xl font-bold mb-6">Available Freelancers</h2>

        {freelancerGigs.length === 0 ? (
          <p className="text-gray-400">No gigs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {freelancerGigs.map((gig) => (
              <div key={gig.id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                {/* Thumbnail Image */}
                <img src={gig.image} alt={gig.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold text-blue-300">{gig.title}</h3>
                <p className="text-gray-400">{gig.category}</p>
                <p className="text-green-400 font-bold">${gig.price}</p>
                <p className="text-gray-300">Delivery Time: {gig.deliveryTime}</p>
                <p className="text-gray-500 italic">By {gig.freelancer}</p>

                {/* Hire Button */}
                <button className="w-full bg-blue-600 text-black font-bold py-2 rounded-lg hover:bg-blue-700 transition mt-4">
                  Hire {gig.freelancer}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
